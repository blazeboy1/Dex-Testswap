"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function TVLChart(){

  const data = [

    {day:"Mon",tvl:200000},
    {day:"Tue",tvl:250000},
    {day:"Wed",tvl:300000},
    {day:"Thu",tvl:420000},
    {day:"Fri",tvl:500000}

  ]

  return(

    <div className="dex-card p-6">

      <h2 className="text-lg font-semibold mb-4">
        Total Value Locked
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>

          <Line
            type="monotone"
            dataKey="tvl"
            stroke="#ec4899"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}