"use client"

import DashboardStats from "@/components/dashboard/DashboardStats"
import LatestTokens from "@/components/dashboard/LatestTokens"
import LatestPools from "@/components/dashboard/LatestPools"
import UserLiquidity from "@/components/dashboard/UserLiquidity"

export default function DashboardPage() {

  return (

    <div className="space-y-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* STATS */}

      <DashboardStats />

      {/* USER POSITIONS */}

      <UserLiquidity />

      {/* TOKENS */}

      <LatestTokens />

      {/* POOLS */}

      <LatestPools />

    </div>

  )

}