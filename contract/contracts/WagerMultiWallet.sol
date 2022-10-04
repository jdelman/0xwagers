// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./IWagerTicketRenderer.sol";

/** 
 * @title WagerMultiWallet
 * @dev First attempt to build a wager
 */
contract WagerMultiWallet is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
  using SafeERC20 for IERC20;

  struct Wager {
    uint256 owner;
    uint256 endsAt;

    uint32 vigBasisPoints;
    uint8 winningOutcome;
    // mapping(uint256 => mapping(uint8 => uint256)) betAmounts;
    // splitting betAmounts into outcomeByTokenId and amountByTokenId so that
    // we can get the outcome that the token is wagered for
    mapping(uint256 => uint8) outcomeByTokenId;
    mapping(uint256 => uint256) amountByTokenId;
    mapping(uint8 => uint256) amountPerOutcome;
    uint256[] playerTokens;

    uint256 total;
    States state;

    string proposition;
    bytes32[] outcomes;

    bool isERC20;
    IERC20 erc20Token;
  }

  uint256 private _nextWagerId = 1;
  uint256 private _nextTokenId = 1;

  mapping(uint256 => Wager) private _wagers;
  IWagerTicketRenderer private _renderer; //bad?IWagerTicketRenderer(to);

  event MintedWager(uint256 indexed index, address owner); // TODO: remove owner, the 721 mint event will have this info
  event PlacedBet(uint256 indexed index, uint256 amount, uint8 outcome);
  event ClosedWager(uint256 indexed index);
  event ResolvedWager(uint256 indexed index, uint8 outcome);
  event CanceledWager(uint256 indexed index);

  constructor() ERC721("WagerTicket", "WGRTKT") {
    // GENESIS
  }

  function mintWager(
    uint256 _endsAt,
    uint32 _vigBasisPoints,
    string memory _proposition,
    bytes32[] memory _outcomes,
    address _erc20Address
  ) public returns (uint256 wagerId) {
    uint256 wId = _nextWagerId++;
    Wager storage wager = _wagers[wId];

    // owner of the next minted token becomes the owner of the wager
    uint256 tId = _mintNextToken(msg.sender);
    wager.owner = tId;

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

    emit MintedWager(wId, msg.sender);

    return wId;
  }

  function _bet(uint256 index, uint8 outcome, uint256 amount, bool isERC20) internal {
    Wager storage wager = _wagers[index];

    if (isERC20) {
      require(wager.isERC20 == true, "MBERC20");
    }

    require(wager.state == States.Open, "WO1");
    require(amount > 0, "BGT0");
    require(outcome >= 0 && outcome < wager.outcomes.length, "IO");

    uint256 tokenId = _mintNextToken(msg.sender);

    wager.total += amount;
    wager.amountByTokenId[tokenId] = amount;
    wager.amountPerOutcome[outcome] += amount;

    emit PlacedBet(index, amount, outcome);
  }

  function bet(uint256 index, uint8 outcome) public payable {
    _bet(index, outcome, msg.value, false);
  }

  function betERC20(uint256 index, uint8 outcome, uint256 amount) public {
    _bet(index, outcome, amount, true);
  }

  function close(uint256 index) public {
    Wager storage wager = _wagers[index];
    address ownerAddress = ERC721.ownerOf(wager.owner);

    require(wager.state == States.Open, "SOC");
    require(msg.sender == ownerAddress, "OOC");

    wager.state = States.Closed;

    emit ClosedWager(index);
  }

  // TODO: figure out how to guarantee that calling this won"t
  // cost them more than the owner"s cut
  function resolve(uint256 index, uint8 _winningOutcome) public {
    Wager storage wager = _wagers[index];
    address ownerAddress = ERC721.ownerOf(wager.owner);

    require(wager.state == States.Closed, "WCR");
    require(msg.sender == ownerAddress, "OOR");
    require(_winningOutcome < wager.outcomes.length, "IO");

    wager.winningOutcome = _winningOutcome;

    // remove owner"s cut from the total
    uint256 ownerCut = getOwnerCut(index);
    wager.total -= ownerCut;
    
    if (wager.isERC20) {
      _sendERC20(index, ownerCut, ownerAddress);
    }
    else {
      payable(ownerAddress).transfer(ownerCut);
    }

    wager.state = States.Resolved;

    emit ResolvedWager(index, _winningOutcome);
  }

  function claim(uint256 index, uint256 tokenId) public {
    Wager storage wager = _wagers[index];
    require(wager.state == States.Resolved, "WMBR");
    
    // verify the claimer owns the token and they chose the correct outcome
    address tokenOwner = ERC721.ownerOf(tokenId);
    require(tokenOwner == msg.sender, "MOT");

    uint8 tokenOutcome = wager.outcomeByTokenId[tokenId];
    require(tokenOutcome == wager.winningOutcome, "DW");

    uint256 amount = wager.amountByTokenId[tokenId] * wager.total
      / wager.amountPerOutcome[wager.winningOutcome];
    wager.amountByTokenId[tokenId] = 0;
    wager.total -= amount;

    if (wager.isERC20) {
      _sendERC20(index, amount, msg.sender);
    }
    else {
      payable(msg.sender).transfer(amount);
    }
  }

  function cancel(uint256 index) public {
    Wager storage wager = _wagers[index];

    address tokenOwner = ERC721.ownerOf(wager.owner);
    require(tokenOwner == msg.sender, "MOT");

    require(wager.state != States.Resolved, "CCR");
    require(msg.sender == tokenOwner || block.timestamp > wager.endsAt, "CCO");

    wager.state = States.Canceled;

    emit CanceledWager(index);
  }

  function refund(uint256 index, uint256 tokenId) public {
    Wager storage wager = _wagers[index];
    require(wager.state == States.Canceled, "MCR");

    address tokenOwner = ERC721.ownerOf(tokenId);
    require(tokenOwner == msg.sender, "MOT");

    uint8 outcome = wager.outcomeByTokenId[tokenId];
    uint256 amount = wager.amountByTokenId[tokenId];

    wager.amountByTokenId[tokenId] = 0;
    wager.amountPerOutcome[outcome] -= amount;

    if (wager.isERC20) {
      _sendERC20(index, amount, msg.sender);
    }
    else {
      payable(msg.sender).transfer(amount);
    }
  }

  /**

    Internal functions to handle moving ERC20.

   */

  function _getERC20(uint256 index, uint256 amount, address from) private {
    // transfer amount from `from` address to this contract
    Wager storage wager = _wagers[index];
    require(wager.isERC20 == true, "MBERC20");

    wager.erc20Token.transferFrom(from, address(this), amount);
  }

  function _sendERC20(uint256 index, uint256 amount, address to) internal {
    // transfer amount from this contract to `to` address
    Wager storage wager = _wagers[index];
    require(wager.isERC20 == true, "MBERC20");

    wager.erc20Token.transferFrom(address(this), to, amount);
  }

  function getOwnerCut(uint256 index) public view returns (uint256) {
    Wager storage wager = _wagers[index];
    uint256 ownerCut = (wager.total * wager.vigBasisPoints) / 100000;
    return ownerCut;
  }

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
    address _erc20Token
  ) {
    Wager storage wager = _wagers[index];

    // convert enum explicitly
    uint8 state = uint8(wager.state);
    require(state > 0, "Invalid");

    uint256[] memory totalsPerOutcome = new uint256[](wager.outcomes.length);
    uint8 i;
    for (i = 0; i < wager.outcomes.length; i++) {
      totalsPerOutcome[i] = wager.amountPerOutcome[i];
    }

    // get address of ownership token
    uint256 ownerTokenId = wager.owner;
    address owner = ERC721.ownerOf(ownerTokenId);

    return (
      owner,
      wager.endsAt,
      wager.vigBasisPoints,
      wager.winningOutcome,
      wager.total,
      state,
      totalsPerOutcome,
      wager.proposition,
      wager.outcomes,
      address(wager.erc20Token)
    );
  }

  /**

    NFT/ERC721 functions.

   */

  function _mintNextToken(address to) private returns (uint256 tokenId) {
    uint256 tId = _nextTokenId++;
    _safeMint(to, tId);
    return tId;
  }

  function setNFTGeneratorAddress(address to) public onlyOwner {
    _renderer = IWagerTicketRenderer(to);
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    Wager storage wager = _wagers[_tokenId];

    uint8 userPosition = wager.outcomeByTokenId[_tokenId];

    WagerPosition memory position = WagerPosition({
      endsAt: wager.endsAt,
      proposition: wager.proposition,
      winningOutcome: wager.winningOutcome,
      total: wager.total,
      state: wager.state,
      erc20Token: address(wager.erc20Token),
      userPosition: userPosition,
      outcome: wager.outcomes[userPosition]
    });

    return _renderer.buildSVGBase64(position);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
