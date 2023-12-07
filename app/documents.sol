// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DocumentSBT is ERC721, ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DocumentSBT", "DocumentSBT") {}

    struct Document {
        uint256 tokenId;
        string url;
        string kind;
        uint256 price;
        uint256 timestamp;
    }

    mapping (uint256 => Document) private documents;
    mapping (uint256 => address[]) private access;

    function issueDocument(string memory documentURI, uint256 price, string memory kind) public returns (uint256) {

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, documentURI);

        Document memory newDocument = Document({
            tokenId: newItemId,
            url: documentURI,
            kind: kind,
            price: price,
            timestamp: block.timestamp
        });

        documents[newItemId] = newDocument;

        return newItemId;
    }

    function getOwnedDocuments() public view returns (Document[] memory) {
        uint256 tokenCount = balanceOf(msg.sender);

        Document[] memory myDocuments = new Document[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
            myDocuments[i] = documents[tokenId];
        }

        return myDocuments;
    }

    function getDocumentsFromWallet(address owner) public view returns (Document[] memory) {
        uint256 tokenCount = balanceOf(owner);

        Document[] memory myDocuments = new Document[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            Document memory document = documents[tokenId];
            
            if (!_isAccessGranted(tokenId, msg.sender)) {
                document.url = "";
            }
            
            myDocuments[i] = document;
        }

        return myDocuments;
    }

    function payAccess(uint256 tokenId) public payable {
        Document memory document = documents[tokenId];
        require(msg.sender.balance >= document.price, "Insufficient balance");
        require(msg.value == document.price, "Invalid document value");

        address owner = ownerOf(tokenId);

        bool success = payable(owner).send(document.price);
        require(success, "Transfer failed");

        access[tokenId].push(msg.sender);
    }

    function _isAccessGranted(uint256 tokenId, address user) public view returns (bool) {
        address[] storage accessList = access[tokenId];

        for (uint256 i = 0; i < accessList.length; i++) {
            if (accessList[i] == user) {
                return true;
            }
        }

        return false;
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _increaseBalance(address account, uint128 amount) internal virtual override(ERC721, ERC721Enumerable) {
        return super._increaseBalance(account, amount);
    }

    function _update(address to, uint256 tokenId, address auth) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
}