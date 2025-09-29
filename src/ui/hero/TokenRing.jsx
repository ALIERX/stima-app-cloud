import React from 'react'
import { useFrame } from '@react-three/fiber'
import TokenCoin from './TokenCoin.jsx'

export default function TokenRing({ count = 10, radius = 4, speed = 0.2 }) {
  const group = React.useRef()
  useFrame((_, dt) => { group.current.rotation.y += dt * speed })

  const nodes = Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2
    const x = Math.cos(a) * radius
    const z = Math.sin(a) * radius
    return <TokenCoin key={i} rotation={[0, -a, 0]} radius={0.6} thickness={0.1} position={[x, 0, z]} />
  })

  return <group ref={group}>{nodes}</group>
}
