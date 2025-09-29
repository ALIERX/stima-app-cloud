import React from 'react'
import { useSpring, animated } from '@react-spring/web'

export default function CounterRoll({ value = 0, prefix = '', suffix = '', decimals = 2, duration = 800 }) {
  const { val } = useSpring({
    from: { val: 0 },
    to:   { val: Number(value) || 0 },
    config: { duration }
  })

  return (
    <animated.span className="font-mono tabular-nums">
      {val.to(v => {
        const n = Number(v).toFixed(decimals)
        const withSep = n.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return `${prefix}${withSep}${suffix}`
      })}
    </animated.span>
  )
}
