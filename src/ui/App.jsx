import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Assets from './pages/Assets.jsx'
import { useSound } from '../core/sound.jsx'
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react'

export default function App(){
  const { enabled, setEnabled } = useSound()
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen text-ink dark:text-slate-100">
        <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur dark:bg-slate-900/70">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-bold tracking-tight">STIMA</Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/assets" className="hover:underline">Assets</Link>
              <button onClick={()=>setEnabled(v=>!v)} className="px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" title="Toggle sounds">
                {enabled ? <Volume2 size={16}/> : <VolumeX size={16}/>}
              </button>
              <button onClick={()=>setDark(v=>!v)} className="px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" title="Toggle dark mode">
                {dark ? <Sun size={16}/> : <Moon size={16}/>}
              </button>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/assets" element={<Assets/>} />
        </Routes>
        <footer className="py-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} STIMA</footer>
      </div>
    </div>
  )
}
