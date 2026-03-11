// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MockStablecoin.sol";

contract TestSwapFaucet {

    MockStablecoin public immutable usdc;
    MockStablecoin public immutable usdt;

    uint public constant FAUCET_AMOUNT = 1_000_000 * 1e6;

    constructor(address _usdc, address _usdt) {
        usdc = MockStablecoin(_usdc);
        usdt = MockStablecoin(_usdt);
    }

    function mintUSDC() external {
        usdc.mint(msg.sender, FAUCET_AMOUNT);
    }

    function mintUSDT() external {
        usdt.mint(msg.sender, FAUCET_AMOUNT);
    }
}