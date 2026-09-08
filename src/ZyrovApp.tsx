import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import BrandHistory from './BrandHistory.tsx'
import CrystalLogo from './CrystalLogo.tsx'
import PrivacyPolicy from './PrivacyPolicy.tsx'
import TermsAndConditions from './TermsAndConditions.tsx'
import './Zyrov.css'

type FooterPanel = 'brand-history' | 'privacy-policy' | 'terms-and-conditions' | 'contact'

const HERO_SLIDES = [
  {
    desktop: '/zyrov-hero-3-2560.webp?v=20260908a',
    mobile: '/zyrov-hero-3-1600.webp?v=20260908a',
    alt: 'ZYROV contemporary movement and comfort',
  },
  {
    desktop: '/zyrov-cap-2560.webp?v=20260906b',
    mobile: '/zyrov-cap-standing-1600.webp?v=20260906b',
    alt: 'ZYROV performance caps collection',
  },
  {
    desktop: '/zyrov-hero-2-2560.webp?v=20260906b',
    mobile: '/zyrov-hero-2-1600.webp?v=20260906b',
    alt: 'ZYROV lifestyle footwear and apparel',
  },
  {
    desktop: '/zyrov-hero-4-2560.webp?v=20260906b',
    mobile: '/zyrov-hero-4-1600.webp?v=20260906b',
    alt: 'ZYROV new arrivals collection',
  },
]

const RibbonPlaneIcon = () => (
  <div className="towed-banner-unit">
    <div className="towed-plane-wrapper">
      <picture>
        <source srcSet="/plane-icon.webp" type="image/webp" />
        <img src="/plane-icon.png" alt="" className="ribbon-plane-img" width="46" height="20" decoding="async" />
      </picture>
    </div>
    <div className="tow-harness" aria-hidden="true">
      <svg viewBox="0 0 40 16" fill="none" className="tow-cable-svg">
        <line x1="0" y1="8" x2="26" y2="8" stroke="#888888" strokeWidth="1.2" />
        <line x1="26" y1="8" x2="40" y2="2" stroke="#888888" strokeWidth="1" />
        <line x1="26" y1="8" x2="40" y2="14" stroke="#888888" strokeWidth="1" />
      </svg>
    </div>
    <div className="towed-banner-body">
      <span>A private world of exclusive privileges, members-only benefits &amp; special access, created for those who choose ZYROV.</span>
    </div>
  </div>
)

export default function ZyrovApp() {
  const [introStage, setIntroStage] = useState<'tagline' | 'announcement' | 'opening'>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'opening' : 'tagline',
  )
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [footerPanel, setFooterPanel] = useState<FooterPanel | null>(null)
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const registrationRef = useRef<HTMLDivElement>(null)
  const footerPanelRef = useRef<HTMLDivElement>(null)

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
    // Preload slideshow assets in background for smooth transitions
    const isMobile = window.matchMedia('(max-width: 700px)').matches
    HERO_SLIDES.forEach((slide) => {
      const img = new Image()
      img.src = isMobile ? slide.mobile : slide.desktop
    })
  }, [])

  useEffect(() => {
    const heroTimer = window.setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 4000)
    return () => window.clearInterval(heroTimer)
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

  useEffect(() => {
    if (!footerPanel) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFooterPanel(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    footerPanelRef.current?.querySelector<HTMLElement>('button, input, a[href]')?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
      previouslyFocused?.focus()
    }
  }, [footerPanel])

  function keepFocusInDialog(event: ReactKeyboardEvent<HTMLDivElement>, dialogRef: React.RefObject<HTMLDivElement | null>) {
    if (event.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]')
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
      setMessage('Thank you! Your request has been successfully submitted. Your membership status will be confirmed shortly via email or WhatsApp.')
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
        <div className="membership-ribbon-track">
          <div className="membership-ribbon-content">
            <RibbonPlaneIcon />
            <RibbonPlaneIcon />
          </div>
          <div className="membership-ribbon-content" aria-hidden="true">
            <RibbonPlaneIcon />
            <RibbonPlaneIcon />
          </div>
        </div>
      </aside>

      <section className="hero" aria-label="Zyrov movement collection">
        <div className="hero-slideshow" aria-live="off">
          {HERO_SLIDES.map((slide, index) => (
            <picture
              key={slide.desktop}
              className={`hero-slide ${index === currentHeroSlide ? 'is-active' : ''}`}
              aria-hidden={index !== currentHeroSlide}
            >
              <source media="(max-width: 700px)" srcSet={slide.mobile} type="image/webp" />
              <img
                className="hero-image"
                src={slide.desktop}
                width="2560"
                height="1097"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                alt={slide.alt}
              />
            </picture>
          ))}
        </div>
        <button
          className="scroll-cue"
          type="button"
          onClick={() => {
            document.querySelector('.manifesto')?.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Scroll down to manifesto"
        >
          <span>Scroll Down</span>
          <i aria-hidden="true" />
        </button>
      </section>

      <section className="manifesto">
        <CrystalLogo />
        <div className="manifesto-copy">
          <h1>What’s waiting on the other side of your next step?</h1>
          <p className="manifesto-intro">
            A new idea.
            <br />
            A new place.
            <br />
            A new opportunity.
            <br />
            Maybe a new you.
            <br /><br />
            <span className="manifesto-moves">
              ZYROV is made to move with you bringing comfort and confidence to every step forward.
            </span>
            <br /><br />
            <strong className="manifesto-final-line">Your next chapter starts with a move.</strong>
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
          <button type="button" onClick={() => setFooterPanel('brand-history')}>About ZYROV</button>
          <button type="button" onClick={() => setFooterPanel('privacy-policy')}>Privacy Policy</button>
          <button type="button" onClick={() => setFooterPanel('terms-and-conditions')}>Terms &amp; Conditions</button>
          <button type="button" onClick={() => setFooterPanel('contact')}>Contact</button>
        </nav>
        <p>© {new Date().getFullYear()} ZYROV. All rights reserved.</p>
      </footer>

      {registrationOpen && (
        <div className="registration" ref={registrationRef} role="dialog" aria-modal="true" aria-labelledby="registration-title" onKeyDown={(event) => keepFocusInDialog(event, registrationRef)}>
          <CrystalLogo />
          <button className="registration-close" type="button" onClick={() => setRegistrationOpen(false)} aria-label="Close registration form">×</button>
          <a className="registration-mark" href="https://zyrov.in">ZYROV</a>
          <div className="registration-content">
            <h2 id="registration-title">Be the part of Exclusive Club</h2>
            <p className="registration-intro">
              A privileged experience designed for those who want first access to exclusive drops, limited releases and everything beyond.
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
              <p className="consent-field">By submitting this form, I agree to ZYROV&apos;s <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>, consent to the processing of my personal data according to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, and to receive membership communications by WhatsApp and email.</p>
              <button className={`submit-registration ${submissionState === 'submitting' ? 'is-submitting' : ''}`} type="submit" disabled={submissionState === 'submitting'}>{submissionState === 'submitting' ? 'Submitting...' : 'CLAIM YOUR SPACE'}</button>
              {message && submissionState === 'error' && <p className="form-message error" role="alert">{message}</p>}
            </form>
          </div>
        </div>
      )}

      {message && submissionState === 'success' && (
        <div className="success-popup-backdrop" role="dialog" aria-modal="true" aria-label="Registration confirmation">
          <div className="success-popup">
            <button className="success-popup-close" type="button" onClick={() => setMessage('')} aria-label="Close confirmation">×</button>
            <p role="status">{message}</p>
          </div>
        </div>
      )}

      {footerPanel && (
        <div className="registration footer-panel" ref={footerPanelRef} role="dialog" aria-modal="true" aria-label={footerPanel === 'contact' ? 'Contact ZYROV' : undefined} onKeyDown={(event) => keepFocusInDialog(event, footerPanelRef)}>
          {footerPanel === 'brand-history' && <BrandHistory onClose={() => setFooterPanel(null)} />}
          {footerPanel === 'privacy-policy' && <PrivacyPolicy onClose={() => setFooterPanel(null)} />}
          {footerPanel === 'terms-and-conditions' && <TermsAndConditions onClose={() => setFooterPanel(null)} />}
          {footerPanel === 'contact' && (
            <section className="footer-contact">
              <picture className="footer-contact-bg">
                <source media="(max-width: 700px)" srcSet="/contact-us-1600.webp" type="image/webp" />
                <img src="/contact-us-2560.webp" alt="Contact ZYROV background" decoding="async" />
              </picture>
              <div className="footer-contact-overlay" aria-hidden="true" />
              <button className="registration-close" type="button" onClick={() => setFooterPanel(null)} aria-label="Close contact">×</button>
              <a className="registration-mark" href="https://zyrov.in">ZYROV</a>
              <div className="footer-contact-content">
                <p>Contact</p>
                <h2>We would love to hear from you.</h2>
                <div className="footer-contact-links">
                  <p>
                    <a href="mailto:media@zyrov.club" className="contact-link">
                      <span className="contact-icon email-animated-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="3" />
                          <path d="M22 6L12 13L2 6" className="envelope-flap" />
                        </svg>
                      </span>
                      <span className="contact-label">Email:</span>
                      <span className="contact-value">media@zyrov.club</span>
                    </a>
                  </p>
                  <p>
                    <a href="https://wa.me/919667799721" target="_blank" rel="noopener noreferrer" className="contact-link">
                      <span className="contact-icon whatsapp-animated-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          <path d="M9.5 8.5c0 .5 1.5 3 2.5 4s3.5 2 4 2 .5-1 .5-1.5-.5-1-1-1-1 .5-1.5.5-1.5-.5-2.5-1.5S10 10 10 9.5s.5-1 0-1-.5 0-.5 0z" fill="currentColor" stroke="none" className="whatsapp-phone-inner" />
                        </svg>
                      </span>
                      <span className="contact-label">WhatsApp:</span>
                      <span className="contact-value">+91 9667799721</span>
                    </a>
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  )
}