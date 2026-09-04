import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import CrystalLogo from './CrystalLogo.tsx'
import './Zyrov.css'

export default function ZyrovApp() {
  const [introStage, setIntroStage] = useState<'tagline' | 'announcement' | 'opening'>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'opening' : 'tagline',
  )
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const registrationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.body.style.overflow = 'hidden'
    const showAnnouncement = window.setTimeout(() => setIntroStage('announcement'), 3000)
    const openCurtain = window.setTimeout(() => setIntroStage('opening'), 6000)
    const restoreScroll = window.setTimeout(() => {
      document.body.style.overflow = ''
    }, 7000)
    return () => {
      window.clearTimeout(showAnnouncement)
      window.clearTimeout(openCurtain)
      window.clearTimeout(restoreScroll)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!registrationOpen) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setRegistrationOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    registrationRef.current?.querySelector<HTMLElement>('button, input, a[href]')?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
      previouslyFocused?.focus()
    }
  }, [registrationOpen])

  function keepFocusInRegistration(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return
    const focusable = registrationRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]')
    if (!focusable?.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  async function registerMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const registrationForm = event.currentTarget
    const form = new FormData(event.currentTarget)
    const getTextValue = (fieldName: string) => {
      const value = form.get(fieldName)
      return typeof value === 'string' ? value.trim() : ''
    }
    const name = getTextValue('name')
    const email = getTextValue('email').toLowerCase()
    const phone = getTextValue('phone')

    if (name.length < 2) {
      setSubmissionState('error')
      setMessage('Please enter your name.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSubmissionState('error')
      setMessage('Please check email id')
      return
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setSubmissionState('error')
      setMessage('Please check phone number')
      return
    }

    setSubmissionState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          consent: true,
        }),
        signal: AbortSignal.timeout(10_000),
      })
      const result = await response.json().catch(() => null) as { message?: string } | null
      if (!response.ok || !result) throw new Error(result?.message || 'Registration failed.')
      setSubmissionState('success')
      setMessage('You are in. We will contact you when membership access opens.')
      registrationForm.reset()
    } catch (error) {
      setSubmissionState('error')
      setMessage(error instanceof Error ? error.message : 'Registration failed.')
    }
  }

  return (
    <main>
      <div className={`page-intro is-${introStage}`} aria-hidden="true">
        <p className="page-intro-tagline">Made to <strong>Move Beyond.</strong></p>
        <p className="page-intro-announcement"><strong>Coming Soon.</strong> Stay Tuned.</p>
      </div>

      <aside className="membership-ribbon" aria-label="Membership announcement">
        A private world of exclusive privileges, members-only benefits &amp; special access, created for those who choose ZYROV.
      </aside>

      <section className="hero" aria-label="Zyrov movement collection">
        <picture>
          <source media="(max-width: 700px)" srcSet="/zyrov-cap-standing-1600.webp?v=20260905-2" type="image/webp" />
          <img className="hero-image" src="/zyrov-cap-2560.webp?v=20260905" width="2560" height="1097" fetchPriority="high" decoding="async" alt="Zyrov models wearing performance caps" />
        </picture>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll Down</span>
          <i />
        </div>
      </section>

      <section className="manifesto">
        <CrystalLogo />
        <div className="manifesto-copy">
          <h1>Why stop at ordinary?</h1>
          <p className="manifesto-intro">
            You weren&apos;t made to follow every step someone else took.
            <br /><br />
            <span className="manifesto-moves">
              Make your own moves.
              <br />
              Take your own route.
              <br />
              Find your own next.
            </span>
            <br /><br />
            <strong>Make your move.</strong>
          </p>
          <p className="membership-note">
            <span>Not every door opens for everyone.</span>
            <span>Some are reserved for <strong>Members</strong> only</span>
          </p>
          <button className="cta" type="button" onClick={() => setRegistrationOpen(true)}>
            <span>Get your exclusive</span>
            <strong>Membership Today</strong>
          </button>
          <div className="manifesto-wordmark-space" aria-hidden="true" />
        </div>

      </section>

      <footer>
        <CrystalLogo />
        <a className="footer-logo-link" href="https://zyrov.in">
          <img className="footer-logo" src="/zyrov-gold-logo-512.webp?v=20260905" width="512" height="341" loading="lazy" decoding="async" alt="ZYROV — Comfort. Style. You." />
        </a>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/brand-history">Brand History</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          <a href="mailto:info@zyrov.in">Contact</a>
        </nav>
        <p>© {new Date().getFullYear()} ZYROV. All rights reserved.</p>
      </footer>

      {registrationOpen && (
        <div className="registration" ref={registrationRef} role="dialog" aria-modal="true" aria-labelledby="registration-title" onKeyDown={keepFocusInRegistration}>
          <button className="registration-close" type="button" onClick={() => setRegistrationOpen(false)} aria-label="Close registration form">×</button>
          <a className="registration-mark" href="https://zyrov.in">ZYROV</a>
          <div className="registration-content">
            <h2 id="registration-title">Be the part of Exclusive Club</h2>
            <p className="registration-intro">
              A privileged experience designed for those who want <strong>first access to exclusive drops, limited releases and everything beyond.</strong>
            </p>
            <form onSubmit={registerMember}>
              <div className="field-row">
                <label>Name <span>*</span><input name="name" type="text" placeholder="Your name here" autoComplete="name" minLength={2} required /></label>
                <label>Email <span>*</span><input name="email" type="email" placeholder="Your email here" autoComplete="email" spellCheck={false} onInvalid={(event) => event.currentTarget.setCustomValidity('Please check email id')} onInput={(event) => event.currentTarget.setCustomValidity('')} required /></label>
              </div>
              <label>Phone <span>*</span>
                <div className="phone-field"><span>🇮🇳 +91</span><input name="phone" type="tel" placeholder="10-digit mobile number" autoComplete="tel-national" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} onInvalid={(event) => event.currentTarget.setCustomValidity('Please check phone number')} onInput={(event) => { event.currentTarget.setCustomValidity(''); event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 10) }} required /></div>
              </label>
              <small className="privacy-note"><span className="privacy-lock" aria-hidden="true">🔒</span><span>No spam calling, privacy assured!</span></small>
              <p className="consent-field">By submitting this form, I agree to ZYROV&apos;s <a href="/terms-and-conditions">Terms &amp; Conditions</a>, consent to the processing of my personal data according to the <a href="/privacy-policy">Privacy Policy</a>, and to receive membership communications by WhatsApp and email.</p>
              <button className="submit-registration" type="submit" disabled={submissionState === 'submitting'}>{submissionState === 'submitting' ? 'Joining...' : 'CLAIM YOUR SPACE'}</button>
              {message && <p className={`form-message ${submissionState}`} role={submissionState === 'error' ? 'alert' : 'status'}>{message}</p>}
            </form>
          </div>
        </div>
      )}
    </main>
  )
}