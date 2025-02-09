// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AltTokens} from "../src/AltTokens.sol";

contract AltnodeTokenScript is Script {
    AltTokens public altTokens;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        altTokens = new AltTokens();

        vm.stopBroadcast();
    }
}
