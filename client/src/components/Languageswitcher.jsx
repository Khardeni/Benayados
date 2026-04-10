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

  return (
    <div className="flex items-center gap-1">
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
  )
}