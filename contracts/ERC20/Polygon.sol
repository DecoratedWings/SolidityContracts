//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FireToken is ERC20 {

    constructor() ERC20("FireToken", "LIT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    //NOTE:
    //All operations in the smart contract use the token base units, 
    //so to transfer 100 tokens you transfer 100 * 10 ** 18 token base units

    //decimals() --> returns uint8 18 as value
}