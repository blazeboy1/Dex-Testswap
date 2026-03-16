export default function LatestPools(){

  const pools = [

    {pair:"TEST / USDC",tvl:"120k"},
    {pair:"ALPHA / USDT",tvl:"85k"},
    {pair:"NEB / USDC",tvl:"40k"}

  ]

  return(

    <div className="dex-card p-6">

      <h2 className="text-lg font-semibold mb-4">
        Latest Liquidity Pools
      </h2>

      <div className="space-y-3">

        {pools.map((p,i)=>(

          <div
            key={i}
            className="flex justify-between"
          >

            <span>{p.pair}</span>
            <span className="text-white/60">
              TVL {p.tvl}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}