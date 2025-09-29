import React from 'react'
export function Card({ children, className = '' }) {
  return (
    <section className={`rounded-2xl border bg-white p-4 shadow-sm ${className}`}>
      {children}
    </section>
  )
}
