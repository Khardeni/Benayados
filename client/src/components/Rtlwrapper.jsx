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

