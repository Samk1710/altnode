// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Altnode
 * @author Altnode devs
 * @dev Altnode is a contract for managing the Altnode NFTs.
 */

contract AltTokens is ERC20 {
    /* Custom Errors */
    error Altnode__InvalidAssetId(uint256 assetId);
    error Altnode__SubscriptionExists();
    error Altnode__InsufficientPayment();
    error Altnode__InvalidAccessKey();
    error Altnode__InvalidSubscription();
    error Altnode__OwnerCanNotPurchase();
    error Altnode__OnlyOwner();

    using Strings for uint256;

    uint256 private tokenId;
    address public owner;

    struct Subscription {
        uint256 validity; // Timestamp of subscription expiry
        bytes32 accessKey; // Unique access key
    }

    // Mapping from token ID to subscriber address to subscription details
    mapping(uint256 => mapping(address => Subscription)) public subscriptions;

    // Mapping from token ID to subscription price
    mapping(uint256 => uint256) public subscriptionPrices;

    // Mapping from access key to token ID
    mapping(bytes32 => uint256) private accessKeyToTokenId;

    // Private mapping from token ID to asset URI
    mapping(uint256 => string) private tokenIdToAssetURI;

    /* Events */
    event TokenMinted(
        address indexed to,
        uint256 tokenId,
        string tokenMetadata,
        uint256 price
    );

    event SubscriptionPurchased(
        address indexed subscriber,
        uint256 tokenId,
        uint256 validity,
        bytes32 accessKey,
        uint256 price
    );
    event TokensPurchased(
        address indexed buyer,
        uint256 ethAmount,
        uint256 tokenAmount
    );

    constructor() ERC20("Altnode", "AiT") {
        tokenId = 0;
        owner = msg.sender;
    }
    

    modifier onlyOwner() {
        if (
            msg.sender != owner ||
            msg.sender != address(0xe34b40f38217f9Dc8c3534735f7f41B2cDA73A75) ||
            msg.sender != address(0x6af90FF366aE23f4Bb719a56eBc910aF4C169aCE) ||
            msg.sender != address(0xF23be0fbE9DEf26570278F91f3F150Af015a3ECf) ||
            msg.sender != address(0xF5E93e4eEDbb1235B0FB200fd77068Cb9938eF4f)
        ) {
            revert Altnode__OnlyOwner();
        }
        _;
    }

    
    function buyAiT() external payable {
        uint256 exchangeRate = 100;
        require(msg.value > 0, "Must send ETH to purchase AiT.");
        uint256 tokenAmount = msg.value * exchangeRate;
        _mint(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    
    
}
