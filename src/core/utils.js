export function todayISO(){ return new Date().toISOString().slice(0,10) }
export function fmtEUR(n){
  const v = Number(n||0)
  return v.toLocaleString('en-US', { style:'currency', currency:'EUR', maximumFractionDigits:0 })
}
export function uid(){ return Math.random().toString(36).slice(2) }
export function mean(arr){ return arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0 }
