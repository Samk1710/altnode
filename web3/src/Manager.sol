// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Altnode.sol";
import "./AltTokens.sol";

contract AltnodeManager {
    Altnode public nftContract;
    AltTokens public tokenContract;

    constructor(address _nftAddress, address _tokenAddress) {
        nftContract = Altnode(_nftAddress);
        tokenContract = AltTokens(_tokenAddress);
    }

    function buySubscriptionWithAiT(uint256 assetId, uint256 duration) external {
        uint256 price = nftContract.subscriptionPrices(assetId);
        require(tokenContract.balanceOf(msg.sender) >= price, "Not enough AiT tokens");
        
        tokenContract.transferFrom(msg.sender, nftContract.ownerOf(assetId), price);
        nftContract.purchaseSubscription(assetId, duration);
    }
}