import { writeContract } from "wagmi/actions"
import { tokenFactoryABI } from "@/lib/tokenFactoryABI"
import { contracts } from "@/lib/contracts"
import { config } from "@/lib/web3"

export async function createToken({
  name,
  symbol,
  supply
}:{
  name:string
  symbol:string
  supply:bigint
}){

  return writeContract(config,{
    address:contracts.tokenfactory,
    abi:tokenFactoryABI,
    functionName:"createToken",
    args:[name,symbol,supply]
  })

}