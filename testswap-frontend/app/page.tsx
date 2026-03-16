import Link from "next/link"

export default function LandingPage() {

  return (

    <div className="text-center space-y-16">

      {/* HERO */}

      <section className="py-24">

        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

          Dex-Testswap

        </h1>

        <p className="text-white/70 max-w-xl mx-auto mb-8">

          A decentralized exchange where anyone can create tokens,
          add liquidity and trade freely using a fully on-chain AMM.

        </p>

        <Link href="/dashboard" className="dex-button">

          Start Trading

        </Link>

      </section>


      {/* FEATURES */}

      <section className="grid md:grid-cols-3 gap-6">

        <div className="dex-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            Swap Tokens
          </h3>
          <p className="text-white/60">
            Instantly swap tokens with automated liquidity pools.
          </p>
        </div>

        <div className="dex-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            Create Tokens
          </h3>
          <p className="text-white/60">
            Launch your own ERC20 token directly from the platform.
          </p>
        </div>

        <div className="dex-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            Provide Liquidity
          </h3>
          <p className="text-white/60">
            Earn fees by supplying liquidity to pools.
          </p>
        </div>

      </section>


      {/* GUIDE */}

      <section className="space-y-6">

        <h2 className="text-3xl font-bold">
          How to Use Dex-Testswap
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="dex-card p-6">
            Connect Wallet
          </div>

          <div className="dex-card p-6">
            Create Token
          </div>

          <div className="dex-card p-6">
            Add Liquidity
          </div>

          <div className="dex-card p-6">
            Start Trading
          </div>

        </div>

      </section>

    </div>

  )

}