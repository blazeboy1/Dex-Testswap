"use client"

import Link from "next/link"
import ConnectWalletButton from "../wallet/ConnectWalletButton"

export default function Navbar() {

  return (

    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg border-b border-white/10 bg-black/30 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}

        <Link href="/" className="text-xl font-bold text-purple-400">
          Dex-Testswap
        </Link>

        {/* NAV LINKS */}

        <div className="hidden md:flex gap-8 text-sm text-white/80">

          <Link href="/dashboard">Dashboard</Link>
          <Link href="/swap">Swap</Link>
          <Link href="/liquidity">Liquidity</Link>
          <Link href="/pools">Pools</Link>
          <Link href="/faucet">Faucet</Link>
          <Link href="/create-token">Create Token</Link>
          <Link href="/analytics">Analytics</Link>

        </div>

        {/* WALLET */}

        <ConnectWalletButton />

      </div>

    </nav>

  )
}