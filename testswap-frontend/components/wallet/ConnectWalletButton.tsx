"use client"

import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"

export default function ConnectWalletButton(){

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [ mounted, setMounted ] = useState(false)

  useEffect(()=>{
    setMounted(true)
  },[])

  if(!mounted) {
    return (
      <button className="dext-button text-sm">
        Connect Wallet
      </button>
    )
  }

  if(isConnected){

    return(

      <button
        onClick={()=>disconnect()}
        className="dex-button text-sm"
      >

        {address?.slice(0,6)}...{address?.slice(-4)}

      </button>

    )

  }

  return(

    <button
      onClick={()=>connect({ connector: injected() })}
      className="dex-button text-sm"
    >

      Connect Wallet

    </button>

  )

}