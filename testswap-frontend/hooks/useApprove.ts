"use client"

import { useState } from "react"
import { approveToken } from "@/services/tokenService"
import { contracts } from "@/lib/contracts"

export function useApprove(){

  const [loading,setLoading] = useState(false)

  async function approve(token:`0x${string}`,amount:bigint){

    try{

      setLoading(true)

      await approveToken({
        token,
        spender:contracts.router,
        amount
      })

    }finally{

      setLoading(false)

    }

  }

  return{
    approve,
    loading
  }

}