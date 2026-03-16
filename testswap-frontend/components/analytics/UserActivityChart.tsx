"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function UserActivityChart(){

  const data = [

    {day:"Mon",users:50},
    {day:"Tue",users:70},
    {day:"Wed",users:90},
    {day:"Thu",users:120},
    {day:"Fri",users:160}

  ]

  return(

    <div className="dex-card p-6">

      <h2 className="text-lg font-semibold mb-4">
        User Activity
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <AreaChart data={data}>

          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>

          <Area
            type="monotone"
            dataKey="users"
            fill="#ec4899"
            stroke="#ec4899"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  )

}