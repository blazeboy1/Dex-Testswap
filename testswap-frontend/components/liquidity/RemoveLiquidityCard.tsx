import { useState } from "react"
import { parseUnits } from "viem"
import { useLiquidity } from "@/hooks/useLiquidity"

export default function RemoveLiquidityCard() {
    const { remove, loading } = useLiquidity()
    const [ tokenA, setTokenA] = useState<any>(null)
    const [ tokenB, setTokenB] = useState<any>(null)
    const [ lpAmount, setLPAmount] = useState("")

    async function handleRemove(){

      if(!tokenA || !tokenB) return
      if(!lpAmount) return

      try{

        const liquidity = parseUnits(lpAmount,18)

        await remove({
          tokenA:tokenA.address,
          tokenB:tokenB.address,
          liquidity
        })

      }catch(err){

        console.error(err)

      }

    }

    return (
        <div className="space-y-4">
            <input placeholder="LP Token Amount" 
            value={lpAmount} 
            onChange={(e)=>
            setLPAmount(e.target.value)} 
            className="w-full p-3 rounded-lg bg-black/40"/>
            <button onClick={handleRemove} className="dex-button w-full mt-4">
                {loading ? "Removing..." : "Remove Liquidity"}
            </button>
        </div>
    )
}