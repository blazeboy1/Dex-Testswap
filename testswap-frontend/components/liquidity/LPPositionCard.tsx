"use client"

import { useLPPositions } from "@/hooks/useLPPositions"
import { formatUnits } from "viem"

export default function LPPositionCard() {
    const { positions, loading } = useLPPositions()

    return (
        <div className="dex-card p-6">

            <h2 className="text-lg font-semibold mb-4">
                Your Liquidity Positions
            </h2>

            {loading && (

            <p className="text-white/60">
            Loading...
            </p>

            )}

            {!loading && positions.length === 0 && (

            <p className="text-white/60">
            No liquidity positions yet.
            </p>

            )}

            <div className="space-y-3">

            {positions.map((p,i)=>(

                <div key={i} className="flex justify-between items-center p-3 rounded bg-black/30">

                <span>
                Pool {p.pair.slice(0,6)}...
                </span>

                <span>
                LP: {formatUnits(p.balance,18)}
                </span>

                </div>

            ))}

            </div>

        </div>
    )
}