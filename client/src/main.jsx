import React from 'react'
import ReactDOM from 'react-dom/client'
import Background from './background'
import App from './app'
import './index.css'
import Asset from './misc_assets'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Asset /> {/* TODO: CONSOLIDATE ASSET & BACKGROUND INTO TWO CYLINDERS*/}
    <App />
    <Background />
  </React.StrictMode>,
)
