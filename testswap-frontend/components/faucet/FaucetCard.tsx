"use client"

import { useState } from "react"
import { useFaucet } from "@/hooks/useFaucet"

export default function FaucetCard({token}:{token: "USDC"|"USDT"}) {
    const [claimed, setClaimed] = useState(false)
    const { claim = () => {
        if(claimed) return
        setClaimed(true)
    }, loading } = useFaucet()

    

    return (
        
        <div className="dex-card p-6 space-y-4">
            <h2 className="text-lg font-semibold">
                {token} Faucet
            </h2>
            <p className="text-sm text-white/60">
                Claim 1,000,000 {token} once every 24 hours.
            </p>
            <div className="text-sm text-white/70">
                Wallet: Not Connected
            </div>
            <button onClick={()=>claim(token)} className="dex-button w-full">
                {loading ? "Claiming..." : `Claim ${token}`}
            </button>
        </div>
        
    )
}