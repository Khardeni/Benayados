require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const nodemailer = require('nodemailer')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting: max 10 contact requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Trop de requêtes. Veuillez réessayer dans 15 minutes.' },
})

// ─── Nodemailer Transporter (singleton — reused across requests) ───────────────
// FIX: Creating a new transporter per request is wasteful and can cause
//      connection pool exhaustion. Create once, reuse everywhere.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (not your account password)
  },
})

// Verify transporter on startup — helps catch bad credentials early
transporter.verify((err) => {
  if (err) {
    console.error('❌ Mail transporter verification failed:', err.message)
  } else {
    console.log('✅ Mail transporter ready')
  }
})

// ─── Input Validation ─────────────────────────────────────────────────────────
function validateContactInput({ name, email, phone, message }) {
  const errors = {}

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères.'
  } else if (name.trim().length > 100) {
    errors.name = 'Nom trop long (max 100 caractères).'
  }

  if (!email || typeof email !== 'string') {
    errors.email = 'Email requis.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Format d'email invalide."
  }

  if (phone && typeof phone === 'string' && phone.trim().length > 0) {
    if (!/^[+\d\s\-().]{7,20}$/.test(phone.trim())) {
      errors.phone = 'Numéro de téléphone invalide.'
    }
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères.'
  } else if (message.trim().length > 3000) {
    errors.message = 'Message trop long (max 3000 caractères).'
  }

  return errors
}

// ─── HTML Escape Helper ───────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ─── Email Templates ──────────────────────────────────────────────────────────
function buildEmailToCompany({ name, email, phone, message }) {
  return {
    from: `"Site Benayedos" <${process.env.EMAIL_USER}>`,
    to: 'cyberstoneprod@gmail.com',
    replyTo: email.trim(),
    subject: `📩 Nouveau message de ${name.trim()} — Benayedos`,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f4ea; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background: #fff; border: 1px solid #e4d4b0; }
          .header { background: #728f35; padding: 32px 36px; }
          .header h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: 1px; }
          .header p { color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
          .body { padding: 36px; }
          .field { margin-bottom: 20px; }
          .field label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a87d3e; margin-bottom: 5px; }
          .field p { margin: 0; font-size: 15px; color: #3b2b18; line-height: 1.6; background: #faf7f2; padding: 12px 14px; border-left: 3px solid #728f35; }
          .footer { background: #faf7f2; border-top: 1px solid #e4d4b0; padding: 18px 36px; font-size: 11px; color: #a87d3e; text-align: center; letter-spacing: 1px; }
          .divider { height: 1px; background: #e4d4b0; margin: 24px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau message reçu</h1>
            <p>Site vitrine Benayedos · Formulaire de contact</p>
          </div>
          <div class="body">
            <div class="field">
              <label>Nom</label>
              <p>${escapeHtml(name.trim())}</p>
            </div>
            <div class="field">
              <label>Email</label>
              <p>${escapeHtml(email.trim())}</p>
            </div>
            ${phone && phone.trim() ? `
            <div class="field">
              <label>Téléphone</label>
              <p>${escapeHtml(phone.trim())}</p>
            </div>` : ''}
            <div class="divider"></div>
            <div class="field">
              <label>Message</label>
              <p style="white-space:pre-line">${escapeHtml(message.trim())}</p>
            </div>
          </div>
          <div class="footer">
            BENAYEDOS · Agriculture authentique en Tunisie · Tebourba, Manouba
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Nouveau message depuis le site Benayedos
========================================
Nom      : ${name.trim()}
Email    : ${email.trim()}
Téléphone: ${phone?.trim() || 'Non fourni'}

Message
-------
${message.trim()}
    `,
  }
}

function buildAutoReply({ name, email }) {
  return {
    from: `"Benayedos" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: 'Benayedos — Nous avons bien reçu votre message',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f4ea; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background: #fff; border: 1px solid #e4d4b0; }
          .header { background: #728f35; padding: 36px; text-align: center; }
          .header h1 { color: #fff; margin: 0 0 8px; font-size: 28px; letter-spacing: 2px; }
          .header p { color: rgba(255,255,255,0.65); margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; }
          .body { padding: 40px 36px; text-align: center; }
          .body h2 { color: #3b2b18; font-size: 20px; margin: 0 0 16px; }
          .body p { color: #6e4e28; font-size: 14px; line-height: 1.8; margin: 0 0 16px; }
          .highlight { background: #f9f4ea; border-left: 3px solid #728f35; padding: 14px 18px; text-align: left; margin: 24px 0; }
          .contact-info { font-size: 13px; color: #a87d3e; margin: 4px 0; }
          .footer { background: #faf7f2; border-top: 1px solid #e4d4b0; padding: 18px; font-size: 11px; color: #a87d3e; text-align: center; letter-spacing: 1px; }
          .divider { display: flex; align-items: center; gap: 12px; margin: 28px 0; }
          .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e4d4b0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Benayedos</h1>
            <p>Agriculture · Tunisie</p>
          </div>
          <div class="body">
            <div class="divider">🌿</div>
            <h2>Merci, ${escapeHtml(name.trim())} !</h2>
            <p>Nous avons bien reçu votre message et nous vous répondrons dans les meilleurs délais, généralement sous 24 à 48 heures.</p>
            <p>En attendant, n'hésitez pas à nous contacter directement :</p>
            <div class="highlight">
              <p class="contact-info">📞 <strong>+216 99 600 520</strong></p>
              <p class="contact-info">✉️ <strong>benayedos.sl@gmail.com</strong></p>
              <p class="contact-info">📍 <strong>Tebourba, Manouba — Tunisie</strong></p>
            </div>
            <p style="color:#9db585; font-style: italic; font-size: 13px;">"La terre de Tebourba, cultivée avec passion depuis des générations."</p>
          </div>
          <div class="footer">
            BENAYEDOS · Agriculture authentique en Tunisie · Tebourba, Manouba
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Merci ${name.trim()}, nous avons bien reçu votre message et vous répondrons sous 24-48h.\n\nCordialement,\nL'équipe Benayedos\nTébourba, Manouba — Tunisie\n+216 99 600 520`,
  }
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Benayedos API', timestamp: new Date().toISOString() })
})

// POST /contact — Handle contact form submissions
app.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    // Validate
    const errors = validateContactInput({ name, email, phone, message })
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides. Veuillez corriger les erreurs.',
        errors,
      })
    }

    // FIX: Send notification to company first (critical path)
    await transporter.sendMail(buildEmailToCompany({ name, email, phone, message }))

    // FIX: Auto-reply is non-critical — fire and forget, don't await
    transporter.sendMail(buildAutoReply({ name, email })).catch((autoReplyErr) => {
      console.warn('Auto-reply failed (non-critical):', autoReplyErr.message)
    })

    console.log(`✅ Contact form submitted by ${email.trim()} at ${new Date().toISOString()}`)

    // FIX: Always return a consistent success shape
    return res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons sous 24-48h.',
    })
  } catch (err) {
    console.error('❌ Contact form error:', err)

    // FIX: Surface a more specific error message for SMTP auth failures
    const isAuthError = err.code === 'EAUTH' || err.responseCode === 535
    return res.status(500).json({
      success: false,
      message: isAuthError
        ? 'Erreur de configuration email. Contactez-nous directement par téléphone.'
        : 'Une erreur serveur est survenue. Veuillez réessayer ou nous contacter par téléphone.',
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable.' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Erreur interne du serveur.' })
})

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
🌿 Benayedos API running
   ─────────────────────────
   Port    : ${PORT}
   Env     : ${process.env.NODE_ENV || 'development'}
   Health  : http://localhost:${PORT}/health
  `)
})