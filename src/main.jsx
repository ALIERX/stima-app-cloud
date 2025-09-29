import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './ui/App.jsx'
import ErrorBoundary from './ui/ErrorBoundary.jsx'
import { SoundProvider } from './core/sound.jsx'

import './styles/index.css'

const rootEl = document.getElementById('root')
const boot = document.getElementById('boot-banner')

function removeBoot(){ try { boot?.remove() } catch {} }

const root = createRoot(rootEl)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <SoundProvider>
          <App />
        </SoundProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
removeBoot()
