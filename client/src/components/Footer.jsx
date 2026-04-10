import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-earth-900 text-cream/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-cream mb-2">Benayedos</h3>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-olive-500 mb-4">
              {t('footer.tagline')}
            </p>
            <p className="font-body text-sm font-300 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Productions */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-cream/40 mb-5">
              {t('footer.productions_label')}
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {t('products_list', { returnObjects: true }).map(p => (
                <li key={p} className="flex items-center gap-2 hover:text-cream transition-colors cursor-default">
                  <span className="w-1 h-1 bg-olive-600 rounded-full flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-cream/40 mb-5">
              {t('footer.contact_label')}
            </h4>
            <div className="space-y-3 font-body text-sm">
              <p>Hatem Benayed</p>
              <a href="tel:+21699600520" className="block hover:text-cream transition-colors">
                +216 99 600 520
              </a>
              <a href="mailto:benayedos.sl@gmail.com" className="block hover:text-cream transition-colors break-all">
                benayedos.sl@gmail.com
              </a>
              <p>Tebourba, Manouba, Tunisie</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-earth-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-earth-600">
            {t('footer.rights', { year })}
          </p>
          <p className="font-body text-xs text-earth-600 italic">
            {t('footer.slogan')}
          </p>
        </div>
      </div>
    </footer>
  )
}