"use client"

import { useState,useEffect } from "react"
import { getAllPairsLength,getPairByIndex } from "@/services/factoryService"

export function usePools(){

  const [pools,setPools] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function loadPools(){

      const length = await getAllPairsLength()

      const list = []

      for(let i=0;i<Number(length);i++){

        const pair = await getPairByIndex(i)

        list.push(pair)

      }

      setPools(list)
      setLoading(false)

    }

    loadPools()

  },[])

  return {
    pools,
    loading
  }

}