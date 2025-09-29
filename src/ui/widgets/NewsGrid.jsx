import React, { useEffect, useState } from 'react'
export default function NewsGrid(){
  const [items,setItems] = useState([])
  useEffect(()=>{ fetch('/news.json').then(r=>r.ok?r.json():[]).then(setItems).catch(()=>setItems([])) },[])
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-3">
      {items.map(n=>(
        <a key={n.id} href={n.url||'#'} className="rounded-2xl border bg-white overflow-hidden group" target="_blank" rel="noreferrer">
          <div className="aspect-[16/9] bg-slate-100">
            <img src={n.img} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"/>
          </div>
          <div className="p-3">
            <div className="text-[10px] uppercase tracking-wide text-slate-500">{n.tag}</div>
            <div className="text-sm font-medium">{n.title}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
