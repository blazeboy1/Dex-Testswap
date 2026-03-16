"use client"

import { useState } from "react"

export default function TokenSelector({ token }: { token?: any }) {
    const [open,setOpen] = useState(false)

    return (
        <button onClick={()=>setOpen(true)} className="bg-purple-500/20 px-3 py-1 rounded-lg text-sm">
            {token ? token.symbol : "Select"}
        </button>
    )
}