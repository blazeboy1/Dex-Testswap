"use client"

import { useState } from "react"
import { useAccount, useWriteContract } from "wagmi"

import { tokenFactoryABI } from "@/lib/tokenFactoryABI"
import { contracts } from "@/lib/contracts"

export default function CreateToken(){

const { address } = useAccount()

const { writeContract } = useWriteContract()

const [name,setName] = useState("")
const [symbol,setSymbol] = useState("")
const [supply,setSupply] = useState("")

const create = async ()=>{

if(!address) return

writeContract({

address: contracts.tokenfactory,

abi: tokenFactoryABI,

functionName:"createToken",

args:[
name,
symbol,
BigInt(Number(supply)*1e18)
]

})

}

return(

<div className="flex justify-center mt-10">

<div className="bg-zinc-900 p-6 rounded w-96">

<h2 className="text-xl mb-4">
Create Token
</h2>

<input
className="w-full p-2 mb-2 bg-black"
placeholder="Token Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="w-full p-2 mb-2 bg-black"
placeholder="Symbol"
value={symbol}
onChange={(e)=>setSymbol(e.target.value)}
/>

<input
className="w-full p-2 mb-4 bg-black"
placeholder="Supply"
value={supply}
onChange={(e)=>setSupply(e.target.value)}
/>

<button
onClick={create}
className="w-full bg-purple-600 p-2 rounded"
>

Create Token

</button>

</div>

</div>

)

}