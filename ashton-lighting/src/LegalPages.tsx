// ─── Legal Pages: Privacy Policy & Terms of Service ──────────────────────────

// ─── Shared Layout ────────────────────────────────────────────────────────────

function LegalLayout({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', color: 'var(--cream)', fontFamily: 'var(--font-body)' }}>

      {/* Top Nav */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(1,8,16,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--cream)', cursor: 'pointer', letterSpacing: '-0.01em' }}
          onClick={onClose}
        >
          Ashton Holiday Lighting
        </span>
        <button
          onClick={onClose}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '8px 18px', color: 'var(--cream-dim)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream-dim)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M10 2L2 10M2 2l8 8"/>
          </svg>
          Back to Site
        </button>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '72px 48px 120px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--cream)', marginBottom: 12, lineHeight: 1.1 }}>{title}</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', marginBottom: 60, fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
          Last updated: March 22, 2026&nbsp;&nbsp;|&nbsp;&nbsp;Ashton Holiday Lighting, Omaha, Nebraska
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          {children}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--cream-dim)' }}>
          © {new Date().getFullYear()} Ashton Holiday Lighting. All rights reserved. Omaha, Nebraska.
        </span>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
        >
          Return to ashtonholidaylighting.com
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--cream)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      <div style={{ fontSize: '0.91rem', color: 'var(--cream-mid)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </div>
  )
}

function ContactBox() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '20px 24px', marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.88rem' }}>
      <p style={{ fontWeight: 700, color: 'var(--cream)', marginBottom: 4 }}>Ashton Holiday Lighting</p>
      <p style={{ color: 'var(--cream-dim)' }}>Omaha, Nebraska</p>
      <p style={{ color: 'var(--cream-dim)' }}>Phone: <a href="tel:4028898640" style={{ color: 'var(--gold)', textDecoration: 'none' }}>(402) 889-8640</a></p>
      <p style={{ color: 'var(--cream-dim)' }}>Email: <a href="mailto:info@ashtonholidaylighting.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>info@ashtonholidaylighting.com</a></p>
    </div>
  )
}

// ─── Privacy Policy ───────────────────────────────────────────────────────────

export function PrivacyPolicy({ onClose }: { onClose: () => void }) {
  return (
    <LegalLayout title="Privacy Policy" onClose={onClose}>

      <Section title="1. Introduction">
        <p>Ashton Holiday Lighting ("we," "us," or "our") operates the website located at ashtonholidaylighting.com (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site or contact us for services.</p>
        <p>By using our Site, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site.</p>
      </Section>

      <Section title="2. Information We Collect">
        <p><strong style={{ color: 'var(--cream)' }}>Information You Provide Directly:</strong> When you fill out our contact form, book a consultation, or opt in to SMS communications, we may collect your name, email address, phone number, home address (for consultation scheduling), and any message or notes you provide.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Information Collected Automatically:</strong> When you visit our Site, we may automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, and pages visited. This information is used to analyze trends, administer the Site, and improve user experience.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Photos Submitted to the AI Visualizer:</strong> If you use our AI House Visualizer feature, you may upload a photo of your home. This photo is transmitted securely to our AI processing service solely for the purpose of generating a visualization preview. Photos are not stored on our servers and are not used for any other purpose.</p>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use the information we collect for the following purposes:</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>To respond to your inquiries and provide requested services</li>
          <li>To schedule and confirm on-site consultations</li>
          <li>To send you SMS text messages if you have opted in to receive them (see Section 5)</li>
          <li>To send transactional emails related to your consultation or service</li>
          <li>To improve our website, services, and customer experience</li>
          <li>To comply with applicable laws and regulations</li>
        </ul>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this policy or as required by law.</p>
      </Section>

      <Section title="4. Sharing of Information">
        <p><strong style={{ color: 'var(--cream)' }}>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, including GoHighLevel (CRM and scheduling platform) and Google (AI processing for the House Visualizer). These parties are contractually obligated to keep your information confidential and use it only for the services they provide to us.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
        <p><strong style={{ color: 'var(--cream)' }}>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</p>
      </Section>

      <Section title="5. SMS Text Message Communications">
        <p><strong style={{ color: 'var(--cream)' }}>Opt-In Consent:</strong> By providing your phone number and expressly consenting to receive SMS communications from Ashton Holiday Lighting (whether through our website contact form, chat widget, or other means), you agree to receive recurring automated text messages at the phone number provided. These messages may include appointment reminders, service updates, promotional offers, and follow-up communications related to your inquiry.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Message Frequency:</strong> Message frequency varies. You may receive up to 4 messages per month.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Message and Data Rates:</strong> Message and data rates may apply depending on your mobile carrier and plan.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Opt-Out:</strong> You may opt out of receiving SMS messages at any time by replying <strong style={{ color: 'var(--cream)' }}>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message. For help, reply <strong style={{ color: 'var(--cream)' }}>HELP</strong> or contact us at (402) 889-8640.</p>
        <p><strong style={{ color: 'var(--cream)' }}>No Purchase Required:</strong> Consent to receive SMS messages is not a condition of purchasing any goods or services from us.</p>
        <p><strong style={{ color: 'var(--cream)' }}>Carrier Disclaimer:</strong> Carriers are not liable for delayed or undelivered messages.</p>
      </Section>

      <Section title="6. Cookies and Tracking Technologies">
        <p>Our Site may use cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our Site may not function properly.</p>
      </Section>

      <Section title="7. Data Security">
        <p>We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>Our Site is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately and we will take steps to delete such information.</p>
      </Section>

      <Section title="9. Your Rights">
        <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete the personal information we hold about you. To exercise any of these rights, please contact us using the information below.</p>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. Your continued use of the Site after any changes constitutes your acceptance of the updated Privacy Policy.</p>
      </Section>

      <Section title="11. Contact Us">
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
        <ContactBox />
      </Section>

    </LegalLayout>
  )
}

// ─── Terms of Service ─────────────────────────────────────────────────────────

export function TermsOfService({ onClose }: { onClose: () => void }) {
  return (
    <LegalLayout title="Terms of Service" onClose={onClose}>

      <Section title="1. Agreement to Terms">
        <p>By accessing or using the website at ashtonholidaylighting.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site. These Terms apply to all visitors, users, and others who access or use the Site.</p>
      </Section>

      <Section title="2. Services Described">
        <p>Ashton Holiday Lighting provides professional installation of permanent outdoor LED lighting systems (including Govee-brand products) for residential and commercial properties in the Omaha, Nebraska area. The Site serves as an informational and lead-generation platform. Actual service agreements, pricing, and scope of work are established through separate written quotes and contracts provided at the time of consultation.</p>
      </Section>

      <Section title="3. Use of the Site">
        <p>You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Site. You must not:</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Use the Site in any way that violates applicable local, state, national, or international law or regulation</li>
          <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
          <li>Attempt to gain unauthorized access to any part of the Site or its related systems</li>
          <li>Upload or transmit viruses or any other malicious code</li>
          <li>Use the AI House Visualizer feature for any purpose other than personal, non-commercial preview of your own property</li>
        </ul>
      </Section>

      <Section title="4. AI House Visualizer">
        <p>The AI House Visualizer feature allows you to upload a photo of your home to generate an AI-rendered preview of what permanent holiday lights might look like on your property. By using this feature, you acknowledge and agree that:</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>The generated preview is an artistic approximation only and does not constitute a guarantee of the final installed appearance</li>
          <li>You own or have the right to upload the photo you submit</li>
          <li>The photo is processed solely for the purpose of generating the visualization and is not stored or used for any other purpose</li>
          <li>Results may vary based on image quality, lighting conditions, and AI interpretation</li>
        </ul>
      </Section>

      <Section title="5. Consultation Bookings and Quotes">
        <p>Booking a free consultation through our Site does not constitute a binding service agreement. All pricing presented on the Site is a starting estimate only. Final pricing is determined after an on-site consultation and is subject to a separate written quote. We reserve the right to decline service at our discretion.</p>
        <p>Consultations are free of charge and carry no obligation to purchase. We reserve the right to reschedule or cancel consultations with reasonable notice.</p>
      </Section>

      <Section title="6. SMS Communications">
        <p>By opting in to SMS communications through our Site or chat widget, you agree to receive text messages as described in our Privacy Policy. Standard message and data rates may apply. You may opt out at any time by replying STOP. Your consent to receive SMS messages is not a condition of any purchase or service.</p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>The Site and its original content, features, and functionality are owned by Ashton Holiday Lighting and are protected by applicable copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from the Site without our express written permission.</p>
      </Section>

      <Section title="8. Disclaimer of Warranties">
        <p>The Site is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
        <p>AI-generated visualizations are provided for illustrative purposes only. We make no representations or warranties regarding the accuracy, completeness, or reliability of any AI-generated content.</p>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>To the fullest extent permitted by applicable law, Ashton Holiday Lighting shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the Site or any services described therein, even if we have been advised of the possibility of such damages.</p>
        <p>Our total liability to you for any claims arising from your use of the Site shall not exceed one hundred dollars ($100).</p>
      </Section>

      <Section title="10. Third-Party Links and Services">
        <p>The Site may contain links to or integrations with third-party websites or services (including GoHighLevel scheduling, Google AI services, and others) that are not owned or controlled by Ashton Holiday Lighting. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We encourage you to review the terms and privacy policies of any third-party services you use.</p>
      </Section>

      <Section title="11. Governing Law">
        <p>These Terms shall be governed by and construed in accordance with the laws of the State of Nebraska, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Douglas County, Nebraska.</p>
      </Section>

      <Section title="12. Changes to Terms">
        <p>We reserve the right to modify these Terms at any time. We will indicate the date of the most recent revision at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms. We encourage you to review these Terms periodically.</p>
      </Section>

      <Section title="13. Contact Us">
        <p>If you have any questions about these Terms of Service, please contact us:</p>
        <ContactBox />
      </Section>

    </LegalLayout>
  )
}
