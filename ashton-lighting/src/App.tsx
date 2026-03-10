import { useState, useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string
  a: string
}

interface GoveeCard {
  num: string
  title: string
  body: string
}

interface GalleryItem {
  src: string
  span?: boolean
}

interface ContactPayload {
  locationId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  source: string
  tags: string[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GHL_LOCATION_ID = 'tlHhUo40JX0SwVD1xPZ2'
const GHL_CALENDAR_ID = 'JbBRO1y5H5DWd8qcOstJ'
const GHL_API_KEY     = 'pit-0bef9f8d-3517-4695-b692-48e2994921b6'

const BULB_COLORS: string[] = [
  '#ff6b6b', '#ffd166', '#06d6a0', '#00d4ff',
  '#ff9a3c', '#c084fc', '#ffd166', '#ff6b6b',
]

const FAQS: FaqItem[] = [
  {
    q: 'What are permanent holiday lights?',
    a: 'Permanent holiday lights — like the Govee Permanent Outdoor Lights we install — are weatherproof LED fixtures installed once and stay on your home year-round. You control colors, patterns, and schedules through a smartphone app. No ladder every season, no tangled wires in the garage.',
  },
  {
    q: 'How much does installation cost?',
    a: 'Most residential installs fall in the $1,000–$2,500 range, depending on the linear footage of your roofline and eaves. Every home is a little different, which is why we offer a free on-site consultation and custom quote. And right now, our March sale takes 50% off installation — so there\'s never been a better time.',
  },
  {
    q: 'How long does a typical install take?',
    a: 'Most homes are done in about half a day. We handle everything — mounting the brackets, running the wiring, syncing the app, and walking you through your first set of scenes before we leave.',
  },
  {
    q: 'Are the lights visible during the day?',
    a: 'The brackets are low-profile and designed to blend into your roofline and eaves. Most homeowners find them nearly invisible in daylight — clean and architectural, not an eyesore.',
  },
  {
    q: 'Can I control the colors and patterns myself?',
    a: 'Yes! The Govee app gives you full control over 16 million+ colors, dozens of pre-set holiday scenes, custom patterns, schedules, and even music-sync modes. Switch from Christmas red and green to your team\'s game-day colors with a single tap.',
  },
  {
    q: 'Are the lights safe in Nebraska winters?',
    a: 'Absolutely. Govee permanent lights are IP67 waterproof and built for extreme temperature swings — rain, snow, ice, and Omaha\'s notoriously cold winters are no problem.',
  },
  {
    q: 'Do you offer a warranty?',
    a: 'Yes — we offer a limited workmanship warranty on our installations, and the Govee hardware comes with its own manufacturer\'s warranty. If something isn\'t working right after install, reach out and we\'ll make it right.',
  },
  {
    q: 'Do the lights work with Alexa or Google Home?',
    a: 'Yes! Govee integrates with Amazon Alexa, Google Home, and Apple HomeKit so you can control your lights with voice commands or fold them into your existing smart home routines.',
  },
]

const GOVEE_CARDS: GoveeCard[] = [
  { num: '01', title: '16 Million+ Colors', body: 'RGBIC tech lets each bulb display a unique color independently. Create gradients, chasing patterns, music-sync animations, or exact holiday palettes with pinpoint accuracy.' },
  { num: '02', title: 'Intelligent Scheduling', body: 'Set auto schedules, program holidays months in advance, or let the app suggest lighting by date. Your home lights up automatically — you never forget a holiday.' },
  { num: '03', title: 'Energy Efficient LEDs', body: 'Govee lights use a fraction of the energy of traditional incandescent strands. Run your entire roofline for less than a single string of old-school bulbs.' },
  { num: '04', title: 'Professional-Grade Hardware', body: 'IP67-rated fixtures mounted with brackets built to withstand Nebraska weather — holding up year after year through hail, ice, and heat alike.' },
  { num: '05', title: 'No More Seasonal Hassle', body: 'Mounted once with brackets built to withstand Nebraska weather, your lights stay up year-round. No ladder every November, no storage every January — just tap the app and go.' },
  { num: '06', title: 'Local Expert Installation', body: 'We\'re your Omaha neighbors — not a shipping box. Full install, wiring, app setup, and a walkthrough so you\'re in control of every color from day one.' },
]

const GALLERY_ITEMS: GalleryItem[] = [
  { src: '/images/IMG_7323.jpeg', span: true },
  { src: '/images/IMG_6879.jpeg' },
  { src: '/images/IMG_6792.jpeg' },
  { src: '/images/IMG_6807.jpeg' },
  { src: '/images/IMG_6874.jpeg' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarField(): JSX.Element {
  const stars = useRef<Array<{ x: number; y: number; r: number; dur: number; delay: number }>>([])

  if (stars.current.length === 0) {
    for (let i = 0; i < 155; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 78,
        r: Math.random() * 1.4 + 0.22,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      })
    }
  }

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="sg" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#071932" />
          <stop offset="100%" stopColor="#010d1e" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sg)" />
      {stars.current.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#deeeff" opacity="0.62">
          <animate attributeName="opacity" values="0.62;0.15;0.62" dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="83" cy="11" r="5.2" fill="rgba(255,245,210,0.12)" stroke="rgba(255,245,210,0.16)" strokeWidth="0.4" />
      <circle cx="84.8" cy="9.8" r="4.6" fill="#010d1e" />
    </svg>
  )
}

function LightString(): JSX.Element {
  return (
    <div style={styles.lightString}>
      {Array.from({ length: 46 }, (_, i) => {
        const color = BULB_COLORS[i % BULB_COLORS.length]
        return (
          <div
            key={i}
            style={{
              width: 7,
              height: 11,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              background: `radial-gradient(circle at 38% 28%, #fff 0%, ${color} 70%)`,
              boxShadow: `0 0 7px 2px ${color}88`,
              flexShrink: 0,
              animation: `bFlicker ${(2.1 + (i * 0.11 % 1.8)).toFixed(2)}s ease-in-out ${(i * 0.1).toFixed(2)}s infinite`,
            }}
          />
        )
      })}
    </div>
  )
}

interface FaqRowProps {
  faq: FaqItem
  index: number
  open: boolean
  onToggle: (i: number) => void
}

function FaqRow({ faq, index, open, onToggle }: FaqRowProps): JSX.Element {
  return (
    <div style={{ ...styles.faqItem, borderColor: open ? 'rgba(0,212,255,0.28)' : 'rgba(0,180,255,0.12)' }}>
      <div style={styles.faqQ} onClick={() => onToggle(index)}>
        <span>{faq.q}</span>
        <div style={{ ...styles.faqIcon, transform: open ? 'rotate(45deg)' : 'none', color: open ? '#00d4ff' : 'inherit' }}>+</div>
      </div>
      <div style={{ ...styles.faqA, maxHeight: open ? 360 : 0, padding: open ? '0 22px 18px' : '0 22px' }}>
        <p style={{ fontSize: '0.92rem', color: '#7a9bbf', lineHeight: 1.75 }}>{faq.a}</p>
      </div>
    </div>
  )
}

// ─── Scroll fade-in hook ──────────────────────────────────────────────────────

function useFadeIn(): void {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fi')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.05 }
    )
    els.forEach(el => obs.observe(el))
    setTimeout(() => {
      els.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight) el.classList.add('vis')
      })
    }, 100)
    return () => obs.disconnect()
  }, [])
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState({ first: '', last: '', email: '', phone: '', interest: 'Permanent Holiday Lights (Govee)', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  useFadeIn()

  const scrollTo = (id: string): void => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  const handleToggleFaq = (i: number): void => setOpenFaq(openFaq === i ? null : i)

  const handleSubmit = async (): Promise<void> => {
    if (!formState.first || !formState.email) {
      setFormError('Please enter at least your first name and email.')
      return
    }
    setFormError('')
    setFormStatus('sending')

    const payload: ContactPayload = {
      locationId: GHL_LOCATION_ID,
      firstName: formState.first,
      lastName: formState.last,
      email: formState.email,
      phone: formState.phone,
      source: 'Website Contact Form',
      tags: ['website-lead'],
    }

    try {
      const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok || res.status === 200 || res.status === 201) {
        setFormStatus('success')
      } else {
        throw new Error(`Status ${res.status}`)
      }
    } catch {
      setFormStatus('error')
      setFormError("Something went wrong — please call us directly at (402) 889-8640.")
    }
  }

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          Ashton Holiday Lighting
          <span style={styles.navSubtitle}>Omaha, Nebraska</span>
        </div>
        <ul style={styles.navLinks} className="desktop-nav-links">
          {(['about', 'gallery', 'faq', 'booking'] as const).map(id => (
            <li key={id}>
              <a style={styles.navLink} onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button style={styles.navCta} className="nav-cta desktop-nav-cta" onClick={() => scrollTo('booking')}>
          Book Free Consult
        </button>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {(['about', 'gallery', 'faq', 'booking'] as const).map(id => (
          <a key={id} onClick={() => scrollTo(id)}>
            {id === 'booking' ? 'Contact' : id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <button className="mobile-cta btn-p" onClick={() => scrollTo('booking')}>Book Free Consult</button>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <StarField />
        <LightString />
        <div style={styles.heroGlow} />
        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>Omaha's Premier Permanent Lighting Installer</p>
          <h1 style={styles.h1}>
            Holiday Lights.<br /><em style={{ color: '#ffd166', fontStyle: 'normal' }}>All Year Beautiful.</em>
          </h1>
          <p style={styles.hsub}>
            Govee permanent exterior lights — installed once, controlled forever.<br />
            Transform your home with millions of colors, every holiday, every season.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnP} className="btn-p" onClick={() => scrollTo('booking')}>Book a Free Consultation</button>
            <button style={styles.btnS} className="btn-s" onClick={() => scrollTo('about')}>See How It Works</button>
          </div>
        </div>
        <div style={styles.scrollInd}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={styles.scrollLine} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ ...styles.section, background: '#040f22' }}>
        <div className="fi about-grid" style={styles.aboutGrid}>
          <div>
            <p style={styles.sLabel}>What We Do</p>
            <h2 style={styles.sh2}>Permanent Lights.<br /><em style={{ color: '#ffd166', fontStyle: 'normal' }}>Zero Hassle.</em></h2>
            <p style={styles.sLead}>
              We install Govee permanent outdoor lighting systems that stay on your home year-round.
              No more hiring someone every November, no more tangled boxes in the garage — just beautiful,
              app-controlled light at the tap of a button.
            </p>
            <ul style={styles.featureList}>
              {[
                { title: 'App-Controlled Colors', desc: '16M+ colors and dozens of scenes — change your lights to match any holiday or mood in seconds.' },
                { title: 'Clean, Permanent Install', desc: 'Mounted with brackets built to withstand Nebraska weather, flush to your roofline. Barely visible by day, stunning at night.' },
                { title: 'Built for Nebraska Winters', desc: 'IP67 weatherproof — reliable through every Omaha season, rain, snow, or ice.' },
                { title: 'Smart Home Ready', desc: 'Works with Alexa, Google Home, and Apple HomeKit for voice control and automation.' },
              ].map(f => (
                <li key={f.title} style={styles.featureItem} className="feature-item">
                  <span style={styles.featureDot} />
                  <div>
                    <h4 style={styles.featureTitle}>{f.title}</h4>
                    <p style={styles.featureDesc}>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="about-photo" style={{ ...styles.aboutVis, backgroundImage: "url('/images/IMG_7323.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,11,24,0.18)', borderRadius: 8 }} />
          </div>
        </div>
      </section>

      {/* GOVEE SYSTEM */}
      <section id="system" style={{ ...styles.section, background: 'linear-gradient(180deg,#020b18 0%,#040f22 50%,#020b18 100%)' }}>
        <div className="fi" style={{ textAlign: 'center', maxWidth: 1080, margin: '0 auto 8px' }}>
          <p style={{ ...styles.sLabel, display: 'flex', justifyContent: 'center' }}>The Technology</p>
          <h2 style={{ ...styles.sh2, textAlign: 'center' }}>Why <em style={{ color: '#ffd166', fontStyle: 'normal' }}>Govee</em> Permanent Lights?</h2>
          <p style={{ ...styles.sLead, margin: '0 auto', textAlign: 'center' }}>Govee is the industry leader in smart permanent outdoor lighting — and we're Omaha's trusted installer.</p>
        </div>
        <div className="fi govee-cards-grid" style={styles.goveeCards}>
          {GOVEE_CARDS.map(card => (
            <div key={card.num} style={styles.goveeCard} className="govee-card">
              <div style={styles.cardNum}>{card.num}</div>
              <div style={styles.cardTitle}>{card.title}</div>
              <p style={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ ...styles.section, background: '#040f22' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div className="fi">
            <p style={styles.sLabel}>Our Work</p>
            <h2 style={styles.sh2}>Omaha Homes, <em style={{ color: '#ffd166', fontStyle: 'normal' }}>Transformed</em></h2>
            <p style={styles.sLead}>Every install is custom-planned to complement your home's roofline and architecture.</p>
          </div>
          <div className="fi gallery-grid-inner" style={styles.galleryGrid}>
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  ...styles.galleryItem,
                  gridColumn: item.span ? 'span 2' : undefined,
                  backgroundImage: `url('${item.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="gallery-item"
              >
                <div style={styles.galleryOverlay} className="gallery-overlay">
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', color: '#00d4ff', textTransform: 'uppercase' }}>
                    View Project
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ ...styles.section, background: '#020b18' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="fi">
            <p style={styles.sLabel}>Got Questions?</p>
            <h2 style={styles.sh2}>Frequently Asked <em style={{ color: '#ffd166', fontStyle: 'normal' }}>Questions</em></h2>
          </div>
          <div className="fi" style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {FAQS.map((faq, i) => (
              <FaqRow key={i} faq={faq} index={i} open={openFaq === i} onToggle={handleToggleFaq} />
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" style={{ ...styles.section, background: 'linear-gradient(180deg,#040f22 0%,#071630 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="fi" style={{ textAlign: 'center' }}>
            <p style={{ ...styles.sLabel, display: 'flex', justifyContent: 'center' }}>Ready to Get Started?</p>
            <h2 style={{ ...styles.sh2, textAlign: 'center' }}>Book Your Free <em style={{ color: '#ffd166', fontStyle: 'normal' }}>Consultation</em></h2>
            <p style={{ ...styles.sLead, margin: '0 auto', textAlign: 'center' }}>
              We'll visit your home, measure your roofline, and give you a no-obligation quote — all for free. Most installs are done in half a day.
            </p>
          </div>
          <div className="fi booking-grid-inner" style={styles.bookingGrid}>

            {/* PRIMARY: GHL Calendar */}
            <div style={styles.bookingCard}>
              <div style={{ padding: '28px 28px 16px', borderBottom: '1px solid rgba(0,180,255,0.12)' }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', color: '#fff', marginBottom: 6 }}>Schedule a Consultation</h3>
                <p style={{ fontSize: '0.88rem', color: '#7a9bbf', lineHeight: 1.55 }}>Pick a date and time that works for you. Most on-site consultations take 20–30 minutes.</p>
              </div>
              <div style={{ background: '#fff', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/booking/${GHL_CALENDAR_ID}`}
                  style={{ width: '100%', height: 560, border: 'none', display: 'block' }}
                  scrolling="yes"
                />
              </div>
              <div style={styles.bookingPerks}>
                {['Free consultation', 'No obligation', 'Half-day install', 'Limited warranty'].map(p => (
                  <span key={p} style={styles.perk}><span style={{ color: '#00d4ff' }}>✓</span> {p}</span>
                ))}
              </div>
            </div>

            {/* SECONDARY: Contact form */}
            <div style={styles.contactPanel}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.05rem', color: '#7a9bbf', paddingBottom: 13, borderBottom: '1px solid rgba(0,180,255,0.12)' }}>
                Or Send Us a Message
              </h3>

              {formStatus === 'success' ? (
                <div style={styles.formSuccess}>
                  Thanks — we got your message!<br />
                  <span style={{ color: '#7a9bbf', fontSize: '0.85rem' }}>We'll be in touch within 1 business day.</span>
                </div>
              ) : (
                <>
                  <div style={styles.formRow} className="form-row-inner">
                    <div style={styles.fg}><label style={styles.fgLabel}>First Name</label><input style={styles.fgInput} type="text" placeholder="John" value={formState.first} onChange={e => setFormState(s => ({ ...s, first: e.target.value }))} /></div>
                    <div style={styles.fg}><label style={styles.fgLabel}>Last Name</label><input style={styles.fgInput} type="text" placeholder="Smith" value={formState.last} onChange={e => setFormState(s => ({ ...s, last: e.target.value }))} /></div>
                  </div>
                  <div style={styles.fg}><label style={styles.fgLabel}>Email</label><input style={styles.fgInput} type="email" placeholder="john@example.com" value={formState.email} onChange={e => setFormState(s => ({ ...s, email: e.target.value }))} /></div>
                  <div style={styles.fg}><label style={styles.fgLabel}>Phone</label><input style={styles.fgInput} type="tel" placeholder="(402) 555-0100" value={formState.phone} onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))} /></div>
                  <div style={styles.fg}>
                    <label style={styles.fgLabel}>I'm Interested In</label>
                    <select style={styles.fgInput} value={formState.interest} onChange={e => setFormState(s => ({ ...s, interest: e.target.value }))}>
                      <option>Permanent Holiday Lights (Govee)</option>
                      <option>Free Consultation &amp; Quote</option>
                      <option>Other / General Inquiry</option>
                    </select>
                  </div>
                  <div style={styles.fg}><label style={styles.fgLabel}>Message (Optional)</label><textarea style={{ ...styles.fgInput, resize: 'vertical', minHeight: 85 }} placeholder="Tell us about your home or what you're looking for…" value={formState.message} onChange={e => setFormState(s => ({ ...s, message: e.target.value }))} /></div>
                  {formError && <p style={{ fontSize: '0.78rem', color: '#e63946' }}>{formError}</p>}
                  <button style={{ ...styles.btnS, padding: '12px', fontSize: '0.88rem', width: '100%' }} className="btn-s" onClick={handleSubmit} disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? 'Sending…' : 'Send Message →'}
                  </button>
                  <p style={{ fontSize: '0.76rem', color: '#7a9bbf', fontStyle: 'italic' }}>We respond within 1 business day. Installs start at $1,000 — free quote included.</p>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={styles.footerTop} className="footer-top-inner">
            <div>
              <div style={styles.footerLogo}>Ashton Holiday Lighting</div>
              <p style={styles.footerTagline}>Omaha's trusted installer for Govee permanent outdoor lighting. One install. Endless seasons.</p>
            </div>
            <div>
              <h4 style={styles.footerColHead}>Quick Links</h4>
              <ul style={styles.footerList}>
                {[['about', 'About the Lights'], ['system', 'The Technology'], ['gallery', 'Gallery'], ['faq', 'FAQ'], ['booking', 'Book a Consult']].map(([id, label]) => (
                  <li key={id}><a style={styles.footerLink} onClick={() => scrollTo(id)}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={styles.footerColHead}>Contact</h4>
              <ul style={styles.footerList}>
                <li><a style={styles.footerLink} href="tel:4028898640">(402) 889-8640</a></li>
                <li><a style={styles.footerLink} href="mailto:josiah.ashton@gmail.com">josiah.ashton@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div style={styles.footerBottom} className="footer-bottom-inner">
            <p style={{ fontSize: '0.78rem', color: '#7a9bbf' }}>© 2025 Ashton Holiday Lighting · Omaha, NE · All rights reserved</p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(120,150,180,0.42)' }}>Powered by Ashton AI Solutions</p>
          </div>
        </div>
      </footer>

      {/* SALE BANNER */}
      <div style={styles.saleBanner}>
        <span style={styles.bannerTag} className="banner-tag-el">March Sale</span>
        <p style={styles.bannerText} className="banner-text-el"><strong style={{ color: '#ffe066' }}>50% OFF Installation</strong> — Limited time. Book your free consult and lock in the discount.</p>
        <button style={styles.bannerCta} className="banner-cta" onClick={() => scrollTo('booking')}>Claim Offer</button>
      </div>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 68, background: 'rgba(2,11,24,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,180,255,0.12)' },
  navLogo: { fontFamily: "'Cinzel', serif", fontSize: '1.1rem', fontWeight: 700, color: '#ffd166', letterSpacing: '0.07em', textShadow: '0 0 18px rgba(255,209,102,0.45)', lineHeight: 1.2 },
  navSubtitle: { display: 'block', fontSize: '0.6rem', color: '#00d4ff', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase' },
  navLinks: { display: 'flex', gap: 30, listStyle: 'none' },
  navLink: { color: '#7a9bbf', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' },
  navCta: { background: 'transparent', border: '1.5px solid #00d4ff', color: '#00d4ff', padding: '7px 20px', borderRadius: 4, fontFamily: "'Raleway', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' },
  hero: { position: 'relative', height: '100vh', minHeight: 680, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  heroGlow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(to top,rgba(0,212,255,0.05),transparent)', pointerEvents: 'none' },
  lightString: { position: 'absolute', top: 68, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', pointerEvents: 'none', overflow: 'hidden', height: 50, alignItems: 'flex-start' },
  heroContent: { position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 820 },
  eyebrow: { fontFamily: "'Raleway', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: 20 },
  h1: { fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.4rem,5.5vw,4.6rem)', fontWeight: 700, lineHeight: 1.12, color: '#fff', marginBottom: 16, textShadow: '0 0 60px rgba(0,212,255,0.22)' },
  hsub: { fontSize: '1.1rem', color: '#7a9bbf', lineHeight: 1.72, marginBottom: 40, fontWeight: 300 },
  heroBtns: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  scrollInd: { position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: '#7a9bbf', animation: 'bounce 2s ease-in-out infinite' },
  scrollLine: { width: 1, height: 34, background: 'linear-gradient(to bottom,#7a9bbf,transparent)' },
  btnP: { background: 'linear-gradient(135deg,#00d4ff,#0090c0)', color: '#020b18', border: 'none', padding: '15px 34px', borderRadius: 4, fontFamily: "'Raleway', sans-serif", fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 28px rgba(0,212,255,0.32)' },
  btnS: { background: 'transparent', color: '#e8f1ff', border: '1.5px solid rgba(255,255,255,0.2)', padding: '15px 34px', borderRadius: 4, fontFamily: "'Raleway', sans-serif", fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' },
  section: { padding: '100px 40px' },
  sLabel: { fontFamily: "'Raleway', sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: 14 },
  sh2: { fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem,3.8vw,2.9rem)', fontWeight: 600, lineHeight: 1.2, color: '#fff', marginBottom: 18 },
  sLead: { fontSize: '1.05rem', color: '#7a9bbf', lineHeight: 1.75, maxWidth: 600 },
  aboutGrid: { maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' },
  aboutVis: { position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', border: '1px solid rgba(0,180,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  featureList: { listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 },
  featureItem: { display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 6, background: 'rgba(10,30,61,0.5)', border: '1px solid rgba(0,180,255,0.12)' },
  featureDot: { width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0, marginTop: 8, boxShadow: '0 0 8px #00d4ff' },
  featureTitle: { fontFamily: "'Raleway', sans-serif", fontWeight: 600, color: '#fff', marginBottom: 3, fontSize: '0.95rem' },
  featureDesc: { fontSize: '0.87rem', color: '#7a9bbf', lineHeight: 1.5 },
  goveeCards: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 50, maxWidth: 1080, marginLeft: 'auto', marginRight: 'auto' },
  goveeCard: { background: '#0a1e3d', border: '1px solid rgba(0,180,255,0.12)', borderRadius: 8, padding: '28px 24px', position: 'relative', overflow: 'hidden' },
  cardNum: { fontFamily: "'Cinzel', serif", fontSize: '2.2rem', fontWeight: 700, color: 'rgba(0,212,255,0.13)', marginBottom: 12, lineHeight: 1 },
  cardTitle: { fontFamily: "'Raleway', sans-serif", fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: 8 },
  cardBody: { fontSize: '0.85rem', color: '#7a9bbf', lineHeight: 1.62 },
  galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13, marginTop: 50 },
  galleryItem: { borderRadius: 6, overflow: 'hidden', aspectRatio: '16/10', border: '1px solid rgba(0,180,255,0.12)', position: 'relative', cursor: 'pointer' },
  galleryOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,212,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.28s' },
  bookingGrid: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 52, alignItems: 'start', marginTop: 52 },
  bookingCard: { background: '#0a1e3d', borderRadius: 10, border: '1px solid rgba(0,180,255,0.12)', overflow: 'hidden', position: 'relative' },
  bookingPerks: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', padding: '16px 28px' },
  perk: { fontSize: '0.78rem', color: '#7a9bbf', display: 'flex', alignItems: 'center', gap: 5 },
  contactPanel: { display: 'flex', flexDirection: 'column', gap: 13 },
  formSuccess: { background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 6, padding: 20, textAlign: 'center', color: '#00d4ff', fontFamily: "'Raleway', sans-serif", fontSize: '0.95rem', lineHeight: 1.6 },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 },
  fg: { display: 'flex', flexDirection: 'column', gap: 5 },
  fgLabel: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a9bbf' },
  fgInput: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,180,255,0.12)', borderRadius: 4, padding: '10px 13px', color: '#e8f1ff', fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', width: '100%' },
  footer: { background: '#010810', borderTop: '1px solid rgba(0,180,255,0.12)', padding: '44px 40px 28px' },
  footerTop: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 44, paddingBottom: 36, borderBottom: '1px solid rgba(0,180,255,0.12)' },
  footerLogo: { fontFamily: "'Cinzel', serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffd166', marginBottom: 10 },
  footerTagline: { fontSize: '0.87rem', color: '#7a9bbf', lineHeight: 1.65, maxWidth: 270 },
  footerColHead: { fontFamily: "'Raleway', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: 14 },
  footerList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 },
  footerLink: { color: '#7a9bbf', textDecoration: 'none', fontSize: '0.87rem', cursor: 'pointer' },
  footerBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 22 },
  saleBanner: { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: 'linear-gradient(90deg,#8b0000,#e63946,#aa1010,#e63946,#8b0000)', backgroundSize: '400% 100%', animation: 'bShim 5s linear infinite', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 },
  bannerTag: { background: 'rgba(255,255,255,0.17)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 2 },
  bannerText: { fontFamily: "'Raleway', sans-serif", fontSize: '0.92rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textShadow: '0 1px 4px rgba(0,0,0,0.28)' },
  bannerCta: { background: '#fff', color: '#b00000', border: 'none', padding: '6px 16px', borderRadius: 3, fontFamily: "'Raleway', sans-serif", fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' },
  faqItem: { background: '#0a1e3d', border: '1px solid', borderRadius: 6, overflow: 'hidden', transition: 'border-color 0.28s' },
  faqQ: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', cursor: 'pointer', fontFamily: "'Raleway', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: '#fff', gap: 14, userSelect: 'none' },
  faqIcon: { width: 22, height: 22, flexShrink: 0, border: '1.5px solid currentColor', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', transition: 'transform 0.32s' },
  faqA: { overflow: 'hidden', transition: 'max-height 0.42s ease, padding 0.28s' },
}

// ─── Injected CSS (animations + hover states not possible inline) ─────────────

const CSS = `
  @keyframes bFlicker { 0%,100%{opacity:1;filter:brightness(1)} 50%{opacity:0.55;filter:brightness(1.7)} }
  @keyframes fup { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
  @keyframes bShim { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }
  @keyframes puls { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.18);opacity:0.55} }

  .fi { opacity: 0; transform: translateY(26px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .fi.vis { opacity: 1; transform: translateY(0); }

  .nav-cta:hover { background: #00d4ff !important; color: #020b18 !important; box-shadow: 0 0 20px rgba(0,212,255,0.4); }
  .btn-p:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(0,212,255,0.55) !important; }
  .btn-s:hover { border-color: #ffd166 !important; color: #ffd166 !important; }
  .banner-cta:hover { background: #ffe066 !important; transform: scale(1.03); }
  .govee-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#00d4ff,transparent); }
  .govee-card:hover { transform: translateY(-4px); border-color: rgba(0,212,255,0.28) !important; }
  .feature-item:hover { border-color: rgba(0,212,255,0.28) !important; background: rgba(10,30,61,0.85) !important; }
  .gallery-item:hover { border-color: rgba(255,209,102,0.38) !important; }
  .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
  .booking-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#00d4ff,#ffd166); }

  /* Hamburger — hidden on desktop */
  .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; z-index: 110; }
  .hamburger span { display: block; width: 24px; height: 2px; background: #e8f1ff; border-radius: 2px; transition: all 0.28s; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile nav drawer */
  .mobile-menu { display: none; position: fixed; top: 68px; left: 0; right: 0; background: rgba(2,11,24,0.98); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,180,255,0.12); flex-direction: column; padding: 24px 28px 32px; z-index: 99; }
  .mobile-menu.open { display: flex; }
  .mobile-menu a { color: #e8f1ff; font-family: 'Raleway', sans-serif; font-size: 1.05rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 14px 0; border-bottom: 1px solid rgba(0,180,255,0.08); cursor: pointer; text-decoration: none; display: block; }
  .mobile-menu a:last-of-type { border-bottom: none; }
  .mobile-cta { margin-top: 20px; background: linear-gradient(135deg,#00d4ff,#0090c0) !important; color: #020b18 !important; border: none !important; padding: 14px !important; border-radius: 4px; font-family: 'Raleway', sans-serif; font-size: 0.95rem; font-weight: 700 !important; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; width: 100%; }

  @media (max-width: 768px) {
    .hamburger { display: flex !important; }
    .desktop-nav-links { display: none !important; }
    .desktop-nav-cta { display: none !important; }

    section { padding: 60px 20px !important; }

    .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .about-photo { order: -1; aspect-ratio: 16/9 !important; }

    .govee-cards-grid { grid-template-columns: 1fr !important; }

    .gallery-grid-inner { grid-template-columns: 1fr !important; }
    .gallery-grid-inner > div { grid-column: span 1 !important; }

    .booking-grid-inner { grid-template-columns: 1fr !important; gap: 32px !important; }
    .form-row-inner { grid-template-columns: 1fr !important; }

    .footer-top-inner { grid-template-columns: 1fr !important; gap: 24px !important; }
    .footer-bottom-inner { flex-direction: column !important; gap: 6px !important; text-align: center; }

    .sale-banner-inner { gap: 8px !important; padding: 0 12px; flex-wrap: nowrap; }
    .banner-tag-el { display: none !important; }
    .banner-text-el { font-size: 0.75rem !important; }
  }
`
