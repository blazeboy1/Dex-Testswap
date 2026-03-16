"use client"

import FaucetCard from "@/components/faucet/FaucetCard"

export default function FaucetPage() {

    return (

        <div className="space-y-10">
            <h1 className="text-3xl font-bold">Faucet</h1>
            <p className="text-white/60">
                Claim test stablecoin to create liquidity pools.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <FaucetCard token="USDC" />
                <FaucetCard token="USDT" />
            </div>
        </div>
        
    )
}