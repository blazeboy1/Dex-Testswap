export default function LatestTokens() {

  const tokens = [
    {name:"TestToken",symbol:"TEST"},
    {name:"AlphaToken",symbol:"ALPHA"},
    {name:"NebulaCoin",symbol:"NEB"}
  ]

  return (

    <div className="dex-card p-6">

      <h2 className="text-lg font-semibold mb-4">
        Latest Tokens
      </h2>

      <div className="space-y-3">

        {tokens.map((t,i)=>(

          <div
            key={i}
            className="flex justify-between"
          >

            <span>{t.name}</span>
            <span className="text-white/60">
              {t.symbol}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}