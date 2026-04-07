const pillars = [
  {
    number: '01',
    title: 'Respect de la terre',
    desc: " Préserver la fertilité des sols et maintenir l’équilibre naturel des cultures.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Qualité des productions',
    desc: " Produire des cultures saines adaptées au terroir et aux saisons.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Transmission du savoir',
    desc: " Maintenir les pratiques agricoles traditionnelles tout en intégrant les techniques modernes lorsque cela est nécessaire.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
]

export default function Vision() {
  return (
    <section id="vision" className="py-24 md:py-36 bg-olive-900 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-olive-900/90 via-olive-800/95 to-earth-900/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-body text-olive-400 text-xs tracking-[0.3em] uppercase mb-3 reveal">Vision & Engagement</p>
          <h2 className="font-display text-3xl md:text-5xl text-cream leading-tight reveal reveal-delay-1">
            Nos trois piliers
          </h2>
          <p className="mt-5 font-body font-300 text-cream max-w-xl mx-auto leading-relaxed reveal reveal-delay-2">L’exploitation Benayedos s’inscrit dans une vision d’agriculture <strong className="text-olive-400"><em>durable </em></strong> fondée sur trois principes essentiels :</p>
          <div className="flex items-center justify-center gap-4 mt-6 reveal reveal-delay-2">
            <div className="w-12 h-px bg-olive-600" />
            <div className="w-2 h-2 bg-olive-500 rotate-45" />
            <div className="w-12 h-px bg-olive-600" />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map(({ number, title, desc, icon }, i) => (
            <div
              key={number}
              className={`reveal reveal-delay-${i + 1} group relative`}
            >
              {/* Top accent line */}
              <div className="w-12 h-0.5 bg-olive-500 mb-8 group-hover:w-24 transition-all duration-500" />

              {/* Number */}
              <span className="font-display text-6xl text-olive-700/30 font-700 leading-none block mb-4">
                {number}
              </span>

              {/* Icon */}
              <div className="text-olive-400 mb-5 group-hover:text-olive-300 transition-colors">
                {icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl text-cream mb-4 group-hover:text-olive-200 transition-colors">
                {title}
              </h3>
              <p className="font-body text-sm text-olive-300/70 font-300 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-24 text-center reveal">
          <blockquote className="font-display italic text-2xl md:text-3xl text-cream/60 max-w-2xl mx-auto leading-relaxed">
            "Cultiver, c'est croire en demain."
          </blockquote>
          <p className="mt-4 font-body text-xs text-olive-500 tracking-[0.3em] uppercase">Philosophie Benayedos</p>
        </div>
      </div>
    </section>
  )
}
