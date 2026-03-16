"use client"

import { useEffect,useState } from "react"
import { useAccount } from "wagmi"

import { getAllPairsLength,getPairByIndex } from "@/services/factoryService"
import { getLPBalance } from "@/services/pairService"
import { Address } from "viem"

export function useLPPositions(){

  const { address } = useAccount()

  const [positions,setPositions] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function load(){

      if(!address) return

      try{

        const length = await getAllPairsLength()

        const list = []

        for(let i=0;i<Number(length);i++){

          const pair = await getPairByIndex(i) as Address;

          const balance = await getLPBalance({
            pair,
            user:address
          }) as bigint

          if(balance > 0n){

            list.push({
              pair,
              balance
            })

          }

        }

        setPositions(list)

      }finally{

        setLoading(false)

      }

    }

    load()

  },[address])

  return{
    positions,
    loading
  }

}