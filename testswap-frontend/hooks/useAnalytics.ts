"use client"

import { useState,useEffect } from "react"
import { getTotalPools } from "@/services/analyticsService"

export function useAnalytics(){

  const [stats,setStats] = useState<any>(null)

  useEffect(()=>{

    async function load(){

      const pools = await getTotalPools()

      setStats({
        pools
      })

    }

    load()

  },[])

  return {
    stats
  }

}