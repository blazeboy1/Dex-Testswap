"use client"

import { useState, useEffect } from "react"
import { parseUnits } from "viem"
import TokenInput from "./TokenInput"
import SwapButton from "./SwapButton"
import PriceInfo from "./PriceInfo"
import SwapResultModal from "./SwapResultModal"
import { useSwap } from "@/hooks/useSwap"
import { useAccount } from "wagmi"
import { swapExactTokensForTokens } from "@/services/routerService"
import { contracts } from "@/lib/contracts"
import { getAllowance } from "@/services/tokenService"
import { useApprove } from "@/hooks/useApprove"

export default function SwapCard() {
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const { swap, loading } = useSwap()
  const [tokenIn, setTokenIn] = useState<any>(null)
  const [tokenOut, setTokenOut] = useState<any>(null)
  const [amountIn, setAmountIn] = useState("")
  const [amount, setAmount] = useState("")
  const { address } = useAccount()
  const { approve, loading:approveLoading } = useApprove()
  const [needsApprove,setNeedsApprove] = useState(false)
  const [slippage,setSlippage] = useState(0.5)

  async function checkAllowance(){

  if(!tokenIn || !amount || !address) return

  const amountIn = parseUnits(amount,18)

  const allowance = await getAllowance({
    token:tokenIn.address,
    owner:address,
    spender:contracts.router
  }) as bigint

  setNeedsApprove(allowance < amountIn)

  useEffect(()=>{
  checkAllowance()
  },[amount,tokenIn])

  }

  async function handleApprove(){

  if(!tokenIn || !amount) return

  const amountIn = parseUnits(amount,18)

  await approve(tokenIn.address,amountIn)

  setNeedsApprove(false)

  }

  async function handleSwap() {
  if(!tokenIn || !tokenOut) return
  if(!amount) return
  if(!address) return

  try {

    const amountIn = parseUnits(amount, 18)

    const path = [tokenIn.address, tokenOut.address]

    await swap ({
      amountIn,
      amountOutMin:0n,
      path
    })

  } catch (err) {
    console.error(err)
  }
  }

  return (
    <div className="dex-card 2-[420px] p-6 space-y-4">
      <h2 className="text-lg font-semibold">Swap</h2>
      <TokenInput token={tokenIn} onTokenChange={setTokenIn} amount={amountIn} onAmountChange={setAmount} label="Sell" />
      <div className="text-center text-white/50">
        ↓
      </div>
      <TokenInput token={tokenOut} onTokenChange={setTokenOut} label="Buy" />
      <PriceInfo priceImpact={0.5} />
      <div className="text-sm text-white/60 flex justify-between">
      <span>Slippage</span>
      <select value={slippage} onChange={(e)=>setSlippage(Number(e.target.value))} className="bg-black/30 rounded px-2">
      <option value="0.1">0.1%</option>
      <option value="0.5">0.5%</option>
      <option value="1">1%</option>
      </select>
      </div>
      <div className="dex-card p-3 text-sm text-white/70">
      Estimated Output: ~{amount}
      </div>
      {needsApprove ? (

        <button onClick={handleApprove} className="dex-button w-full mt-4">
          {approveLoading ? "Approving..." : "Approve"}
        </button>

      ) : (

        <SwapButton loading={loading} onSwap={handleSwap} onSuccess={() => setSuccess(true)} onFail={() => setFailed(true)} />

      )}
      
      {success && (<SwapResultModal success={true} close={() => setSuccess(false)} />
      )}

      {failed && (<SwapResultModal success={false} close={() => setFailed(false)} />
      )}
      
    </div>
  )
}
