"use client"

import { TOKENS } from "@/lib/tokens"
import { useTokenList } from "@/hooks/useTokenList"
import { useState } from "react"

export default function TokenSelectorModal({
  onSelect,
  onClose
}:{
  onSelect:(token:any)=>void
  onClose:()=>void
}){

    const tokens = useTokenList()
    const [search,setSearch] = useState("")

  return(

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="dex-card w-[420px] p-6 space-y-4">

        <div className="flex justify-between items-center">

          <h2 className="text-lg font-semibold">
            Select Token
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="space-y-2">

          {tokens
          .filter(t=>t.symbol.toLowerCase().includes(search.toLowerCase()))
          .map((token)=>(
            
            <div
              key={token.address}
              onClick={()=>onSelect(token)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 cursor-pointer"
            >

              <span>{token.symbol}</span>

              <span className="text-xs text-white/50">
                {token.address.slice(0,6)}...
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}