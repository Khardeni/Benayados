const nodemailer = require('nodemailer')

// ─── HTML Escape ──────────────────────────────────────────────────────────────
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate({ name, email, phone, message }) {
  const errors = {}
  if (!name    || name.trim().length    < 2)    errors.name    = 'Nom requis (min 2 caractères).'
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Email invalide.'
  if (!message || message.trim().length < 10)   errors.message = 'Message requis (min 10 caractères).'
  if (name    && name.trim().length    > 100)   errors.name    = 'Nom trop long.'
  if (message && message.trim().length > 3000)  errors.message = 'Message trop long.'
  return errors
}

// ─── Email: notification to company ──────────────────────────────────────────
function companyEmail({ name, email, phone, message }) {
  return {
    from:    `"Site Benayedos" <${process.env.EMAIL_USER}>`,
    to:      'cyberstoneprod@gmail.com',
    replyTo: email.trim(),
    subject: `📩 Nouveau message de ${name.trim()} — Benayedos`,
    html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e4d4b0;">
  <div style="background:#728f35;padding:28px 32px;">
    <h1 style="color:#fff;margin:0;font-size:20px;">Nouveau message reçu</h1>
    <p style="color:rgba(255,255,255,0.65);margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:2px;">
      Site Benayedos — Formulaire de contact
    </p>
  </div>
  <div style="padding:32px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#a87d3e;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:110px;">Nom</td>
          <td style="padding:8px 0;color:#3b2b18;font-weight:bold;">${esc(name.trim())}</td></tr>
      <tr><td style="padding:8px 0;color:#a87d3e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</td>
          <td style="padding:8px 0;color:#3b2b18;">${esc(email.trim())}</td></tr>
      ${phone?.trim() ? `<tr><td style="padding:8px 0;color:#a87d3e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Téléphone</td>
          <td style="padding:8px 0;color:#3b2b18;">${esc(phone.trim())}</td></tr>` : ''}
    </table>
    <hr style="border:none;border-top:1px solid #e4d4b0;margin:20px 0;" />
    <p style="color:#a87d3e;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Message</p>
    <div style="background:#faf7f2;padding:16px;border-left:3px solid #728f35;white-space:pre-line;color:#3b2b18;line-height:1.7;">
      ${esc(message.trim())}
    </div>
  </div>
  <div style="background:#faf7f2;border-top:1px solid #e4d4b0;padding:14px 32px;font-size:11px;color:#a87d3e;text-align:center;">
    BENAYEDOS · Agriculture authentique en Tunisie · Tebourba, Manouba
  </div>
</div>`,
    text: `Nom: ${name.trim()}\nEmail: ${email.trim()}\nTél: ${phone?.trim() || '-'}\n\n${message.trim()}`,
  }
}

// ─── Email: auto-reply to user ────────────────────────────────────────────────
function autoReply({ name, email }) {
  return {
    from:    `"Benayedos" <${process.env.EMAIL_USER}>`,
    to:      email.trim(),
    subject: 'Benayedos — Nous avons bien reçu votre message',
    html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e4d4b0;">
  <div style="background:#728f35;padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:2px;">Benayedos</h1>
    <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;">Agriculture · Tunisie</p>
  </div>
  <div style="padding:36px;text-align:center;">
    <h2 style="color:#3b2b18;margin:0 0 16px;">Merci, ${esc(name.trim())} !</h2>
    <p style="color:#6e4e28;line-height:1.7;">
      Nous avons bien reçu votre message et vous répondrons dans les <strong>24 à 48 heures</strong>.
    </p>
    <div style="background:#faf7f2;border-left:3px solid #728f35;padding:16px 20px;text-align:left;margin:24px 0;border-radius:2px;">
      <p style="margin:5px 0;color:#a87d3e;">📞 <strong>+216 99 600 520</strong></p>
      <p style="margin:5px 0;color:#a87d3e;">✉️ <strong>benayedos.sl@gmail.com</strong></p>
      <p style="margin:5px 0;color:#a87d3e;">📍 <strong>Tebourba, Manouba — Tunisie</strong></p>
    </div>
    <p style="color:#9db585;font-style:italic;font-size:13px;">
      "Cultivée avec passion depuis des générations."
    </p>
  </div>
  <div style="background:#faf7f2;border-top:1px solid #e4d4b0;padding:14px;font-size:11px;color:#a87d3e;text-align:center;">
    BENAYEDOS · Agriculture authentique en Tunisie
  </div>
</div>`,
    text: `Merci ${name.trim()},\n\nVotre message a bien été reçu. Nous vous répondrons sous 24-48h.\n\nBenayedos\n+216 99 600 520\nbenayedos.sl@gmail.com`,
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {

  // CORS — allow your domain and localhost
  const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:3000',
  ].filter(Boolean)

  const origin = req.headers.origin || ''
  const isAllowed = allowedOrigins.some(o => origin.startsWith(o)) || process.env.NODE_ENV !== 'production'

  res.setHeader('Access-Control-Allow-Origin',  isAllowed ? origin : allowedOrigins[0] || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')

  // Preflight
  if (req.method === 'OPTIONS') return res.status(200).end()

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' })
  }

  // ── Check env vars are configured ──────────────────────────────────────────
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ EMAIL_USER or EMAIL_PASS env vars missing on Vercel!')
    return res.status(500).json({
      success: false,
      message: 'Server email configuration missing. Please contact us directly.',
    })
  }

  try {
    const { name, email, phone, message } = req.body || {}

    // Validate
    const errors = validate({ name, email, phone, message })
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors })
    }

    // Create transporter fresh each invocation (required for serverless)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,              // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Required for Vercel serverless environment
      tls: {
        rejectUnauthorized: true,
      },
    })

    // Verify connection before sending
    await transporter.verify()

    // Send notification to company
    const info = await transporter.sendMail(companyEmail({ name, email, phone, message }))
    console.log(`✅ Company email sent: ${info.messageId}`)

    // Send auto-reply (non-critical — don't fail if this fails)
    try {
      await transporter.sendMail(autoReply({ name, email }))
      console.log('✅ Auto-reply sent')
    } catch (replyErr) {
      console.warn('⚠️  Auto-reply failed (non-critical):', replyErr.message)
    }

    return res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons sous 24–48h.',
    })

  } catch (err) {
    console.error('❌ Serverless contact error:', err.message)
    console.error(err.stack)

    // Specific Gmail auth error
    if (err.message?.includes('Invalid login') || err.message?.includes('Username and Password')) {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check Gmail App Password configuration.',
        debug: process.env.NODE_ENV !== 'production' ? err.message : undefined,
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Erreur serveur. Veuillez réessayer ou nous contacter directement par téléphone.',
    })
  }
}