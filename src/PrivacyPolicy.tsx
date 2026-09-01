import './PrivacyPolicy.css'

const informationItems = [
  'Full name', 'Email address', 'Mobile or telephone number', 'Billing and shipping address',
  'Delivery information', 'Account credentials', 'Order and purchase history', 'Product preferences',
  'Information provided when contacting customer support',
]

const technicalItems = [
  'IP address', 'Browser type and version', 'Device type', 'Operating system', 'Language preferences',
  'Time zone', 'Device identifiers', 'Approximate location derived from technical information',
  'Pages viewed and interactions with the Platform', 'Date and time of access', 'Referring website or source',
]

export default function PrivacyPolicy() {
  return (
    <main className="policy-page">
      <header className="policy-header">
        <a className="policy-mark" href="/">ZYROV</a>
        <a className="policy-back" href="/">Back to home</a>
      </header>

      <article className="policy-content">
        <p className="policy-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="policy-updated">Last Updated: September 1, 2026</p>

        <div className="policy-intro">
          <p>At <strong>ZYROV</strong>, we respect your privacy and are committed to protecting the personal information entrusted to us.</p>
          <p>This Privacy Policy explains how ZYROV (“ZYROV”, “we”, “us”, or “our”) collects, uses, processes, stores, shares, and protects information when you access or use our website, mobile applications, online services, or purchase our products.</p>
          <p>By accessing or using the ZYROV Platform, you acknowledge that you have read and understood this Privacy Policy.</p>
        </div>

        <section>
          <h2><span>01</span> Information We Collect</h2>
          <p>Depending on how you interact with ZYROV, we may collect the following categories of information.</p>
          <h3>1.1 Personal Information</h3>
          <p>We may collect information such as:</p>
          <ul>{informationItems.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3>1.2 Payment Information</h3>
          <p>When you make a purchase, payment information may be processed through authorised third-party payment service providers.</p>
          <p>Where applicable, ZYROV may receive limited transaction-related information, such as payment status, transaction reference, payment method, or other information necessary to process and reconcile your order.</p>
          <p>We generally do not store complete payment-card details on our own systems unless specifically required and legally permitted.</p>
          <h3>1.3 Device &amp; Technical Information</h3>
          <p>When you access our Platform, certain technical information may be collected automatically, including:</p>
          <ul>{technicalItems.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3>1.4 Cookies &amp; Similar Technologies</h3>
          <p>ZYROV may use cookies, pixels, tags, SDKs, and similar technologies to:</p>
          <ul>
            <li>Keep the Platform functioning properly</li><li>Remember preferences</li>
            <li>Maintain shopping-cart and session functionality</li><li>Understand how customers use the Platform</li>
            <li>Improve website and application performance</li><li>Measure marketing effectiveness</li>
            <li>Provide relevant communications or advertising, where permitted</li>
          </ul>
          <p>You may be able to manage certain cookie preferences through your browser or available Platform controls. Disabling certain cookies may affect the functionality of the Platform.</p>
        </section>

        <section>
          <h2><span>02</span> How We Use Your Information</h2>
          <p>We may use personal information for legitimate business and operational purposes, including to:</p>
          <ul>
            <li>Create and manage customer accounts</li><li>Process and fulfil orders</li><li>Process payments</li>
            <li>Arrange shipping and delivery</li><li>Provide customer support</li>
            <li>Process returns, exchanges, replacements, and refunds</li><li>Communicate regarding orders and services</li>
            <li>Send promotional communications where permitted and where appropriate consent has been obtained</li>
            <li>Personalise your experience</li><li>Improve our products, services, website, and applications</li>
            <li>Conduct analytics and business intelligence</li><li>Detect and prevent fraud, abuse, and security threats</li>
            <li>Maintain Platform security</li><li>Comply with applicable laws and legal obligations</li>
            <li>Protect the rights, property, and legitimate interests of ZYROV and its customers</li>
          </ul>
        </section>

        <section>
          <h2><span>03</span> Marketing Communications</h2>
          <p>Where permitted by applicable law, ZYROV may send promotional communications regarding products, collections, offers, events, launches, or other brand-related information.</p>
          <p>You may unsubscribe from marketing communications at any time by following the unsubscribe instructions contained in the communication or by contacting us through the available customer-support channels.</p>
          <p>Please note that even if you opt out of promotional communications, we may continue to send essential transactional or service-related communications, such as order confirmations, delivery updates, security notices, or important account information.</p>
        </section>

        <section>
          <h2><span>04</span> How We Share Information</h2>
          <p>ZYROV does not sell your personal information as a commercial commodity.</p>
          <p>We may share information with selected third parties where reasonably necessary to operate our business and provide services to you, including:</p>
          <h3>Service Providers</h3>
          <p>These may include:</p>
          <ul>
            <li>Payment processors</li><li>Logistics and delivery partners</li><li>Technology and hosting providers</li>
            <li>Cloud-service providers</li><li>Customer-support providers</li><li>Analytics providers</li>
            <li>Marketing and communication service providers</li><li>Other vendors supporting our business operations</li>
          </ul>
          <p>Such parties may process information only to the extent necessary to provide their services, subject to applicable contractual, legal, and security requirements.</p>
          <h3>Legal &amp; Regulatory Requirements</h3>
          <p>We may disclose information where required or permitted by applicable law, regulation, court order, governmental authority, legal process, or where reasonably necessary to protect the rights, safety, security, or property of ZYROV, our customers, or others.</p>
          <h3>Business Transfers</h3>
          <p>If ZYROV undergoes a merger, acquisition, restructuring, financing, sale of assets, or other business transaction, personal information may be transferred as part of that transaction, subject to applicable law and appropriate safeguards.</p>
        </section>

        <section>
          <h2><span>05</span> Data Retention</h2>
          <p>We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including:</p>
          <ul>
            <li>Providing products and services</li><li>Maintaining business and transaction records</li>
            <li>Resolving disputes</li><li>Preventing fraud</li><li>Enforcing agreements</li>
            <li>Complying with applicable legal, tax, accounting, regulatory, and reporting requirements</li>
          </ul>
          <p>When information is no longer required, we may securely delete, anonymise, or otherwise dispose of it in accordance with applicable law and our internal retention practices.</p>
        </section>

        <section>
          <h2><span>06</span> Data Security</h2>
          <p>ZYROV takes reasonable technical, organisational, and administrative measures designed to protect personal information against unauthorised access, disclosure, alteration, misuse, loss, or destruction.</p>
          <p>Security measures may include access controls, authentication mechanisms, encryption where appropriate, monitoring, and other safeguards.</p>
          <p>However, no electronic transmission or storage system can be guaranteed to be completely secure. Accordingly, while we take reasonable steps to protect your information, we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2><span>07</span> Third-Party Services</h2>
          <p>Our Platform may contain links to or integrations with third-party websites, applications, payment providers, social media platforms, analytics services, or other external services.</p>
          <p>Those third parties may have their own privacy policies and terms.</p>
          <p>ZYROV is not responsible for the privacy practices, security, content, or policies of third-party services that we do not control.</p>
          <p>We encourage you to review the privacy policies of relevant third parties before providing them with personal information.</p>
        </section>

        <section>
          <h2><span>08</span> Children&apos;s Privacy</h2>
          <p>The ZYROV Platform is not intended to knowingly collect personal information directly from children in circumstances where such collection is prohibited by applicable law.</p>
          <p>Where a product or service is intended for children, purchases and account activities should be undertaken by or with the involvement of a parent or legal guardian where required by law.</p>
          <p>If you believe that a child has provided personal information to ZYROV in circumstances where such collection was not permitted, please contact us so that we can take appropriate action.</p>
        </section>

        <section>
          <h2><span>09</span> Your Privacy Rights</h2>
          <p>Subject to applicable law, you may have rights relating to your personal information, which may include the right to:</p>
          <ul>
            <li>Request access to certain personal information</li><li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of information where legally applicable</li><li>Withdraw consent where processing is based on consent</li>
            <li>Object to or restrict certain processing activities</li><li>Opt out of certain marketing communications</li>
            <li>Raise a privacy-related complaint</li><li>Exercise other rights provided under applicable law</li>
          </ul>
          <p>The availability and scope of these rights may depend on applicable legislation and the circumstances of the request.</p>
          <p>To exercise an applicable privacy right, please contact ZYROV using the contact details provided below.</p>
          <p>We may need to verify your identity before processing certain requests.</p>
        </section>

        <section>
          <h2><span>10</span> Consent</h2>
          <p>Where required by applicable law, ZYROV will obtain appropriate consent before collecting or processing personal information for specified purposes.</p>
          <p>Where processing is based on consent, you may withdraw that consent subject to applicable legal or contractual limitations.</p>
          <p>Withdrawal of consent will not affect the lawfulness of processing carried out before the withdrawal.</p>
        </section>

        <section>
          <h2><span>11</span> International Data Transfers</h2>
          <p>Certain service providers used by ZYROV may process or store information in locations outside your country of residence.</p>
          <p>Where personal information is transferred across jurisdictions, ZYROV will take reasonable steps to ensure that such transfers are carried out in accordance with applicable data-protection laws and appropriate safeguards.</p>
        </section>

        <section>
          <h2><span>12</span> Data Protection &amp; Privacy Compliance</h2>
          <p>ZYROV seeks to comply with applicable privacy and data-protection laws and regulations governing the collection and processing of personal information.</p>
          <p>Where applicable, this includes requirements relating to lawful processing, transparency, security, consent, individual rights, data retention, and grievance handling.</p>
        </section>

        <section>
          <h2><span>13</span> Data Breaches &amp; Security Incidents</h2>
          <p>If ZYROV becomes aware of a security incident involving personal information, we will assess the incident and take reasonable steps to contain, investigate, mitigate, and address it.</p>
          <p>Where notification is legally required, ZYROV will provide notifications to affected individuals, regulators, or other relevant parties in accordance with applicable law.</p>
        </section>

        <section>
          <h2><span>14</span> Changes to This Privacy Policy</h2>
          <p>ZYROV may update this Privacy Policy from time to time to reflect changes in our products, services, technologies, business practices, or applicable legal requirements.</p>
          <p>When we make changes, we will update the “Last Updated” date displayed at the beginning of this Privacy Policy.</p>
          <p>We encourage you to review this Privacy Policy periodically.</p>
          <p>Your continued use of the Platform following an update may constitute acknowledgement of the revised Privacy Policy to the extent permitted by applicable law.</p>
        </section>

        <section>
          <h2><span>15</span> Governing Law</h2>
          <p>This Privacy Policy shall be governed by and interpreted in accordance with the applicable laws of <strong>India</strong>, subject to any mandatory privacy or consumer-protection rights applicable to you.</p>
        </section>

        <section className="policy-contact">
          <h2><span>16</span> Contact Us</h2>
          <p>If you have questions, requests, concerns, or complaints regarding this Privacy Policy or the processing of your personal information, you may contact ZYROV through the official contact information provided on the Platform.</p>
          <strong>ZYROV</strong>
          <p className="policy-signoff">Privacy matters. Trust matters.<br />Your information deserves both.</p>
        </section>
      </article>
    </main>
  )
}