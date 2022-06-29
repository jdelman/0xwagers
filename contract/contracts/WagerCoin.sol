// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WagerCoin is ERC20 {
  constructor(uint256 initialSupply) ERC20('WagerCoin', 'WAGER') {
    _mint(msg.sender, initialSupply);
  }
}
