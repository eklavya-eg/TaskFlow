import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from ' recoil'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <AuthProvider />
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
