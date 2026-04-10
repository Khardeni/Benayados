// ─── RtlWrapper.jsx ──────────────────────────────────────────────────────────
// Drop this around your <App /> (or directly in App.jsx) to automatically
// apply dir="rtl" and an Arabic font fallback when the user switches to Arabic.
//
// Usage in main.jsx or App.jsx:
//   import RtlWrapper from './RtlWrapper'
//   <RtlWrapper><YourApp /></RtlWrapper>

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function RtlWrapper({ children }) {
  const { i18n } = useTranslation()
  const isRtl = i18n.language?.startsWith('ar')

  useEffect(() => {
    // Apply dir and lang to <html> so CSS :lang() selectors and browser
    // rendering work correctly across the whole page.
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', i18n.language || 'fr')
  }, [i18n.language, isRtl])

  return <>{children}</>
}


// ─── main.jsx integration example ────────────────────────────────────────────
//
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './i18n/i18n.js'          // ← import BEFORE rendering
// import RtlWrapper from './RtlWrapper'
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RtlWrapper>
//       <App />
//     </RtlWrapper>
//   </React.StrictMode>
// )


// ─── App.jsx integration example ─────────────────────────────────────────────
//
// import Navbar        from './components/Navbar'
// import Hero          from './components/Hero'
// import Histoire      from './components/Histoire'
// import Terre         from './components/Terre'
// import Productions   from './components/Productions'
// import Vision        from './components/Vision'
// import Contact       from './components/Contact'
// import Footer        from './components/Footer'
// import WhatsAppButton from './components/WhatsAppButton'
//
// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Histoire />
//       <Terre />
//       <Productions />
//       <Vision />
//       <Contact />
//       <Footer />
//       <WhatsAppButton />
//     </>
//   )
// }