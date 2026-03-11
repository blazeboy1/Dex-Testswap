"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-purple-800">

      <h1 className="text-xl font-bold text-purple-400">
        TestSwap
      </h1>

      <div className="flex gap-6">

        <Link href="/create-token">Create Token</Link>
        <Link href="/swap">Swap</Link>
        <Link href="/liquidity">Liquidity</Link>
        <Link href="/pool">Pool</Link>
        <Link href="/faucet">Faucet</Link>

      </div>

      <ConnectButton />

    </div>
  )
}