"use client"

import { useAccount, useReadContract } from "wagmi"
import { contracts } from "@/lib/contracts"
import { pairABI } from "@/lib/pairABI"
import { factoryABI } from "@/lib/factoryABI"

export default function LPPosition(){

const { address } = useAccount()

const { data: pairAddress } = useReadContract({
address: contracts.factory,
abi: factoryABI,
functionName:"getPair",
args: [contracts.usdc, contracts.usdt]
})

const { data: balance } = useReadContract({
address: pairAddress as `0x${string}`,
abi: pairABI,
functionName:"balanceOf",
args:[address!],
})

const { data: totalSupply } = useReadContract({
address: pairAddress as `0x${string}`,
abi: pairABI,
functionName:"totalSupply"
})

const { data: reserves } = useReadContract({
address: pairAddress as `0x${string}`,
abi: pairABI,
functionName:"getReserves"
})

if(!balance || !totalSupply || !reserves){
return <div>Loading...</div>
}

if (!pairAddress) {
    return <div>No liquidity pool yet</div>
}

const share = Number(balance)/Number(totalSupply)

return(

<div className="dex-card p-6 rounded-xl max-w-md w-full">

<h2 className="text-purple-400 text-xl mb-4">
Your Liquidity
</h2>

<p>
LP Tokens: {Number(balance)/1e18}
</p>

<p>
Pool Share: {(share*100).toFixed(4)}%
</p>

<p>
Reserve USDC: {Number(reserves[0])/1e6}
</p>

<p>
Reserve USDT: {Number(reserves[1])/1e6}
</p>

</div>

)

}