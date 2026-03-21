import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItem { q: string; a: string }
interface PricingTier { tier: string; price: string; desc: string; features: string[]; featured?: boolean }

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQS: FaqItem[] = [
  { q: 'What areas do you serve?', a: 'We serve Omaha, Nebraska and the surrounding metro area including Papillion, Bellevue, La Vista, Elkhorn, Gretna, and Council Bluffs. Reach out if you are outside these areas — we may still be able to accommodate.' },
  { q: 'How long does installation take?', a: 'Most residential installations are completed in half a day or less. Larger properties or complex rooflines may take a full day. We work efficiently and leave your property completely clean.' },
  { q: 'Do I need to provide anything?', a: 'No. We bring all lights, hardware, extension cords, and tools. All you need is a standard outdoor electrical outlet. We handle everything from start to finish.' },
  { q: 'What kind of lights do you use?', a: 'We use commercial-grade Govee permanent LED lights that produce over 16 million colors. They are weather-resistant, energy-efficient, and controlled via the Govee Home app on your smartphone.' },
  { q: 'Are the lights permanent?', a: 'Yes. The lights are installed once and stay on your home year-round. The mounting hardware is discrete and weather-sealed. You simply turn them on and off via the app whenever you want.' },
  { q: 'How much does it cost?', a: 'Pricing starts at $1,000 for smaller homes and scales based on linear footage. We offer transparent flat-rate pricing with no hidden fees. Request a free consultation for an exact quote.' },
  { q: 'Is there a warranty?', a: 'Yes. We stand behind our work with a satisfaction guarantee on installation, and the Govee lights carry a manufacturer warranty. If anything fails due to our installation, we will fix it at no charge.' },
  { q: 'Can I control the lights from my phone?', a: 'Absolutely. The Govee Home app gives you full control over 16 million colors, schedules, music sync, holiday scenes, and more. Works on both iOS and Android. Also integrates with Alexa and Google Home.' },
  { q: 'What is the AI House Visualizer?', a: 'It is powered by Google Nano Banana Pro — the most advanced AI image generation model available. Upload a photo of your home and the AI generates a photorealistic preview of what it would look like with permanent holiday lights installed. Completely free to use.' },
  { q: 'When should I book?', a: 'We recommend booking as early as possible. Our fall schedule fills quickly and we can only take a limited number of installations per week. Booking early also locks in our current promotional pricing.' },
]

const PRICING: PricingTier[] = [
  { tier: 'Standard', price: '1,000', desc: 'Perfect for smaller homes and townhouses up to 80 linear feet.', features: ['Up to 80 linear feet', 'Commercial-grade Govee LEDs', 'Professional installation', 'Govee Home app control', '16 million color options', 'Satisfaction guarantee'] },
  { tier: 'Premium', price: '1,800', desc: 'Our most popular package for mid-size homes with full coverage.', features: ['Up to 160 linear feet', 'Everything in Standard', 'Gutter and fascia mounting', 'Custom color scene setup', 'Priority scheduling', 'Annual inspection included'], featured: true },
  { tier: 'Estate', price: 'Custom', desc: 'For large homes, multi-structures, and commercial properties.', features: ['Unlimited linear footage', 'Everything in Premium', 'Multi-structure coverage', 'Dedicated project manager', 'Same-day service available', 'Commercial billing available'] },
]

const MARQUEE_ITEMS = ['Omaha Permanent Light Specialists', '16 Million Colors', 'Half-Day Installation', 'Govee Smart Control', 'No Seasonal Takedown', 'Commercial Grade LEDs', 'Free Consultation', 'Satisfaction Guaranteed']

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])
  return scrolled
}

function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll('.fi')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return { d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id) })
  return time
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const UploadCloud = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}>
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
)

const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:9,height:9}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const PlusSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{width:14,height:14}}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="var(--gold)" stroke="none" style={{width:13,height:13}}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ onBook }: { onBook: () => void }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const navLinks = ['Services', 'Gallery', 'Pricing', 'AI Visualizer', 'FAQ']
  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <>
      <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Ashton Holiday Lighting<span>Omaha, Nebraska</span>
        </div>
        <div className="nav-links">
          {navLinks.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</span>)}
        </div>
        <button className="btn btn-primary nav-cta" style={{fontSize:'0.78rem',padding:'10px 22px'}} onClick={onBook}>Book Free Consult</button>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span style={{transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none'}}/>
          <span style={{opacity: open ? 0 : 1}}/>
          <span style={{transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none'}}/>
        </button>
      </nav>
      <div className={'mobile-menu' + (open ? ' open' : '')}>
        {navLinks.map(l => <a key={l} onClick={() => scrollTo(l)}>{l}</a>)}
        <button className="mobile-cta" onClick={() => { setOpen(false); onBook() }}>Book Free Consultation</button>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onBook, onVisualizer }: { onBook: () => void; onVisualizer: () => void }) {
  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
      overflow: 'hidden', background: 'var(--ink)'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(245,237,224,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,237,224,0.025) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(232,160,32,0.08) 0%, transparent 60%)'
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: 0, width: 1, height: '40%',
        background: 'linear-gradient(to bottom, transparent, rgba(232,160,32,0.3), transparent)',
        transform: 'translateX(-50%)'
      }} />
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 'var(--inner-max)',
        margin: '0 auto', padding: '0 48px', paddingTop: 120, width: '100%'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.18)',
          borderRadius: 100, padding: '6px 16px 6px 10px', marginBottom: 40
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)',
            animation: 'pulse-gold 2.4s ease-in-out infinite'
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)'
          }}>Now Booking Fall 2025 — Limited Slots Remaining</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem,8vw,6.8rem)',
          fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em',
          color: 'var(--cream)', marginBottom: 32
        }}>
          Your Home.<br />
          <em style={{fontStyle:'italic', color:'var(--gold)'}}>Unforgettable</em><br />
          Every Night.
        </h1>
        <p style={{
          fontSize: 'clamp(1rem,1.8vw,1.15rem)', lineHeight: 1.78,
          color: 'var(--cream-mid)', maxWidth: 500, marginBottom: 48
        }}>
          Omaha permanent holiday lighting specialists. Commercial-grade Govee LEDs installed once, controlled from your phone, glowing every season.
        </p>
        <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:64}}>
          <button className="btn btn-primary" style={{fontSize:'0.95rem',padding:'15px 36px'}} onClick={onBook}>
            Book Free Consultation
          </button>
          <button className="btn btn-outline" style={{fontSize:'0.95rem',padding:'14px 35px'}} onClick={onVisualizer}>
            Preview My Home with AI
          </button>
        </div>
        <div style={{display:'flex', gap:32, flexWrap:'wrap', alignItems:'center'}}>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            {[1,2,3,4,5].map(i => <StarSvg key={i}/>)}
            <span style={{fontSize:'0.82rem', color:'var(--cream-mid)', marginLeft:6, fontWeight:600}}>5.0 Rating</span>
          </div>
          {['Installed in half a day','No seasonal takedown','Serving Omaha metro'].map(item => (
            <div key={item} style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{
                width:16, height:16, borderRadius:'50%',
                background:'rgba(232,160,32,0.1)', border:'1px solid rgba(232,160,32,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
              }}>
                <CheckSvg/>
              </div>
              <span style={{fontSize:'0.82rem', color:'var(--cream-dim)', fontWeight:500}}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <div className="marquee-dot"/>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { number: '16M+', label: 'Color Options', sub: 'Full spectrum Govee LEDs' },
    { number: '$1,000', label: 'Starting Price', sub: 'Transparent flat-rate pricing' },
    { number: '4 hrs', label: 'Avg Install Time', sub: 'Most homes done same day' },
    { number: '50%', label: 'Early Bird Savings', sub: 'Book before October 1st' },
  ]
  return (
    <div style={{padding:'0 48px', maxWidth:'calc(var(--inner-max) + 96px)', margin:'0 auto'}}>
      <div className="stats-row fi">
        {stats.map(s => (
          <div key={s.label} className="stat-cell">
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { title: 'Permanent Installation', body: 'Installed once, stays year-round. No ladders, no storage, no annual hassle. Just flip it on whenever you want.' },
    { title: '16 Million Colors', body: 'Govee full-spectrum LEDs let you set any color, scene, or schedule. Match any holiday, sports team, or mood.' },
    { title: 'App-Controlled', body: 'The Govee Home app puts full control in your pocket. Set timers, sync to music, or activate pre-built holiday scenes instantly.' },
    { title: 'Half-Day Install', body: 'Our experienced team completes most residential installs in four hours or less. Minimal disruption, maximum impact.' },
    { title: 'Weather-Resistant', body: 'Commercial-grade hardware rated for all Nebraska weather conditions. Rain, snow, heat — these lights are built to last.' },
    { title: 'Local Omaha Business', body: 'We are your neighbors. We know Omaha homes, Omaha weather, and Omaha standards. Locally owned and operated.' },
  ]
  const icons = [
    <svg key="a" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    <svg key="b" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    <svg key="c" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    <svg key="d" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    <svg key="e" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    <svg key="f" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  ]
  return (
    <section id="services" style={{background:'var(--surface)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center', marginBottom:72}}>
          <div className="fi">
            <div className="eyebrow">What We Do</div>
            <h2 className="section-title">Permanent lights.<br/><em>Zero effort.</em></h2>
          </div>
          <div className="fi d1">
            <p className="section-lead">We install commercial-grade permanent LED lighting systems on your home once. From that point forward, you control everything from your phone. No seasonal installation fees, no storage, no risk of falling off a ladder.</p>
          </div>
        </div>
        <div className="feature-grid fi d2">
          {features.map((f, i) => (
            <div key={f.title} className="feature-cell">
              <div className="feature-icon">{icons[i]}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-body">{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery({ onVisualizer }: { onVisualizer: () => void }) {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1200&q=80', alt: 'Home with warm white roofline lights' },
    { src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80', alt: 'Holiday lighting on suburban home' },
    { src: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&q=80', alt: 'Colorful LED roofline installation' },
    { src: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80', alt: 'Permanent lights on two-story home' },
    { src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&q=80', alt: 'Night view of holiday lighting' },
  ]
  return (
    <section id="gallery" style={{background:'var(--ink-mid)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48}}>
          <div className="fi">
            <div className="eyebrow">Our Work</div>
            <h2 className="section-title">Real homes.<br/><em>Real results.</em></h2>
          </div>
          <div className="fi d1">
            <button className="btn btn-outline" onClick={onVisualizer} style={{fontSize:'0.82rem', gap:8}}>
              Preview Your Home <ArrowRight/>
            </button>
          </div>
        </div>
        <div className="gallery-grid fi d2">
          {photos.map((p, i) => (
            <div key={i} className={`gallery-item gallery-item-${i+1}`}>
              <img src={p.src} alt={p.alt} loading="lazy"/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(15,13,10,0.4) 0%, transparent 50%)'}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process({ onBook }: { onBook: () => void }) {
  const steps = [
    { num: '01', title: 'Free Consultation', body: 'We visit your home, measure the roofline, and provide an exact quote. No pressure, no obligation.' },
    { num: '02', title: 'Custom Design', body: 'We plan the layout, choose mounting points, and configure your Govee system for optimal coverage.' },
    { num: '03', title: 'Professional Install', body: 'Our team installs everything in half a day. We clean up completely and walk you through the app.' },
    { num: '04', title: 'Enjoy Forever', body: 'Control your lights from anywhere. Change colors by season, holiday, or mood any time you want.' },
  ]
  return (
    <section id="process" style={{background:'var(--surface)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:72}}>
          <div className="eyebrow center fi">How It Works</div>
          <h2 className="section-title fi d1">From booking to <em>lit up</em> in four steps.</h2>
        </div>
        <div className="process-grid fi d2">
          {steps.map(s => (
            <div key={s.num} className="process-step">
              <div className="process-num">{s.num}</div>
              <div className="process-title">{s.title}</div>
              <div className="process-body">{s.body}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:56}} className="fi d3">
          <button className="btn btn-primary" style={{fontSize:'0.95rem',padding:'15px 36px'}} onClick={onBook}>
            Start with a Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing({ onBook }: { onBook: () => void }) {
  return (
    <section id="pricing" style={{background:'var(--ink)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:56}}>
          <div className="eyebrow center fi">Transparent Pricing</div>
          <h2 className="section-title fi d1">No surprises. <em>Ever.</em></h2>
          <p className="section-lead fi d2" style={{margin:'0 auto', textAlign:'center'}}>
            Flat-rate pricing based on linear footage. What we quote is what you pay.
          </p>
        </div>
        <div className="fi d2" style={{
          background:'linear-gradient(90deg, rgba(192,57,43,0.1), rgba(192,57,43,0.05))',
          border:'1px solid rgba(192,57,43,0.22)', borderRadius:'var(--r-md)',
          padding:'14px 24px', marginBottom:36,
          display:'flex', alignItems:'center', justifyContent:'center', gap:12
        }}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'#e74c3c',flexShrink:0,boxShadow:'0 0 8px #e74c3c'}}/>
          <span style={{fontSize:'0.88rem', color:'var(--cream-mid)'}}>
            <strong style={{color:'var(--cream)'}}>Early Bird Sale Active:</strong> Book before October 1st and save up to 50% on installation.
          </span>
        </div>
        <div className="pricing-grid fi d3">
          {PRICING.map(p => (
            <div key={p.tier} className={'pricing-card' + (p.featured ? ' featured' : '')}>
              {p.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-tier">{p.tier}</div>
              <div className="pricing-price">{p.price}</div>
              <div className="pricing-desc">{p.desc}</div>
              <div className="pricing-features">
                {p.features.map(f => (
                  <div key={f} className="pricing-feature">
                    <div className="pricing-check"><CheckSvg/></div>
                    {f}
                  </div>
                ))}
              </div>
              <button
                className={'btn ' + (p.featured ? 'btn-primary' : 'btn-outline')}
                style={{width:'100%', justifyContent:'center', padding:'13px'}}
                onClick={onBook}
              >
                Get a Free Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI Visualizer ────────────────────────────────────────────────────────────
function AIVisualizer() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drag, setDrag] = useState(false)
  const [style, setStyle] = useState('warm-white')
  const [density, setDensity] = useState('full')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) { setError('Please upload an image file.'); return }
    if (f.size > 10 * 1024 * 1024) { setError('Image must be under 10MB.'); return }
    setFile(f); setError(null); setResult(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDrag(false)
    const f = e.dataTransfer.files[0]; if (f) handleFile(f)
  }, [])

  const generate = async () => {
    if (!file) return
    setLoading(true); setError(null); setResult(null)
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64 = (e.target?.result as string).split(',')[1]
      try {
        const res = await fetch('/.netlify/functions/visualize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, mimeType: file.type, style, density }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Generation failed')
        setResult(data.imageUrl)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      } finally { setLoading(false) }
    }
    reader.readAsDataURL(file)
  }

  const styleLabels: Record<string, string> = {
    'warm-white': 'Warm White', 'cool-white': 'Cool White',
    'multicolor': 'Multicolor', 'red-green': 'Classic Red and Green', 'blue-white': 'Blue and White'
  }
  const densityLabels: Record<string, string> = {
    'full': 'Full Roofline', 'accent': 'Accent Only', 'outline': 'Full Outline'
  }

  return (
    <section id="ai-visualizer" style={{background:'var(--surface)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:72, alignItems:'start'}}>
          <div>
            <div className="eyebrow fi">AI-Powered Preview</div>
            <h2 className="section-title fi d1">See your home<br/><em>before you commit.</em></h2>
            <p className="section-lead fi d2" style={{marginBottom:32}}>
              Upload a photo of your home and our AI generates a photorealistic preview of what it would look like with permanent holiday lights installed. Powered by Google Nano Banana Pro — the most advanced image generation model available.
            </p>
            <div className="fi d3" style={{display:'flex', flexDirection:'column', gap:0}}>
              {[
                {label:'AI Model', value:'Nano Banana Pro (Gemini 3 Pro Image)'},
                {label:'Technology', value:'Google Gemini 3 Diffusion Transformer'},
                {label:'Output', value:'Photorealistic 1024x1024 rendering'},
                {label:'Processing', value:'Approx. 15 to 30 seconds per image'},
              ].map(item => (
                <div key={item.label} style={{display:'flex', justifyContent:'space-between', padding:'13px 0', borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:'0.8rem', color:'var(--cream-dim)', fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>{item.label}</span>
                  <span style={{fontSize:'0.82rem', color:'var(--cream)', fontWeight:500}}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="fi d4" style={{
              marginTop:24, background:'var(--gold-glow)', border:'1px solid var(--border-gold)',
              borderRadius:'var(--r-md)', padding:'16px 20px'
            }}>
              <p style={{fontSize:'0.84rem', color:'var(--cream-mid)', lineHeight:1.7}}>
                <strong style={{color:'var(--gold)'}}>Pro tip:</strong> For best results, use a clear daytime photo of your home front exterior with good lighting and a straight-on angle.
              </p>
            </div>
          </div>

          <div className="fi d2">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18}}>
              <div className="form-group">
                <label className="form-label">Light Style</label>
                <select className="form-input" value={style} onChange={e => setStyle(e.target.value)}>
                  {Object.entries(styleLabels).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Coverage</label>
                <select className="form-input" value={density} onChange={e => setDensity(e.target.value)}>
                  {Object.entries(densityLabels).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>

            {!preview ? (
              <div
                className={'upload-zone' + (drag ? ' drag-over' : '')}
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDrag(true) }}
                onDragLeave={() => setDrag(false)}
                onDrop={handleDrop}
              >
                <div className="upload-icon"><UploadCloud/></div>
                <p style={{fontSize:'1rem', fontWeight:600, color:'var(--cream)', marginBottom:8}}>Drop your home photo here</p>
                <p style={{fontSize:'0.84rem', color:'var(--cream-dim)', marginBottom:20}}>or click to browse — JPG, PNG, WEBP up to 10MB</p>
                <button className="btn btn-ghost" style={{pointerEvents:'none'}}>Choose File</button>
                <input ref={inputRef} type="file" accept="image/*" style={{display:'none'}} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}/>
              </div>
            ) : (
              <div style={{borderRadius:'var(--r-lg)', overflow:'hidden', border:'1px solid var(--border-gold)', marginBottom:14}}>
                <img src={preview} alt="Your home" style={{width:'100%', maxHeight:300, objectFit:'cover'}}/>
              </div>
            )}

            {error && (
              <div style={{background:'rgba(192,57,43,0.08)', border:'1px solid rgba(192,57,43,0.25)', borderRadius:'var(--r-md)', padding:'12px 16px', marginBottom:14}}>
                <p style={{fontSize:'0.875rem', color:'#e74c3c'}}>{error}</p>
              </div>
            )}

            {loading && (
              <div style={{marginBottom:14}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
                  <span style={{fontSize:'0.78rem', color:'var(--cream-dim)'}}>Generating with Nano Banana Pro...</span>
                  <span style={{fontSize:'0.78rem', color:'var(--gold)', fontFamily:'var(--font-mono)'}}>~20s</span>
                </div>
                <div style={{background:'var(--surface-3)', borderRadius:4, overflow:'hidden', height:3}}>
                  <div style={{
                    height:'100%', borderRadius:4,
                    background:'linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)',
                    backgroundSize:'200% 100%',
                    animation:'banner-scroll 1.8s ease-in-out infinite'
                  }}/>
                </div>
              </div>
            )}

            {result && (
              <div style={{marginBottom:14}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                  <span style={{fontSize:'0.82rem', fontWeight:600, color:'var(--cream)'}}>AI-Generated Preview</span>
                  <div style={{
                    display:'flex', alignItems:'center', gap:6,
                    background:'rgba(26,122,74,0.1)', border:'1px solid rgba(26,122,74,0.25)',
                    borderRadius:100, padding:'3px 10px'
                  }}>
                    <div style={{width:6, height:6, borderRadius:'50%', background:'#2ecc71'}}/>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.1em', color:'#2ecc71'}}>COMPLETE</span>
                  </div>
                </div>
                <div style={{borderRadius:'var(--r-lg)', overflow:'hidden', border:'1px solid var(--border-gold)'}}>
                  <img src={result} alt="AI visualization" style={{width:'100%'}}/>
                </div>
              </div>
            )}

            {preview && (
              <div style={{display:'flex', gap:10, marginTop:14}}>
                {!loading && (
                  <button className="btn btn-primary" style={{flex:1, justifyContent:'center', padding:'13px'}} onClick={generate} disabled={loading}>
                    {result ? 'Regenerate Preview' : 'Generate Preview'}
                  </button>
                )}
                <button className="btn btn-ghost" onClick={() => { setFile(null); setPreview(null); setResult(null); setError(null) }}>
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" style={{background:'var(--ink)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80, alignItems:'start'}}>
          <div>
            <div className="eyebrow fi">FAQ</div>
            <h2 className="section-title fi d1">Common<br/><em>questions.</em></h2>
            <p className="section-lead fi d2" style={{fontSize:'0.95rem', marginTop:0}}>
              Everything you need to know before booking. Still have questions? Call or text us directly.
            </p>
          </div>
          <div className="fi d2">
            {FAQS.map((faq, i) => (
              <div key={i} className={'faq-item' + (open === i ? ' open' : '')}>
                <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-question">{faq.q}</span>
                  <div className="faq-icon"><PlusSvg/></div>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Booking ──────────────────────────────────────────────────────────────────
function Booking() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', size: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', phone: '', address: '', size: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="book" style={{background:'var(--surface-2)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:64}}>
          <div className="eyebrow center fi">Get Started</div>
          <h2 className="section-title fi d1">Book your free<br/><em>consultation.</em></h2>
          <p className="section-lead fi d2" style={{margin:'0 auto', textAlign:'center'}}>
            No pressure, no obligation. We will visit your home, measure the roofline, and give you an exact quote.
          </p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:48, alignItems:'start'}}>
          <div className="fi">
            <div style={{background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', overflow:'hidden'}}>
              <div style={{
                padding:'18px 24px', borderBottom:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:10
              }}>
                <div style={{
                  width:32, height:32, borderRadius:'var(--r-sm)',
                  background:'var(--gold-glow)', border:'1px solid var(--border-gold)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{width:16,height:16}}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <span style={{fontWeight:600, color:'var(--cream)', fontSize:'0.95rem'}}>Schedule a Consultation</span>
              </div>
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/hFpMPHuJqHAMBNFBhGkW"
                style={{width:'100%', height:680, border:'none'}}
                title="Book a consultation"
                loading="lazy"
              />
            </div>
          </div>

          <div className="fi d1">
            <div style={{background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'32px 28px'}}>
              <h3 style={{fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'var(--cream)', marginBottom:6}}>
                Send a Message
              </h3>
              <p style={{fontSize:'0.84rem', color:'var(--cream-dim)', marginBottom:24}}>
                Prefer to reach out directly? Fill this out and we will respond within 24 hours.
              </p>
              {status === 'sent' ? (
                <div style={{background:'rgba(26,122,74,0.1)', border:'1px solid rgba(26,122,74,0.25)', borderRadius:'var(--r-md)', padding:'20px', textAlign:'center'}}>
                  <p style={{color:'#2ecc71', fontWeight:600, marginBottom:6}}>Message received.</p>
                  <p style={{fontSize:'0.84rem', color:'var(--cream-dim)'}}>We will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:14}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input className="form-input" required placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" placeholder="(402) 555-0100" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" required placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Home Address</label>
                    <input className="form-input" placeholder="123 Main St, Omaha, NE" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Home Size</label>
                    <select className="form-input" value={form.size} onChange={e => setForm(f => ({...f, size: e.target.value}))}>
                      <option value="">Select approximate size</option>
                      <option value="small">Small (under 1,500 sq ft)</option>
                      <option value="medium">Medium (1,500-2,500 sq ft)</option>
                      <option value="large">Large (2,500-4,000 sq ft)</option>
                      <option value="estate">Estate (4,000+ sq ft)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message (optional)</label>
                    <textarea className="form-input" rows={3} placeholder="Any questions or special requests..." value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} style={{resize:'vertical'}}/>
                  </div>
                  {status === 'error' && <p style={{fontSize:'0.82rem', color:'#e74c3c'}}>Something went wrong. Please try again or call us directly.</p>}
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'} style={{justifyContent:'center', padding:'14px'}}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:0}}>
              {[
                {label:'Phone / Text', value:'(402) 555-0100'},
                {label:'Email', value:'info@ashtonholidaylighting.com'},
                {label:'Service Area', value:'Omaha Metro and Surrounding'},
              ].map(c => (
                <div key={c.label} style={{display:'flex', justifyContent:'space-between', padding:'11px 0', borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:'0.75rem', color:'var(--cream-dim)', fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>{c.label}</span>
                  <span style={{fontSize:'0.84rem', color:'var(--cream)', fontWeight:500}}>{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── AI Showcase ──────────────────────────────────────────────────────────────
function AIShowcase() {
  const stack = [
    { name: 'Nano Banana Pro', detail: 'Gemini 3 Pro Image — photorealistic house visualization', status: 'Live' },
    { name: 'GoHighLevel CRM', detail: 'Automated lead capture, follow-up, and consultation booking', status: 'Live' },
    { name: 'Netlify Edge Functions', detail: 'Serverless AI processing — zero cold start latency', status: 'Live' },
    { name: 'Govee Smart API', detail: 'Real-time lighting control and scene management', status: 'Live' },
    { name: 'React + TypeScript', detail: 'Modern component-based frontend architecture', status: 'Live' },
  ]
  return (
    <section id="ai-showcase" style={{background:'var(--ink-mid)', borderTop:'1px solid var(--border)', padding:'110px 48px'}}>
      <div style={{maxWidth:'var(--inner-max)', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center'}}>
          <div>
            <div className="eyebrow fi">Powered by AI</div>
            <h2 className="section-title fi d1">This website is a<br/><em>live AI demo.</em></h2>
            <p className="section-lead fi d2" style={{marginBottom:24}}>
              Ashton Holiday Lighting is built on the same AI-integration stack we deploy for our clients. Every feature on this site demonstrates what is possible when you combine modern AI with smart business automation.
            </p>
            <p className="section-lead fi d3" style={{fontSize:'0.95rem', marginBottom:36}}>
              This site was designed and built entirely by AI — proof that AI can outperform traditional web agencies on speed, quality, and conversion optimization. It serves as a live portfolio piece for AI integration consulting.
            </p>
            <div className="fi d4">
              <a href="mailto:info@ashtonholidaylighting.com" className="btn btn-outline" style={{fontSize:'0.85rem', gap:8}}>
                Inquire About AI Integration <ArrowRight/>
              </a>
            </div>
          </div>

          <div className="fi d2">
            <div style={{background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'28px'}}>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:24, paddingBottom:18, borderBottom:'1px solid var(--border)'}}>
                <div style={{
                  width:36, height:36, borderRadius:'var(--r-sm)',
                  background:'var(--gold-glow)', border:'1px solid var(--border-gold)',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)'
                }}>
                  <CpuIcon/>
                </div>
                <div>
                  <div style={{fontWeight:700, fontSize:'0.95rem', color:'var(--cream)'}}>Live Tech Stack</div>
                  <div style={{fontSize:'0.72rem', color:'var(--cream-dim)'}}>All systems operational</div>
                </div>
                <div style={{
                  marginLeft:'auto', display:'flex', alignItems:'center', gap:6,
                  background:'rgba(26,122,74,0.1)', border:'1px solid rgba(26,122,74,0.25)',
                  borderRadius:100, padding:'4px 12px'
                }}>
                  <div style={{width:6, height:6, borderRadius:'50%', background:'#2ecc71', animation:'pulse-green 2s ease-in-out infinite'}}/>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.1em', color:'#2ecc71'}}>ALL SYSTEMS GO</span>
                </div>
              </div>
              {stack.map(item => (
                <div key={item.name} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 0', borderBottom:'1px solid var(--border)'}}>
                  <div>
                    <div style={{fontWeight:600, fontSize:'0.9rem', color:'var(--cream)'}}>{item.name}</div>
                    <div style={{fontSize:'0.72rem', color:'var(--cream-dim)', marginTop:2}}>{item.detail}</div>
                  </div>
                  <div style={{
                    display:'flex', alignItems:'center', gap:5,
                    background:'rgba(26,122,74,0.1)', border:'1px solid rgba(26,122,74,0.25)',
                    borderRadius:100, padding:'3px 10px', flexShrink:0, marginLeft:16
                  }}>
                    <div style={{width:5, height:5, borderRadius:'50%', background:'#2ecc71'}}/>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:'0.56rem', fontWeight:700, letterSpacing:'0.1em', color:'#2ecc71'}}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onBook }: { onBook: () => void }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Ashton Holiday Lighting</div>
            <p style={{fontSize:'0.875rem', color:'var(--cream-dim)', lineHeight:1.75, maxWidth:320, marginBottom:24}}>
              Omaha permanent holiday lighting specialists. Commercial-grade Govee LED systems installed once, controlled forever.
            </p>
            <button className="btn btn-primary" style={{fontSize:'0.82rem', padding:'11px 24px'}} onClick={onBook}>
              Book Free Consultation
            </button>
          </div>
          <div>
            <div className="footer-col-label">Navigation</div>
            <div className="footer-links">
              {['services', 'gallery', 'pricing', 'ai-visualizer', 'faq', 'book'].map(id => (
                <span key={id} className="footer-link" onClick={() => scrollTo(id)} style={{textTransform:'capitalize'}}>
                  {id.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-label">Contact</div>
            <div className="footer-links">
              <span className="footer-link">(402) 555-0100</span>
              <span className="footer-link">info@ashtonholidaylighting.com</span>
              <span className="footer-link">Omaha, Nebraska</span>
              <span className="footer-link">Serving the Metro Area</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>2025 Ashton Holiday Lighting. All rights reserved.</span>
          <span>Built with AI — Powered by Nano Banana Pro</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Sale Banner ──────────────────────────────────────────────────────────────
function SaleBanner({ onBook }: { onBook: () => void }) {
  const target = new Date('2025-10-01T00:00:00')
  const { d, h, m, s } = useCountdown(target)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="sale-banner">
      <span className="sale-banner-text"><strong>50% OFF Early Bird Sale</strong> — Ends in</span>
      <div className="countdown">
        <div className="countdown-unit"><div className="countdown-val">{pad(d)}</div><div className="countdown-label">Days</div></div>
        <div className="countdown-sep">:</div>
        <div className="countdown-unit"><div className="countdown-val">{pad(h)}</div><div className="countdown-label">Hrs</div></div>
        <div className="countdown-sep">:</div>
        <div className="countdown-unit"><div className="countdown-val">{pad(m)}</div><div className="countdown-label">Min</div></div>
        <div className="countdown-sep">:</div>
        <div className="countdown-unit"><div className="countdown-val">{pad(s)}</div><div className="countdown-label">Sec</div></div>
      </div>
      <button className="sale-banner-btn" onClick={onBook}>Claim Discount</button>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useFadeIn()
  const scrollToBook = () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const scrollToVisualizer = () => document.getElementById('ai-visualizer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <>
      <Nav onBook={scrollToBook}/>
      <main>
        <Hero onBook={scrollToBook} onVisualizer={scrollToVisualizer}/>
        <Marquee/>
        <Stats/>
        <Features/>
        <Gallery onVisualizer={scrollToVisualizer}/>
        <Process onBook={scrollToBook}/>
        <Pricing onBook={scrollToBook}/>
        <AIVisualizer/>
        <FAQ/>
        <Booking/>
        <AIShowcase/>
      </main>
      <Footer onBook={scrollToBook}/>
      <SaleBanner onBook={scrollToBook}/>
    </>
  )
}
