"use client"

import PoolStats from "@/components/pools/PoolStats"
import PoolTable from "@/components/pools/PoolTable"

export default function PoolsPage() {

    return (

        <div className="spaye-y-10">
            
            <h1 className="text-3xl font-bold">
                Liquidity Pools
            </h1>
            <PoolStats />
            <PoolTable />

        </div>
    )
}