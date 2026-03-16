"use client"

export default function PoolDetailsModal({close}:{close:()=>void}) {

    return (

        <div className="fixed inset-0 items-center justify-centr bg-black/60">
            <div className="dex-card p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4">Pool Details</h2>
                <div className="space-y-2 text-sm">
                    <p>Pool Share: 0%</p>
                    <p>Your Liquidity: $0</p>
                    <p>Fees Earned: $0</p>
                </div>
                <button onClick={close} className="dex-button mt-6 w-full">
                    Close
                </button>
            </div>
        </div>
        
    )
}