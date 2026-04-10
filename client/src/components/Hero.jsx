import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative grain overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in" style={{animationDelay:'0.2s', opacity:0, animationFillMode:'forwards'}}>
          <div className="w-12 h-px bg-cream/40" />
          <span className="font-body text-cream/60 text-xs tracking-[0.35em] uppercase">{t('hero.tagline')}</span>
          <div className="w-12 h-px bg-cream/40" />
        </div>

        {/* Main title */}
        <h1
          className="font-display text-6xl md:text-8xl lg:text-9xl text-cream mb-4 leading-none tracking-tight animate-fade-in"
          style={{animationDelay:'0.4s', opacity:0, animationFillMode:'forwards'}}
        >
          Benayedos
        </h1>

        {/* Subtitle */}
        <p
          className="font-display italic text-xl md:text-2xl text-cream/75 mb-3 animate-fade-in"
          style={{animationDelay:'0.65s', opacity:0, animationFillMode:'forwards'}}
        >
          {t('hero.subtitle')}
        </p>

        <p
          className="font-body text-cream/55 text-sm tracking-[0.2em] uppercase mb-12 animate-fade-in"
          style={{animationDelay:'0.8s', opacity:0, animationFillMode:'forwards'}}
        >
          {t('hero.cultivation')}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{animationDelay:'1s', opacity:0, animationFillMode:'forwards'}}
        >
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-primary text-sm tracking-[0.15em] uppercase"
          >
            <span>{t('hero.cta_contact')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo('#productions')}
            className="font-body text-sm tracking-[0.15em] uppercase text-cream/70 hover:text-cream transition-colors duration-200 border-b border-cream/30 hover:border-cream/70 pb-0.5"
          >
            {t('hero.cta_productions')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-body text-cream/40 text-xs tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
        <div className="w-px h-10 bg-gradient-to-b from-cream/40 to-transparent" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}