"use client"

import { useState } from "react"
import { claimUSDC,claimUSDT } from "@/services/faucetService"

export function useFaucet(){

  const [loading,setLoading] = useState(false)

  async function claim(token:"USDC"|"USDT"){

    setLoading(true)

    try{

      if(token==="USDC"){

        await claimUSDC()

      }else{

        await claimUSDT()

      }

    }finally{

      setLoading(false)

    }

  }

  return {
    claim,
    loading
  }

}