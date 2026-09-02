import Database from 'better-sqlite3'
import express from 'express'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const appDirectory = dirname(fileURLToPath(import.meta.url))
const dataDirectory = process.env.DATA_DIR || join(appDirectory, 'data')
const staticDirectory = join(appDirectory, 'dist')
mkdirSync(dataDirectory, { recursive: true })

const database = new Database(join(dataDirectory, 'zyrov-members.db'))
database.pragma('journal_mode = WAL')
database.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    consent INTEGER NOT NULL CHECK (consent = 1),
    created_at TEXT NOT NULL
  )
`)

const insertMember = database.prepare(`
  INSERT INTO members (name, email, phone, consent, created_at)
  VALUES (@name, @email, @phone, 1, @createdAt)
`)
const deleteMember = database.prepare('DELETE FROM members WHERE id = ?')
const senderEmail = 'zyrovbrand@gmail.com'
const notificationRecipient = 'amit@zyrov.in'

function createMailTransport() {
  const pass = process.env.SMTP_PASS
  if (!pass) return null

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    auth: { user: senderEmail, pass },
  })
}

const mailTransport = createMailTransport()

const app = express()
app.use(express.json({ limit: '16kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/members', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : ''
  const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const phoneDigits = typeof request.body.phone === 'string' ? request.body.phone.replace(/\D/g, '') : ''
  const consent = request.body.consent === true

  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !/^[6-9]\d{9}$/.test(phoneDigits) || !consent) {
    response.status(400).json({ message: 'Please complete every required field with valid information.' })
    return
  }

  if (!mailTransport) {
    console.error('Member notification email is not configured. Set SMTP_PASS to the Gmail App Password.')
    response.status(503).json({ message: 'Registration email is temporarily unavailable. Please try again later.' })
    return
  }

  const createdAt = new Date().toISOString()
  const phone = `+91${phoneDigits}`

  try {
    const result = insertMember.run({
      name,
      email,
      phone,
      createdAt,
    })

    const memberId = Number(result.lastInsertRowid)
    try {
      await mailTransport.sendMail({
        from: `ZYROV <${senderEmail}>`,
        to: notificationRecipient,
        replyTo: email,
        subject: `ZYROV early access registration: ${name}`,
        text: [
          'A new ZYROV early access registration was submitted.',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          'Consent accepted: Yes',
          `Submitted at: ${createdAt}`,
          `Member ID: ${memberId}`,
        ].join('\n'),
      })
    } catch (error) {
      deleteMember.run(memberId)
      console.error('Member notification email failed:', error)
      response.status(502).json({ message: 'Registration email could not be sent. Please try again.' })
      return
    }

    response.status(201).json({ id: memberId, createdAt })
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      response.status(409).json({ message: 'This email is already registered for early access.' })
      return
    }
    console.error(error)
    response.status(500).json({ message: 'Registration could not be saved. Please try again.' })
  }
})

app.use(express.static(staticDirectory))
app.use((request, response, next) => {
  if (request.method === 'GET' && request.accepts('html')) {
    response.sendFile(join(staticDirectory, 'index.html'))
    return
  }

  next()
})

const port = Number(process.env.PORT || process.env.API_PORT) || 3001
app.listen(port, '0.0.0.0', () => {
  console.log(`ZYROV web service ready on port ${port}`)
})