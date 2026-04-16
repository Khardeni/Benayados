import { useTranslation, Trans } from 'react-i18next'
import { IMAGES } from '../images'

export default function Histoire() {
  const { t } = useTranslation()

  return (
    <section id="histoire" className="py-24 md:py-36 olive-bg relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(249, 244, 234, 0.97) 0%, rgba(249, 244, 234, 0.85) 60%, rgba(249, 244, 234, 0.2) 100%), url(${IMAGES.products.huileOlive})`,
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <p className="section-subtitle reveal">{t('histoire.section_label')}</p>
            <div className="divider-ornament reveal reveal-delay-1">
              <svg className="w-5 h-5 text-earth-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8c0 5 6 14 6 14s6-9 6-14c0-3-2.5-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
            <h2 className="section-title mb-8 reveal reveal-delay-1">
              {t('histoire.title')}<br />
              <span className="italic text-olive-600">{t('histoire.title_italic')}</span>
            </h2>

            <div className="space-y-5 text-earth-600 font-body font-300 leading-relaxed">
              <p className="reveal reveal-delay-2">
                <Trans i18nKey="histoire.p1" components={{ strong: <strong className="font-500 text-earth-700" /> }} />
              </p>
              <p className="reveal reveal-delay-3">
                <Trans i18nKey="histoire.p2" components={{ strong: <strong className="font-500 text-earth-700" />, em: <em /> }} />
              </p>
              <p className="reveal reveal-delay-4">
                <Trans i18nKey="histoire.p3" components={{ strong: <strong className="font-500 text-earth-700" /> }} />
              </p>
              <p className="reveal reveal-delay-5">
                <Trans i18nKey="histoire.p4" components={{ strong: <strong className="font-500 text-earth-700" /> }} />
              </p>
            </div>

            {/* Productions */}
            <div className="mt-10 reveal reveal-delay-5">
              <p className="font-body text-xs text-earth-400 tracking-[0.15em] uppercase mb-4">{t('histoire.productions_label')}</p>
              <div className="flex flex-wrap gap-2">
                {t('products_list', { returnObjects: true }).map((item) => (
                  <span
                    key={item}
                    className="font-body text-xs text-earth-600 border border-earth-200 px-3 py-1.5 tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-earth-200 reveal reveal-delay-5">
              {[
                { value: '3+', label: t('histoire.stat_generations') },
                { value: '6', label: t('histoire.stat_productions') },
                { value: t('histoire.stat-label'), label: t('histoire.stat_terroir') },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl text-olive-700 font-600">{value}</div>
                  <div className="font-body text-xs text-earth-400 tracking-[0.15em] uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image collage */}
          <div className="relative reveal reveal-delay-2">
            <div className="relative z-10">
              <img
                src={IMAGES.histoireMain}
                alt="Champs agricoles de Tebourba"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover shadow-2xl"
              />
              {/* Floating accent card */}
              <div className="absolute -bottom-8 -left-8 bg-cream border border-earth-100 p-5 shadow-xl max-w-xs">
                <p className="font-display italic text-sm text-earth-600 leading-relaxed">
                  "{t('histoire.quote')}"
                </p>
                <p className="font-body text-xs text-earth-400 mt-3 tracking-[0.1em] uppercase">{t('histoire.quote_author')}</p>
              </div>
            </div>
            {/* Decorative background shape */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-olive-100 rounded-none -z-0" />
          </div>
        </div>
      </div>
    </section>
  )
}