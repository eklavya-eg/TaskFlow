import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from "react-router-dom"
import AuthProvider from './components/AuthProvider'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  // </StrictMode>,
)
