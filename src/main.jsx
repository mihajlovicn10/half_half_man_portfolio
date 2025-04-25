import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n/i18n.js'

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
