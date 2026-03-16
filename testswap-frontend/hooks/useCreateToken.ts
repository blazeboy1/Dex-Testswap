"use client"

import { useState } from "react"
import { createToken } from "@/services/tokenFactoryService"

export function useCreateToken(){

  const [loading,setLoading] = useState(false)

  async function create({
    name,
    symbol,
    supply
  }:{
    name:string
    symbol:string
    supply:bigint
  }){

    try{

      setLoading(true)

      await createToken({
        name,
        symbol,
        supply
      })

    }finally{

      setLoading(false)

    }

  }

  return {
    create,
    loading
  }

}