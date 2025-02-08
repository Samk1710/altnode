// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AltnodeManager} from "../src/Manager.sol";


contract AltnodeScript is Script {
    AltnodeManager public altnodeman;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        altnodeman = new AltnodeManager();

        vm.stopBroadcast();
    }
}
