// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestSwapToken is ERC20 {

    address public owner;

    constructor(
        string memory name_,
        string memory symbol_,
        uint initialSupply
    ) ERC20(name_, symbol_) {

        owner = msg.sender;

        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
        }
    }

    function mint(uint amount) external {
        _mint(msg.sender, amount);
    }
}