import { readContract } from "wagmi/actions"
import { factoryABI } from "@/lib/factoryABI"
import { contracts } from "@/lib/contracts"
import { config } from "@/lib/web3"

export async function getPair(tokenA:string,tokenB:string){

  return readContract(config,{
    address:contracts.factory,
    abi:factoryABI,
    functionName:"getPair",
    args:[tokenA,tokenB]
  })

}

export async function getAllPairsLength(){

  return readContract(config,{
    address:contracts.factory,
    abi:factoryABI,
    functionName:"allPairsLength"
  })

}

export async function getPairByIndex(index:number){

  return readContract(config,{
    address:contracts.factory,
    abi:factoryABI,
    functionName:"allPairs",
    args:[BigInt(index)]
  })

}