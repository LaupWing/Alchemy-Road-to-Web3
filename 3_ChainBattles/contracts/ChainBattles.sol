// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage {
   using Strings for uint256;
   using Counters for Counters.Counter;

   Counters.Counter private _tokenIds;

   mapping(uint256 => uint256) public tokenIdToLevels;

   constructor() ERC721("Chain Battles", "CBTLS"){

   }

   function generateCharater(uint256 tokenId) public view returns (string memory){
      string memory svg = string.concat(
         '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
         '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
         '<rect width="100%" height="100%" fill="black" /',
         '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Warrior",'</text>',
         '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
         'Levels: ',
         getLevels(tokenId),
         '</text>',
         '</svg>'
      );

      return string.concat(
         "data:image/svg+xml;base64,",
         Base64.encode(bytes(svg))
      );
   }

   function getLevels(uint256 tokenId) public view returns(string memory){
      uint256 levels = tokenIdToLevels[tokenId];
      return levels.toString();
   }

   function getTokenURI(uint256 tokenId) public view returns (string memory){
      string memory dataURI = string.concat(
         '{',
            '"name": "Chain Wars #', tokenId.toString(), '",',
            '"description": "Battles on chain",',
            '"image": "', generateCharater(tokenId), '"',
         '}' 
      );

      return string.concat(
         "data:application/json;base64,",
         Base64.encode(bytes(dataURI))
      );
   }
}