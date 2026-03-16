"use client"

import AnalyticsStats from "@/components/analytics/AnalyticsStats"
import TVLChart from "@/components/analytics/TVLChart"
import VolumeChart from "@/components/analytics/VolumeChart"
import UserActivityChart from "@/components/analytics/UserActivityChart"

export default function AnalyticsPage() {
    return (

        <div className="space-y-10">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <AnalyticsStats />
            <div className="grid md:grid-cols-2 gap-6">
                <TVLChart />
                <VolumeChart />
            </div>
            <UserActivityChart />
        </div>
    )
}