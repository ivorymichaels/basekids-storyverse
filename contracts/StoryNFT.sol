// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";
import "@thirdweb-dev/contracts/extension/interface/IMintableERC721.sol";

contract StoryNFT is ERC721A, IMintableERC721 {
    // Mapping to store token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721A(_name, _symbol) {}

    function mintTo(address to, string calldata uri) external override returns (uint256) {
        require(to != address(0), "Cannot mint to zero address");
        uint256 tokenId = _currentIndex;
        _mint(to, 1); // Mint one NFT
        _tokenURIs[tokenId] = uri; // Store the token URI
        emit Transfer(address(0), to, tokenId); // Explicitly emit Transfer event
        return tokenId;
    }

    // Override tokenURI to return the stored URI
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721A: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    // Override _startTokenId to start at 1
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }
}