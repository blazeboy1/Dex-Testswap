"use client"

import { useState } from "react"
import AddLiquidityCard from "./AddLiquidityCard"
import RemoveLiquidityCard from "./RemoveLiquidityCard"

export default function LiquidityCard() {
    const [tab, setTab] = useState("add")

    return (
        <div className="dex-card p-6 space-y-6">
            <div className="flex gap-4">
                <button onClick={() => setTab("add")} className={`px-4 py-2 rounded-lg ${tab === "add"?"bg-purple-500/30":""}`}>
                    Add Liquidity
                </button>
                <button onClick={() => setTab("remove")} className={`px-4 py-2 rounded-lg ${tab === "remove"?"bg-purple-500/30":""}`}>
                    Remove Liquidity
                </button>
            </div>

            {tab === "add" ? <AddLiquidityCard /> : <RemoveLiquidityCard />}
            
        </div>
    )
}