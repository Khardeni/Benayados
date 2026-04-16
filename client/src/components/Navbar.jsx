import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { IMAGES } from '../images'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const isRtl = i18n.language?.startsWith('ar')

  const links = [
    { label: t('nav.histoire'), href: '#histoire' },
    { label: t('nav.terre'), href: '#terre' },
    { label: t('nav.productions'), href: '#productions' },
    { label: t('nav.vision'), href: '#vision' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [i18n.language])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-earth-100' : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          onClick={e => scrollTo(e, 'body')}
          className="flex items-center gap-2.5 group"
        >
          <img
            src={IMAGES.logo}
            alt="Benayedos"
            className={`h-8 w-auto object-contain transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-90 brightness-0 invert'
              }`}
          />
          <div className="flex flex-col leading-none">
            <span className={`font-display text-xl font-600 tracking-wide transition-colors duration-300 ${scrolled ? 'text-earth-800' : 'text-cream'
              }`}>
              Benayedos
            </span>
            <span className={`font-body text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${scrolled ? 'text-olive-600' : 'text-cream/70'
              }`}>
              {t('footer.tagline')}
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className={`nav-link ${active === link.href ? 'nav-active' : ''} ${scrolled ? '' : 'text-cream/80 hover:text-cream'
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: Language switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher scrolled={scrolled} />
          <a
            href="#contact"
            onClick={e => scrollTo(e, '#contact')}
            className={`inline-flex items-center gap-2 font-body text-sm tracking-wider px-5 py-2.5 border transition-all duration-300 ${scrolled
              ? 'border-olive-600 text-olive-700 hover:bg-olive-600 hover:text-cream'
              : 'border-cream/60 text-cream hover:bg-cream/10'
              }`}
          >
            {t('nav.cta')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher scrolled={scrolled} />
          <button
            onClick={() => setOpen(!open)}
            className={`flex flex-col gap-1.5 p-2 ${scrolled ? 'text-earth-700' : 'text-cream'}`}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-cream/98 backdrop-blur-md border-t border-earth-100 px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              className="nav-link py-2 border-b border-earth-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}