"use client"

import TokenSelector from "./TokenSelector"
import { useTokenBalance } from "@/hooks/useTokenBalance"
import { formatUnits } from "viem"
import { useState } from "react"
import TokenSelectorModal from "./TokenSelectorModal"

export default function TokenInput({ token, onTokenChange, amount, onAmountChange, label }: { token?: any, onTokenChange?:(token: any) => void, amount?: string, onAmountChange?: (amount: string) => void, label: string }) {
    const balance = useTokenBalance(token?.address)
    const [open,setOpen] = useState(false)

    return (
        <div className="bg-black/40 p-4 rounded-xl">
            <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>{label}</span>
                <span>Balance: {balance ? formatUnits(balance,18) : "0"}</span>
            </div>
            <div className="flex justify-between items-center">
                <input type="number" placeholder="0.0" className="bg-transparent outline-none text-xl w-full" value={amount || ""} onChange={(e) => onAmountChange?.(e.target.value)} />
                <TokenSelector token={token} />
                {open && (
                <TokenSelectorModal onSelect={(t)=>{
                onTokenChange?.(t)
                setOpen(false)
                }}
                onClose={()=>setOpen(false)}/>
                )}
            </div>
        </div>
    )
}