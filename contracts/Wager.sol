pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Wager
 * @dev First attempt to build a wager
 */
contract Wager {
  address public owner; // the "oracle"

  // this isn't used computationally
  string public proposition;
  bytes32[] public outcomes;

  uint256 public timeout;
  uint256 public minimumBet;
  uint8 public maxNumberOfBettors;
  uint8 public numberOfBettors;
  uint256 public vigBasisPoints;
  uint256 public winningOutcome;

  enum States { Open, Closed, Resolved, Canceled }
  States state = States.Open;

  mapping(address => mapping(uint256 => uint256)) public betAmounts;
  mapping(uint256 => uint256) public totalPerOutcome;
  uint256 public total;

  constructor(string memory _proposition, uint256 _minimumBet,
    uint256 _timeoutDelay, uint8 _maxNumberOfBettors, uint256 _vigBasisPoints) {
    // There must only be 2 outcomes (for now)
    require(_minimumBet > 0, 'Minimum bet must be more than zero');
    require(_timeoutDelay > 0, 'Timeout must be greater than 0');

    owner = msg.sender;
    proposition = _proposition;
    minimumBet = _minimumBet;
    maxNumberOfBettors = _maxNumberOfBettors;
    numberOfBettors = 0;
    vigBasisPoints = _vigBasisPoints;
    timeout = block.timestamp + _timeoutDelay;
  }

  function bet(uint256 outcome) public payable {
    require(state == States.Open, 'Wager must be open');
    require(numberOfBettors < maxNumberOfBettors, 'Too many bettors');

    betAmounts[msg.sender][outcome] = msg.value;
    totalPerOutcome[outcome] += msg.value;
    total += msg.value;
    numberOfBettors += 1;

    require(total < 2 ** 128); // prevent overflow?
  }

  function close() public {
    require(state == States.Open, 'State must be open to close');
    require(msg.sender == owner, 'Only the owner can close the wager');
    state = States.Closed;
  }

  // TODO: figure out how to guarantee that calling this won't
  // cost them more than the owner's cut
  function resolve(uint256 _winningOutcome) public {
    require(state == States.Closed, 'Wager must be closed to resolve');
    require(msg.sender == owner, 'Only the owner can resolve the wager');

    winningOutcome = _winningOutcome;

    // remove owner's cut from the total
    uint256 ownerCut = getOwnerCut();
    total -= ownerCut;

    state = States.Resolved;
  }

  function claim() public {
    require(state == States.Resolved, 'Wager must be resolved - the owner should call resolve()');
    uint256 amount = betAmounts[msg.sender][winningOutcome] * total
      / totalPerOutcome[winningOutcome];
    betAmounts[msg.sender][winningOutcome] = 0;
    msg.sender.transfer(amount);
  }

  function cancel() public {
    require(state != States.Resolved, 'Wager cannot be canceled once resolved');
    require(msg.sender == owner || block.timestamp > timeout, 'You must be the owner of this wager or past timeout');

    state = States.Canceled;
  }

  function refund(uint256 outcome) public {
    // if we kept more state we wouldn't have to ask for the outcome
    require(state == States.Canceled, 'Wager must be canceled for a refund');

    uint256 amount = betAmounts[msg.sender][outcome];
    betAmounts[msg.sender][outcome] = 0;
    msg.sender.transfer(amount);
  }

  function getOwnerCut() public view returns (uint256) {
    uint256 ownerCut = (total * vigBasisPoints) / 100000;
    return ownerCut;
  }

  // function getWagerState() external pure returns (uint8) {
  //   return state;
  // }
}