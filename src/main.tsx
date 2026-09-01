import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BrandHistory from './BrandHistory.tsx'
import PrivacyPolicy from './PrivacyPolicy.tsx'
import TermsAndConditions from './TermsAndConditions.tsx'
import ZyrovApp from './ZyrovApp.tsx'

const route = window.location.pathname.replace(/\/$/, '')
const isBrandHistory = route === '/brand-history'
const isPrivacyPolicy = route === '/privacy-policy'
const isTermsAndConditions = route === '/terms-and-conditions'
if (isBrandHistory) document.title = 'Our History — ZYROV'
if (isPrivacyPolicy) document.title = 'Privacy Policy — ZYROV'
if (isTermsAndConditions) document.title = 'Terms & Conditions — ZYROV'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isBrandHistory ? <BrandHistory /> : isPrivacyPolicy ? <PrivacyPolicy /> : isTermsAndConditions ? <TermsAndConditions /> : <ZyrovApp />}
  </StrictMode>,
)
