import { useState } from 'react'
import axios from 'axios'

// ─── Config ───────────────────────────────────────────────────────────────────
// FIX: Use an env variable for the API base URL.
// In dev, Vite proxies /api → http://localhost:5000 (configure in vite.config.js).
// In prod, set VITE_API_URL=https://your-api.com in your .env.production file.
const API_BASE = import.meta.env.VITE_API_URL || ''

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' }

// ─── Success Banner (replaces the form after submission) ──────────────────────
function SuccessBanner({ name, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 space-y-6">
      {/* Animated checkmark */}
      <div className="w-16 h-16 bg-olive-50 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-olive-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div>
        <h3 className="font-display text-xl text-earth-800 mb-2">
          Message envoyé, {name} !
        </h3>
        <p className="font-body text-sm text-earth-500 leading-relaxed max-w-sm">
          Nous avons bien reçu votre message et vous répondrons sous 24 à 48 heures.
          Un email de confirmation vous a été envoyé.
        </p>
      </div>

      <button
        onClick={onReset}
        className="font-body text-xs text-olive-600 tracking-[0.15em] uppercase underline underline-offset-4 hover:text-olive-800 transition-colors"
      >
        Envoyer un autre message
      </button>
    </div>
  )
}

// ─── Contact Component ────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  // FIX: status is now: 'idle' | 'loading' | 'success' | 'error'
  // 'success' replaces the form entirely so there's no stale state issue.
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  // FIX: Track the submitted name to personalise the success banner
  const [submittedName, setSubmittedName] = useState('')
  // FIX: Capture the server error message to show it verbatim
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Le nom doit contenir au moins 2 caractères.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Email invalide.'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Le message doit contenir au moins 10 caractères.'
    return e
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    // Clear field error on change
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    setServerError('')

    try {
      // FIX: Use API_BASE so this works in both dev (via Vite proxy) and prod
      const res = await axios.post(`${API_BASE}/contact`, form)

      if (res.data?.success) {
        // FIX: Save name before clearing form, then show success banner
        setSubmittedName(form.name.trim())
        setForm(INITIAL_FORM)
        setErrors({})
        setStatus('success')
      } else {
        // Handles edge-case where server returns 200 but success: false
        setServerError(res.data?.message || 'Une erreur inattendue est survenue.')
        setStatus('error')
      }
    } catch (err) {
      // FIX: Pull the server's error message from the response body if available
      const msg =
        err.response?.data?.message ||
        'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.'
      setServerError(msg)
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setSubmittedName('')
    setServerError('')
  }

  return (
    <section id="contact" className="py-24 md:py-36 bg-cream relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle reveal">Contact</p>
          <h2 className="section-title mt-3 reveal reveal-delay-1">
            Parlons de votre<br />
            <span className="italic text-olive-600">projet ensemble</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="reveal">
            <p className="font-body font-300 text-earth-500 leading-relaxed mb-10">
              Que vous soyez professionnel de l'agro-alimentaire, distributeur ou simplement passionné
              d'agriculture authentique, nous serions ravis d'échanger avec vous.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                  label: 'Responsable',
                  value: 'Hatem Benayed',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: 'Téléphone',
                  value: '+216 99 600 520',
                  href: 'tel:+21699600520',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'benayedos.sl@gmail.com',
                  href: 'mailto:benayedos.sl@gmail.com',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Localisation',
                  value: 'Tebourba, Manouba — Tunisie',
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-olive-50 text-olive-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="font-body text-xs text-earth-400 tracking-[0.15em] uppercase mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-earth-700 hover:text-olive-600 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-earth-700">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-10 h-44 bg-earth-100 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80"
                alt="Tebourba, Manouba"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-cream/90 px-5 py-3 text-center">
                  <p className="font-body text-sm text-earth-700 font-500">Tebourba, Manouba</p>
                  <p className="font-body text-xs text-earth-400">Tunisie du Nord</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form OR Success banner */}
          <div className="reveal reveal-delay-2">
            {/* FIX: Swap the form out entirely on success — no stale state, no page reload */}
            {status === 'success' ? (
              <SuccessBanner name={submittedName} onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block font-body text-xs text-earth-500 tracking-[0.15em] uppercase mb-2">
                    Nom complet *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email + Phone row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs text-earth-500 tracking-[0.15em] uppercase mb-2">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-body text-xs text-earth-500 tracking-[0.15em] uppercase mb-2">
                      Téléphone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+216 XX XXX XXX"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body text-xs text-earth-500 tracking-[0.15em] uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Décrivez votre demande ou votre intérêt..."
                    className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                {/* FIX: Show server error message verbatim, not a generic fallback */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-body">
                    {serverError}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}