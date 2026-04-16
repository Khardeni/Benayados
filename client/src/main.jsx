import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n/index.js'   
import RtlWrapper from './components/RtlWrapper'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RtlWrapper>
      <App />
    </RtlWrapper>
  </React.StrictMode>
)
