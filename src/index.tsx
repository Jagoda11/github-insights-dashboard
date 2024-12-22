import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

console.log('Index file loaded')
const container = document.getElementById('root')
if (container) {
  console.log('Root container found')
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error('Root container not found')
}
