import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { reportWebVitals } from '@/shared/lib/vitals'

// Self-heal stale lazy chunks: after a new deploy, a still-open tab may request
// an old chunk hash that no longer exists. Vite fires `vite:preloadError` on a
// failed dynamic import — reload once (guarded against loops) to pull the
// current index.html + chunk hashes.
window.addEventListener('vite:preloadError', () => {
  if (!sessionStorage.getItem('chunk-reload')) {
    sessionStorage.setItem('chunk-reload', '1')
    window.location.reload()
  }
})

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
