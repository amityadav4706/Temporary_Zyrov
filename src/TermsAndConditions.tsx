import type { ReactNode } from 'react'
import './PrivacyPolicy.css'

type SectionProps = {
  number: number
  title: string
  children: ReactNode
}

function Section({ number, title, children }: SectionProps) {
  return (
    <section>
      <h2><span>{String(number).padStart(2, '0')}</span>{title}</h2>
      {children}
    </section>
  )
}

export default function TermsAndConditions() {
  return (
    <main className="policy-page">
      <header className="policy-header">
        <a className="policy-mark" href="/">ZYROV</a>
        <a className="policy-back" href="/">Back to home</a>
      </header>

      <article className="policy-content terms-content">
        <p className="policy-eyebrow">Legal</p>
        <h1>TERMS &amp; CONDITIONS</h1>
        <p className="policy-updated">Last Updated: September 4, 2026</p>
        <div className="policy-intro">
          <p>Welcome to <strong>ZYROV</strong>.</p>
          <p>These Terms &amp; Conditions (“Terms”, “Agreement”) govern your access to and use of the ZYROV website, mobile application, digital platforms, products, services, membership programmes, promotional programmes, and related services (collectively, the “Platform”).</p>
          <p>By accessing, browsing, registering on, or purchasing from the Platform, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms.</p>
          <p>If you do not agree to these Terms, you should discontinue use of the Platform.</p>
          <p>These Terms shall be read together with ZYROV’s <strong>Privacy Policy, Terms of Use, Returns &amp; Refund Policy, Shipping Policy, Cookie Policy, Membership Terms, Promotional Terms</strong>, and any other policies or terms expressly incorporated into this Agreement.</p>
        </div>

        <Section number={1} title="DEFINITIONS">
          <p>For purposes of these Terms:</p>
          <p><strong>“ZYROV”, “ZYROV Club”, “we”, “us”, or “our”</strong> means ZYROV and, where applicable, its affiliates, authorised representatives, successors, and permitted assigns.</p>
          <p><strong>“Customer”, “you”, or “your”</strong> means any person accessing the Platform or purchasing, attempting to purchase, or using any ZYROV product or service.</p>
          <p><strong>“Product”</strong> means any footwear, apparel, bags, caps, accessories, lifestyle products, or other products offered by ZYROV.</p>
          <p><strong>“Membership”</strong> means any membership, loyalty, rewards, subscription, customer programme, or similar programme introduced by ZYROV.</p>
          <p><strong>“Offer” or “Promotion”</strong> means any discount, coupon, promotional price, cashback, reward, gift, voucher, free product, limited-time benefit, campaign, or other commercial incentive offered by ZYROV.</p>
        </Section>

        <Section number={2} title="ELIGIBILITY">
          <p>You may use the Platform only if you have the legal capacity to enter into a binding agreement under applicable law.</p>
          <p>Where applicable law requires parental or guardian involvement, persons below the applicable legal age may use the Platform only with the involvement and consent of their parent or legal guardian.</p>
          <p>ZYROV reserves the right to refuse access, registration, membership, or transactions where permitted by applicable law.</p>
        </Section>

        <Section number={3} title="PLATFORM USE">
          <p>You agree to use the Platform only for lawful and legitimate purposes.</p>
          <p>You must not:</p>
          <ul>
            <li>Use the Platform for fraudulent, unlawful, deceptive, or unauthorised purposes;</li><li>Provide false, inaccurate, misleading, or incomplete information;</li><li>Attempt to gain unauthorised access to the Platform, accounts, systems, or databases;</li><li>Interfere with the security or operation of the Platform;</li><li>Introduce viruses, malware, malicious code, or other harmful material;</li><li>Scrape, crawl, copy, harvest, or systematically extract Platform content without authorisation;</li><li>Create multiple accounts for the purpose of abusing offers, promotions, memberships, rewards, or other benefits;</li><li>Circumvent restrictions imposed by ZYROV;</li><li>Impersonate another person or entity; or</li><li>Engage in conduct that may adversely affect ZYROV, its customers, partners, or Platform.</li>
          </ul>
          <p>ZYROV may restrict or terminate access where it reasonably believes that these Terms have been violated.</p>
        </Section>

        <Section number={4} title="PRODUCTS & PRODUCT INFORMATION">
          <p>ZYROV makes reasonable efforts to ensure that product descriptions, photographs, specifications, sizes, colours, prices, availability, and other product information displayed on the Platform are accurate.</p>
          <p>However, reasonable variations may occur due to:</p>
          <ul><li>Photography and lighting;</li><li>Screen or device settings;</li><li>Material characteristics;</li><li>Manufacturing processes;</li><li>Product batches; or</li><li>Other circumstances beyond reasonable control.</li></ul>
          <p>ZYROV reserves the right to correct errors, update product information, change specifications, modify availability, or discontinue products at any time, subject to applicable law.</p>
        </Section>

        <Section number={5} title="PRICES, TAXES & CHARGES">
          <p>Prices displayed on the Platform are subject to applicable taxes, duties, delivery charges, and other charges expressly communicated at checkout.</p><p>ZYROV reserves the right to change prices at any time.</p><p>A price change shall not ordinarily affect an order that has already been accepted and confirmed, except where correction is required due to an obvious error, fraud, technical issue, or other circumstance permitted by applicable law.</p>
        </Section>

        <Section number={6} title="ORDERS & ORDER ACCEPTANCE">
          <p>An order placed through the Platform constitutes an offer by the customer to purchase the selected Product(s).</p><p>Receipt of an order confirmation does not necessarily constitute final acceptance where further verification or fulfilment processing is required.</p><p>ZYROV reserves the right to accept, reject, cancel, or limit an order where permitted by applicable law, including where:</p>
          <ul><li>Products are unavailable;</li><li>There is an apparent pricing, description, or technical error;</li><li>Payment cannot be verified or processed;</li><li>Fraudulent, suspicious, or abusive activity is suspected;</li><li>The order violates these Terms;</li><li>An Offer or Membership benefit has been improperly applied; or</li><li>Circumstances beyond ZYROV’s reasonable control prevent fulfilment.</li></ul>
          <p>Where an accepted order is cancelled by ZYROV after payment has been received, any eligible refund shall be processed in accordance with applicable law and the applicable refund policy.</p>
        </Section>

        <Section number={7} title="PAYMENT">
          <p>Payments must be made through payment methods made available on the Platform.</p><p>You represent that you are authorised to use the payment method submitted.</p><p>Payment processing may be carried out by authorised third-party payment service providers.</p><p>ZYROV may not store complete payment-card information on its own systems where payment processing is handled by third-party providers.</p>
        </Section>

        <Section number={8} title="MEMBERSHIP PROGRAMME">
          <p>ZYROV may introduce one or more Membership, Loyalty, Rewards, Subscription, VIP, or other customer programmes from time to time.</p><p>Membership may provide eligible members with benefits such as discounts, rewards, early access, exclusive products, special pricing, promotional offers, priority access, gifts, or other benefits as specified by ZYROV.</p><p>Membership benefits may be subject to additional terms and eligibility conditions.</p>
          <h3>8.1 Membership Discretion</h3><p><strong>ZYROV and its management reserve the right, at their sole discretion and subject to applicable law, to introduce, modify, suspend, withdraw, replace, extend, restrict, or discontinue any Membership programme, Membership benefit, eligibility criterion, reward, privilege, or associated term at any time.</strong></p><p><strong>ZYROV may also change the structure, pricing, duration, qualification requirements, earning or redemption criteria, benefits, exclusions, limitations, or other terms applicable to Membership from time to time.</strong></p><p>Where legally permissible, such changes may be made <strong>without prior notice or individual intimation.</strong> However, where applicable law requires prior notice, communication, or preservation of an accrued right or benefit, ZYROV shall comply with such requirement.</p>
          <h3>8.2 No Guaranteed Membership Benefit</h3><p>Membership benefits are subject to availability and the applicable Membership terms.</p><p>Unless expressly stated otherwise, Membership does not create a vested or permanent right to any particular discount, reward, product, service, price, offer, or benefit.</p><p>ZYROV does not guarantee that any particular benefit will remain available for the entire duration of a Membership.</p>
          <h3>8.3 Membership Termination</h3><p>ZYROV may suspend, restrict, cancel, or terminate a Membership, subject to applicable law, where:</p><ul><li>The Member violates these Terms;</li><li>Fraudulent or abusive activity is suspected;</li><li>Membership benefits are misused;</li><li>Multiple or duplicate accounts are created for improper purposes;</li><li>False information is provided; or</li><li>The Membership programme is discontinued.</li></ul><p>Where a Membership is terminated due to suspected fraud or abuse, ZYROV may cancel or withhold improperly obtained rewards or benefits to the extent permitted by law.</p>
+          <h3>8.4 Transferability</h3><p>Unless expressly permitted by ZYROV, Memberships, rewards, points, coupons, benefits, vouchers, and privileges are personal to the registered member and may not be sold, transferred, assigned, exchanged, or commercially exploited.</p>
        </Section>

        <Section number={9} title="OFFERS, DISCOUNTS & PROMOTIONS">
          <p>ZYROV may introduce Offers and Promotions from time to time.</p><p>Each Offer may have specific eligibility criteria, validity periods, product exclusions, usage limits, minimum purchase requirements, or other conditions.</p>
          <h3>9.1 Right to Modify or Withdraw Offers</h3><p><strong>ZYROV and its management reserve the right, at their sole discretion and subject to applicable law, to modify, extend, suspend, restrict, replace, withdraw, or discontinue any Offer, Promotion, discount, coupon, voucher, reward, campaign, or promotional benefit at any time.</strong></p><p>Where legally permissible, such changes may be made <strong>without prior notice or individual intimation.</strong> No Offer shall be deemed permanent unless expressly stated otherwise.</p>
          <h3>9.2 Promotional Errors</h3><p>If an Offer is displayed or applied incorrectly due to a technical, typographical, pricing, system, or other error, ZYROV reserves the right, subject to applicable law, to correct the error and take appropriate action regarding affected transactions.</p>
          <h3>9.3 One or Multiple Offers</h3><p>Unless expressly stated otherwise, Offers may not be combined with other discounts, coupons, rewards, Membership benefits, or promotional codes.</p><p>ZYROV may specify whether an Offer can be used once per customer, account, household, order, product, or other qualifying unit.</p>
          <h3>9.4 Abuse of Offers</h3><p>ZYROV reserves the right to cancel, reject, or restrict promotional benefits where it reasonably believes that an Offer has been obtained through fraud, manipulation, multiple accounts, unauthorised activity, technical exploitation, or other abuse, subject to applicable law.</p>
        </Section>

        <Section number={10} title="COUPONS, VOUCHERS & REWARDS"><p>Coupons, vouchers, credits, rewards, and promotional codes may be subject to additional terms, including expiry dates, product exclusions, minimum order values, usage limits, and account restrictions.</p><p>Unless expressly stated otherwise:</p><ul><li>They have no cash value;</li><li>They may not be redeemed for cash;</li><li>They may not be transferred or resold;</li><li>They may not be reproduced or duplicated; and</li><li>They may not be combined with other benefits.</li></ul><p>Unused promotional benefits may expire upon expiry, cancellation, termination, or discontinuation of the applicable programme, subject to applicable law.</p></Section>
        <Section number={11} title="SHIPPING & DELIVERY"><p>ZYROV will make reasonable efforts to dispatch and deliver accepted orders within the estimated timelines communicated at checkout or after purchase.</p><p>Delivery timelines are estimates and may be affected by logistics disruptions, weather, governmental restrictions, strikes, natural events, technical failures, or other circumstances beyond reasonable control.</p><p>Please refer to the applicable Shipping Policy for additional information.</p></Section>
        <Section number={12} title="RETURNS, EXCHANGES & REFUNDS"><p>Returns, exchanges, replacements, cancellations, and refunds are governed by the applicable <strong>ZYROV Returns &amp; Refund Policy.</strong></p><p>Unless otherwise specified, eligible returns must be requested within <strong>3 (three) calendar days from the date of delivery</strong>, subject to the conditions and exclusions stated in that Policy.</p><p>Nothing in these Terms or the Returns &amp; Refund Policy shall exclude or restrict any mandatory statutory right or remedy available to a customer under applicable law.</p></Section>
        <Section number={13} title="INTELLECTUAL PROPERTY"><p>All intellectual property contained on or forming part of the Platform belongs to ZYROV or its respective licensors unless expressly stated otherwise.</p><p>This includes:</p><ul><li>ZYROV trademarks and logos;</li><li>Brand names;</li><li>Product names;</li><li>Product designs;</li><li>Photographs;</li><li>Videos;</li><li>Graphics;</li><li>Illustrations;</li><li>Text;</li><li>Website design;</li><li>Software;</li><li>User interfaces;</li><li>Marketing materials; and</li><li>Other proprietary content.</li></ul><p>No ownership or unrestricted licence is granted to you by virtue of accessing or using the Platform.</p><p>You may not reproduce, copy, modify, distribute, publish, sell, license, create derivative works from, or commercially exploit ZYROV intellectual property without prior written permission.</p></Section>
        <Section number={14} title="USER CONTENT & REVIEWS"><p>Where the Platform allows customers to submit reviews, photographs, comments, feedback, or other content, you remain responsible for the content submitted.</p><p>You represent that you have the necessary rights to submit such content and that it does not violate applicable law or third-party rights.</p><p>By submitting User Content, you grant ZYROV a non-exclusive, worldwide, royalty-free licence, to the extent permitted by law, to use, reproduce, display, publish, distribute, adapt, and communicate such content for legitimate business, customer-service, marketing, promotional, and Platform-related purposes.</p><p>ZYROV may moderate, remove, or restrict User Content where reasonably necessary and permitted by law.</p></Section>
        <Section number={15} title="PRIVACY & PERSONAL DATA"><p>Your use of the Platform is subject to the ZYROV Privacy Policy.</p><p>ZYROV may collect and process personal information in accordance with applicable privacy and data-protection laws.</p><p>The manner in which personal information is collected, processed, stored, used, disclosed, and protected is described in the Privacy Policy.</p></Section>
        <Section number={16} title="THIRD-PARTY SERVICES"><p>The Platform may use or integrate with third-party services, including payment processors, logistics providers, hosting providers, analytics services, communication providers, social media services, and other technology providers.</p><p>ZYROV does not control all third-party services and is not responsible for their independent policies, practices, availability, or content, except to the extent required by applicable law.</p></Section>
        <Section number={17} title="DISCLAIMERS"><p>To the maximum extent permitted by applicable law, the Platform is provided on an “as available” basis.</p><p>ZYROV does not guarantee that:</p><ul><li>The Platform will always be available;</li><li>The Platform will always be uninterrupted or error-free;</li><li>Product information will never contain errors;</li><li>All products will remain continuously available; or</li><li>The Platform will be completely free from technical or security risks.</li></ul><p>Nothing in these Terms excludes or limits any liability, warranty, consumer right, or statutory remedy that cannot legally be excluded or limited.</p></Section>
        <Section number={18} title="LIMITATION OF LIABILITY"><p>To the maximum extent permitted by applicable law, ZYROV shall not be liable for indirect, incidental, special, consequential, or punitive losses arising from use of the Platform.</p><p>Nothing in this clause shall exclude or limit liability where such exclusion or limitation is prohibited by applicable law.</p><p>Mandatory consumer rights and statutory remedies shall remain unaffected.</p></Section>
        <Section number={19} title="INDEMNIFICATION"><p>To the extent permitted by applicable law, you agree to indemnify and hold harmless ZYROV, its affiliates, officers, directors, employees, representatives, and service providers against claims, losses, liabilities, damages, costs, and expenses arising from:</p><ul><li>Your violation of these Terms;</li><li>Your unlawful use of the Platform;</li><li>Your fraudulent or abusive conduct;</li><li>Your User Content;</li><li>Your infringement of third-party rights; or</li><li>Your violation of applicable law.</li></ul><p>This provision shall apply only to the extent permitted by law.</p></Section>
        <Section number={20} title="FRAUD, ABUSE & MISUSE"><p>ZYROV may investigate suspected fraudulent, abusive, deceptive, or unlawful activity relating to the Platform, orders, accounts, Memberships, Offers, rewards, or transactions.</p><p>Where permitted by law, ZYROV may:</p><ul><li>Cancel or restrict affected transactions;</li><li>Suspend or terminate accounts;</li><li>Cancel improperly obtained rewards;</li><li>Restrict access to promotional programmes;</li><li>Restrict Membership benefits; and</li><li>Take appropriate legal or other action.</li></ul><p>Nothing in this section limits any legitimate statutory consumer rights.</p></Section>
        <Section number={21} title="FORCE MAJEURE"><p>ZYROV shall not be liable for delay, interruption, or failure to perform obligations caused by circumstances beyond its reasonable control, including natural disasters, war, civil unrest, governmental action, epidemics, transportation disruptions, labour disputes, infrastructure failures, cyber incidents, or third-party service failures.</p></Section>
        <Section number={22} title="CHANGES TO THESE TERMS"><p><strong>ZYROV reserves the right to amend, modify, update, supplement, or replace these Terms &amp; Conditions from time to time.</strong></p><p>Changes may be made to reflect:</p><ul><li>Changes in products or services;</li><li>Changes in business practices;</li><li>Changes in technology;</li><li>Changes in Membership or promotional programmes;</li><li>Security requirements;</li><li>Regulatory requirements; or</li><li>Other legitimate business requirements.</li></ul><p>Updated Terms will be published on the Platform with a revised “Last Updated” date.</p><p><strong>Unless otherwise required by applicable law, your continued access to or use of the Platform after the updated Terms are published shall constitute your acceptance of the revised Terms.</strong></p><p>Where applicable law requires additional notice, consent, or communication for a particular change, ZYROV shall provide such notice or obtain such consent as required.</p></Section>
        <Section number={23} title="RESERVATION OF RIGHTS"><p>Except for rights expressly granted to customers under these Terms or applicable law, <strong>ZYROV reserves all rights not expressly granted herein.</strong></p><p>No failure or delay by ZYROV in exercising any right, power, or remedy shall constitute a waiver of that right, power, or remedy.</p></Section>
        <Section number={24} title="SEVERABILITY"><p>If any provision of these Terms is held to be invalid, unlawful, or unenforceable, that provision shall be modified or severed to the extent necessary. The remaining provisions shall continue in full force and effect.</p></Section>
        <Section number={25} title="GOVERNING LAW"><p>These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>, subject to applicable mandatory consumer-protection and other statutory rights.</p><p>Any dispute arising from or relating to these Terms shall be subject to the jurisdiction of competent courts in <strong>Gurugram, Haryana, India</strong>, subject to any mandatory jurisdictional rights available to consumers under applicable law.</p></Section>
        <Section number={26} title="GRIEVANCE REDRESSAL"><p>ZYROV shall maintain appropriate customer-support and grievance mechanisms as required by applicable law.</p><p>Customers may raise complaints, concerns, or requests through the official contact details and grievance channels provided on the Platform.</p><p>Where applicable law prescribes specific acknowledgement or resolution timelines, ZYROV shall comply with such requirements.</p></Section>
        <Section number={27} title="ENTIRE AGREEMENT"><p>These Terms, together with the policies expressly incorporated by reference, constitute the agreement governing your use of the Platform and your transactions with ZYROV, except where otherwise required by applicable law.</p><p>If there is a conflict between these Terms and a specific product, promotional, Membership, or transaction-specific term, the more specific applicable term shall prevail to the extent of the conflict, subject to applicable law.</p></Section>
        <Section number={28} title="CONTACT INFORMATION"><p>For questions, complaints, requests, or other matters relating to these Terms, please contact ZYROV through the official contact details published on the Platform.</p><p><strong>ZYROV</strong></p><p className="policy-signoff">COMFORT. QUALITY. LIFESTYLE.<br /><strong>Designed for today. Built for what&apos;s next.</strong></p></Section>
      </article>
    </main>
  )
}
