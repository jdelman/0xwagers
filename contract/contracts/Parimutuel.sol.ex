pragma solidity ^0.4.23;

contract ParimutuelContract {
    address public owner;

    string public proposition;
    bytes32[] public outcomes;
    uint256 public timeout;

    constructor(string _proposition, bytes32[] _outcomes, uint256 timeoutDelay)
        public
    {
        owner = msg.sender;
        proposition = _proposition;
        outcomes = _outcomes;
        timeout = now + timeoutDelay;
    }

    enum States { Open, Closed, Resolved, Cancelled }
    States state = States.Open;

    mapping(address => mapping(uint256 => uint256)) public betAmounts;
    mapping(uint256 => uint256) public totalPerOutcome;
    uint256 public total;

    uint256 winningOutcome;

    function bet(uint256 outcome) public payable {
        require(state == States.Open);

        betAmounts[msg.sender][outcome] += msg.value;
        totalPerOutcome[outcome] += msg.value;
        total += msg.value;
        require(total < 2 ** 128);   // avoid overflow possibility
    }

    function close() public {
        require(state == States.Open);
        require(msg.sender == owner);

        state = States.Closed;
    }

    function resolve(uint256 _winningOutcome) public {
        require(state == States.Closed);
        require(msg.sender == owner);

        winningOutcome = _winningOutcome;
        state = States.Resolved;
    }

    function claim() public {
        require(state == States.Resolved);

        uint256 amount = betAmounts[msg.sender][winningOutcome] * total
            / totalPerOutcome[winningOutcome];
        betAmounts[msg.sender][winningOutcome] = 0;
        msg.sender.transfer(amount);
    }

    function cancel() public {
        require(state != States.Resolved);
        require(msg.sender == owner || now > timeout);

        state = States.Cancelled;
    }

    function refund(uint256 outcome) public {
        require(state == States.Cancelled);

        uint256 amount = betAmounts[msg.sender][outcome];
        betAmounts[msg.sender][outcome] = 0;
        msg.sender.transfer(amount);
    }
}