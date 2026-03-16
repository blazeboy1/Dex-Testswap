export default function AnalyticsStats(){

  const stats = [

    {title:"Tokens Created",value:"324"},
    {title:"Liquidity Pairs",value:"148"},
    {title:"Total Liquidity",value:"$4.2M"},
    {title:"Faucet Minted",value:"980M"},
    {title:"Active Users",value:"1,204"}

  ]

  return(

    <div className="grid md:grid-cols-5 gap-6">

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