const nodemailer = require('nodemailer')

// ─── Input Validation ─────────────────────────────────────────────────────────
function validateContactInput({ name, email, phone, message }) {
  const errors = {}
  if (!name || typeof name !== 'string' || name.trim().length < 2)
    errors.name = 'Le nom doit contenir au moins 2 caractères.'
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Format d'email invalide."
  if (phone && typeof phone === 'string' && phone.trim().length > 0)
    if (!/^[+\d\s\-().]{7,20}$/.test(phone.trim()))
      errors.phone = 'Numéro de téléphone invalide.'
  if (!message || typeof message !== 'string' || message.trim().length < 10)
    errors.message = 'Le message doit contenir au moins 10 caractères.'
  if (name && name.trim().length > 100)  errors.name    = 'Nom trop long.'
  if (message && message.trim().length > 3000) errors.message = 'Message trop long.'
  return errors
}

// ─── HTML Escape ──────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

// ─── Email Templates ──────────────────────────────────────────────────────────
function buildEmailToCompany({ name, email, phone, message }) {
  return {
    from: `"Site Benayedos" <${process.env.EMAIL_USER}>`,
    to: 'benayedos.sl@gmail.com',
    replyTo: email.trim(),
    subject: `📩 Nouveau message de ${name.trim()} — Benayedos`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e4d4b0;">
        <div style="background:#728f35;padding:28px 32px;">
          <h1 style="color:#fff;margin:0;font-size:20px;">Nouveau message reçu</h1>
          <p style="color:rgba(255,255,255,0.65);margin:4px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:2px;">
            Site vitrine Benayedos
          </p>
        </div>
        <div style="padding:32px;">
          <p><strong>Nom :</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>Email :</strong> ${escapeHtml(email.trim())}</p>
          ${phone?.trim() ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone.trim())}</p>` : ''}
          <hr style="border:none;border-top:1px solid #e4d4b0;margin:20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="background:#faf7f2;padding:14px;border-left:3px solid #728f35;white-space:pre-line;">${escapeHtml(message.trim())}</p>
        </div>
        <div style="background:#faf7f2;border-top:1px solid #e4d4b0;padding:14px 32px;font-size:11px;color:#a87d3e;text-align:center;">
          BENAYEDOS · Agriculture authentique en Tunisie · Tebourba, Manouba
        </div>
      </div>`,
    text: `Nom: ${name.trim()}\nEmail: ${email.trim()}\nTél: ${phone?.trim() || '-'}\n\n${message.trim()}`,
  }
}

function buildAutoReply({ name, email }) {
  return {
    from: `"Benayedos" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: 'Benayedos — Nous avons bien reçu votre message',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e4d4b0;">
        <div style="background:#728f35;padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:2px;">Benayedos</h1>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;">Agriculture · Tunisie</p>
        </div>
        <div style="padding:36px;text-align:center;">
          <h2 style="color:#3b2b18;">Merci, ${escapeHtml(name.trim())} !</h2>
          <p style="color:#6e4e28;">Nous avons bien reçu votre message et vous répondrons sous 24–48h.</p>
          <div style="background:#faf7f2;border-left:3px solid #728f35;padding:14px 18px;text-align:left;margin:24px 0;">
            <p style="margin:4px 0;color:#a87d3e;">📞 <strong>+216 99 600 520</strong></p>
            <p style="margin:4px 0;color:#a87d3e;">✉️ <strong>benayedos.sl@gmail.com</strong></p>
            <p style="margin:4px 0;color:#a87d3e;">📍 <strong>Tebourba, Manouba — Tunisie</strong></p>
          </div>
        </div>
        <div style="background:#faf7f2;border-top:1px solid #e4d4b0;padding:14px;font-size:11px;color:#a87d3e;text-align:center;">
          BENAYEDOS · Agriculture authentique en Tunisie
        </div>
      </div>`,
    text: `Merci ${name.trim()}, votre message a été reçu.\n\nBenayedos\n+216 99 600 520`,
  }
}

// ─── Serverless Handler ───────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Preflight
  if (req.method === 'OPTIONS') return res.status(200).end()

  // Only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée.' })
  }

  try {
    const { name, email, phone, message } = req.body || {}

    const errors = validateContactInput({ name, email, phone, message })
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, message: 'Données invalides.', errors })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail(buildEmailToCompany({ name, email, phone, message }))

    try {
      await transporter.sendMail(buildAutoReply({ name, email }))
    } catch (e) {
      console.warn('Auto-reply failed (non-critical):', e.message)
    }

    console.log(`✅ Contact from ${email.trim()}`)
    return res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès.',
    })
  } catch (err) {
    console.error('❌ Contact error:', err)
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur. Veuillez réessayer.',
    })
  }
}
