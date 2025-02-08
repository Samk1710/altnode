// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Altnode} from "../src/Altnode.sol";

contract AltnodeScript is Script {
    Altnode public altnode;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        altnode = new Altnode();

        vm.stopBroadcast();
    }
}
