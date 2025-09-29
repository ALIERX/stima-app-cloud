import React from 'react'
import { motion } from 'framer-motion'

export default function OracleRings({ active = false }) {
  const glow = active ? 'shadow-[0_0_60px_10px_rgba(0,255,209,.15)]' : ''
  return (
    <div className={`relative w-56 h-56 ${glow}`}>
      {[1,2,3].map(i => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-crypto/30"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10 + i*3, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      <div className="absolute inset-8 rounded-full border border-crypto/50 pointer-events-none"/>
    </div>
  )
}
