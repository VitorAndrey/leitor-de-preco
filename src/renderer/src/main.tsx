import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PriceReaderProvider } from './contexts/PriceReaderContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PriceReaderProvider>
      <App />
    </PriceReaderProvider>
  </React.StrictMode>
)
