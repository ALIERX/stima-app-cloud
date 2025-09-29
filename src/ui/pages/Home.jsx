import React, { useEffect, useMemo, useState } from 'react'
import { Card } from '../components.jsx'
import Ticker from '../widgets/Ticker.jsx'
import HeroDonut from '../widgets/HeroDonut.jsx'
import NewsGrid from '../widgets/NewsGrid.jsx'
import BlockchainLive from '../widgets/BlockchainLive.jsx'
import { fmtEUR } from '../../core/utils.js'
import { CATEGORIES } from '../../core/state.js'
import { loadBuiltinAssets, loadUserAssets, loadCloudAssets } from '../../core/assetsStore.js'
import HeroPremium from '../hero/HeroPremium.jsx'

export default function Home(){
  const [assets, setAssets] = useState([])

  useEffect(()=>{
    (async () => {
      const base = await loadBuiltinAssets()
      const local = loadUserAssets()
      const cloud = await loadCloudAssets()
      setAssets([...local, ...cloud, ...base])
    })()
  }, [])

  const totalReserve = useMemo(()=> assets.reduce((s,a)=> s + Number(a.declaredValueEUR||0), 0), [assets])
  const byCategory = useMemo(()=>{
    const map = new Map(CATEGORIES.map(c=>[c.id,0]))
    for (const a of assets){
      map.set(a.category, (map.get(a.category)||0) + Number(a.declaredValueEUR||0))
    }
    return CATEGORIES.map(c => ({
      id: c.id,
      name: c.label,
      value: map.get(c.id)||0,
      share: totalReserve ? (map.get(c.id)||0) / totalReserve * 100 : 0
    }))
  }, [assets, totalReserve])

  const sharesForDonut = byCategory.map(c => ({ name: c.name, value: c.share }))

  const kpi = {
    reserve: fmtEUR(totalReserve),
    minted: (totalReserve/1000).toFixed(2), // demo rule 1k EUR = 1 STIMA
    nav: (1).toFixed(4) // placeholder
  }

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
  <HeroPremium minted={Number(kpi.minted)} nav={Number(kpi.nav)} lastUpdate="00:00 UTC" oracleActive={true} />
  {/* ...il resto della tua pagina (Ticker, News, ecc.) */}
</main>
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm font-medium">Market Ticker</div>
          <div className="text-xs text-slate-500">{assets.length} assets</div>
        </div>
        <Ticker rows={byCategory.map(c=>c.name)} />
      </Card>

      <Card className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <HeroDonut minted={Number(kpi.minted)} nav={Number(kpi.nav)} shares={sharesForDonut} />
          </div>
          <div className="lg:col-span-5 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl border bg-white">
                <div className="text-xs text-slate-500">Verified reserve</div>
                <div className="text-lg font-semibold">{kpi.reserve}</div>
              </div>
              <div className="p-3 rounded-xl border bg-white">
                <div className="text-xs text-slate-500">Minted supply</div>
                <div className="text-lg font-semibold">{kpi.minted} STIMA</div>
              </div>
              <div className="p-3 rounded-xl border bg-white">
                <div className="text-xs text-slate-500">NAV / token</div>
                <div className="text-lg font-semibold">€ {kpi.nav}</div>
              </div>
              <div className="p-3 rounded-xl border bg-white">
                <div className="text-xs text-slate-500">Categories</div>
                <div className="text-lg font-semibold">{CATEGORIES.length}</div>
              </div>
            </div>
            <div className="space-y-2">
              {byCategory.map(c=>(
                <div key={c.id}>
                  <div className="flex justify-between text-xs">
                    <span>{c.name}</span><span>{c.share.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full" style={{ width: `${c.share}%`, background: 'linear-gradient(90deg,#111,#444)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5"><Card><div className="text-sm font-medium">Blockchain Live</div><BlockchainLive/></Card></div>
        <div className="lg:col-span-7"><Card><div className="text-sm font-medium">Insights & News</div><NewsGrid/></Card></div>
      </div>
    </main>
  )
}
