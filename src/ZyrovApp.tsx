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
    setSubmissionState('submitting')
    setMessage('')
    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          consent: form.get('consent') === 'on',
        }),
      })
      const result = await response.json() as { message?: string }
      if (!response.ok) throw new Error(result.message || 'Registration failed.')
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

      <section className="hero" aria-label="Zyrov movement collection">
        <picture>
          <source media="(max-width: 700px)" srcSet="/zyrov-cap-standing-1600.webp" type="image/webp" />
          <img className="hero-image" src="/zyrov-cap-2560.webp" width="2560" height="933" fetchPriority="high" alt="Zyrov models wearing performance caps" />
        </picture>
      </section>

      <section className="manifesto">
        <div className="manifesto-copy">
          <h1>What does it take to create beyond?</h1>
          <p className="manifesto-intro">
            Zyrov is made for people who turn ideas into action. Everyday
            essentials, shaped around comfort and confidence, keep you moving
            from the first thought to whatever comes next.
          </p>
          <p className="membership-note">
            <span>Not every door opens for everyone.</span>
            <span>Some are reserved for <strong>ZYROV Club Members.</strong></span>
          </p>
          <button className="cta" type="button" onClick={() => setRegistrationOpen(true)}>
            <span>Get your exclusive</span>
            <strong>Membership Today</strong>
          </button>
          <CrystalLogo />
        </div>

      </section>

      <footer>
        <a className="footer-mark" href="https://zyrov.in">ZYROV</a>
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
            <h2 id="registration-title">Be the first</h2>
            <p className="registration-intro">ZYROV membership is opening soon. Join the list for early access to new drops, member releases, and what comes next.</p>
            <form onSubmit={registerMember}>
              <div className="field-row">
                <label>Name <span>*</span><input name="name" type="text" placeholder="Your name here" autoComplete="name" minLength={2} required /></label>
                <label>Email <span>*</span><input name="email" type="email" placeholder="Your email here" autoComplete="email" required /></label>
              </div>
              <label>Phone <span>*</span>
                <div className="phone-field"><span>🇮🇳 +91</span><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel-national" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} required /></div>
              </label>
              <small>We will never spam or share your information with third parties.</small>
              <label className="consent-field">
                <input name="consent" type="checkbox" required />
                <span>I agree to ZYROV&apos;s <a href="/terms-and-conditions">Terms &amp; Conditions</a>, consent to the processing of my personal data according to the <a href="/privacy-policy">Privacy Policy</a>, and to receive membership communications by WhatsApp and email. *</span>
              </label>
              <button className="submit-registration" type="submit" disabled={submissionState === 'submitting'}>{submissionState === 'submitting' ? 'Joining...' : 'Get early access'}</button>
              {message && <p className={`form-message ${submissionState}`} role="status">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </main>
  )
}