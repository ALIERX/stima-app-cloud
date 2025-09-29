import { supa } from './supa.js'

export async function loadBuiltinAssets(){
  try{
    const res = await fetch('/assets.json'); if(!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  }catch{ return [] }
}

export function loadUserAssets(){
  try{
    const raw = localStorage.getItem('stima_user_assets')
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  }catch{ return [] }
}

export function saveUserAssets(list){
  try{ localStorage.setItem('stima_user_assets', JSON.stringify(list)) }catch{}
}

export function addUserAsset(asset){
  const list = loadUserAssets()
  list.unshift(asset)
  saveUserAssets(list)
  return list
}

export async function loadCloudAssets(){
  if(!supa) return []
  const { data, error } = await supa.from('assets').select('*').order('created_at', { ascending: false })
  if (error) { console.warn('supabase load error', error); return [] }
  return data.map(a => ({
    id: a.id, category: a.category, brand: a.brand, name: a.name,
    year: a.year, declaredValueEUR: Number(a.declared_value_eur||0),
    description: a.description, image: a.image, images: a.image ? [a.image] : []
  }))
}

export async function addCloudAsset(asset){
  if(!supa) return { ok:false, reason:'no-supabase' }
  const payload = {
    category: asset.category,
    brand: asset.brand,
    name: asset.name,
    year: asset.year ? Number(asset.year) : null,
    declared_value_eur: Number(asset.declaredValueEUR||0),
    description: asset.description || '',
    image: asset.images?.[0] || asset.image || null
  }
  const { error } = await supa.from('assets').insert(payload)
  if (error) return { ok:false, reason: error.message }
  return { ok: true }
}
