"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { addLiquidity, removeLiquidity } from "@/services/routerService"

export function useLiquidity(){

  const { address } = useAccount()

  const [loading,setLoading] = useState(false)

  async function add({
    tokenA,
    tokenB,
    amountA,
    amountB
  }:{
    tokenA:`0x${string}`
    tokenB:`0x${string}`
    amountA:bigint
    amountB:bigint
  }){

    if(!address) return

    setLoading(true)

    try{

      await addLiquidity({
        tokenA,
        tokenB,
        amountADesired:amountA,
        amountBDesired:amountB,
        user:address
      })

    }finally{

      setLoading(false)

    }

  }

  async function remove({
    tokenA,
    tokenB,
    liquidity
  }:{
    tokenA:`0x${string}`
    tokenB:`0x${string}`
    liquidity:bigint
  }){

    if(!address) return

    setLoading(true)

    try{

      await removeLiquidity({
        tokenA,
        tokenB,
        liquidity,
        user:address
      })

    }finally{

      setLoading(false)

    }

  }

  return {
    add,
    remove,
    loading
  }

}