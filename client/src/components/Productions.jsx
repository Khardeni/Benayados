const productions = [
  {
    name: "Huile d'olive",
    emoji: '🫒',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    desc: "L'huile d'olive issue d'un savoir-faire agricole traditionnel. La récolte des olives est réalisée afin de préserver la qualité du fruit.",
    type: 'Oléiculture',
    mode: '—',
    semis: null,
    recolte: '—',
    variete: 'Chemlali / Chetoui',

  },
  {
    name: 'Blé',
    emoji: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    desc: 'Le blé constitue l\'une des cultures fondamentales de l\'exploitation Benayedos. Adapté aux conditions climatiques de la région, il est cultivé selon des pratiques agricoles qui favorisent la qualité du grain et la régularité des rendements.',
    type: 'Céréale',
    mode: 'Pluvial',
    semis: 'Novembre',
    recolte: '—',
    variete: '—',
  },
  {
    name: 'Fève',
    emoji: '🫘',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&q=80',
    desc: 'La fève fait partie des cultures traditionnelles des terres méditerranéennes. Elle enrichit naturellement le sol en azote et joue un rôle important dans la rotation agricole.',
    type: 'Légumineuse',
    mode: 'Pluvial',
    semis: 'Novembre',
    recolte: 'Juin',
    variete: '—',
  },
  {
    name: 'Féverole',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1592457520501-9b3e6b0c3f80?w=400&q=80',
    desc: 'La féverole est une légumineuse particulièrement adaptée aux systèmes agricoles durables. Elle améliore la fertilité des sols tout en produisant une graine riche en protéines.',
    type: 'Légumineuse',
    mode: 'Pluvial',
    semis: 'Octobre',
    recolte: '—',
    variete: '—',
  },
  {
    name: 'Pois chiche',
    emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1615485925763-86db7d87fcce?w=400&q=80',
    desc: 'Culture emblématique de l\'agriculture méditerranéenne, le pois chiche occupe une place importante dans les rotations de cultures de l\'exploitation.',
    type: 'Légumineuse',
    mode: '—',
    semis: '—',
    recolte: '—',
    variete: '—',
  },
  {
    name: 'Fenugrec',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=400&q=80',
    desc: 'Le fenugrec est une plante aux nombreuses qualités nutritionnelles et médicinales. Sa culture s\'inscrit dans la tradition agricole locale.',
    type: 'Aromatique',
    mode: '—',
    semis: '—',
    recolte: '—',
    variete: '—',
  },

]

function ProductCard({ prod, index }) {
  return (
    <div
      className={`reveal reveal-delay-${(index % 4) + 1} group relative overflow-hidden bg-white/60 border border-earth-100 hover:border-olive-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${prod.featured ? 'sm:col-span-2 lg:col-span-1 ring-1 ring-olive-300' : ''
        }`}
    >
      {/* Image */}
      <div className={`relative h-56 overflow-hidden ${prod.featured ? 'h-64' : 'h-44'}`}>
        <img
          src={prod.image}
          alt={prod.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/50 to-transparent" />
        {prod.featured && (
          <div className="absolute top-3 right-3 bg-olive-600 text-cream text-xs font-body tracking-[0.15em] uppercase px-2 py-1">
            Signature
          </div>
        )}
        <div className="absolute bottom-3 left-4 text-2xl">{prod.emoji}</div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl text-earth-800">{prod.name}</h3>
          <span className="font-body text-xs text-olive-600 bg-olive-50 px-2 py-0.5 tracking-wide">
            {prod.type}
          </span>
        </div>
        <p className="font-body text-sm text-earth-500 font-300 leading-relaxed mb-4">{prod.desc}</p>

        {/* Details grid */}
        <div className="flex gap-4 border-t border-earth-100 pt-3 mt-4">
          {prod.variete && (
            <div className="flex items-center gap-2 text-xs font-body text-earth-400">
              <span className="text-earth-300">Variété</span>
              <span className="ml-auto text-earth-600">{prod.variete}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-body text-earth-400">
            <span className="text-earth-300">Mode</span>
            <span className="ml-auto text-earth-600">{prod.mode}</span>
          </div>
          {prod.semis && (
            <div className="flex items-center gap-2 text-xs font-body text-earth-400">
              <span className="text-earth-300">Semis</span>
              <span className="ml-auto text-earth-600">{prod.semis}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-body text-earth-400">
            <span className="text-earth-300">Récolte</span>
            <span className="ml-auto text-earth-600">{prod.recolte}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Productions() {
  return (
    <section id="productions" className="py-24 md:py-36 bg-parchment relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle reveal">Nos Productions</p>
          <h2 className="section-title mt-3 reveal reveal-delay-1">
            Ce que la terre<br />
            <span className="italic text-olive-600">nous offre</span>
          </h2>
          <p className="mt-5 font-body font-300 text-earth-500 max-w-xl mx-auto leading-relaxed reveal reveal-delay-2">
            Des cultures inscrites dans une logique agricole durable — rotation des cultures, respect des cycles naturels et adaptation aux caractéristiques du sol et du climat de Tebourba.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productions.map((prod, i) => (
            <ProductCard key={prod.name} prod={prod} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}