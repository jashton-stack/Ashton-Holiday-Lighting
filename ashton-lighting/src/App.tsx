import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FaqItem { q: string; a: string }
interface PricingTier { name: string; startingAt: string; desc: string; features: string[]; featured?: boolean }
interface ProcessStep { num: string; title: string; desc: string }

// ─── Constants ───────────────────────────────────────────────────────────────

const GHL_CALENDAR_ID = 'JbBRO1y5H5DWd8qcOstJ'

const BULB_COLORS = [
  '#ff6b6b','#ffd166','#06d6a0','#00d4ff','#ff9a3c',
  '#c084fc','#ffd166','#ff6b6b','#00d4ff','#06d6a0',
]

const FAQS: FaqItem[] = [
  { q: 'What are permanent holiday lights?', a: 'Permanent holiday lights — like the Govee Permanent Outdoor Lights we install — are weatherproof LED fixtures installed once and stay on your home year-round. You control colors, patterns, and schedules through a smartphone app. No ladder every season, no tangled wires in the garage.' },
  { q: 'How much does installation cost?', a: 'Our pricing starts at $800 for a 1-story home front, $1,200 for a 2-story home front, and $1,500+ for custom or larger properties. Every home is different, which is why we offer a free on-site consultation and exact quote. And right now, our sale takes 50% off installation.' },
  { q: 'How long does a typical install take?', a: 'Most homes are done in about half a day. We handle everything — mounting the brackets, running the wiring, syncing the app, and walking you through your first set of scenes before we leave.' },
  { q: 'Are the lights visible during the day?', a: 'The brackets are low-profile and designed to blend into your roofline and eaves. Most homeowners find them nearly invisible in daylight — clean and architectural, not an eyesore.' },
  { q: 'Can I control the colors and patterns myself?', a: "Yes. The Govee app gives you full control over 16 million+ colors, dozens of pre-set holiday scenes, custom patterns, schedules, and even music-sync modes. Switch from Christmas red and green to your team's game-day colors with a single tap." },
  { q: 'Are the lights safe in Nebraska winters?', a: "Absolutely. Govee permanent lights are IP67 waterproof and built for extreme temperature swings — rain, snow, ice, and Omaha's notoriously cold winters are no problem." },
  { q: 'Do you offer a warranty?', a: "Yes — we offer a limited workmanship warranty on our installations, and the Govee hardware comes with its own manufacturer's warranty. If something isn't working right after install, reach out and we'll make it right." },
  { q: 'Do the lights work with Alexa or Google Home?', a: 'Yes. Govee integrates with Amazon Alexa, Google Home, and Apple HomeKit so you can control your lights with voice commands or fold them into your existing smart home routines.' },
  { q: 'What is the AI House Visualizer?', a: 'Our AI House Visualizer lets you upload a photo of your home and see exactly what it would look like with permanent holiday lights installed. Powered by advanced AI image generation, it gives you a realistic preview before you commit — completely free.' },
  { q: 'How do I get started?', a: "Simply book a free on-site consultation using our calendar below. We'll visit your home, measure your roofline, walk you through the options, and give you a no-obligation custom quote — all in about 20-30 minutes." },
]

const FEATURE_CARDS = [
  { title: '16 Million+ Colors', body: 'RGBIC tech lets each bulb display a unique color independently. Create gradients, chasing patterns, music-sync animations, or exact holiday palettes.' },
  { title: 'Intelligent Scheduling', body: 'Set auto schedules, program holidays months in advance, or let the app suggest lighting by date. Your home lights up automatically.' },
  { title: 'Energy Efficient', body: 'Run your entire roofline for less than a single string of old-school bulbs. Govee LEDs use a fraction of traditional incandescent energy.' },
  { title: 'IP67 Weatherproof', body: "Professional-grade fixtures rated for rain, snow, ice, and Omaha's extreme temperature swings — holding up year after year." },
  { title: 'No Seasonal Hassle', body: 'Mounted once, stays forever. No ladder every November, no storage every January — just tap the app and your home transforms.' },
  { title: 'Local Expert Install', body: "We're your Omaha neighbors. Full install, wiring, app setup, and a walkthrough so you're in control of every color from day one." },
]

const PRICING_TIERS: PricingTier[] = [
  {
    name: '1-Story Front',
    startingAt: '$800',
    desc: 'Front roofline of a single-story home',
    features: ['Front roofline coverage', 'Full app setup & walkthrough', 'IP67 weatherproof fixtures', 'Workmanship warranty', 'Free consultation'],
  },
  {
    name: '2-Story Front',
    startingAt: '$1,200',
    desc: 'Front roofline of a two-story home',
    features: ['Front roofline coverage', 'Full app setup & walkthrough', 'IP67 weatherproof fixtures', 'Workmanship warranty', 'Free consultation', 'Priority scheduling'],
    featured: true,
  },
  {
    name: 'Custom',
    startingAt: '$1,500',
    desc: 'Large homes, full wrap, or commercial',
    features: ['Full or partial wrap — your choice', 'Full app setup & walkthrough', 'IP67 weatherproof fixtures', 'Extended workmanship warranty', 'Free consultation', 'Priority scheduling', 'Annual check-up visit'],
  },
]

const PROCESS_STEPS: ProcessStep[] = [
  { num: '01', title: 'Book Free Consult', desc: 'Schedule a 20-30 minute on-site visit. We come to you — no cost, no obligation.' },
  { num: '02', title: 'Custom Quote', desc: 'We measure your roofline, walk through options, and give you a same-day custom quote.' },
  { num: '03', title: 'Half-Day Install', desc: 'Our team installs everything in about half a day. Clean, professional, zero mess left behind.' },
  { num: '04', title: 'Enjoy Forever', desc: 'App walkthrough complete. Tap a button and your home transforms for every holiday, every season.' },
]

// ─── Star Field ───────────────────────────────────────────────────────────────

function StarField(): JSX.Element {
  const stars = useRef<Array<{ x: number; y: number; r: number; dur: number; delay: number }>>([])
  if (stars.current.length === 0) {
    for (let i = 0; i < 180; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.6 + 0.2,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 6,
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
        <radialGradient id="heroGrad" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#071932" />
          <stop offset="60%" stopColor="#030a18" />
          <stop offset="100%" stopColor="#010810" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#heroGrad)" />
      {stars.current.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#cce8ff" opacity="0.55">
          <animate attributeName="opacity" values="0.55;0.1;0.55" dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}

// ─── Light String ─────────────────────────────────────────────────────────────

function LightString(): JSX.Element {
  return (
    <div style={{
      position: 'absolute', top: 70, left: 0, right: 0,
      display: 'flex', justifyContent: 'space-around',
      pointerEvents: 'none', overflow: 'hidden',
      height: 50, alignItems: 'flex-start', zIndex: 3,
    }}>
      {Array.from({ length: 52 }, (_, i) => {
        const color = BULB_COLORS[i % BULB_COLORS.length]
        return (
          <div
            key={i}
            style={{
              width: 7, height: 11,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              background: `radial-gradient(circle at 38% 28%, #fff 0%, ${color} 70%)`,
              boxShadow: `0 0 8px 2px ${color}88`,
              flexShrink: 0,
              animation: `flicker ${(2.1 + (i * 0.13 % 1.8)).toFixed(2)}s ease-in-out ${(i * 0.09).toFixed(2)}s infinite`,
            }}
          />
        )
      })}
    </div>
  )
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ faq, index, open, onToggle }: { faq: FaqItem; index: number; open: boolean; onToggle: (i: number) => void }): JSX.Element {
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-trigger" onClick={() => onToggle(index)}>
        <span className="faq-question">{faq.q}</span>
        <span className="faq-icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">{faq.a}</div>
      </div>
    </div>
  )
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────

function CountdownTimer(): JSX.Element {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const target = new Date()
    target.setDate(target.getDate() + 14)
    target.setHours(23, 59, 59, 0)
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="countdown">
      {(['d', 'h', 'm', 's'] as const).map((k, idx) => (
        <>
          <div key={k} className="countdown-unit">
            <span className="countdown-val">{pad(time[k])}</span>
            <span className="countdown-label">{['Days','Hrs','Min','Sec'][idx]}</span>
          </div>
          {idx < 3 && <span className="countdown-sep">:</span>}
        </>
      ))}
    </div>
  )
}

// ─── Fade-in hook ─────────────────────────────────────────────────────────────

function useFadeIn(): void {
  useEffect(() => {
    // Add js-ready to body to enable fade-in animations
    document.body.classList.add('js-ready')
    const els = document.querySelectorAll<HTMLElement>('.fi')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.05 }
    )
    els.forEach(el => obs.observe(el))
    // Immediately show anything already in viewport
    setTimeout(() => {
      els.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight) el.classList.add('vis')
      })
    }, 60)
    return () => obs.disconnect()
  }, [])
}

// ─── AI Visualizer ────────────────────────────────────────────────────────────

function AIVisualizer(): JSX.Element {
  const [stage, setStage] = useState<'idle' | 'preview' | 'loading' | 'result' | 'error'>('idle')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [lightStyle, setLightStyle] = useState('Christmas (Red & Green)')
  const fileRef = useRef<HTMLInputElement>(null)

  const LIGHT_STYLES = [
    'Christmas (Red & Green)', 'Warm White Classic', 'Halloween (Orange & Purple)',
    'Fourth of July (Red, White & Blue)', "Valentine's Day (Pink & Red)",
    "St. Patrick's Day (Green)", 'Easter (Pastel Rainbow)', 'Custom Color Party',
  ]

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setErrorMsg('Please upload an image file (JPG, PNG, WEBP).'); return }
    if (file.size > 10 * 1024 * 1024) { setErrorMsg('Image must be under 10MB.'); return }
    setErrorMsg('')
    const reader = new FileReader()
    reader.onload = (e) => { setUploadedImage(e.target?.result as string); setStage('preview') }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleGenerate = async () => {
    if (!uploadedImage) return
    setStage('loading')
    setResultImage(null)
    try {
      const response = await fetch('/.netlify/functions/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: uploadedImage, lightStyle }),
      })
      if (!response.ok) throw new Error(`Status ${response.status}`)
      const data = await response.json()
      if (data.imageUrl) { setResultImage(data.imageUrl); setStage('result') }
      else throw new Error('No image returned')
    } catch (err) {
      console.error(err)
      setErrorMsg('AI generation encountered an issue. Please try again or call us at (402) 889-8640.')
      setStage('error')
    }
  }

  const reset = () => { setStage('idle'); setUploadedImage(null); setResultImage(null); setErrorMsg('') }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>

      {/* Idle — upload zone */}
      {stage === 'idle' && (
        <div
          className={`upload-zone${dragOver ? ' drag-over' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
          <div className="upload-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>Drop your home photo here</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', marginBottom: 20 }}>or click to browse — JPG, PNG, WEBP up to 10MB</p>
          <button className="btn btn-primary" style={{ pointerEvents: 'none' }}>Choose Photo</button>
          {errorMsg && <p style={{ color: '#fc8181', fontSize: '0.85rem', marginTop: 14 }}>{errorMsg}</p>}
        </div>
      )}

      {/* Preview — image + style selector */}
      {stage === 'preview' && uploadedImage && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Your Home</p>
              <img src={uploadedImage} alt="Your home" style={{ width: '100%', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', objectFit: 'cover', aspectRatio: '4/3', display: 'block' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Choose Light Style</p>
                <select className="form-input" value={lightStyle} onChange={e => setLightStyle(e.target.value)}>
                  {LIGHT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--cream-dim)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 600 }}>AI-Powered Preview</span><br />
                  Our AI will generate a realistic visualization of your home with {lightStyle} permanent lighting installed along the roofline and eaves.
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleGenerate} style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>
                Generate AI Preview
              </button>
              <button className="btn btn-outline" onClick={reset} style={{ width: '100%', justifyContent: 'center' }}>
                Upload Different Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {stage === 'loading' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ width: 80, height: 80, margin: '0 auto 28px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(232,160,32,0.15)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 8, border: '2px solid transparent', borderTopColor: 'var(--gold-dim)', borderRadius: '50%', animation: 'spin 0.7s linear infinite reverse' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>AI is visualizing your home...</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', marginBottom: 24 }}>Analyzing roofline, applying {lightStyle} lighting — this takes about 15-30 seconds</p>
        </div>
      )}

      {/* Result */}
      {stage === 'result' && resultImage && uploadedImage && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Before</p>
              <img src={uploadedImage} alt="Before" style={{ width: '100%', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', objectFit: 'cover', aspectRatio: '4/3', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>After — AI Preview</p>
              <img src={resultImage} alt="AI visualization" style={{ width: '100%', borderRadius: 'var(--r-md)', border: '1px solid var(--border-gold)', objectFit: 'cover', aspectRatio: '4/3', boxShadow: '0 0 30px rgba(232,160,32,0.2)', display: 'block' }} />
            </div>
          </div>
          <div style={{ background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-md)', padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--cream)', marginBottom: 4 }}>Love what you see?</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)' }}>Book your free consultation and we'll bring this vision to life — usually within 2 weeks.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>Book Free Consult</button>
              <button className="btn btn-outline" onClick={reset}>Try Another Photo</button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {stage === 'error' && (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(252,129,129,0.1)', border: '1px solid rgba(252,129,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fc8181" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="10" cy="10" r="9"/><path d="M10 6v4M10 14h.01"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>Generation Failed</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>{errorMsg}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => setStage('preview')}>Try Again</button>
            <button className="btn btn-outline" onClick={reset}>Upload New Photo</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState({ first: '', last: '', email: '', phone: '', interest: 'Permanent Holiday Lights (Govee)', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [navScrolled, setNavScrolled] = useState(false)

  useFadeIn()

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSubmit = async () => {
    if (!formState.first || !formState.email) { setFormError('Please enter at least your first name and email.'); return }
    setFormError(''); setFormStatus('sending')
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formState.first, lastName: formState.last,
          email: formState.email, phone: formState.phone,
          interest: formState.interest, message: formState.message,
        }),
      })
      if (res.ok) { setFormStatus('success') } else { throw new Error(`Status ${res.status}`) }
    } catch { setFormStatus('error'); setFormError('Something went wrong — please call us at (402) 889-8640.') }
  }

  const inp = (field: keyof typeof formState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormState(s => ({ ...s, [field]: e.target.value }))

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => scrollTo('hero')}>
          Ashton Holiday Lighting
          <span>Omaha, Nebraska</span>
        </div>
        <ul className="nav-links" style={{ listStyle: 'none' }}>
          {(['about', 'gallery', 'pricing', 'faq', 'booking'] as const).map(id => (
            <li key={id}>
              <span className="nav-link" onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '10px 22px' }} onClick={() => scrollTo('booking')}>
            Free Consult
          </button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {(['about', 'gallery', 'pricing', 'faq', 'booking'] as const).map(id => (
          <a key={id} onClick={() => scrollTo(id)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <button className="mobile-cta" onClick={() => scrollTo('booking')}>Book Free Consultation</button>
      </div>

      {/* ── HERO ── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#010810' }}>
        <StarField />
        <LightString />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(232,160,32,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 24px 80px', maxWidth: 860 }}>
          <div className="fi" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)', display: 'inline-block', animation: 'pulse-gold 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Omaha's Premier Permanent Lighting Installer</span>
          </div>

          <h1 className="fi d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5.2rem)', fontWeight: 900, lineHeight: 1.05, color: 'var(--cream)', marginBottom: 24, letterSpacing: '-0.02em' }}>
            Holiday Lights.<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>All Year Beautiful.</em>
          </h1>

          <p className="fi d2" style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', color: 'var(--cream-mid)', lineHeight: 1.8, marginBottom: 44, maxWidth: 600, margin: '0 auto 44px' }}>
            Govee permanent exterior lights — installed once, controlled forever. Transform your Omaha home with millions of colors for every holiday, every season.
          </p>

          <div className="fi d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
            <button className="btn btn-primary" style={{ fontSize: '1rem', padding: '15px 32px' }} onClick={() => scrollTo('booking')}>
              Book Free Consultation
            </button>
            <button className="btn btn-outline" style={{ fontSize: '1rem', padding: '15px 32px' }} onClick={() => scrollTo('visualizer')}>
              See AI Preview of Your Home
            </button>
          </div>

          <div className="fi d4" style={{ display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Free Consultation', 'Half-Day Install', '50% Off Now', 'Limited Warranty'].map(text => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--cream-mid)', fontFamily: 'var(--font-body)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', flexShrink: 0 }} />
                {text}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--cream-dim)', zIndex: 2 }}>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--cream-dim), transparent)' }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, rep) =>
            ['5-Star Rated', 'Omaha Local', 'IP67 Weatherproof', 'App Controlled', 'Half-Day Install', 'Free Consultation', 'Govee Certified', '16M+ Colors', 'Fully Insured', 'Workmanship Warranty'].map(item => (
              <span key={`${rep}-${item}`} className="marquee-item">
                {item}
                <span className="marquee-dot" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: 'var(--surface)', padding: '0 48px' }}>
        <div className="stats-row" style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          {[
            { num: '5.0', label: 'Star Rated', sub: 'Google Reviews' },
            { num: '$800', label: 'Installs Start At', sub: 'free quote included' },
            { num: '1/2 Day', label: 'Typical Install', sub: 'in & out fast' },
            { num: '50%', label: 'Off Installation', sub: 'limited time offer' },
          ].map(({ num, label, sub }) => (
            <div key={label} className="stat-cell">
              <div className="stat-number">{num}</div>
              <div className="stat-label">{label}</div>
              <div className="stat-sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '120px 48px', background: 'var(--ink)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <p className="fi eyebrow">What We Do</p>
            <h2 className="fi d1 section-title">Permanent Lights.<br /><em>Zero Hassle.</em></h2>
            <p className="fi d2 section-lead">We install Govee permanent outdoor lighting systems that stay on your home year-round. No more hiring someone every November, no more tangled boxes in the garage — just beautiful, app-controlled light at the tap of a button.</p>
            <ul className="fi d3" style={{ listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'App-Controlled Colors', desc: '16M+ colors and dozens of scenes — change your lights to match any holiday or mood in seconds.' },
                { title: 'Clean, Permanent Install', desc: 'Mounted with brackets built to withstand Nebraska weather, flush to your roofline. Barely visible by day, stunning at night.' },
                { title: 'Built for Nebraska Winters', desc: 'IP67 weatherproof — reliable through every Omaha season, rain, snow, or ice.' },
                { title: 'Smart Home Ready', desc: 'Works with Alexa, Google Home, and Apple HomeKit for voice control and automation.' },
              ].map(({ title, desc }) => (
                <li key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 'var(--r-sm)', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 8, boxShadow: '0 0 8px rgba(232,160,32,0.5)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--cream)', marginBottom: 3, fontSize: '0.95rem' }}>{title}</div>
                    <div style={{ fontSize: '0.87rem', color: 'var(--cream-dim)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="fi d4" style={{ marginTop: 32 }}>
              <button className="btn btn-primary" onClick={() => scrollTo('booking')}>Get My Free Quote</button>
            </div>
          </div>
          <div className="fi d2" style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '4/3', background: 'var(--surface)' }}>
            <img src="/images/IMG_7323.jpeg" alt="Ashton Holiday Lighting install" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,12,10,0.7) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
              <div style={{ background: 'rgba(13,12,10,0.88)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 10px #2ecc71', flexShrink: 0, animation: 'pulse-green 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--cream)' }}>Real Omaha install — half-day completion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '120px 48px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="fi eyebrow center">The Technology</p>
            <h2 className="fi d1 section-title" style={{ textAlign: 'center' }}>Why <em>Govee</em> Permanent Lights?</h2>
            <p className="fi d2 section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>Govee is the industry leader in smart permanent outdoor lighting — and we're Omaha's trusted installer.</p>
          </div>
          <div className="feature-grid">
            {FEATURE_CARDS.map((card, i) => (
              <div key={card.title} className={`fi d${Math.min(i + 1, 4)} feature-cell`}>
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="4" fill="var(--gold)" opacity="0.8"/>
                    <circle cx="10" cy="10" r="8" stroke="var(--gold)" strokeWidth="1" opacity="0.3"/>
                  </svg>
                </div>
                <h3 className="feature-title">{card.title}</h3>
                <p className="feature-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding: '120px 48px', background: 'var(--ink)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p className="fi eyebrow">Our Work</p>
              <h2 className="fi d1 section-title">Omaha Homes, <em>Transformed</em></h2>
              <p className="fi d2 section-lead" style={{ marginBottom: 0 }}>Every install is custom-planned to complement your home's roofline and architecture.</p>
            </div>
            <button className="fi d3 btn btn-outline" onClick={() => scrollTo('booking')}>Get This For Your Home</button>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item gallery-item-1">
              <img src="/images/IMG_7323.jpeg" alt="Ashton Holiday Lighting install" />
            </div>
            <div className="gallery-item">
              <img src="/images/IMG_6879.jpeg" alt="Ashton Holiday Lighting install" />
            </div>
            <div className="gallery-item">
              <img src="/images/IMG_6792.jpeg" alt="Ashton Holiday Lighting install" />
            </div>
            <div className="gallery-item gallery-item-4">
              <img src="/images/IMG_6807.jpeg" alt="Ashton Holiday Lighting install" />
            </div>
            <div className="gallery-item">
              <img src="/images/IMG_6874.jpeg" alt="Ashton Holiday Lighting install" />
            </div>
          </div>
          <div className="fi" style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn btn-primary" onClick={() => scrollTo('visualizer')}>See What Your Home Would Look Like</button>
          </div>
        </div>
      </section>

      {/* ── AI VISUALIZER ── */}
      <section id="visualizer" style={{ padding: '120px 48px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="fi eyebrow center">AI-Powered</p>
            <h2 className="fi d1 section-title" style={{ textAlign: 'center' }}>See Your Home <em>Transformed</em></h2>
            <p className="fi d2 section-lead" style={{ margin: '0 auto 16px', textAlign: 'center' }}>Upload a photo of your home and our AI will generate a realistic preview of what it would look like with permanent holiday lights installed — before you spend a single dollar.</p>
            <div className="fi d3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', borderRadius: 100, padding: '6px 18px', marginBottom: 40 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'pulse-gold 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--gold)' }}>Powered by Advanced AI Image Generation</span>
            </div>
          </div>
          <div className="fi d2" style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light))' }} />
            <AIVisualizer />
          </div>
          <div className="fi" style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { title: 'Private & Secure', desc: 'Your photos are processed securely and never stored or shared.' },
              { title: 'Results in ~20 Seconds', desc: 'Our AI analyzes your roofline and generates a realistic preview fast.' },
              { title: 'Completely Free', desc: 'No sign-up required. Just upload and see your home transformed.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px rgba(232,160,32,0.5)', margin: '0 auto 12px' }} />
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--cream)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--cream-dim)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '120px 48px', background: 'var(--ink)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="fi eyebrow center">How It Works</p>
            <h2 className="fi d1 section-title" style={{ textAlign: 'center' }}>From Call to <em>Lit Up</em> in Days</h2>
          </div>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className={`fi d${i + 1} process-step`}>
                <div className="process-num">{step.num}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-body">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="fi" style={{ textAlign: 'center', marginTop: 56 }}>
            <button className="btn btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }} onClick={() => scrollTo('booking')}>
              Start Step 1 — Book Free Consult
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '120px 48px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="fi eyebrow center">Transparent Pricing</p>
            <h2 className="fi d1 section-title" style={{ textAlign: 'center' }}>Simple, <em>Honest Pricing</em></h2>
            <p className="fi d2 section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>No hidden fees. No surprise charges. Every install includes a free on-site consultation and custom quote.</p>
          </div>
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier, i) => (
              <div key={tier.name} className={`fi d${i + 1} pricing-card${tier.featured ? ' featured' : ''}`}>
                {tier.featured && <div className="pricing-badge">Most Popular</div>}
                <div className="pricing-tier">{tier.name}</div>
                <div className="pricing-price">
                  <span style={{ fontSize: '0.9rem', fontWeight: 400, fontFamily: 'var(--font-body)', color: 'var(--cream-dim)', verticalAlign: 'super' }}>Starting at</span>
                  <br />{tier.startingAt}
                </div>
                <p className="pricing-desc">{tier.desc}</p>
                <ul className="pricing-features">
                  {tier.features.map(f => (
                    <li key={f} className="pricing-feature">
                      <span className="pricing-check">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }} onClick={() => scrollTo('booking')}>
                  Get Free Quote
                </button>
              </div>
            ))}
          </div>
          <div className="fi" style={{ marginTop: 32, textAlign: 'center', padding: '20px 24px', background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-md)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>Sale Active: 50% Off Installation</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)' }}>Book your free consultation before the sale ends to lock in this price. Hardware costs remain the same.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '120px 48px', background: 'var(--ink)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 72, alignItems: 'start' }}>
          <div>
            <p className="fi eyebrow">FAQ</p>
            <h2 className="fi d1 section-title">Frequently Asked <em>Questions</em></h2>
            <p className="fi d2 section-lead">Everything you need to know before booking. Still have questions? Call us directly.</p>
            <div className="fi d3" style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="tel:4028898640" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', textDecoration: 'none', transition: 'border-color 0.2s' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 2h3l1.5 3.5-2 1.5a11 11 0 005 5l1.5-2L14 11.5V14a1 1 0 01-1 1C6.3 15 1 9.7 1 3a1 1 0 011-1z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--cream)' }}>Call Us Directly</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gold)' }}>(402) 889-8640</div>
                </div>
              </a>
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', cursor: 'pointer', transition: 'border-color 0.2s', textAlign: 'left' }} onClick={() => scrollTo('booking')}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="2" width="14" height="12" rx="2"/><path d="M1 6h14M5 1v2M11 1v2"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--cream)' }}>Book Free Consult</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gold)' }}>20-30 min, no obligation</div>
                </div>
              </button>
            </div>
          </div>
          <div className="fi d2">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} open={openFaq === i} onToggle={i => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="booking" style={{ padding: '120px 48px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="fi eyebrow center">Get Started</p>
            <h2 className="fi d1 section-title" style={{ textAlign: 'center' }}>Book Your Free <em>Consultation</em></h2>
            <p className="fi d2 section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>We'll visit your home, measure your roofline, and give you a no-obligation quote — all for free. Most installs are done in half a day.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'start' }}>
            {/* GHL Calendar */}
            <div className="fi" style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light))' }} />
              <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--cream)', marginBottom: 4 }}>Schedule a Consultation</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--cream-dim)' }}>Pick a date and time that works for you.</p>
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {['Free', 'No Obligation', '20-30 min'].map(t => (
                    <span key={t} style={{ fontSize: '0.72rem', color: 'var(--cream-dim)', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.08em' }}>{t}</span>
                  ))}
                </div>
              </div>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/booking/${GHL_CALENDAR_ID}`}
                style={{ width: '100%', height: 680, border: 'none', display: 'block', marginTop: 8 }}
                title="Schedule Consultation"
                loading="lazy"
              />
            </div>

            {/* Contact Form + Countdown */}
            <div className="fi d2" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '28px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold-light), var(--gold-dim))' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--cream)', marginBottom: 6 }}>Or Send Us a Message</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--cream-dim)', marginBottom: 20 }}>We respond within 1 business day.</p>
                {formStatus === 'success' ? (
                  <div style={{ background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-md)', padding: 24, textAlign: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gold-glow)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 10 8 14 16 6"/>
                      </svg>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>Message Received!</p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', lineHeight: 1.6 }}>We'll be in touch within 1 business day. In the meantime, feel free to call us at (402) 889-8640.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" placeholder="John" value={formState.first} onChange={inp('first')} /></div>
                      <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Smith" value={formState.last} onChange={inp('last')} /></div>
                    </div>
                    <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="john@email.com" value={formState.email} onChange={inp('email')} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="(402) 555-0000" value={formState.phone} onChange={inp('phone')} /></div>
                    <div className="form-group">
                      <label className="form-label">I'm Interested In</label>
                      <select className="form-input" value={formState.interest} onChange={inp('interest')}>
                        <option>Permanent Holiday Lights (Govee)</option>
                        <option>Free Consultation & Quote</option>
                        <option>Pricing Information</option>
                        <option>AI Visualizer Demo</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Message (Optional)</label><textarea className="form-input" rows={3} placeholder="Tell us about your home, roofline, or any questions..." value={formState.message} onChange={inp('message')} style={{ resize: 'vertical' }} /></div>
                    {formError && <p style={{ fontSize: '0.82rem', color: '#fc8181', padding: '8px 12px', background: 'rgba(252,129,129,0.08)', borderRadius: 'var(--r-sm)', border: '1px solid rgba(252,129,129,0.2)' }}>{formError}</p>}
                    <button className="btn btn-primary" style={{ width: '100%', padding: '14px', justifyContent: 'center' }} onClick={handleSubmit} disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                    <p style={{ fontSize: '0.72rem', color: 'var(--cream-dim)', textAlign: 'center' }}>We respond within 1 business day. Installs start at $800.</p>
                  </div>
                )}
              </div>

              {/* Countdown */}
              <div style={{ background: 'var(--ink)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-lg)', padding: '20px 22px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>Sale Ends In:</p>
                <CountdownTimer />
                <p style={{ fontSize: '0.78rem', color: 'var(--cream-dim)', marginTop: 12, lineHeight: 1.5 }}>Book before the timer hits zero to lock in <strong style={{ color: 'var(--gold)' }}>50% off installation</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI COMPANY SHOWCASE ── */}
      <section style={{ padding: '100px 48px', background: 'var(--ink)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 'var(--inner-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="fi" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block', animation: 'pulse-gold 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8b5cf6' }}>AI Integration Showcase</span>
            </div>
            <h2 className="fi d1 section-title">This Website is <em style={{ color: '#a78bfa' }}>Powered by AI</em></h2>
            <p className="fi d2 section-lead">Every element of this website — from the AI House Visualizer to the automated lead workflows — was built and optimized using cutting-edge artificial intelligence.</p>
            <ul className="fi d3" style={{ listStyle: 'none', marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'AI-generated house visualization previews',
                'Automated CRM and lead routing via GoHighLevel',
                'Conversion-optimized layout built with AI assistance',
                'Smart contact workflows and follow-up automation',
              ].map(text => (
                <li key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', color: 'var(--cream-dim)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block', flexShrink: 0 }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="fi d2" style={{ background: 'var(--surface)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 'var(--r-xl)', padding: '36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #7c3aed, var(--gold), var(--gold-light))' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8b5cf6', marginBottom: 20 }}>AI Stack</p>
            {[
              { label: 'House Visualizer', tech: 'Nano Banana Pro (Gemini)', status: 'Live' },
              { label: 'Lead Automation', tech: 'GoHighLevel + AI Workflows', status: 'Live' },
              { label: 'Conversion Copy', tech: 'AI-Optimized Messaging', status: 'Active' },
              { label: 'Site Architecture', tech: 'AI-Designed & Built', status: 'Active' },
            ].map(({ label, tech, status }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--cream)', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cream-dim)' }}>{tech}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: '#2ecc71', background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.25)', borderRadius: 100, padding: '3px 10px' }}>{status}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(46,204,113,0.06)', border: '1px solid rgba(46,204,113,0.2)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 8px #2ecc71', flexShrink: 0, animation: 'pulse-green 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: '#2ecc71', letterSpacing: '0.08em' }}>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Ashton Holiday Lighting</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--cream-dim)', lineHeight: 1.75, maxWidth: 300, marginBottom: 20 }}>
                Omaha's premier permanent holiday lighting installer. Govee-certified, locally owned, and committed to transforming your home year-round.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="tel:4028898640" style={{ fontSize: '0.875rem', color: 'var(--cream-mid)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--gold)' }}>(402) 889-8640</span>
                </a>
                <a href="mailto:info@ashtonholidaylighting.com" style={{ fontSize: '0.875rem', color: 'var(--cream-dim)' }}>
                  info@ashtonholidaylighting.com
                </a>
              </div>
            </div>
            <div>
              <div className="footer-col-label">Navigate</div>
              <div className="footer-links">
                {['about', 'gallery', 'pricing', 'faq', 'booking'].map(id => (
                  <span key={id} className="footer-link" onClick={() => scrollTo(id)}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-label">Contact</div>
              <div className="footer-links">
                <a href="tel:4028898640" className="footer-link">(402) 889-8640</a>
                <a href="mailto:info@ashtonholidaylighting.com" className="footer-link">info@ashtonholidaylighting.com</a>
                <span className="footer-link" onClick={() => scrollTo('booking')}>Book Free Consultation</span>
                <span className="footer-link" onClick={() => scrollTo('visualizer')}>AI House Visualizer</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ashton Holiday Lighting. All rights reserved. Omaha, Nebraska.</span>
            <span>Installs start at $800 — <span style={{ color: 'var(--gold)', cursor: 'pointer' }} onClick={() => scrollTo('booking')}>Book your free quote today</span></span>
          </div>
        </div>
      </footer>

      {/* ── SALE BANNER ── */}
      <div className="sale-banner">
        <span className="sale-banner-text"><strong>50% Off Installation</strong> — Spring Sale ends soon.</span>
        <CountdownTimer />
        <button className="sale-banner-btn" onClick={() => scrollTo('booking')}>Claim Offer</button>
      </div>
    </>
  )
}
