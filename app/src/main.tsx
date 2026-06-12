import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import CustomCursor from '@/components/CustomCursor'
import { LenisProvider } from '@/components/LenisProvider'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LenisProvider>
      <CustomCursor />
      <App />
    </LenisProvider>
  </BrowserRouter>
)
