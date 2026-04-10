import { useTranslation } from 'react-i18next'

export default function Terre() {
  const { t } = useTranslation();
  const terreData = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      labelKey: t('terre.localisation_label'),
      valueKey: t('terre.localisation_value'),
      detailKey: t('terre.localisation_detail'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      labelKey: t('terre.climat_label'),
      valueKey: t('terre.climat_value'),
      detailKey: t('terre.climat_detail'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      labelKey: t('terre.sol_label'),
      valueKey: t('terre.sol_value'),
      detailKey: t('terre.sol_detail'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m8.66-9H21M3 12H2.34M6.34 6.34l-.71-.71M18.37 18.37l-.7-.71M18.37 5.63l-.7.71M6.34 17.66l-.71.71" />
          <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
        </svg>
      ),
      labelKey: t('terre.methode_label'),
      valueKey: t('terre.methode_value'),
      detailKey: t('terre.methode_detail'),
    },
  ]
  return (
    <section id="terre" className="py-24 md:py-36 terre-bg relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle reveal">{t('terre.section_label')}</p>
          <h2 className="section-title mt-3 reveal reveal-delay-1">
            {t('terre.title')}
          </h2>
          <p className="mt-5 font-body font-300 text-earth-500 max-w-xl mx-auto leading-relaxed reveal reveal-delay-2">
            {t('terre.subtitle')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {terreData.map((item, i) => (
            <div key={i} className={`card-base p-7 reveal reveal-delay-${i + 1}`}>

              <div className="w-12 h-12 bg-olive-50 text-olive-600 flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <p className="font-body text-xs text-earth-400 tracking-[0.2em] uppercase mb-1">
                {t(item.labelKey)}
              </p>

              <p className="font-display text-xl text-earth-800 font-600 mb-1">
                {t(item.valueKey)}
              </p>

              <p className="font-body text-sm text-earth-500 font-300">
                {t(item.detailKey)}
              </p>

            </div>
          ))}
        </div>

        {/* Wide image strip */}
        <div className="relative reveal reveal-delay-2">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80"
            alt="Les terres de Tebourba"
            className="w-full h-56 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-transparent to-cream/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display italic text-2xl md:text-3xl text-earth-800/80">
              {t('terre.quote')}           
               </p>
          </div>
        </div>
      </div>
    </section>
  )
}
