"use client"

import { useState, useEffect } from "react"
import { useAccount, useWriteContract } from "wagmi"
import { contracts } from "@/lib/contracts"
import { routerABI } from "@/lib/routerABI"
import { erc20ABI } from "@/lib/erc20ABI"
import { useReadContract } from "wagmi"
import { pairABI } from "@/lib/pairABI"
import { factoryABI } from "@/lib/factoryABI"
import { TOKENS } from "@/lib/tokens"
import TokenSelector from "@/components/TokenSelector"
import { tokenFactoryABI } from "@/lib/tokenFactoryABI"

export default function SwapBox() {

const { address } = useAccount()

const [amount,setAmount] = useState("")

const [amountOut, setAmountOut] = useState("0")

const [tokenIn,setTokenIn] = useState(TOKENS[0])

const [tokenOut,setTokenOut] = useState(TOKENS[1])

const { writeContract } = useWriteContract()

const { writeContract: approve } = useWriteContract()


const { data: userTokens } = useReadContract({

address: contracts.tokenfactory,
abi: tokenFactoryABI,
functionName:"getAllTokens"

})

const { data: pairAddress } = useReadContract({
address: contracts.factory,
abi: factoryABI,
functionName:"getPair",
args: [contracts.usdc, contracts.usdt]
})

const { data: reserves } = useReadContract({
address: pairAddress as `0x${string}`,
abi: pairABI,
functionName:"getReserves"
})

const approveUSDC = async () => {
  if (!address) return

  approve({
    address: contracts.usdc,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      contracts.router,
      BigInt(10n ** 30n)
    ]
  })
}

const swap = async () => {

if(!address) return

const deadline = Math.floor(Date.now()/1000)+600

writeContract({

address: contracts.router,
abi: routerABI,

functionName:"swapExactTokensForTokens",

args:[
BigInt(Number(amount)*1e6),
0,
[tokenIn.address, tokenOut.address],
address,
BigInt(deadline)
]

})

}

useEffect(() => {

  if (!reserves || !amount) return

  const reserveIn = Number(reserves[0])
  const reserveOut = Number(reserves[1])

  const amountIn = Number(amount) * 1e6

  const amountInWithFee = amountIn * 999

  const numerator = amountInWithFee * reserveOut
  const denominator = reserveIn * 1000 + amountInWithFee

  const out = numerator / denominator

  setAmountOut((out / 1e6).toFixed(6))

}, [amount, reserves])

return(

<div className="dex-card p-6 rounded-xl max-w-md w-full">

<h2 className="text-purple-400 text-xl mb-4">
Swap
</h2>

<TokenSelector
tokens={TOKENS}
selected={tokenIn}
onSelect={setTokenIn}
/>

<TokenSelector
tokens={TOKENS}
selected={tokenOut}
onSelect={setTokenOut}
/>

<input
  className="w-full p-3 rounded border border-gray-700 bg-gray-800 text-white"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  placeholder="Amount"
/>

<p className="text-sm text-gray-400 mt-2">
Estimated Output: {amountOut} USDT
</p>

<button
onClick={swap}
className="dex-button w-full mt-4 p-3 rounded text-white"
>
Swap
</button>

</div>

)
}