pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Wager
 * @dev First attempt to build a wager
 */
contract WagerWallet {
  address public owner;
  uint256 public endsAt;
  string public metadataURI;
  uint32 private vigBasisPoints;

  enum States { Open, Closed, Resolved, Canceled }
  States state = States.Open;

  uint8 public winningOutcome;
  mapping(address => mapping(uint8 => uint256)) private betAmounts;
  mapping(uint8 => uint256) private totalPerOutcome;
  uint256 private total;

  // event PlacedBet();
  // event ClosedWager();
  // event ResolvedWager();
  // event CanceledWager();
  // event RefundedWager();

  constructor(
    uint256 _endsAt,
    uint32 _vigBasisPoints,
    string memory _metadataURI
  ) {
    owner = msg.sender;
    vigBasisPoints = _vigBasisPoints;
    endsAt = _endsAt;
    metadataURI = _metadataURI;
  }

  function bet(uint8 outcome) public payable {
    require(state == States.Open, 'Wager must be open');
    require(msg.sender != owner, 'Wager owner cannot partipate');

    betAmounts[msg.sender][outcome] = msg.value;
    totalPerOutcome[outcome] += msg.value;
    total += msg.value;

    require(total < 2 ** 128, 'overflow');
  }

  function close() public {
    require(state == States.Open, 'State must be open to close');
    require(msg.sender == owner, 'Only the owner can close the wager');

    state = States.Closed;
  }

  // TODO: figure out how to guarantee that calling this won't
  // cost them more than the owner's cut
  function resolve(uint8 _winningOutcome) public {
    require(state == States.Closed, 'Wager must be closed to resolve');
    require(msg.sender == owner, 'Only the owner can resolve the wager');

    winningOutcome = _winningOutcome;

    // remove owner's cut from the total
    uint256 ownerCut = getOwnerCut();
    total -= ownerCut;
    payable(owner).transfer(ownerCut);

    state = States.Resolved;
  }

  function claim() public {
    require(state == States.Resolved, 'Wager must be resolved - the owner should call resolve()');
    uint256 amount = betAmounts[msg.sender][winningOutcome] * total
      / totalPerOutcome[winningOutcome];
    betAmounts[msg.sender][winningOutcome] = 0;
    payable(msg.sender).transfer(amount);
  }

  function cancel() public {
    require(state != States.Resolved, 'Wager cannot be canceled once resolved');
    require(msg.sender == owner || block.timestamp > endsAt, 'You must be the owner of this wager or past timeout');

    state = States.Canceled;
  }

  function refund(uint8 outcome) public {
    // TODO: thought: if we kept more state we wouldn't have to ask for the outcome
    require(state == States.Canceled, 'Wager must be canceled for a refund');

    uint256 amount = betAmounts[msg.sender][outcome];
    betAmounts[msg.sender][outcome] = 0;
    payable(msg.sender).transfer(amount);
  }

  function getOwnerCut() public view returns (uint256) {
    uint256 ownerCut = (total * vigBasisPoints) / 100000;
    return ownerCut;
  }

  // function getWagerState() external view returns (uint8) {
  //   // why can't I just convert an enum to an int?
  //   if (state == States.Open) {
  //     return 0;
  //   }
  //   else if (state == States.Closed) {
  //     return 1;
  //   }
  //   else if (state == States.Resolved) {
  //     return 2;
  //   }
  //   else {
  //     return 3;
  //   }
  // }
}