import React, { useEffect, useMemo, useState } from 'react'
import { Card } from '../components.jsx'
import { CATEGORIES } from '../../core/state.js'
import { loadBuiltinAssets, loadUserAssets, addUserAsset, loadCloudAssets, addCloudAsset } from '../../core/assetsStore.js'
import { fmtEUR, uid, todayISO } from '../../core/utils.js'
import RadarMini from '../widgets/RadarMini.jsx'
import { Upload } from 'lucide-react'

function Field({ label, children }){
  return (
    <label className="block text-sm">
      <div className="text-slate-500 mb-1">{label}</div>
      {children}
    </label>
  )
}

export default function Assets(){
  const [builtin, setBuiltin] = useState([])
  const [cloud, setCloud] = useState([])
  const [user, setUser] = useState([])
  const [files, setFiles] = useState([])
  const [useCloud, setUseCloud] = useState(true) // try cloud by default

  useEffect(()=>{
    loadBuiltinAssets().then(setBuiltin)
    setUser(loadUserAssets())
    loadCloudAssets().then(setCloud)
  }, [])

  const [form, setForm] = useState({
    id: '', category: 'watch', name: '', brand: '', year: '', declaredValueEUR: '', description: '', images: []
  })

  function onSelectFiles(e){
    const arr = Array.from(e.target.files || [])
    setFiles(arr)
    const readers = arr.map(f => new Promise(res => {
      const r = new FileReader(); r.onload = ev => res(ev.target.result); r.readAsDataURL(f)
    }))
    Promise.all(readers).then(imgs => setForm(f => ({ ...f, images: imgs })))
  }

  async function submit(e){
    e.preventDefault()
    const payload = {
      ...form,
      id: uid(),
      declaredValueEUR: Number(form.declaredValueEUR||0),
      createdAt: todayISO()
    }
    if (useCloud){
      const r = await addCloudAsset(payload)
      if (r.ok){
        const next = await loadCloudAssets()
        setCloud(next)
        alert('Asset saved to cloud (Supabase).')
      } else {
        alert('Cloud save failed: ' + r.reason + '\nSaved locally instead. Configure .env to enable Supabase.')
        const list = addUserAsset(payload); setUser(list)
      }
    } else {
      const list = addUserAsset(payload); setUser(list)
      alert('Asset added locally (browser storage).')
    }
    setForm({ id:'', category:'watch', name:'', brand:'', year:'', declaredValueEUR:'', description:'', images:[] })
    setFiles([])
  }

  const all = useMemo(()=>[...cloud, ...user, ...builtin], [user, builtin, cloud])

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Add your asset</div>
          <label className="text-xs flex items-center gap-2">
            <input type="checkbox" checked={useCloud} onChange={e=>setUseCloud(e.target.checked)} />
            Sync to cloud (Supabase)
          </label>
        </div>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 mt-3">
          <Field label="Category">
            <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full border rounded-xl px-3 py-2">
              {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Brand / Maker">
            <input value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="e.g., Patek Philippe"/>
          </Field>
          <Field label="Model / Name">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="e.g., Nautilus 5711"/>
          </Field>
          <Field label="Year">
            <input value={form.year} onChange={e=>setForm({...form, year:e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="e.g., 2010"/>
          </Field>
          <Field label="Declared value (EUR)">
            <input type="number" value={form.declaredValueEUR} onChange={e=>setForm({...form, declaredValueEUR:e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="e.g., 150000"/>
          </Field>
          <Field label="Description / Provenance">
            <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full border rounded-xl px-3 py-2" rows="3" placeholder="Ownership, certificates, condition, etc."/>
          </Field>
          <div className="md:col-span-2">
            <Field label="Images">
              <input type="file" multiple accept="image/*" onChange={onSelectFiles} className="w-full"/>
              {form.images?.length>0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {form.images.map((src,i)=>(
                    <img key={i} src={src} alt="" className="h-20 w-20 object-cover rounded-lg border"/>
                  ))}
                </div>
              )}
            </Field>
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-black text-white">
              <Upload size={16}/> Submit asset
            </button>
          </div>
        </form>
        <div className="text-xs text-slate-500 mt-2">
          Cloud sync uses your Supabase project (set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>). If not set, assets are saved locally.
        </div>
      </Card>

      <Card>
        <div className="text-lg font-semibold mb-3">All assets (featured + cloud + yours)</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {all.map(a => (
            <article key={a.id} className="rounded-2xl border bg-white overflow-hidden">
              <div className="aspect-[4/3] bg-slate-100">
                <img src={a.images?.[0] || a.image} alt="" className="w-full h-full object-cover"/>
              </div>
              <div className="p-3 space-y-1">
                <div className="text-[10px] uppercase tracking-wide text-slate-500">{a.category}</div>
                <div className="text-sm font-semibold">{a.brand} — {a.name}</div>
                {a.year && <div className="text-xs text-slate-500">Year {a.year}</div>}
                <div className="text-xs">{fmtEUR(a.declaredValueEUR)}</div>
              </div>
              <div className="px-3 pb-3">
                <RadarMini asset={a} />
              </div>
            </article>
          ))}
        </div>
      </Card>
    </main>
  )
}
