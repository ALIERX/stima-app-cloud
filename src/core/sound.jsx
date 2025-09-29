import React, { createContext, useContext, useMemo, useState } from 'react'

const SoundContext = createContext({ enabled: true, setEnabled: () => {}, blip: () => {} })

let _ctx = null
function getCtx(){
  if (typeof window === 'undefined') return null
  try {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)()
    if (_ctx.state === 'suspended') _ctx.resume().catch(()=>{})
    return _ctx
  } catch { return null }
}

export function SoundProvider({ children }){
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem('stima_sound') !== 'off' } catch { return true }
  })

  const blip = () => {
    if (!enabled) return
    const ctx = getCtx(); if(!ctx) return
    try {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = 880
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
      o.connect(g); g.connect(ctx.destination)
      o.start(); o.stop(ctx.currentTime + 0.13)
      if (navigator?.vibrate) navigator.vibrate(10)
    } catch {}
  }

  const value = useMemo(()=>({
    enabled,
    setEnabled: (v)=>{ try{localStorage.setItem('stima_sound', v?'on':'off')}catch{}; setEnabled(v) },
    blip
  }),[enabled])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound(){ return useContext(SoundContext) }
