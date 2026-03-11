"use client"

import { useState } from "react"
import { useAccount, useWriteContract } from "wagmi"
import { contracts } from "@/lib/contracts"
import { routerABI } from "@/lib/routerABI"

export default function LiquidityBox() {

const { address } = useAccount()

const [amountA,setAmountA] = useState("")
const [amountB,setAmountB] = useState("")

const { writeContract } = useWriteContract()

const addLiquidity = () => {

if(!address) return

const deadline = Math.floor(Date.now()/1000)+600

writeContract({

address: contracts.router,
abi: routerABI,
functionName:"addLiquidity",

args:[
contracts.usdc,
contracts.usdt,

BigInt(Number(amountA)*1e6),
BigInt(Number(amountB)*1e6),

0,
0,

BigInt(deadline)
]

})

}

return(

<div className="dex-card p-6 rounded-xl max-w-md w-full">

<h2 className="text-purple-400 text-xl mb-4">
Add Liquidity
</h2>

<input
className="w-full p-3 rounded bg-black border border-purple-700 mb-3"
placeholder="USDC Amount"
value={amountA}
onChange={(e)=>setAmountA(e.target.value)}
/>

<input
className="w-full p-3 rounded bg-black border border-purple-700"
placeholder="USDT Amount"
value={amountB}
onChange={(e)=>setAmountB(e.target.value)}
/>

<button
onClick={addLiquidity}
className="dex-button w-full mt-4 p-3 rounded text-white"
>
Add Liquidity
</button>

</div>

)

}