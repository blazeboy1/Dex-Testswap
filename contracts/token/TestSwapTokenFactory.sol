// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TestSwapToken.sol";

contract TestSwapTokenFactory {

    address[] public allTokens;

    event TokenCreated(
        address indexed creator,
        address token,
        string name,
        string symbol
    );

    function createToken(
        string memory name_,
        string memory symbol_,
        uint initialSupply
    ) external returns (address token) {

        TestSwapToken newToken =
            new TestSwapToken(name_, symbol_, initialSupply);

        token = address(newToken);

        allTokens.push(token);

        emit TokenCreated(
            msg.sender,
            token,
            name_,
            symbol_
        );
    }

    function allTokensLength()
        external
        view
        returns (uint)
    {
        return allTokens.length;
    }

    function getAllTokens() external view returns(address[] memory){
        return allTokens;
    }
}