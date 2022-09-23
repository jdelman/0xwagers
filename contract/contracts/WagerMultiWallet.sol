// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**

  2022-06-06: plan to add support for ERC20
    function transferFrom(
      address from,
      address to,
      uint256 amount
    ) external returns (bool);

  2022-09-20: associate ERC-721 with position
 */

/** 
 * @title WagerMultiWallet
 * @dev First attempt to build a wager
 */
contract WagerMultiWallet {
  using SafeERC20 for IERC20;

  enum States { Invalid, Open, Closed, Resolved, Canceled }

  struct Wager {
    address owner;
    uint256 endsAt;

    uint32 vigBasisPoints;
    uint8 winningOutcome;
    mapping(address => mapping(uint8 => uint256)) betAmounts;
    mapping(uint8 => uint256) totalPerOutcome;
    uint256 total;
    States state;

    string proposition;
    bytes32[] outcomes;

    bool isERC20;
    IERC20 erc20Token;
  }

  uint256 private _nextId = 1;
  mapping(uint256 => Wager) private _wagers;

  event MintedWager(uint256 indexed index, address owner);
  event PlacedBet(uint256 indexed index, uint256 amount, uint8 outcome);
  event ClosedWager(uint256 indexed index);
  event ResolvedWager(uint256 indexed index, uint8 outcome);
  event CanceledWager(uint256 indexed index);

  function mintWager(
    uint256 _endsAt,
    uint32 _vigBasisPoints,
    string memory _proposition,
    bytes32[] memory _outcomes,
    address _erc20Address
  ) public returns (uint256 wagerId) {
    uint256 id = _nextId++;

    Wager storage wager = _wagers[id];
    wager.owner = msg.sender;
    wager.vigBasisPoints = _vigBasisPoints;
    wager.endsAt = _endsAt;
    wager.state = States.Open;
    wager.proposition = _proposition;
    wager.outcomes = _outcomes;
    
    if (_erc20Address != address(0)) {
      wager.isERC20 = true;
      wager.erc20Token = IERC20(_erc20Address);
    }
    else {
      wager.isERC20 = false;
    }

    emit MintedWager(id, msg.sender);

    return id;
  }

  function bet(uint256 index, uint8 outcome) public payable {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Open, 'Wager must be open');
    require(msg.sender != wager.owner, 'Wager owner cannot partipate');
    require(msg.value > 0, 'Bet must be greater than 0');
    require(outcome >= 0 && outcome < wager.outcomes.length, 'Invalid outcome');

    wager.betAmounts[msg.sender][outcome] = msg.value;
    wager.totalPerOutcome[outcome] += msg.value;
    wager.total += msg.value;

    require(wager.total < 2 ** 128, 'overflow');

    emit PlacedBet(index, msg.value, outcome);
  }

  function betERC20(uint256 index, uint8 outcome, uint256 amount) public {
    Wager storage wager = _wagers[index];

    require(wager.isERC20 == true, 'Must be an ERC20 style wager');
    require(wager.state == States.Open, 'Wager must be open');
    require(msg.sender != wager.owner, 'Wager owner cannot partipate');
    require(amount > 0, 'Bet must be greater than 0');

    _collectERC20(index, amount, msg.sender);

    emit PlacedBet(index, amount, outcome);
  }

  function close(uint256 index) public {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Open, 'State must be open to close');
    require(msg.sender == wager.owner, 'Only the owner can close the wager');

    wager.state = States.Closed;

    emit ClosedWager(index);
  }

  // TODO: figure out how to guarantee that calling this won't
  // cost them more than the owner's cut
  function resolve(uint256 index, uint8 _winningOutcome) public {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Closed, 'Wager must be closed to resolve');
    require(msg.sender == wager.owner, 'Only the owner can resolve the wager');
    require(_winningOutcome < wager.outcomes.length, 'Invalid outcome');

    wager.winningOutcome = _winningOutcome;

    // remove owner's cut from the total
    uint256 ownerCut = getOwnerCut(index);
    wager.total -= ownerCut;
    payable(wager.owner).transfer(ownerCut);

    wager.state = States.Resolved;

    emit ResolvedWager(index, _winningOutcome);
  }

  // Does this really need to be a separate function? Would prefer to
  // decrease the total "surface area"
  function resolveERC20(uint256 index, uint8 _winningOutcome) public {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Closed, 'Wager must be closed to resolve');
    require(msg.sender == wager.owner, 'Only the owner can resolve the wager');

    wager.winningOutcome = _winningOutcome;

    // remove owner's cut from the total
    uint256 ownerCut = getOwnerCut(index);
    wager.total -= ownerCut;
    _sendERC20(index, ownerCut, wager.owner);

    wager.state = States.Resolved;

    emit ResolvedWager(index, _winningOutcome);
  }

  function claim(uint256 index) public {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Resolved, 'Wager must be resolved - the owner should call resolve()');
    uint256 amount = wager.betAmounts[msg.sender][wager.winningOutcome] * wager.total
      / wager.totalPerOutcome[wager.winningOutcome];
    wager.betAmounts[msg.sender][wager.winningOutcome] = 0;
    payable(msg.sender).transfer(amount);
  }

  function claimERC20(uint256 index) public {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Resolved, 'Wager must be resolved - the owner should call resolve()');
    uint256 amount = wager.betAmounts[msg.sender][wager.winningOutcome] * wager.total
      / wager.totalPerOutcome[wager.winningOutcome];
    wager.betAmounts[msg.sender][wager.winningOutcome] = 0;
    _sendERC20(index, amount, msg.sender);
  }

  function cancel(uint256 index) public {
    Wager storage wager = _wagers[index];

    require(wager.state != States.Resolved, 'Wager cannot be canceled once resolved');
    require(msg.sender == wager.owner || block.timestamp > wager.endsAt, 'You must be the owner of this wager or past timeout');

    wager.state = States.Canceled;

    emit CanceledWager(index);
  }

  function refund(uint256 index, uint8 outcome) public {
    Wager storage wager = _wagers[index];
    
    // TODO: thought: if we kept more state we wouldn't have to ask for the outcome
    require(wager.state == States.Canceled, 'Wager must be canceled for a refund');

    uint256 amount = wager.betAmounts[msg.sender][outcome];
    wager.betAmounts[msg.sender][outcome] = 0;
    payable(msg.sender).transfer(amount);
  }

  function refundERC20(uint256 index, uint8 outcome) public {
    Wager storage wager = _wagers[index];

    require(wager.state == States.Canceled, 'Wager must be canceled for a refund');
  
    uint256 amount = wager.betAmounts[msg.sender][outcome];
    wager.betAmounts[msg.sender][outcome] = 0;

    _sendERC20(index, amount, msg.sender);
  }

  /**

    Internal functions to handle moving ERC20.

   */

  function _collectERC20(uint256 index, uint256 amount, address from) private {
    // transfer amount from `from` address to this contract
    Wager storage wager = _wagers[index];
    require(wager.isERC20 == true, 'This wager does not support ERC20');

    wager.erc20Token.transferFrom(from, address(this), amount);
  }

  function _sendERC20(uint256 index, uint256 amount, address to) private {
    // transfer amount from this contract to `to` address
    Wager storage wager = _wagers[index];
    require(wager.isERC20 == true, 'This wager does not support ERC20');

    wager.erc20Token.transferFrom(address(this), to, amount);
  }

  function getOwnerCut(uint256 index) public view returns (uint256) {
    Wager storage wager = _wagers[index];
    uint256 ownerCut = (wager.total * wager.vigBasisPoints) / 100000;
    return ownerCut;
  }

  /* Not required for internal use, querying from outside network only? */

  // function getOwner(uint256 index) external view returns (address) {
  //   Wager storage wager = _wagers[index];
  //   return wager.owner;
  // }

  // function getEndsAt(uint256 index) external view returns (uint256) {
  //   Wager storage wager = _wagers[index];
  //   return wager.endsAt;
  // }

  // function getVigBasisPoints(uint256 index) external view returns (uint32) {
  //   Wager storage wager = _wagers[index];
  //   return wager.vigBasisPoints;
  // }

  // function getWinningOutcome(uint256 index) external view returns (uint8) {
  //   Wager storage wager = _wagers[index];
  //   return wager.winningOutcome;
  // }

  // function getTotal(uint256 index) external view returns (uint256) {
  //   Wager storage wager = _wagers[index];
  //   return wager.total;
  // }

  // function getWagerState(uint256 index) external view returns (uint8) {
  //   Wager storage wager = _wagers[index];
  //   return uint8(wager.state);
  // }

  // function getProposition(uint256 index) external view returns (string memory) {
  //   Wager storage wager = _wagers[index];
  //   return wager.proposition;
  // }

  // function getOutcomes(uint256 index) external view returns (bytes32[] memory) {
  //   Wager storage wager = _wagers[index];
  //   return wager.outcomes;
  // }

  function getWager(uint256 index) public view returns (
    address _owner,
    uint256 _endsAt,
    uint32 _vigBasisPoints,
    uint8 _winningOutcome,
    uint256 _total,
    uint8 _state,
    uint256[] memory _totalsPerOutcome,
    string memory _proposition,
    bytes32[] memory _outcomes,
    bool _isERC20,
    address _erc20Token
  ) {
    Wager storage wager = _wagers[index];

    // convert enum explicitly
    uint8 state = uint8(wager.state);
    require(state > 0, 'Invalid wager');

    uint256[] memory totalsPerOutcome = new uint256[](wager.outcomes.length);
    uint8 i;
    for (i = 0; i < wager.outcomes.length; i++) {
      totalsPerOutcome[i] = wager.totalPerOutcome[i];
    }

    return (
      wager.owner,
      wager.endsAt,
      wager.vigBasisPoints,
      wager.winningOutcome,
      wager.total,
      state,
      totalsPerOutcome,
      wager.proposition,
      wager.outcomes,
      wager.isERC20,
      address(wager.erc20Token)
    );
  }
}
