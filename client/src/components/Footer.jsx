export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-earth-900 text-cream/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-cream mb-2">Benayedos</h3>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-olive-500 mb-4">
              Agriculture · Tunisie
            </p>
            <p className="font-body text-sm font-300 leading-relaxed">
              Exploitation agricole familiale à Tebourba, cultivant avec respect et passion depuis des générations.
            </p>
          </div>

          {/* Productions */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-cream/40 mb-5">
              Nos Productions
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {['Blé', 'Fève', 'Féverole', 'Pois chiche', 'Foin', 'Fenugrec', "Huile d'olive"].map(p => (
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
              Contact
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
            © {year} Benayedos. Tous droits réservés.
          </p>
          <p className="font-body text-xs text-earth-600 italic">
            Agriculture authentique · Tebourba, Tunisie
          </p>
        </div>
      </div>
    </footer>
  )
}
