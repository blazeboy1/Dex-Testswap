"use client"

import { useEffect,useState } from "react"
import { balanceOf } from "@/services/tokenService"
import { useAccount } from "wagmi"

export function useTokenBalance(token?:`0x${string}`){

  const { address } = useAccount()

  const [balance,setBalance] = useState<bigint | null>(null)

  useEffect(()=>{

    async function load(){

      if(!token || !address) return

      const bal = await balanceOf({
        token,
        user:address
      })

      setBalance(bal)

    }

    load()

  },[token,address])

  return balance

}