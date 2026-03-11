// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TestSwapFactory.sol";
import "./TestSwapPair.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TestSwapRouter {

    using SafeERC20 for IERC20;

    address public immutable factory;

    constructor(address _factory) {
        factory = _factory;
    }

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, "EXPIRED");
        _;
    }

    /* =========================
        ADD LIQUIDITY
    ========================== */

    function addLiquidity(
    address tokenA,
    address tokenB,
    uint amountADesired,
    uint amountBDesired,
    uint amountAMin,
    uint amountBMin,
    uint deadline
)
    external
    ensure(deadline)
    returns (uint amountA, uint amountB, uint liquidity)
{
    (amountA, amountB) = _addLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin
    );

    address pair = TestSwapFactory(factory).getPair(tokenA, tokenB);

    IERC20(tokenA).safeTransferFrom(msg.sender, pair, amountA);
    IERC20(tokenB).safeTransferFrom(msg.sender, pair, amountB);

    liquidity = TestSwapPair(pair).mint(msg.sender);
}

    function _addLiquidity(
    address tokenA,
    address tokenB,
    uint amountADesired,
    uint amountBDesired,
    uint amountAMin,
    uint amountBMin
)
    internal
    returns (uint amountA, uint amountB)
{
    address pair = TestSwapFactory(factory).getPair(tokenA, tokenB);

    if (pair == address(0)) {
        pair = TestSwapFactory(factory).createPair(tokenA, tokenB);
    }

    (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB);

    if (reserveA == 0 && reserveB == 0) {
        amountA = amountADesired;
        amountB = amountBDesired;
    } else {

        uint amountBOptimal = quote(amountADesired, reserveA, reserveB);

        if (amountBOptimal <= amountBDesired) {

            require(amountBOptimal >= amountBMin, "INSUFFICIENT_B");

            amountA = amountADesired;
            amountB = amountBOptimal;

        } else {

            uint amountAOptimal = quote(amountBDesired, reserveB, reserveA);

            require(amountAOptimal >= amountAMin, "INSUFFICIENT_A");

            amountA = amountAOptimal;
            amountB = amountBDesired;
        }
    }
}

    /* =========================
        REMOVE LIQUIDITY
    ========================== */

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        uint deadline
    )
        external
        ensure(deadline)
        returns (uint amountA, uint amountB)
    {
        address pair = TestSwapFactory(factory).getPair(tokenA, tokenB);

        require(pair != address(0), "PAIR_NOT_EXIST");

        IERC20(pair).safeTransferFrom(msg.sender, pair, liquidity);

        (amountA, amountB) = TestSwapPair(pair).burn(msg.sender);

        require(amountA >= amountAMin, "INSUFFICIENT_A");
        require(amountB >= amountBMin, "INSUFFICIENT_B");
    }

    /* =========================
        SWAP
    ========================== */

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path.length == 2, "ONLY_SIMPLE_SWAP");

        amounts = new uint[](2);

        amounts[0] = amountIn;
        
        (uint reserveIn, uint reserveOut) =
            getReserves(path[0], path[1]);

        amounts[1] = getAmountOut(
            amountIn,
            reserveIn,
            reserveOut
        );

        require(amounts[1] >= amountOutMin, "SLIPPAGE");

        address pair =
            TestSwapFactory(factory).getPair(path[0], path[1]);

        require(pair != address(0), "PAIR_NOT_EXIST");

        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            pair,
            amounts[0]
        );

        (uint amount0Out, uint amount1Out) =
            path[0] < path[1]
            ? (uint(0), amounts[1])
            : (amounts[1], uint(0));

        TestSwapPair(pair).swap(
            amount0Out,
            amount1Out,
            to
        );
    }

    /* =========================
        LIBRARY FUNCTIONS
    ========================== */

    function quote(
        uint amountA,
        uint reserveA,
        uint reserveB
    )
        public
        pure
        returns (uint amountB)
    {
        require(amountA > 0, "INSUFFICIENT_AMOUNT");
        require(
            reserveA > 0 && reserveB > 0,
            "INSUFFICIENT_LIQUIDITY"
        );

        amountB = (amountA * reserveB) / reserveA;
    }

    function getReserves(
        address tokenA,
        address tokenB
    )
        public
        view
        returns (uint reserveA, uint reserveB)
    {
        address pair =
            TestSwapFactory(factory).getPair(tokenA, tokenB);

        require(pair != address(0), "PAIR_NOT_EXIST");

        (uint reserve0, uint reserve1) =
            TestSwapPair(pair).getReserves();

        (reserveA, reserveB) =
            tokenA < tokenB
            ? (reserve0, reserve1)
            : (reserve1, reserve0);
    }

    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    )
        public
        pure
        returns (uint amountOut)
    {
        require(amountIn > 0, "INSUFFICIENT_INPUT");
        require(
            reserveIn > 0 && reserveOut > 0,
            "INSUFFICIENT_LIQUIDITY"
        );

        uint amountInWithFee = amountIn * 999;

        uint numerator = amountInWithFee * reserveOut;

        uint denominator =
            reserveIn * 1000 + amountInWithFee;

        amountOut = numerator / denominator;
    }
}