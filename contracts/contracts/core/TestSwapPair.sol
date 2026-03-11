// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TestSwapPair is ERC20, ReentrancyGuard {

    using SafeERC20 for IERC20;

    address public immutable factory;
    address public token0;
    address public token1;

    uint112 private reserve0;
    uint112 private reserve1;

    uint256 private constant MINIMUM_LIQUIDITY = 1000;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    constructor() ERC20("TestSwap LP", "TSLP") {
        factory = msg.sender;
    }

    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, "FORBIDDEN");
        require(token0 == address(0) && token1 == address(0), "ALREADY_INIT");

        token0 = _token0;
        token1 = _token1;
    }

    function getReserves() public view returns (uint112, uint112) {
        return (reserve0, reserve1);
    }

    /* =========================
        MINT LIQUIDITY
    ========================== */

    function mint(address to) external nonReentrant returns (uint liquidity) {

        (uint112 _reserve0, uint112 _reserve1) = getReserves();

        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));

        uint amount0 = balance0 - _reserve0;
        uint amount1 = balance1 - _reserve1;

        if (totalSupply() == 0) {

            liquidity = sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;

            _mint(address(0), MINIMUM_LIQUIDITY);

        } else {

            liquidity = min(
                (amount0 * totalSupply()) / _reserve0,
                (amount1 * totalSupply()) / _reserve1
            );
        }

        require(liquidity > 0, "INSUFFICIENT_LIQUIDITY_MINTED");

        _mint(to, liquidity);

        _update(balance0, balance1);

        emit Mint(msg.sender, amount0, amount1);
    }

    /* =========================
        BURN LIQUIDITY
    ========================== */

    function burn(address to) external nonReentrant returns (uint amount0, uint amount1) {

        uint liquidity = balanceOf(address(this));
        uint _totalSupply = totalSupply();

        amount0 = (liquidity * reserve0) / _totalSupply;
        amount1 = (liquidity * reserve1) / _totalSupply;

        require(amount0 > 0 && amount1 > 0, "INSUFFICIENT_BURN");

        _burn(address(this), liquidity);

        IERC20(token0).safeTransfer(to, amount0);
        IERC20(token1).safeTransfer(to, amount1);

        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));

        _update(balance0, balance1);

        emit Burn(msg.sender, amount0, amount1, to);
    }

    /* =========================
        SWAP
    ========================== */

    function swap(uint amount0Out, uint amount1Out, address to) external nonReentrant {

        require(amount0Out > 0 || amount1Out > 0, "INSUFFICIENT_OUTPUT");

        require(to != token0 && to != token1, "INVALID_TO");

        (uint112 _reserve0, uint112 _reserve1) = getReserves();

        require(amount0Out < _reserve0 && amount1Out < _reserve1, "INSUFFICIENT_LIQUIDITY");

        if (amount0Out > 0) IERC20(token0).safeTransfer(to, amount0Out);
        if (amount1Out > 0) IERC20(token1).safeTransfer(to, amount1Out);

        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));

        uint amount0In = balance0 > (_reserve0 - amount0Out)
            ? balance0 - (_reserve0 - amount0Out)
            : 0;

        uint amount1In = balance1 > (_reserve1 - amount1Out)
            ? balance1 - (_reserve1 - amount1Out)
            : 0;

        require(amount0In > 0 || amount1In > 0, "INSUFFICIENT_INPUT");

        /*
            0.1% fee invariant
            router uses 999 / 1000
        */

        uint balance0Adjusted = (balance0 * 1000) - (amount0In * 1);
        uint balance1Adjusted = (balance1 * 1000) - (amount1In * 1);

        require(
            balance0Adjusted * balance1Adjusted >=
            uint(_reserve0) * uint(_reserve1) * (1000**2),
            "K"
        );

        _update(balance0, balance1);

        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    /* =========================
        UPDATE RESERVES
    ========================== */

    function _update(uint balance0, uint balance1) private {

        require(balance0 <= type(uint112).max, "OVERFLOW");
        require(balance1 <= type(uint112).max, "OVERFLOW");

        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);

        emit Sync(reserve0, reserve1);
    }

    /* =========================
        UTILS
    ========================== */

    function min(uint x, uint y) private pure returns (uint) {
        return x < y ? x : y;
    }

    function sqrt(uint y) private pure returns (uint z) {

        if (y > 3) {

            z = y;

            uint x = y / 2 + 1;

            while (x < z) {

                z = x;

                x = (y / x + x) / 2;
            }

        } else if (y != 0) {

            z = 1;
        }
    }
}