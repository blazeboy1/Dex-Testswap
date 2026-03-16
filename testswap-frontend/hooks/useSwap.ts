"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { swapExactTokensForTokens } from "@/services/routerService"

export function useSwap(){

  const { address } = useAccount()

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState<string | null>(null)

  async function swap({
    amountIn,
    amountOutMin,
    path
  }: {
    amountIn: bigint
    amountOutMin: bigint
    path: `0x${string}`[]
  }){

    if(!address) return

    try{

      setLoading(true)

      await swapExactTokensForTokens({
        amountIn,
        amountOutMin,
        path,
        user:address
      })

    }catch(err:any){

      setError(err.message)

    }finally{

      setLoading(false)

    }

  }

  return {
    swap,
    loading,
    error
  }

}