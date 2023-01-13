// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    string hello;
    constructor() public {
        hello = "poor man!";
    }
    function gethello() public view returns (string memory) {
        return hello;
    }
}
