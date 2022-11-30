//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "./INFTCollection.sol";

contract NFTCollection is INFTCollection, Ownable, ERC721Enumerable, VRFConsumerBaseV2, KeeperCompatibleInterface {
    struct Metadata {
        uint256 startIndex;
        uint256 endIndex;
        uint256 entropy;
    }

    uint256 private immutable MAX_SUPPLY;
    uint256 private immutable MINT_COST;

    uint256 private revealedCount;
    uint256 private revealedBatchSize;
    uint256 private revealInterval;
    uint256 private lastRevealed = block.timestamp;
    bool private revealInProgress;
    Metadata[] private metadatas;

    uint16 private constant VRF_REQUEST_CONFIRMATIONS = 3;
    uint32 private constant VRF_NUM_WORDS = 1;

    VRFCoordinatorV2Interface private immutable VRF_COORDINATOR_V2;
    uint64 private immutable VRF_SUBSCRIPTION_ID;
    bytes32 private immutable VRF_GAS_LANE;
    uint32 private immutable VRF_CALLBACK_GAS_LIMIT;

    event BatchRevealReqested(uint256 requestId);
    event BatchRevealFinished(uint256 startIndex, uint256 endIndex);

    
}