"use client"

import LiquidityStats from "@/components/liquidity/LiquidityStats"
import LPPositionCard from "@/components/liquidity/LPPositionCard"
import LiquidityCard from "@/components/liquidity/LiquidityCard"

export default function LiquidityPage() {
    return (
        <div className="space-y-10">
            <h1 className="text-3xl font-bold">
                Liquidity
            </h1>

            <LiquidityStats />

            <LPPositionCard />

            <LiquidityCard />

        </div>
    )
}