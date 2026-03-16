export default function LiquidityStats() {
    const stats = [
        { title: "Total Liquidity", value: "$2.3M" },
        { title: "Pools", value: "124"},
        { title: "Volume", value: "$320K"}
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