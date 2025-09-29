import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './ui/App.jsx'
import './styles/index.css'

// OPTIONAL: se hai questi provider, rimuovi i commenti e assicurati che i file esistano
// import ErrorBoundary from './ui/ErrorBoundary.jsx'
// import { SoundProvider } from './core/sound.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*
      <ErrorBoundary>
        <SoundProvider>
          <App />
        </SoundProvider>
      </ErrorBoundary>
      */}
      {/* Versione base senza provider opzionali: */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Rimuovi il boot banner UNA sola volta
const bootEl = document.getElementById('boot-banner')
if (bootEl) bootEl.remove()
