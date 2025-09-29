import React from 'react'
export default function Ticker({ rows=[] }){
  const src = rows.length ? rows : ['Watches','Art','Wine','Sneakers','Cars','Gems']
  return (
    <div className="relative whitespace-nowrap overflow-hidden py-2">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"/>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"/>
      <div className="flex gap-6 animate-[marquee_20s_linear_infinite] px-4">
        {src.map((n,i)=>(
          <div key={i} className="flex items-center gap-3 border rounded-xl bg-white px-3 py-1.5">
            <span className="text-sm font-medium">{typeof n==='string'?n:n.name}</span>
            <span className="text-xs text-emerald-600">▲ {(Math.random()*2).toFixed(2)}%</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
