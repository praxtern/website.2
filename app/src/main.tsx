import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CustomCursor from '@/components/CustomCursor'
import { LenisProvider } from '@/components/LenisProvider'

createRoot(document.getElementById('root')!).render(
  <LenisProvider>
    <CustomCursor />
    <App />
  </LenisProvider>
)
