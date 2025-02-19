import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import 'modern-normalize/modern-normalize.css'
import './assets/css/index.css'
import App from './components/App/App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
      <App />
    </BrowserRouter>
  </StrictMode>
)
