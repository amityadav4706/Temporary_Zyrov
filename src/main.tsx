import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const route = window.location.pathname.replace(/\/$/, '')
const isBrandHistory = route === '/brand-history'
const isPrivacyPolicy = route === '/privacy-policy'
const isTermsAndConditions = route === '/terms-and-conditions'
const Page = isBrandHistory
  ? lazy(() => import('./BrandHistory.tsx'))
  : isPrivacyPolicy
    ? lazy(() => import('./PrivacyPolicy.tsx'))
    : isTermsAndConditions
      ? lazy(() => import('./TermsAndConditions.tsx'))
      : lazy(() => import('./ZyrovApp.tsx'))

if (isBrandHistory) document.title = 'About ZYROV — ZYROV'
if (isPrivacyPolicy) document.title = 'Privacy Policy — ZYROV'
if (isTermsAndConditions) document.title = 'Terms & Conditions — ZYROV'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  </StrictMode>,
)
