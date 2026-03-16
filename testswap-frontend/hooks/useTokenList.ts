"use client"

import { useEffect,useState } from "react"
import { TOKENS } from "@/lib/tokens"
import { discoverTokens } from "@/services/tokenDiscoveryService"

export function useTokenList(){

  const [tokens,setTokens] = useState<any[]>(TOKENS)

  useEffect(()=>{

    async function load(){

      try{

        const discovered = await discoverTokens()

        setTokens([...TOKENS,...discovered])

      }catch(err){

        console.error(err)

      }

    }

    load()

  },[])

  return tokens

}