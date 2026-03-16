"use client"

export default function PoolRow({pool}:{pool:any}) {

    return (

        <tr className="border-t border-white/10">
            <td className="py-4 font-semibold">{pool.pair}</td>
            <td>{pool.tvl}</td>
            <td>{pool.volume}</td>
            <td className="text-green-400">{pool.apr}</td>
            <td>
                <button className="dex-button text-sm px-3 py-1">
                    View
                </button>
            </td>
        </tr>
        
    )
}