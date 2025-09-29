import React, { useMemo } from 'react'
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'

function computeMetrics(a){
  // Produce 5 metrics in 0..100: Rarity, Condition, Liquidity, Volatility, Provenance
  const val = Number(a.declaredValueEUR||0)
  const year = Number(a.year||0)
  const age = year ? (new Date().getFullYear() - year) : 20
  const rarity = Math.max(20, Math.min(100, 20 + Math.log10(Math.max(1,val))/6*100))
  const condition = a.description?.toLowerCase().includes('mint') ? 90 : (a.description?.toLowerCase().includes('restored') ? 60 : 75)
  const liquidity = ['watch','sneaker','wine'].includes(a.category) ? 80 : (a.category==='art'?55:50)
  const volatility = 100 - Math.max(30, Math.min(90, 30 + (val>1e7?30:0) + (a.category==='crypto'?40:0))) // lower is safer; we invert visually
  const provenance = a.description?.toLowerCase().match(/(certificate|co[aà]c|sotheby|christie|museum|royal|documented)/) ? 90 : 70
  return [
    { k:'Rarity', v: Math.round(rarity) },
    { k:'Condition', v: Math.round(condition) },
    { k:'Liquidity', v: Math.round(liquidity) },
    { k:'Volatility', v: Math.round(100 - volatility) }, // show as "more is better"
    { k:'Provenance', v: Math.round(provenance) }
  ]
}

export default function RadarMini({ asset }){
  const data = useMemo(()=>computeMetrics(asset), [asset])
  return (
    <div className="h-40 radar-card">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="k" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
          <Tooltip />
          <Radar dataKey="v" stroke="#0b0f19" fill="#0b0f19" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
