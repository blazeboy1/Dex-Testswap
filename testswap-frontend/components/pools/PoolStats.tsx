export default function PoolStats() {
    const stats = [
        {title:"Total Pools", value:"124"},
        {title:"Total TVL", value:"$3.2M"},
        {title:"24h Volume", value:"$580K"}
    ]

    return (

        <div className="grid md:grid-cols-3 gap-6">

            {stats.map((s,i)=>(

                <div key={i} className="dex-card p-6">

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