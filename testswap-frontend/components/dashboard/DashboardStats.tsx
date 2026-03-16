export default function DashboardStats() {

  const stats = [

    {
      title: "Tokens Created",
      value: "124"
    },

    {
      title: "Liquidity Pairs",
      value: "62"
    },

    {
      title: "Faucet Minted",
      value: "124M"
    },

    {
      title: "Active Users",
      value: "983"
    }

  ]

  return (

    <div className="grid md:grid-cols-4 gap-6">

      {stats.map((s,i)=>(

        <div
          key={i}
          className="dex-card p-6"
        >

          <p className="text-white/60 text-sm">
            {s.title}
          </p>

          <p className="text-2xl font-bold mt-2">
            {s.value}
          </p>

        </div>

      ))}

    </div>

  )

}