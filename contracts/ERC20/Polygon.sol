//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FireToken is ERC20 {

    constructor() ERC20("FireToken", "LIT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}