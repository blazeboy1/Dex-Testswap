import PoolRow from "./PoolRow"

export default function PoolTable() {

    const pools = [
        {pair:"TEST / USDC", tvl:"$120K", volume:"$20K", apr:"12%"},
        {pair:"ALPHA / USDT", tvl:"$85K", volume:"$15K", apr:"10%"},
        {pair:"NEB / USDC", tvl:"$40K", volume:"$6K", apr:"8%"}
    ]

    return (

        <div className="dex-card p-6">
            <table className="w-full text-left">
                <thead className="text-white/60 text-sm">
                    <tr>
                        <th className="pb-4">Pool</th>
                        <th>TVL</th>
                        <th>Volume</th>
                        <th>APR</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="space-y-4">
                    {pools.map((p,i)=>(
                        <PoolRow key={i} pool={p} />
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}