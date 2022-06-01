pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Claim is ERC721 {
  uint256 private _lastTokenId;
  mapping(uint256 => string) private _claims;

  constructor() ERC721("Claim", "CLAIM") public {
    _lastTokenId = 0;
  }

  function awardItem(string memory _claim) public {
    _lastTokenId += 1;
    uint256 newItemId = _lastTokenId;
    _mint(msg.sender, newItemId);
    _claims[newItemId] = _claim;
  }

  function claimForTokenId(uint256 tokenId) public view returns (string memory) {
    return _claims[tokenId];
  }
}