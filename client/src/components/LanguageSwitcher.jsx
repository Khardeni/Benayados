import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ar', label: 'AR' },
]

export default function LanguageSwitcher({ scrolled }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.slice(0, 2)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const currentLabel = LANGUAGES.find(l => l.code === current)?.label ?? 'FR'

  return (
    <>
      {/* Desktop: show all buttons inline */}
      <div className="hidden md:flex items-center gap-1">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => i18n.changeLanguage(code)}
            className={`font-body text-[10px] tracking-[0.15em] px-1.5 py-0.5 transition-colors duration-200 ${
              current === code
                ? scrolled
                  ? 'text-olive-700 font-600 border-b border-olive-600'
                  : 'text-cream font-600 border-b border-cream/70'
                : scrolled
                ? 'text-earth-400 hover:text-earth-700'
                : 'text-cream/50 hover:text-cream/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="md:hidden relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className={`font-body text-[10px] tracking-[0.15em] px-2 py-1 flex items-center gap-1 transition-colors duration-200 ${
            scrolled
              ? 'text-olive-700 border border-olive-300 hover:bg-olive-50'
              : 'text-cream border border-cream/40 hover:bg-cream/10'
          }`}
        >
          {currentLabel}
          <svg
            width="8" height="8" viewBox="0 0 8 8" fill="currentColor"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M0 2l4 4 4-4H0z" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1 bg-cream/98 backdrop-blur-md border border-earth-100 shadow-sm z-50 min-w-[3rem]">
            {LANGUAGES.filter(l => l.code !== current).map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { i18n.changeLanguage(code); setOpen(false) }}
                className="block w-full text-left font-body text-[10px] tracking-[0.15em] px-3 py-2 text-earth-600 hover:text-olive-700 hover:bg-earth-50 transition-colors duration-150"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}