// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./TestSwapFactory.sol";
import "./TestSwapPair.sol";

contract TestSwapRouter is Pausable {

    using SafeERC20 for IERC20;

    address public factory;

    constructor(address _factory){
        factory = _factory;
    }

    modifier ensure(uint deadline){
        require(deadline >= block.timestamp,"EXPIRED");
        _;
    }

    // ===============================
    // STRUCT (SOLUSI STACK TOO DEEP)
    // ===============================

    struct AddLiquidityParams {
        address tokenA;
        address tokenB;
        uint amountADesired;
        uint amountBDesired;
        uint amountAMin;
        uint amountBMin;
        address to;
        uint deadline;
    }

    // ===============================
    // HELPER FUNCTIONS
    // ===============================

    function sortTokens(address tokenA,address tokenB)
        internal
        pure
        returns(address token0,address token1)
    {
        require(tokenA != tokenB,"IDENTICAL");

        (token0,token1) =
            tokenA < tokenB
            ? (tokenA,tokenB)
            : (tokenB,tokenA);
    }

    function getReserves(address tokenA,address tokenB)
        internal
        view
        returns(uint reserveA,uint reserveB)
    {
        address pair = TestSwapFactory(factory).getPair(tokenA,tokenB);

        (uint reserve0,uint reserve1) =
            TestSwapPair(pair).getReserves();

        (address token0,) = sortTokens(tokenA,tokenB);

        (reserveA,reserveB) =
            tokenA == token0
            ? (reserve0,reserve1)
            : (reserve1,reserve0);
    }

    function pairFor(address tokenA,address tokenB)
        internal
        view
        returns(address pair)
    {
        pair = TestSwapFactory(factory).getPair(tokenA,tokenB);
    }

    // ===============================
    // INTERNAL LIQUIDITY CALC
    // ===============================

    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    )
        internal
        returns(uint amountA,uint amountB)
    {

        address pair = pairFor(tokenA,tokenB);

        if(pair == address(0)){
            pair = TestSwapFactory(factory)
                .createPair(tokenA,tokenB);
        }

        (uint reserveA,uint reserveB) =
            getReserves(tokenA,tokenB);

        if(reserveA == 0 && reserveB == 0){

            amountA = amountADesired;
            amountB = amountBDesired;

        } else {

            uint amountBOptimal =
                quote(amountADesired,reserveA,reserveB);

            if(amountBOptimal <= amountBDesired){

                require(
                    amountBOptimal >= amountBMin,
                    "INSUFFICIENT_B"
                );

                amountA = amountADesired;
                amountB = amountBOptimal;

            } else {

                uint amountAOptimal =
                    quote(amountBDesired,reserveB,reserveA);

                require(
                    amountAOptimal >= amountAMin,
                    "INSUFFICIENT_A"
                );

                amountA = amountAOptimal;
                amountB = amountBDesired;
            }
        }
    }

    // ===============================
    // ADD LIQUIDITY
    // ===============================

    function addLiquidity(AddLiquidityParams calldata params)
        external
        whenNotPaused
        ensure(params.deadline)
        returns(uint amountA,uint amountB,uint liquidity)
    {

        (amountA,amountB) = _addLiquidity(
            params.tokenA,
            params.tokenB,
            params.amountADesired,
            params.amountBDesired,
            params.amountAMin,
            params.amountBMin
        );

        address pair =
            pairFor(params.tokenA,params.tokenB);

        IERC20(params.tokenA)
            .safeTransferFrom(msg.sender,pair,amountA);

        IERC20(params.tokenB)
            .safeTransferFrom(msg.sender,pair,amountB);

        liquidity =
            TestSwapPair(pair).mint(params.to);
    }

    // ===============================
    // REMOVE LIQUIDITY
    // ===============================

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        address to,
        uint deadline
    )
        external
        ensure(deadline)
        returns(uint amountA,uint amountB)
    {

        address pair = pairFor(tokenA,tokenB);

        IERC20(pair)
            .safeTransferFrom(msg.sender,pair,liquidity);

        (amountA,amountB) =
            TestSwapPair(pair).burn(to);
    }

    // ===============================
    // MULTI-HOP SWAP
    // ===============================

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        ensure(deadline)
    {

        require(path.length >= 2,"INVALID_PATH");

        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            pairFor(path[0],path[1]),
            amountIn
        );

        uint amountOut =
            _swap(path,to);

        require(amountOut >= amountOutMin,
            "SLIPPAGE_EXCEEDED");
    }

    function _swap(address[] memory path,address _to)
        internal
        returns(uint finalAmount)
    {

        for(uint i; i < path.length - 1; i++){

            address input = path[i];
            address output = path[i+1];

            address pair =
                pairFor(input,output);

            (uint reserveIn,uint reserveOut) =
                getReserves(input,output);

            uint amountOut =
                getAmountOut(100,reserveIn,reserveOut);

            (address token0,) =
                sortTokens(input,output);

            uint amount0Out =
                input == token0 ? 0 : amountOut;

            uint amount1Out =
                input == token0 ? amountOut : 0;

            address nextTo =
                i < path.length - 2
                ? pairFor(output,path[i+2])
                : _to;

            TestSwapPair(pair).swap(
                amount0Out,
                amount1Out,
                nextTo
            );

            finalAmount = amountOut;
        }
    }

    // ===============================
    // MATH
    // ===============================

    function quote(
        uint amountA,
        uint reserveA,
        uint reserveB
    )
        public
        pure
        returns(uint amountB)
    {

        require(amountA>0,"INSUFFICIENT_AMOUNT");

        require(
            reserveA>0 && reserveB>0,
            "INSUFFICIENT_LIQ"
        );

        amountB = amountA * reserveB / reserveA;
    }

    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    )
        public
        pure
        returns(uint amountOut)
    {

        require(amountIn>0,"INSUFFICIENT_INPUT");

        require(
            reserveIn>0 && reserveOut>0,
            "INSUFFICIENT_LIQ"
        );

        uint amountInWithFee = amountIn * 997;

        uint numerator =
            amountInWithFee * reserveOut;

        uint denominator =
            reserveIn * 1000 + amountInWithFee;

        amountOut = numerator / denominator;
    }
}