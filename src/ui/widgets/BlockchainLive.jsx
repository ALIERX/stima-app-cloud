import React from 'react'
export default function BlockchainLive(){
  const items = [
    { kind:'VERIFY', text:'Verified · Example Asset', t:'2025-09-29' },
    { kind:'ORACLE', text:'Oracle snapshot · Reserve € demo', t:'2025-09-29' }
  ]
  return (
    <div className="space-y-2">
      {items.map((e,i)=>(
        <div key={i} className={`rounded-xl border px-3 py-2 text-sm ${e.kind==='VERIFY'?'bg-blue-50 border-blue-200': e.kind==='MINT'?'bg-emerald-50 border-emerald-200':'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">{e.text}</span>
            <span className="text-xs text-slate-500">{e.t}</span>
          </div>
        </div>
      ))}
      <div className="text-xs text-slate-500 mt-2">Simulated for demo · connect contracts later</div>
    </div>
  )
}
