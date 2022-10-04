// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

enum States { Invalid, Open, Closed, Resolved, Canceled }

struct WagerPosition {
  // Wager level fields
  // address owner;
  uint256 endsAt;
  string proposition;
  uint8 winningOutcome;
  uint256 total;
  States state;
  address erc20Token;

  // User level fields
  uint8 userPosition;
  bytes32 outcome;
}

interface IWagerTicketRenderer {
  function buildSVGBase64(WagerPosition memory params) external pure returns (string memory);
}
