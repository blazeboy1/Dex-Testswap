// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC20Minimal {
    function transfer(address to,uint value) external returns(bool);
    function transferFrom(address from,address to,uint value) external returns(bool);
    function balanceOf(address owner) external view returns(uint);
}

contract TestSwapPair is ERC20, ReentrancyGuard {

    address public token0;
    address public token1;

    uint112 private reserve0;
    uint112 private reserve1;

    uint public constant MINIMUM_LIQUIDITY = 1000;

    bool private initialized;

    event Mint(address indexed sender,uint amount0,uint amount1);
    event Burn(address indexed sender,uint amount0,uint amount1,address to);
    event Swap(address indexed sender,uint amount0In,uint amount1In,uint amount0Out,uint amount1Out,address to);
    event Sync(uint112 reserve0,uint112 reserve1);

    constructor() ERC20("TestSwap LP","TSLP") {}

    function initialize(address _token0,address _token1) external {

        require(!initialized,"ALREADY_INIT");

        token0 = _token0;
        token1 = _token1;

        initialized = true;
    }

    function getReserves() public view returns(uint112,uint112) {
        return (reserve0,reserve1);
    }

    function _safeTransfer(address token,address to,uint value) internal {
        require(IERC20Minimal(token).transfer(to,value),"TRANSFER_FAIL");
    }

    function _update(uint balance0,uint balance1) private {

        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);

        emit Sync(reserve0,reserve1);
    }

    function mint(address to) external nonReentrant returns(uint liquidity) {

        (uint112 _reserve0,uint112 _reserve1) = getReserves();

        uint balance0 = IERC20Minimal(token0).balanceOf(address(this));
        uint balance1 = IERC20Minimal(token1).balanceOf(address(this));

        uint amount0 = balance0 - _reserve0;
        uint amount1 = balance1 - _reserve1;

        if(totalSupply()==0){

            liquidity = sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;

            _mint(address(0),MINIMUM_LIQUIDITY);

        } else {

            liquidity = min(
                amount0 * totalSupply() / _reserve0,
                amount1 * totalSupply() / _reserve1
            );
        }

        require(liquidity > 0,"INSUFFICIENT_LIQ");

        _mint(to,liquidity);

        _update(balance0,balance1);

        emit Mint(msg.sender,amount0,amount1);
    }

    function burn(address to) external nonReentrant returns(uint amount0,uint amount1){

        uint balance0 = IERC20Minimal(token0).balanceOf(address(this));
        uint balance1 = IERC20Minimal(token1).balanceOf(address(this));

        uint liquidity = balanceOf(address(this));

        amount0 = liquidity * balance0 / totalSupply();
        amount1 = liquidity * balance1 / totalSupply();

        require(amount0 > 0 && amount1 > 0,"INSUFFICIENT_BURN");

        _burn(address(this),liquidity);

        _safeTransfer(token0,to,amount0);
        _safeTransfer(token1,to,amount1);

        balance0 = IERC20Minimal(token0).balanceOf(address(this));
        balance1 = IERC20Minimal(token1).balanceOf(address(this));

        _update(balance0,balance1);

        emit Burn(msg.sender,amount0,amount1,to);
    }

    function swap(uint amount0Out,uint amount1Out,address to) external nonReentrant {

        require(amount0Out>0 || amount1Out>0,"INSUFFICIENT_OUTPUT");

        (uint112 _reserve0,uint112 _reserve1)=getReserves();

        require(amount0Out < _reserve0 && amount1Out < _reserve1,"INSUFFICIENT_LIQ");

        if(amount0Out>0) _safeTransfer(token0,to,amount0Out);
        if(amount1Out>0) _safeTransfer(token1,to,amount1Out);

        uint balance0 = IERC20Minimal(token0).balanceOf(address(this));
        uint balance1 = IERC20Minimal(token1).balanceOf(address(this));

        uint amount0In = balance0 > (_reserve0-amount0Out)
            ? balance0 - (_reserve0-amount0Out) : 0;

        uint amount1In = balance1 > (_reserve1-amount1Out)
            ? balance1 - (_reserve1-amount1Out) : 0;

        require(amount0In>0 || amount1In>0,"INSUFFICIENT_INPUT");

        uint balance0Adjusted = balance0*1000 - amount0In*3;
        uint balance1Adjusted = balance1*1000 - amount1In*3;

        require(
            balance0Adjusted * balance1Adjusted >=
            uint(_reserve0)*uint(_reserve1)*1000**2,
            "K"
        );

        _update(balance0,balance1);

        emit Swap(msg.sender,amount0In,amount1In,amount0Out,amount1Out,to);
    }

    function sqrt(uint y) internal pure returns(uint z){
        if(y>3){
            z=y;
            uint x=y/2+1;
            while(x<z){
                z=x;
                x=(y/x+x)/2;
            }
        }else if(y!=0){
            z=1;
        }
    }

    function min(uint x,uint y) internal pure returns(uint){
        return x<y ? x : y;
    }
}