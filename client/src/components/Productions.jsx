import { useTranslation } from 'react-i18next'

const productionKeys = [
  {
    id: 'olive_oil',
    emoji: '🫒',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    mode: '—',
    semis: null,
    recolte: '—',
    variete: 'Chemlali / Chetoui',
  },
  {
    id: 'ble',
    emoji: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    mode: 'Pluvial',
    semis: 'Novembre',
    recolte: '—',
    variete: '—',
  },
  {
    id: 'feve',
    emoji: '🫘',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&q=80',
    mode: 'Pluvial',
    semis: 'Novembre',
    recolte: 'Juin',
    variete: '—',
  },
  {
    id: 'feverole',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1592457520501-9b3e6b0c3f80?w=400&q=80',
    mode: 'Pluvial',
    semis: 'Octobre',
    recolte: '—',
    variete: '—',
  },
  {
    id: 'pois_chiche',
    emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1615485925763-86db7d87fcce?w=400&q=80',
    mode: '—',
    semis: null,
    recolte: '—',
    variete: '—',
  },
  {
    id: 'fenugrec',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=400&q=80',
    mode: '—',
    semis: null,
    recolte: '—',
    variete: '—',
  },
]

function ProductCard({ prodKey, emoji, image, mode, semis, recolte, variete, index }) {
  const { t } = useTranslation()
  const name = t(`productions.${prodKey}.name`)
  const desc = t(`productions.${prodKey}.desc`)
  const type = t(`productions.${prodKey}.type`)

  return (
    <div
      className={`reveal reveal-delay-${(index % 4) + 1} group relative overflow-hidden bg-white/60 border border-earth-100 hover:border-olive-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/50 to-transparent" />
        <div className="absolute bottom-3 left-4 text-2xl">{emoji}</div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl text-earth-800">{name}</h3>
          <span className="font-body text-xs text-olive-600 bg-olive-50 px-2 py-0.5 tracking-wide">
            {type}
          </span>
        </div>
        <p className="font-body text-sm text-earth-500 font-300 leading-relaxed mb-4">{desc}</p>

        {/* Details grid */}
        <div className="flex gap-4 border-t border-earth-100 pt-3 mt-4">
          {variete && variete !== '—' && (
            <div className="flex items-center gap-2 text-xs font-body text-earth-400">
              <span className="text-earth-300">{t('productions.variete_label')}</span>
              <span className="ml-auto text-earth-600">{variete}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-body text-earth-400">
            <span className="text-earth-300">{t('productions.mode_label')}</span>
            <span className="ml-auto text-earth-600">{mode}</span>
          </div>
          {semis && (
            <div className="flex items-center gap-2 text-xs font-body text-earth-400">
              <span className="text-earth-300">{t('productions.semis_label')}</span>
              <span className="ml-auto text-earth-600">{semis}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-body text-earth-400">
            <span className="text-earth-300">{t('productions.recolte_label')}</span>
            <span className="ml-auto text-earth-600">{recolte}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Productions() {
  const { t } = useTranslation()

  return (
    <section id="productions" className="py-24 md:py-36 bg-parchment relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle reveal">{t('productions.section_label')}</p>
          <h2 className="section-title mt-3 reveal reveal-delay-1">
            {t('productions.title')}<br />
            <span className="italic text-olive-600">{t('productions.title_italic')}</span>
          </h2>
          <p className="mt-5 font-body font-300 text-earth-500 max-w-xl mx-auto leading-relaxed reveal reveal-delay-2">
            {t('productions.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productionKeys.map((prod, i) => (
            <ProductCard
              key={prod.id}
              prodKey={prod.id}
              {...prod}
              index={i}
            />
          ))}
        
        </div>
      </div>
    </section>
  )
}