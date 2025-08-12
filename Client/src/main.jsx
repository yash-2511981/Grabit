import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <Toaster duration={3000} position="top-center" closeButton  />
    <App />
  </>
  // </StrictMode>,
)
