import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './assets/API/CartContext.jsx'
import { FavoriteProvider } from './assets/API/FavoriteContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <FavoriteProvider>
  <CartProvider>
    <App />
    </CartProvider>
    </FavoriteProvider>
  </BrowserRouter>,
)
