"use client"

import { useState } from "react"
import TokenUpload from "./TokenUpload"
import TokenPreview from "./TokenPreview"
import { useCreateToken } from "@/hooks/useCreateToken"
import { parseUnits } from "viem"

export default function CreateTokenForm() {
    const { create, loading } = useCreateToken()
    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [supply, setSupply] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    const valid = name && symbol && supply && description && image

    const createToken = () => {
        if(!valid) return
        alert("Token Created (simulation)")
    }

    async function handleCreate(){
        if(!name || !symbol || !supply) return
        try {
            const parsedSupply = parseUnits(supply, 18)
            await create({
                name,
                symbol,
                supply:parsedSupply
            })
        }catch(err){
            console.error(err)
        }
    }

    return (

        <div className="dex-card p-6 space-y-6">
            <input placeholder="Token Name" className="w-full p-3 rounded-lg bg-black/40" value={name} onChange={(e) => setName(e.target.value)}/>
            <input placeholder="Symbol" className="w-full p-3 rounded-lg bg-black/40" value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
            <input placeholder="Total Supply" className="w-full p-3 rounded-lg bg-black/40" value={supply} onChange={(e) => setSupply(e.target.value)}/>
            <textarea placeholder="Token Description" className="w-full p-3 rounded-lg bg-black/40" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <TokenUpload setImage={setImage}/>
            <TokenPreview name={name} symbol={symbol} description={description} image={image}/>
            <button onClick={handleCreate} className="dex-button w-full mt-4">
                {loading ? "Creating..." : "Create Token"}
            </button>
        </div>
        
    )
}