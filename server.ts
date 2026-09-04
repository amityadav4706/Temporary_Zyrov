import Database from 'better-sqlite3'
import express, { type NextFunction, type Request, type Response } from 'express'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

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
const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL
const memberRequestWindowMs = 60_000
const memberRequestLimit = 5
const memberRequests = new Map<string, { count: number; windowStartedAt: number }>()

const app = express()
app.use(express.json({ limit: '16kb' }))
app.use((error: unknown, _request: Request, response: Response, next: NextFunction) => {
  if (error instanceof SyntaxError) {
    response.status(400).json({ message: 'Request body must contain valid JSON.' })
    return
  }

  next(error)
})

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/members', async (request, response) => {
  const now = Date.now()
  const clientAddress = request.ip || request.socket.remoteAddress || 'unknown'
  const requestWindow = memberRequests.get(clientAddress)
  if (memberRequests.size > 1000) {
    for (const [address, entry] of memberRequests) {
      if (now - entry.windowStartedAt >= memberRequestWindowMs) memberRequests.delete(address)
    }
  }
  if (!requestWindow || now - requestWindow.windowStartedAt >= memberRequestWindowMs) {
    memberRequests.set(clientAddress, { count: 1, windowStartedAt: now })
  } else if (requestWindow.count >= memberRequestLimit) {
    response.status(429).json({ message: 'Too many registration attempts. Please try again in a minute.' })
    return
  } else {
    requestWindow.count += 1
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {}
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const phoneDigits = typeof body.phone === 'string' ? body.phone.replace(/\D/g, '') : ''
  const consent = body.consent === true

  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !/^[6-9]\d{9}$/.test(phoneDigits) || !consent) {
    response.status(400).json({ message: 'Please complete every required field with valid information.' })
    return
  }

  if (!emailWebhookUrl) {
    console.error('Member notification email is not configured. Set EMAIL_WEBHOOK_URL.')
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
      const emailResponse = await fetch(emailWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, createdAt, memberId }),
        signal: AbortSignal.timeout(15_000),
      })
      const emailResult = await emailResponse.json() as { ok?: boolean; message?: string }
      if (!emailResponse.ok || emailResult.ok !== true) {
        throw new Error(emailResult.message || `Email webhook failed with status ${emailResponse.status}.`)
      }
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

app.use('/api', (_request, response) => {
  response.status(404).json({ message: 'API endpoint not found.' })
})

app.use(express.static(staticDirectory, {
  setHeaders(response, filePath) {
    if (filePath.includes(`${join('dist', 'assets')}`)) {
      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (filePath.endsWith('.html')) {
      response.setHeader('Cache-Control', 'no-cache')
    }
  },
}))
app.use((request, response, next) => {
  const isApiRequest = request.path === '/api' || request.path.startsWith('/api/')
  if (!isApiRequest && (request.method === 'GET' || request.method === 'HEAD') && request.accepts('html')) {
    response.setHeader('Cache-Control', 'no-cache')
    response.sendFile(join(staticDirectory, 'index.html'))
    return
  }

  next()
})

const port = Number(process.env.PORT || process.env.API_PORT) || 3001
app.listen(port, '0.0.0.0', () => {
  console.log(`ZYROV web service ready on port ${port}`)
})