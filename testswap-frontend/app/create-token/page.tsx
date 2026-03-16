"use client"

import CreateTokenForm from "@/components/token/CreateTokenForm"
import { useState } from "react"
import { parseUnits } from "viem"
import { useCreateToken } from "@/hooks/useCreateToken"

export default function CreateTokenPage() {
    const { create, loading } = useCreateToken()
    const [ name, setName ] = useState("")
    const [ symbol, setSymbol ] = useState("")
    const [ supply, setSupply ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ image, setImage ] = useState("")

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

        <div className="max-w-2xl mx-auto space-y-10">
            <h1 className="text-3xl font-bold">Create Test Token</h1>
            <p className="text-white/60">
                Launch your own token and start trading instantly.
            </p>
            <CreateTokenForm />
        </div>
    )
}