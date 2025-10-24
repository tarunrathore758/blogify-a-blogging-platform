import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthProvider>
    <App/>
    </AuthProvider>
    </BrowserRouter>
 
)
