import { useState } from "react"
import { parseUnits } from "viem"
import { useLiquidity } from "@/hooks/useLiquidity"
import TokenInput from "../swap/TokenInput"

export default function AddLiquidityCard() {
    const { add, loading } = useLiquidity()

    const [tokenA,setTokenA] = useState<any>(null)
    const [tokenB,setTokenB] = useState<any>(null)

    const [amountA,setAmountA] = useState("")
    const [amountB,setAmountB] = useState("")

    async function handleAdd(){

        if(!tokenA || !tokenB) return
        if(!amountA || !amountB) return

        try{

            const parsedA = parseUnits(amountA,18)
            const parsedB = parseUnits(amountB,18)

            await add({
              tokenA:tokenA.address,
              tokenB:tokenB.address,
              amountA:parsedA,
              amountB:parsedB
            })

        }catch(err){

            console.error(err)

        }

    }

    return (
        <div className="space-y-4">
            <TokenInput token={tokenA} onTokenChange={setTokenA} amount={amountA} onAmountChange={setAmountA} label="Token A" />
            <TokenInput token={tokenB} onTokenChange={setTokenB} amount={amountB} onAmountChange={setAmountB} label="Token B" />
            <button onClick={handleAdd} className="dex-button w-full mt-4">
                {loading ? "Adding Liquidity..." : "Add Liquidity"}
            </button>
        </div>
    )
}