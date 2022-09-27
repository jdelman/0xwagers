// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

enum States { Invalid, Open, Closed, Resolved, Canceled }

struct WagerPosition {
  // Wager level fields
  // address owner;
  uint256 endsAt;
  string proposition;
  uint8 winningOutcome;
  uint256 total;
  States state;
  bool isERC20;
  string symbol;

  // User level fields
  uint8 userPosition;
  string outcome;
}

interface IWagerTicketRenderer {
  function buildSVGBase64(WagerPosition memory params) external pure returns (string memory);
}
