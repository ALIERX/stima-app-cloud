import React, { useEffect, useState } from 'react'
import { PieChart, Pie, ResponsiveContainer, Tooltip as RTooltip, Sector } from 'recharts'
import { motion, useAnimation } from 'framer-motion'
import { useSound } from '../../core/sound.jsx'

export default function HeroDonut({ minted=0, nav=1, shares=[] }) {
  const { blip } = useSound()
  const [activeIndex, setActiveIndex] = useState(null)
  const controls = useAnimation()
  useEffect(()=>{ controls.start({ scale:[1,1.04,1], transition:{duration:2, repeat:Infinity, ease:'easeInOut'} }) },[controls])

  const series = shares.length? shares : [
    { name: 'Watches', value: 30 },
    { name: 'Art', value: 24 },
    { name: 'Wine', value: 14 },
    { name: 'Sneakers', value: 8 },
    { name: 'Cars', value: 16 },
    { name: 'Gems', value: 8 }
  ]
  const potential = 0

  const renderActiveShape = (p) => {
    const RAD = Math.PI/180
    const {cx,cy,midAngle,innerRadius,outerRadius,startAngle,endAngle,payload,value} = p
    const sin = Math.sin(-RAD*midAngle), cos = Math.cos(-RAD*midAngle)
    const sx=cx+(outerRadius+8)*cos, sy=cy+(outerRadius+8)*sin
    const mx=cx+(outerRadius+18)*cos, my=cy+(outerRadius+18)*sin
    const ex=mx+(cos>=0?1:-1)*12, ey=my, ta=cos>=0?'start':'end'
    return (
      <g>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle}/>
        <Sector cx={cx} cy={cy} innerRadius={outerRadius+4} outerRadius={outerRadius+8} startAngle={startAngle} endAngle={endAngle}/>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} fill="none" stroke="#111"/>
        <circle cx={ex} cy={ey} r={2} fill="#111"/>
        <text x={ex+(cos>=0?6:-6)} y={ey} textAnchor={ta} className="fill-current text-sm">{payload.name}</text>
        <text x={ex+(cos>=0?6:-6)} y={ey+14} textAnchor={ta} className="fill-current text-xs">{value.toFixed? value.toFixed(1):value}%</text>
      </g>
    )
  }

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      <motion.div
        animate={controls} whileHover={{scale:1.07}} whileTap={{scale:0.95}}
        onClick={()=>blip()} className="relative w-[360px] h-[360px] rounded-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={series}
              dataKey="value" nameKey="name" cx="50%" cy="50%"
              innerRadius={110} outerRadius={150}
              activeIndex={activeIndex} activeShape={renderActiveShape}
              onMouseEnter={(_,i)=>setActiveIndex(i)} onMouseLeave={()=>setActiveIndex(null)}
            />
            <RTooltip/>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/30 to-emerald-400/30 blur-3xl animate-pulse"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-xs text-slate-500">Minted</div>
          <div className="text-2xl font-bold">{minted.toFixed(2)} STIMA</div>
          <div className="mt-2 text-xs text-slate-500">NAV € {nav.toFixed(4)}</div>
        </div>
      </motion.div>
    </div>
  )
}
