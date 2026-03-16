"use client"

import { useReadContract } from "wagmi"
import { factoryABI} from "@/lib/factoryABI"
import { contracts } from "@/lib/contracts"
import PoolCard from "./pools/PoolTable"

export default function PairLoader({index}:{index:number}){

const { data:pair } = useReadContract ({
address:contracts.factory,
abi:factoryABI,
functionName:"allPairs",
args: [BigInt(index)]
})

if(!pair) return null



}