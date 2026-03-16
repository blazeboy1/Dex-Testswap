"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function VolumeChart(){

  const data = [

    {day:"Mon",volume:12000},
    {day:"Tue",volume:15000},
    {day:"Wed",volume:20000},
    {day:"Thu",volume:30000},
    {day:"Fri",volume:45000}

  ]

  return(

    <div className="dex-card p-6">

      <h2 className="text-lg font-semibold mb-4">
        Trading Volume
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart data={data}>

          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>

          <Bar
            dataKey="volume"
            fill="#8b5cf6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )

}