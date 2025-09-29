import React from 'react'
import { motion } from 'framer-motion'
import HeroScene from './HeroScene.jsx'
import OracleRings from '../widgets/OracleRings.jsx'
import CounterRoll from '../widgets/CounterRoll.jsx'
import { Link } from 'react-router-dom'

export default function HeroPremium({ minted = 0, nav = 1, lastUpdate = '00:00 UTC', oracleActive = true }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-metal-gradient text-slate-100">
      {/* background decorativo */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(closest-side, rgba(180,140,88,.35), transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(closest-side, rgba(0,255,209,.25), transparent 70%)' }} />

      <div className="grid lg:grid-cols-12 items-stretch">
        {/* Colonna sinistra: testo & KPI */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-center gap-6">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="text-4xl/tight md:text-5xl/tight font-semibold"
          >
            Tokenize <span className="bg-clip-text text-transparent bg-gold-sheen">Reality</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="text-sm text-slate-300"
          >
            From vintage Rolex to Da Vinci — minted, verified, liquid. Daily deterministic valuation secured by on-chain oracle.
          </motion.p>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-slate-400">Minted supply</div>
              <div className="text-xl font-semibold">
                <CounterRoll value={minted} suffix=" STIMA" decimals={2} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-slate-400">NAV / token</div>
              <div className="text-xl font-semibold">
                € <CounterRoll value={nav} decimals={4} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-slate-400">Last update</div>
              <div className="text-sm flex items-center gap-2">
                ⏳ <span>{lastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/assets" className="px-5 py-3 rounded-xl border border-gold/30 bg-white/5 hover:bg-white/10 transition shadow-[0_0_0_1px_rgba(180,140,88,.15)]">
              Explore Assets
            </Link>
            <a href="#how-it-works" className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">
              How it works
            </a>
          </div>
        </div>

        {/* Colonna destra: 3D + oracle rings */}
        <div className="lg:col-span-7 relative min-h-[420px]">
          <div className="absolute inset-0">
            <HeroScene />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <OracleRings active={oracleActive} />
          </div>
        </div>
      </div>
    </section>
  )
}
