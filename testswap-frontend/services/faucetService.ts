import { writeContract } from "wagmi/actions"
import { faucetABI } from "@/lib/faucetABI"
import { contracts } from "@/lib/contracts"
import { config } from "@/lib/web3"

export async function claimUSDC(){

  return writeContract(config,{
    address:contracts.faucet,
    abi:faucetABI,
    functionName:"mintUSDC"
  })

}

export async function claimUSDT(){

  return writeContract(config,{
    address:contracts.faucet,
    abi:faucetABI,
    functionName:"mintUSDT"
  })

}