import { readContract, writeContract } from "wagmi/actions"
import { routerABI } from "@/lib/routerABI"
import { contracts } from "@/lib/contracts"
import { config } from "@/lib/web3"

export async function swapExactTokensForTokens({
  amountIn,
  amountOutMin,
  path,
  user
}:{
  amountIn: bigint
  amountOutMin: bigint
  path: `0x${string}`[]
  user: `0x${string}`
}){

  const deadline = BigInt(Math.floor(Date.now()/1000)+600)

  return writeContract(config,{
    address: contracts.router,
    abi: routerABI,
    functionName: "swapExactTokensForTokens",
    args:[
      amountIn,
      amountOutMin,
      path,
      user,
      deadline
    ]
  })

}

export async function addLiquidity({
  tokenA,
  tokenB,
  amountADesired,
  amountBDesired,
  user
}:{
  tokenA:`0x${string}`
  tokenB:`0x${string}`
  amountADesired:bigint
  amountBDesired:bigint
  user:`0x${string}`
}){

  const deadline = BigInt(Math.floor(Date.now()/1000)+600)

  return writeContract(config,{
    address:contracts.router,
    abi:routerABI,
    functionName:"addLiquidity",
    args:[
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      0n,
      0n,
      user,
      deadline
    ]
  })

}

export async function removeLiquidity({
  tokenA,
  tokenB,
  liquidity,
  user
}:{
  tokenA:`0x${string}`
  tokenB:`0x${string}`
  liquidity:bigint
  user:`0x${string}`
}){

  const deadline = BigInt(Math.floor(Date.now()/1000)+600)

  return writeContract(config,{
    address:contracts.router,
    abi:routerABI,
    functionName:"removeLiquidity",
    args:[
      tokenA,
      tokenB,
      liquidity,
      user,
      deadline
    ]
  })

}