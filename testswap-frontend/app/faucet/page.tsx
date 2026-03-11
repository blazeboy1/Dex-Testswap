"use client"

import { useAccount, useWriteContract } from "wagmi"
import { contracts } from "@/lib/contracts"
import { faucetABI } from "@/lib/faucetABI"

export default function Faucet(){

const { address } = useAccount()

const { writeContract } = useWriteContract()

const claimUSDC = () => {

writeContract({
address: contracts.faucet,
abi: faucetABI,
functionName: "mintUSDC",
args: []
})

}

const claimUSDT = () => {

writeContract({
address: contracts.faucet,
abi: faucetABI,
functionName: "mintUSDT",
args: []
})

}

return(

<div className="flex justify-center items-center min-h-screen">

<div className="dex-card p-8 w-96">

<h2 className="text-center text-xl mb-6">

Token Faucet

</h2>

<button
className="dex-button w-full mb-4"
onClick={claimUSDC}
>

Claim 1000 USDC

</button>

<button
className="dex-button w-full"
onClick={claimUSDT}
>

Claim 1000 USDT

</button>

</div>

</div>

)

}