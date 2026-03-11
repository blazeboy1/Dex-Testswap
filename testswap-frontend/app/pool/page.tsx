"use client"

import { useReadContract } from "wagmi"
import { factoryABI } from "@/lib/factoryABI"
import { pairABI } from "@/lib/pairABI"
import { contracts } from "@/lib/contracts"
import PoolCard from "@/components/PoolCard"

export default function Pools(){
const { data: length } = useReadContract({
address:contracts.factory,
abi:factoryABI,
functionName:"allPairsLength"
})

return(
<div className="flex justify-center mt-10">

<div className="dex-card p-6 w-[600px]">

<h2 className="text-xl mb-4 text-center">

Liquidity Pools

</h2>

{length === 0 && (
<p>No Pools yet</p>
)}

{length &&
[...Array(Number(length))].map((_,i)=>{

return(
<PairLoader key=(1) index=(i) />
)

})}

</div>

</div>
)

}