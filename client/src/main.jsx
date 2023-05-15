import React from 'react'
import ReactDOM from 'react-dom/client'
import Background from './background'
import App from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Background />
  </React.StrictMode>,
)
