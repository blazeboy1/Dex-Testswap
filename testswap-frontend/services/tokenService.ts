import { readContract, writeContract } from "wagmi/actions"
import { erc20ABI } from "@/lib/erc20ABI"
import { config } from "@/lib/web3"

export async function balanceOf({
  token,
  user
}:{
  token:`0x${string}`
  user:`0x${string}`
}){

  return await readContract(config,{
    address:token as `0x${string}`,
    abi:erc20ABI,
    functionName:"balanceOf",
    args:[user]
  }) as bigint

}

export async function approveToken({
  token,
  spender,
  amount
}:{
  token:`0x${string}`
  spender:`0x${string}`
  amount:bigint
}){

  return writeContract(config,{
    address:token,
    abi:erc20ABI,
    functionName:"approve",
    args:[spender,amount]
  })

}

export async function getAllowance({
  token,
  owner,
  spender
}:{
  token:`0x${string}`
  owner:`0x${string}`
  spender:`0x${string}`
}){

  return await readContract(config,{
    address:token,
    abi:erc20ABI,
    functionName:"allowance",
    args:[owner,spender]
  })

}