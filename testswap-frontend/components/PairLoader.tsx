"use client"

import { useReadContract } from "wagmi"
import { factoryABI} from "@/lib/factoryABI"
import { contracts } from "@/lib/contracts"
import PoolCard from "./PoolCard"

export default function PairLoader({index}:{index:number}){

const { data:pair } = useReadContract ({
address:contracts.factory,
abi:factoryABI,
functionName:"allPairs",
args: [BigInt(index)]
})

if(!pair) return null

return <PoolCard pair={pair as `0x${string}`} />

}