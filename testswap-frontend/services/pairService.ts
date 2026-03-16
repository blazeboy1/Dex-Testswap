import { readContract } from "wagmi/actions"
import { pairABI } from "@/lib/pairABI"
import { config } from "@/lib/web3"

export async function getReserves(pair:`0x${string}`){

  return readContract(config,{
    address:pair,
    abi:pairABI,
    functionName:"getReserves"
  })

}

export async function getPairTokens(pair:`0x${string}`){

  const token0 = await readContract(config,{
    address:pair,
    abi:pairABI,
    functionName:"token0"
  })

  const token1 = await readContract(config,{
    address:pair,
    abi:pairABI,
    functionName:"token1"
  })

  return { token0, token1 }

}

export async function getLPBalance({
  pair,
  user
}:{
  pair:`0x${string}`
  user:`0x${string}`
}){

  return await readContract(config,{
    address:pair,
    abi:pairABI,
    functionName:"balanceOf",
    args:[user]
  })

}

export async function getTotalSupply(pair:`0x${string}`){

  return await readContract(config,{
    address:pair,
    abi:pairABI,
    functionName:"totalSupply"
  })

}