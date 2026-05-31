import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { reportWebVitals } from '@/shared/lib/vitals'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      theme="dark"
      position="bottom-right"
      closeButton
      duration={3000}
    />
  </StrictMode>,
)

reportWebVitals()
