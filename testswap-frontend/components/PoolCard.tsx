"use client"

import { useReadContract } from "wagmi"
import { pairABI } from "@/lib/pairABI"

export default function PoolCard({pair}:
{pair:`0x${string}`}){

const { data:reserves } = 
useReadContract({

address:pair,
abi:pairABI,
functionName:"getReserves"

})

return(
<div className="dex-card p-4 mb-3">

<p>Pair: {pair}</p>

<p>Reserve0: {reserves?.[0].toString()}</p>

<p>Reserve1: {reserves?.[0].toString()}</p>

</div>
)

}