// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IWagerTicketRenderer.sol";

// TODO: we only need encode from this contract, not decode - should remove
import "base64-sol/base64.sol";

contract WagerTicket {
  string constant color_winner = '74d26f';
  string constant color_loser = 'ea3750';
  string constant color_canceled = 'eaa04e';
  string constant color_open = '60b1c4';
  string constant color_closed = '595d9d';

  function colorForState(States state, uint8 winningOutcome, uint8 userPosition) internal pure returns (string memory) {
    if (state == States.Resolved && userPosition == winningOutcome) {
      return color_winner;
    }
    else if (state == States.Resolved && userPosition != winningOutcome) {
      return color_loser;
    }
    else if (state == States.Open) {
      return color_open;
    }
    else if (state == States.Closed) {
      return color_closed;
    }
    else {
      return color_canceled;
    }
  }

  function buildSVGBase64(WagerPosition memory params) external pure returns (string memory) {
    string memory color = colorForState(params.state, params.winningOutcome, params.userPosition);

    string memory tmp = Base64.encode(
      abi.encodePacked(
        '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="300" fill="#',
        color,
        '"/></svg>'
      )
    );

    return tmp;
  }
}