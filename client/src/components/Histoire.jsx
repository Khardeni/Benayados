export default function Histoire() {
  return (
    <section id="histoire" className="py-24 md:py-36 olive-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <p className="section-subtitle reveal">Notre Histoire</p>
            <div className="divider-ornament reveal reveal-delay-1">
              <svg className="w-5 h-5 text-earth-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8c0 5 6 14 6 14s6-9 6-14c0-3-2.5-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </div>
            <h2 className="section-title mb-8 reveal reveal-delay-1">
              Un héritage<br />
              <span className="italic text-olive-600">cultivé avec soin</span>
            </h2>

            <div className="space-y-5 text-earth-600 font-body font-300 leading-relaxed">
              <p className="reveal reveal-delay-2">
                Au cœur des terres agricoles de <strong className="font-500 text-earth-700">Chewigui-Tebourba de la gouvernorat de Manouba</strong>, l'exploitation <strong className="font-500 text-earth-700">Benayedos</strong> perpétue une relation ancienne et respectueuse avec la terre.
              </p>
              <p className="reveal reveal-delay-3">
                Fondée par <strong className="font-500 text-earth-700">Brahim Ben Ayed (1884 – 1935)</strong>, l'exploitation a ensuite été reprise par son fils aîné <strong className="font-500 text-earth-700">Tahar Ben Ayed (1918 – 2010)</strong>, qui en a pris la responsabilité à l'âge de 17 ans. Depuis <em>2010</em>, l'exploitation est dirigée par <strong className="font-500 text-earth-700">Hatem Ben Ayed</strong>, poursuivant ainsi une tradition agricole transmise de génération en génération.
              </p>
              <p className="reveal reveal-delay-4">
                Née d'une conviction simple, Benayedos produit une agriculture authentique, enracinée dans le rythme des saisons et dans le <strong className="font-500 text-earth-700">savoir-faire agricole tunisien</strong>. Situées au cœur de plaines céréalières, ses terres bénéficient d'un climat méditerranéen particulièrement favorable à la culture des céréales et des légumineuses.
              </p>
              <p className="reveal reveal-delay-5">
                Conduites selon des méthodes privilégiant la <strong className="font-500 text-earth-700">culture pluviale et la rotation des cultures</strong>, nos productions préservent la fertilité des sols et garantissent une agriculture durable, saison après saison.
              </p>
            </div>

            {/* Productions */}
            <div className="mt-10 reveal reveal-delay-5">
              <p className="font-body text-xs text-earth-400 tracking-[0.15em] uppercase mb-4">Nos productions</p>
              <div className="flex flex-wrap gap-2">
                {['Blé', 'Fève', 'Féverole', 'Pois chiche', 'Fenugrec', 'Huile d\'olive'].map((item) => (
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
                { value: '3+', label: 'Générations' },
                { value: '6', label: 'Productions' },
                { value: 'Tebourba', label: 'Notre terroir' },
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
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=80"
                alt="Champs agricoles de Tebourba"
                className="w-full aspect-[4/5] object-cover shadow-2xl"
              />
              {/* Floating accent card */}
              <div className="absolute -bottom-8 -left-8 bg-cream border border-earth-100 p-5 shadow-xl max-w-xs">
                <p className="font-display italic text-sm text-earth-600 leading-relaxed">
                  "Benayedos, c'est une terre de travail, de patience et de transmission."
                </p>
                <p className="font-body text-xs text-earth-400 mt-3 tracking-[0.1em] uppercase">Famille Benayed</p>
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