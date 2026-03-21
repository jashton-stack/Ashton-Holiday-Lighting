import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem { q: string; a: string }
interface GoveeCard { icon: string; title: string; body: string }
interface Testimonial { name: string; location: string; text: string; stars: number }
interface PricingTier { name: string; range: string; desc: string; features: string[]; featured?: boolean }
interface ProcessStep { num: string; title: string; desc: string; icon: string }

// ─── Constants ────────────────────────────────────────────────────────────────

const GHL_CALENDAR_ID = 'JbBRO1y5H5DWd8qcOstJ'

const BULB_COLORS = [
  '#ff6b6b','#ffd166','#06d6a0','#00d4ff','#ff9a3c',
  '#c084fc','#ffd166','#ff6b6b','#00d4ff','#06d6a0',
]

const FAQS: FaqItem[] = [
  { q: 'What are permanent holiday lights?', a: 'Permanent holiday lights — like the Govee Permanent Outdoor Lights we install — are weatherproof LED fixtures installed once and stay on your home year-round. You control colors, patterns, and schedules through a smartphone app. No ladder every season, no tangled wires in the garage.' },
  { q: 'How much does installation cost?', a: "Most residential installs fall in the $1,000–$2,500 range, depending on the linear footage of your roofline and eaves. Every home is a little different, which is why we offer a free on-site consultation and custom quote. And right now, our spring sale takes 50% off installation — so there's never been a better time." },
  { q: 'How long does a typical install take?', a: 'Most homes are done in about half a day. We handle everything — mounting the brackets, running the wiring, syncing the app, and walking you through your first set of scenes before we leave.' },
  { q: 'Are the lights visible during the day?', a: 'The brackets are low-profile and designed to blend into your roofline and eaves. Most homeowners find them nearly invisible in daylight — clean and architectural, not an eyesore.' },
  { q: 'Can I control the colors and patterns myself?', a: "Yes! The Govee app gives you full control over 16 million+ colors, dozens of pre-set holiday scenes, custom patterns, schedules, and even music-sync modes. Switch from Christmas red and green to your team's game-day colors with a single tap." },
  { q: 'Are the lights safe in Nebraska winters?', a: "Absolutely. Govee permanent lights are IP67 waterproof and built for extreme temperature swings — rain, snow, ice, and Omaha's notoriously cold winters are no problem." },
  { q: 'Do you offer a warranty?', a: "Yes — we offer a limited workmanship warranty on our installations, and the Govee hardware comes with its own manufacturer's warranty. If something isn't working right after install, reach out and we'll make it right." },
  { q: 'Do the lights work with Alexa or Google Home?', a: 'Yes! Govee integrates with Amazon Alexa, Google Home, and Apple HomeKit so you can control your lights with voice commands or fold them into your existing smart home routines.' },
  { q: 'What is the AI House Visualizer?', a: 'Our AI House Visualizer is a first-of-its-kind tool that lets you upload a photo of your home and see exactly what it would look like with permanent holiday lights installed. Powered by advanced AI image generation, it gives you a realistic preview before you commit — completely free.' },
  { q: 'How do I get started?', a: "Simply book a free on-site consultation using our calendar below. We'll visit your home, measure your roofline, walk you through the options, and give you a no-obligation custom quote — all in about 20–30 minutes." },
]

const GOVEE_CARDS: GoveeCard[] = [
  { icon: '🎨', title: '16 Million+ Colors', body: 'RGBIC tech lets each bulb display a unique color independently. Create gradients, chasing patterns, music-sync animations, or exact holiday palettes.' },
  { icon: '📅', title: 'Intelligent Scheduling', body: 'Set auto schedules, program holidays months in advance, or let the app suggest lighting by date. Your home lights up automatically.' },
  { icon: '⚡', title: 'Energy Efficient', body: 'Run your entire roofline for less than a single string of old-school bulbs. Govee LEDs use a fraction of traditional incandescent energy.' },
  { icon: '🛡️', title: 'IP67 Weatherproof', body: "Professional-grade fixtures rated for rain, snow, ice, and Omaha's extreme temperature swings — holding up year after year." },
  { icon: '🏠', title: 'No Seasonal Hassle', body: 'Mounted once, stays forever. No ladder every November, no storage every January — just tap the app and your home transforms.' },
  { icon: '🤝', title: 'Local Expert Install', body: "We're your Omaha neighbors. Full install, wiring, app setup, and a walkthrough so you're in control of every color from day one." },
]

const TESTIMONIALS: Testimonial[] = [
  { name: 'Mike & Sarah T.', location: 'West Omaha', text: "We had them installed before Thanksgiving and the whole neighborhood was stopping by to see our house. Best home investment we've made in years. The app is incredibly easy to use.", stars: 5 },
  { name: 'Jennifer R.', location: 'Elkhorn, NE', text: "I was skeptical about the price at first, but after one holiday season I completely understand the value. No more hauling out boxes, no more broken strands. Just tap the app. Worth every penny.", stars: 5 },
  { name: 'Dave K.', location: 'Papillion, NE', text: 'The install was done in half a day and the crew was professional and clean. They walked me through the entire app before leaving. My kids love changing the colors for every holiday.', stars: 5 },
  { name: 'Amanda L.', location: 'Millard, NE', text: "Ashton Holiday Lighting did an incredible job. The lights look amazing at night and you can barely see the brackets during the day. I've already referred three neighbors.", stars: 5 },
]

const PRICING_TIERS: PricingTier[] = [
  { name: 'Starter', range: '$1,000–$1,400', desc: 'Perfect for smaller homes and townhouses', features: ['Up to 80 linear feet', 'Full app setup & walkthrough', 'IP67 weatherproof fixtures', 'Workmanship warranty', 'Free consultation'] },
  { name: 'Most Popular', range: '$1,400–$1,900', desc: 'Ideal for standard single-family homes', features: ['80–130 linear feet', 'Full app setup & walkthrough', 'IP67 weatherproof fixtures', 'Workmanship warranty', 'Free consultation', 'Priority scheduling'], featured: true },
  { name: 'Premium', range: '$1,900–$2,500+', desc: 'For larger homes and complex rooflines', features: ['130+ linear feet', 'Full app setup & walkthrough', 'IP67 weatherproof fixtures', 'Extended workmanship warranty', 'Free consultation', 'Priority scheduling', 'Annual check-up visit'] },
]

const PROCESS_STEPS: ProcessStep[] = [
  { num: '01', icon: '📞', title: 'Book Free Consult', desc: "Schedule a 20–30 minute on-site visit. We come to you — no cost, no obligation." },
  { num: '02', icon: '📐', title: 'Custom Quote', desc: 'We measure your roofline, walk through options, and give you a same-day custom quote.' },
  { num: '03', icon: '🔧', title: 'Half-Day Install', desc: 'Our team installs everything in about half a day. Clean, professional, zero mess left behind.' },
  { num: '04', icon: '✨', title: 'Enjoy Forever', desc: 'App walkthrough complete. Tap a button and your home transforms for every holiday, every season.' },
]

// ─── Star Field ───────────────────────────────────────────────────────────────

function StarField(): JSX.Element {
  const stars = useRef<Array<{ x: number; y: number; r: number; dur: number; delay: number }>>([])
  if (stars.current.length === 0) {
    for (let i = 0; i < 180; i++) {
      stars.current.push({ x: Math.random() * 100, y: Math.random() * 100, r: Math.random() * 1.6 + 0.2, dur: Math.random() * 3 + 2, delay: Math.random() * 6 })
    }
  }
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
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
      <circle cx="82" cy="10" r="5.5" fill="rgba(255,245,210,0.1)" stroke="rgba(255,245,210,0.14)" strokeWidth="0.4" />
      <circle cx="84" cy="8.8" r="4.8" fill="#010810" />
    </svg>
  )
}

// ─── Light String ─────────────────────────────────────────────────────────────

function LightString(): JSX.Element {
  return (
    <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', pointerEvents: 'none', overflow: 'hidden', height: 50, alignItems: 'flex-start', zIndex: 3 }}>
      {Array.from({ length: 52 }, (_, i) => {
        const color = BULB_COLORS[i % BULB_COLORS.length]
        return (
          <div key={i} style={{ width: 7, height: 11, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: `radial-gradient(circle at 38% 28%, #fff 0%, ${color} 70%)`, boxShadow: `0 0 8px 2px ${color}88`, flexShrink: 0, animation: `flicker ${(2.1 + (i * 0.13 % 1.8)).toFixed(2)}s ease-in-out ${(i * 0.09).toFixed(2)}s infinite` }} />
        )
      })}
    </div>
  )
}

// ─── FAQ Row ──────────────────────────────────────────────────────────────────

function FaqRow({ faq, index, open, onToggle }: { faq: FaqItem; index: number; open: boolean; onToggle: (i: number) => void }): JSX.Element {
  return (
    <div className="faq-item" style={{ background: 'var(--bg-card)', border: `1px solid ${open ? 'rgba(0,212,255,0.28)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', overflow: 'hidden', transition: 'border-color 0.28s', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-white)', gap: 14, userSelect: 'none' }} onClick={() => onToggle(index)}>
        <span>{faq.q}</span>
        <div style={{ width: 24, height: 24, flexShrink: 0, border: `1.5px solid ${open ? 'var(--accent)' : 'rgba(255,255,255,0.3)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'transform 0.32s, border-color 0.28s', transform: open ? 'rotate(45deg)' : 'none', color: open ? 'var(--accent)' : 'rgba(255,255,255,0.5)' }}>+</div>
      </div>
      <div style={{ overflow: 'hidden', transition: 'max-height 0.42s ease, padding 0.28s', maxHeight: open ? 400 : 0, padding: open ? '0 22px 20px' : '0 22px' }}>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-mid)', lineHeight: 1.78 }}>{faq.a}</p>
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
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
      {([['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']] as const).map(([k, label]) => (
        <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, padding: '6px 12px', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', minWidth: 52, textAlign: 'center', lineHeight: 1 }}>
            {pad(time[k as keyof typeof time])}
          </div>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Scroll fade-in hook ──────────────────────────────────────────────────────

function useFadeIn(): void {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fi')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }), { threshold: 0.05 })
    els.forEach(el => obs.observe(el))
    setTimeout(() => { els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('vis') }) }, 120)
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
      {stage === 'idle' && (
        <div
          className={`upload-zone${dragOver ? ' drag-over' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🏠</div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: 8 }}>Drop your home photo here</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', marginBottom: 20 }}>or click to browse — JPG, PNG, WEBP up to 10MB</p>
          <button className="btn btn-primary btn-sm" style={{ pointerEvents: 'none' }}>Choose Photo</button>
          {errorMsg && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: 14 }}>{errorMsg}</p>}
        </div>
      )}

      {stage === 'preview' && uploadedImage && (
        <div>
          <div className="ai-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 10 }}>Your Home</p>
              <img src={uploadedImage} alt="Your home" style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', objectFit: 'cover', aspectRatio: '4/3' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 10 }}>Choose Light Style</p>
                <select className="form-input" value={lightStyle} onChange={e => setLightStyle(e.target.value)}>
                  {LIGHT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>✦ AI-Powered Preview</span><br />
                  Our AI will generate a realistic visualization of your home with {lightStyle} permanent lighting installed along the roofline and eaves.
                </p>
              </div>
              <button className="btn btn-gold" onClick={handleGenerate} style={{ width: '100%', padding: '14px' }}>
                ✨ Generate AI Preview
              </button>
              <button className="btn btn-outline btn-sm" onClick={reset} style={{ width: '100%' }}>
                ← Upload Different Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ width: 80, height: 80, margin: '0 auto 28px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(0,212,255,0.15)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin-slow 1s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 8, border: '2px solid transparent', borderTopColor: 'var(--accent2)', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite reverse' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: 8 }}>AI is visualizing your home...</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', marginBottom: 24 }}>Analyzing roofline, applying {lightStyle} lighting — this takes about 15–30 seconds</p>
          <div style={{ maxWidth: 320, margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
            <div className="progress-bar" style={{ width: '100%' }} />
          </div>
        </div>
      )}

      {stage === 'result' && resultImage && uploadedImage && (
        <div>
          <div className="ai-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 10 }}>Before</p>
              <img src={uploadedImage} alt="Before" style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', objectFit: 'cover', aspectRatio: '4/3' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>✨ After — AI Preview</p>
              <img src={resultImage} alt="AI visualization" style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,212,255,0.3)', objectFit: 'cover', aspectRatio: '4/3', boxShadow: '0 0 30px rgba(0,212,255,0.2)' }} />
            </div>
          </div>
          <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-white)', marginBottom: 4 }}>Love what you see?</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)' }}>Book your free consultation and we'll bring this vision to life — usually within 2 weeks.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-gold" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>Book Free Consult →</button>
              <button className="btn btn-outline btn-sm" onClick={reset}>Try Another Photo</button>
            </div>
          </div>
        </div>
      )}

      {stage === 'error' && (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚠️</div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: 8 }}>Generation Failed</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>{errorMsg}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setStage('preview')}>Try Again</button>
            <button className="btn btn-outline btn-sm" onClick={reset}>Upload New Photo</button>
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

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  const handleSubmit = async () => {
    if (!formState.first || !formState.email) { setFormError('Please enter at least your first name and email.'); return }
    setFormError(''); setFormStatus('sending')
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: formState.first, lastName: formState.last, email: formState.email, phone: formState.phone, interest: formState.interest, message: formState.message }),
      })
      if (res.ok) { setFormStatus('success') } else { throw new Error(`Status ${res.status}`) }
    } catch { setFormStatus('error'); setFormError('Something went wrong — please call us at (402) 889-8640.') }
  }

  const inp = (field: keyof typeof formState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormState(s => ({ ...s, [field]: e.target.value }))

  return (
    <>
      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 44px', height: 70, background: navScrolled ? 'rgba(3,6,15,0.97)' : 'rgba(3,6,15,0.7)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${navScrolled ? 'rgba(0,180,255,0.15)' : 'transparent'}`, transition: 'all 0.4s' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent2)', letterSpacing: '0.06em', textShadow: '0 0 20px rgba(255,209,102,0.4)', lineHeight: 1.2, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
          Ashton Holiday Lighting
          <span style={{ display: 'block', fontSize: '0.58rem', color: 'var(--accent)', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Omaha, Nebraska</span>
        </div>
        <ul className="desktop-nav-links" style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
          {(['about', 'gallery', 'pricing', 'faq', 'booking'] as const).map(id => (
            <li key={id}><a className="nav-link-item" style={{ color: 'var(--text-mid)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => scrollTo(id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</a></li>
          ))}
        </ul>
        <button className="btn nav-cta-btn desktop-nav-cta" style={{ background: 'transparent', border: '1.5px solid var(--accent)', color: 'var(--accent)', padding: '8px 22px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.28s' }} onClick={() => scrollTo('booking')}>
          Free Consult
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {(['about', 'gallery', 'pricing', 'faq', 'booking'] as const).map(id => (
          <a key={id} onClick={() => scrollTo(id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
        ))}
        <button className="mobile-cta" onClick={() => scrollTo('booking')}>Book Free Consultation</button>
      </div>

      {/* ── HERO ── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <StarField />
        <LightString />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 860 }}>
          <div className="fi" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Omaha's Premier Permanent Lighting Installer</span>
          </div>
          <h1 className="fi fi-delay-1" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem,6vw,5rem)', fontWeight: 900, lineHeight: 1.08, color: '#fff', marginBottom: 20, textShadow: '0 0 80px rgba(0,212,255,0.2)' }}>
            Holiday Lights.<br /><em style={{ color: 'var(--accent2)', fontStyle: 'normal' }}>All Year Beautiful.</em>
          </h1>
          <p className="fi fi-delay-2" style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 44, maxWidth: 620, margin: '0 auto 44px' }}>
            Govee permanent exterior lights — installed once, controlled forever. Transform your Omaha home with millions of colors for every holiday, every season.
          </p>
          <div className="fi fi-delay-3 hero-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
            <button className="btn btn-gold" onClick={() => scrollTo('booking')}>
              🗓️ Book Free Consultation
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('visualizer')}>
              ✨ See AI Preview of Your Home
            </button>
          </div>
          <div className="fi fi-delay-4" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['✓', 'Free Consultation'], ['✓', 'Half-Day Install'], ['✓', '50% Off Now'], ['✓', 'Limited Warranty']].map(([icon, text]) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-mid)', fontFamily: 'var(--font-sans)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{icon}</span>{text}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--text-dim)', animation: 'bounce-y 2.2s ease-in-out infinite', zIndex: 2 }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--text-dim), transparent)' }} />
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '22px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
          {[
            { icon: '⭐', text: '5-Star Rated', sub: 'on Google' },
            { icon: '🏠', text: '100+ Homes', sub: 'in Omaha area' },
            { icon: '🛡️', text: 'Fully Insured', sub: '& warranted' },
            { icon: '⚡', text: 'Half-Day Install', sub: 'in & out fast' },
            { icon: '📱', text: 'App Controlled', sub: 'from anywhere' },
          ].map(({ icon, text, sub }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-white)' }}>{text}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-mid)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div className="fi section-label">What We Do</div>
              <h2 className="fi fi-delay-1 section-title">Permanent Lights.<br /><em>Zero Hassle.</em></h2>
              <p className="fi fi-delay-2 section-lead">We install Govee permanent outdoor lighting systems that stay on your home year-round. No more hiring someone every November, no more tangled boxes in the garage — just beautiful, app-controlled light at the tap of a button.</p>
              <ul className="fi fi-delay-3" style={{ listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { title: 'App-Controlled Colors', desc: '16M+ colors and dozens of scenes — change your lights to match any holiday or mood in seconds.' },
                  { title: 'Clean, Permanent Install', desc: 'Mounted with brackets built to withstand Nebraska weather, flush to your roofline. Barely visible by day, stunning at night.' },
                  { title: 'Built for Nebraska Winters', desc: 'IP67 weatherproof — reliable through every Omaha season, rain, snow, or ice.' },
                  { title: 'Smart Home Ready', desc: 'Works with Alexa, Google Home, and Apple HomeKit for voice control and automation.' },
                ].map(({ title, desc }) => (
                  <li key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 'var(--radius-sm)', background: 'rgba(10,30,61,0.5)', border: '1px solid var(--border)', transition: 'var(--transition)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 8, boxShadow: '0 0 8px var(--accent)' }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-white)', marginBottom: 3, fontSize: '0.95rem' }}>{title}</div>
                      <div style={{ fontSize: '0.87rem', color: 'var(--text-mid)', lineHeight: 1.55 }}>{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="fi fi-delay-4" style={{ marginTop: 32 }}>
                <button className="btn btn-primary" onClick={() => scrollTo('booking')}>Get My Free Quote →</button>
              </div>
            </div>
            <div className="fi fi-delay-2" style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '4/3', background: 'var(--bg-card)' }}>
              <img src="/images/IMG_7323.jpeg" alt="Ashton Holiday Lighting install" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,6,15,0.6) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                <div style={{ background: 'rgba(3,6,15,0.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#06d6a0', boxShadow: '0 0 10px #06d6a0', flexShrink: 0, animation: 'glow-pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-white)' }}>Real Omaha install — half-day completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              { num: '16M+', label: 'Colors Available', sub: 'via Govee RGBIC' },
              { num: '$1K', label: 'Installs Start At', sub: 'free quote included' },
              { num: '½ Day', label: 'Typical Install', sub: 'in & out fast' },
              { num: '50%', label: 'Off Installation', sub: 'limited time offer' },
            ].map(({ num, label, sub }) => (
              <div key={label} className="fi card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 900, color: 'var(--accent2)', lineHeight: 1, marginBottom: 8 }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-white)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GOVEE TECH ── */}
      <section style={{ padding: '110px 40px', background: 'var(--bg-dark)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="fi section-label" style={{ justifyContent: 'center' }}>The Technology</div>
            <h2 className="fi fi-delay-1 section-title" style={{ textAlign: 'center' }}>Why <em>Govee</em> Permanent Lights?</h2>
            <p className="fi fi-delay-2 section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>Govee is the industry leader in smart permanent outdoor lighting — and we're Omaha's trusted installer.</p>
          </div>
          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {GOVEE_CARDS.map((card, i) => (
              <div key={card.title} className={`fi fi-delay-${Math.min(i + 1, 5)} card`} style={{ padding: '28px 24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-white)', marginBottom: 10 }}>{card.title}</h3>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-mid)', lineHeight: 1.65 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="section">
        <div className="section-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="fi section-label">Our Work</div>
              <h2 className="fi fi-delay-1 section-title">Omaha Homes, <em>Transformed</em></h2>
              <p className="fi fi-delay-2 section-lead">Every install is custom-planned to complement your home's roofline and architecture.</p>
            </div>
            <button className="fi fi-delay-3 btn btn-outline btn-sm" onClick={() => scrollTo('booking')}>Get This For Your Home →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { src: '/images/IMG_7323.jpeg', span: true },
              { src: '/images/IMG_6879.jpeg' },
              { src: '/images/IMG_6792.jpeg' },
              { src: '/images/IMG_6807.jpeg' },
              { src: '/images/IMG_6874.jpeg' },
            ].map(({ src, span }, i) => (
              <div key={src} className={`fi fi-delay-${Math.min(i + 1, 5)} gallery-item`} style={{ gridColumn: span ? 'span 2' : 'span 1', borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '16/10', border: '1px solid var(--border)', position: 'relative', cursor: 'pointer', transition: 'var(--transition)' }}>
                <img src={src} alt="Ashton Holiday Lighting install" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} />
                <div className="gallery-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,212,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.28s' }}>
                  <div style={{ background: 'rgba(3,6,15,0.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '10px 20px', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-white)' }}>View Full Size</div>
                </div>
              </div>
            ))}
          </div>
          <div className="fi" style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn btn-primary" onClick={() => scrollTo('visualizer')}>✨ See What Your Home Would Look Like →</button>
          </div>
        </div>
      </section>

      {/* ── AI VISUALIZER ── */}
      <section id="visualizer" style={{ padding: '110px 40px', background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="fi section-label" style={{ justifyContent: 'center' }}>AI-Powered</div>
            <h2 className="fi fi-delay-1 section-title" style={{ textAlign: 'center' }}>See Your Home <em>Transformed</em></h2>
            <p className="fi fi-delay-2 section-lead" style={{ margin: '0 auto 16px', textAlign: 'center' }}>Upload a photo of your home and our AI will generate a realistic preview of what it would look like with permanent holiday lights installed — before you spend a single dollar.</p>
            <div className="fi fi-delay-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 40 }}>
              <span style={{ fontSize: '0.8rem' }}>🤖</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: '#a78bfa' }}>Powered by Advanced AI Image Generation</span>
            </div>
          </div>
          <div className="fi fi-delay-2" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#7c3aed,var(--accent),var(--accent2))' }} />
            <AIVisualizer />
          </div>
          <div className="fi three-col" style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { icon: '🔒', title: 'Private & Secure', desc: 'Your photos are processed securely and never stored or shared.' },
              { icon: '⚡', title: 'Results in ~20 Seconds', desc: 'Our AI analyzes your roofline and generates a realistic preview fast.' },
              { icon: '🆓', title: 'Completely Free', desc: 'No sign-up required. Just upload and see your home transformed.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-white)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '110px 40px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="fi section-label" style={{ justifyContent: 'center' }}>How It Works</div>
            <h2 className="fi fi-delay-1 section-title" style={{ textAlign: 'center' }}>From Call to <em>Lit Up</em> in Days</h2>
          </div>
          <div className="process-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className={`fi fi-delay-${i + 1}`} style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-card2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px', boxShadow: '0 0 20px rgba(0,212,255,0.1)' }}>
                  {step.icon}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>{step.num}</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-white)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="fi" style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn btn-gold" onClick={() => scrollTo('booking')} style={{ fontSize: '1rem', padding: '18px 44px' }}>
              Start Step 1 — Book Free Consult
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="fi section-label" style={{ justifyContent: 'center' }}>Transparent Pricing</div>
            <h2 className="fi fi-delay-1 section-title" style={{ textAlign: 'center' }}>Simple, <em>Honest Pricing</em></h2>
            <p className="fi fi-delay-2 section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>No hidden fees. No surprise charges. Every install includes a free on-site consultation and custom quote.</p>
          </div>
          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'start' }}>
            {PRICING_TIERS.map((tier, i) => (
              <div key={tier.name} className={`fi fi-delay-${i + 1} card${tier.featured ? ' pricing-card-featured' : ''}`} style={{ padding: '36px 28px', position: 'relative' }}>
                {tier.featured && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,var(--accent),#0090c0)', color: '#020b18', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: '0 0 8px 8px', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>Most Popular</div>}
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9rem', color: tier.featured ? 'var(--accent)' : 'var(--text-mid)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{tier.name}</h3>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--text-white)', marginBottom: 6 }}>{tier.range}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', marginBottom: 24, lineHeight: 1.5 }}>{tier.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ width: '100%' }} onClick={() => scrollTo('booking')}>
                  Get Free Quote
                </button>
              </div>
            ))}
          </div>
          <div className="fi" style={{ marginTop: 32, textAlign: 'center', padding: '20px', background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--accent2)', marginBottom: 4 }}>🎉 Spring Sale: 50% Off Installation</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)' }}>Book your free consultation before the sale ends to lock in this price. Hardware costs remain the same.</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '110px 40px', background: 'var(--bg-dark)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="fi section-label" style={{ justifyContent: 'center' }}>Customer Stories</div>
            <h2 className="fi fi-delay-1 section-title" style={{ textAlign: 'center' }}>Omaha Homeowners <em>Love It</em></h2>
          </div>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`fi fi-delay-${Math.min(i + 1, 4)} card testimonial-card`} style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: t.stars }).map((_, j) => <span key={j} style={{ color: 'var(--accent2)', fontSize: '1rem' }}>★</span>)}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-white)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section">
        <div className="section-inner">
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 72, alignItems: 'start' }}>
            <div>
              <div className="fi section-label">FAQ</div>
              <h2 className="fi fi-delay-1 section-title">Frequently Asked <em>Questions</em></h2>
              <p className="fi fi-delay-2 section-lead">Everything you need to know before booking. Still have questions? Call us directly.</p>
              <div className="fi fi-delay-3" style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a href="tel:4028898640" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textDecoration: 'none', transition: 'var(--transition)' }}>
                  <span style={{ fontSize: '1.4rem' }}>📞</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-white)' }}>Call Us Directly</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent)' }}>(402) 889-8640</div>
                  </div>
                </a>
                <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'var(--transition)', textAlign: 'left' }} onClick={() => scrollTo('booking')}>
                  <span style={{ fontSize: '1.4rem' }}>🗓️</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-white)' }}>Book Free Consult</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent)' }}>20–30 min, no obligation</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="fi fi-delay-2">
              {FAQS.map((faq, i) => <FaqRow key={i} faq={faq} index={i} open={openFaq === i} onToggle={i => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="booking" style={{ padding: '110px 40px', background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="fi section-label" style={{ justifyContent: 'center' }}>Get Started</div>
            <h2 className="fi fi-delay-1 section-title" style={{ textAlign: 'center' }}>Book Your Free <em>Consultation</em></h2>
            <p className="fi fi-delay-2 section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>We'll visit your home, measure your roofline, and give you a no-obligation quote — all for free. Most installs are done in half a day.</p>
          </div>
          <div className="two-col-booking" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'start' }}>
            <div className="fi card" style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
              <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-white)', marginBottom: 4 }}>Schedule a Consultation</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>Pick a date and time that works for you.</p>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['✓ Free', '✓ No Obligation', '✓ 20–30 min'].map(t => <span key={t} style={{ fontSize: '0.72rem', color: 'var(--text-mid)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{t}</span>)}
                </div>
              </div>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/booking/${GHL_CALENDAR_ID}`}
                style={{ width: '100%', height: 680, border: 'none', display: 'block', marginTop: 8 }}
                title="Schedule Consultation"
                loading="lazy"
              />
            </div>
            <div className="fi fi-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div className="card" style={{ padding: '28px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,var(--accent2),var(--accent))' }} />
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-white)', marginBottom: 6 }}>Or Send Us a Message</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', marginBottom: 20 }}>We respond within 1 business day.</p>
                {formStatus === 'success' ? (
                  <div style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 'var(--radius-sm)', padding: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎉</div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>Message Received!</p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>We'll be in touch within 1 business day. In the meantime, feel free to call us at (402) 889-8640.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                    {formError && <p style={{ fontSize: '0.82rem', color: '#ff6b6b', padding: '8px 12px', background: 'rgba(255,107,107,0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,107,107,0.2)' }}>{formError}</p>}
                    <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={handleSubmit} disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? 'Sending...' : 'Send Message →'}
                    </button>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>We respond within 1 business day. Installs start at $1,000.</p>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 20, background: 'rgba(197,48,48,0.12)', border: '1px solid rgba(197,48,48,0.3)', borderRadius: 'var(--radius-md)', padding: '20px 22px' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.88rem', color: '#fc8181', marginBottom: 10 }}>⏰ Sale Ends In:</p>
                <CountdownTimer />
                <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)', marginTop: 10, lineHeight: 1.5 }}>Book before the timer hits zero to lock in <strong style={{ color: 'var(--accent2)' }}>50% off installation</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI COMPANY SHOWCASE ── */}
      <section style={{ padding: '90px 40px', background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(0,212,255,0.05) 100%)', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="section-inner">
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="fi" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
                <span style={{ fontSize: '0.8rem' }}>🤖</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a78bfa' }}>AI Integration Showcase</span>
              </div>
              <h2 className="fi fi-delay-1 section-title">This Website is <em style={{ color: '#a78bfa' }}>Powered by AI</em></h2>
              <p className="fi fi-delay-2 section-lead">Every element of this website — from the AI House Visualizer to the automated lead workflows — was built and optimized using cutting-edge artificial intelligence.</p>
              <div className="fi fi-delay-3" style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '🎨', text: 'AI-generated house visualization previews' },
                  { icon: '🔄', text: 'Automated CRM and lead routing via GoHighLevel' },
                  { icon: '📊', text: 'Conversion-optimized layout built with AI assistance' },
                  { icon: '💬', text: 'Smart contact workflows and follow-up automation' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', color: 'var(--text-mid)' }}>
                    <span style={{ fontSize: '1.1rem' }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
            <div className="fi fi-delay-2" style={{ background: 'var(--bg-card)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 'var(--radius-lg)', padding: '36px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#7c3aed,var(--accent),var(--accent2))' }} />
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 20 }}>AI Stack</div>
              {[
                { label: 'House Visualizer', tech: 'GPT-4o Vision + DALL·E 3', status: 'Live' },
                { label: 'Lead Automation', tech: 'GoHighLevel + AI Workflows', status: 'Live' },
                { label: 'Conversion Copy', tech: 'AI-Optimized Messaging', status: 'Live' },
                { label: 'Smart Scheduling', tech: 'GHL Calendar Integration', status: 'Live' },
              ].map(({ label, tech, status }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-white)' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>{tech}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.25)', borderRadius: 100, padding: '3px 10px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#06d6a0', boxShadow: '0 0 6px #06d6a0' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: '#06d6a0' }}>{status}</span>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 20, lineHeight: 1.6 }}>Interested in AI integration for your business? This site is a live demonstration of what's possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#010810', borderTop: '1px solid var(--border)', padding: '52px 40px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent2)', marginBottom: 12 }}>Ashton Holiday Lighting</div>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-mid)', lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>Omaha's premier permanent outdoor lighting installer. Govee-certified. Locally owned and operated.</p>
              <a href="tel:4028898640" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-mid)', textDecoration: 'none', fontSize: '0.87rem', padding: '8px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', transition: 'var(--transition)' }}>
                📞 (402) 889-8640
              </a>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Quick Links</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['About', 'about'], ['Gallery', 'gallery'], ['Pricing', 'pricing'], ['FAQ', 'faq'], ['Book Now', 'booking']].map(([label, id]) => (
                  <li key={id}><a style={{ color: 'var(--text-mid)', textDecoration: 'none', fontSize: '0.87rem', cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => scrollTo(id)}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Service Area</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Omaha, NE', 'West Omaha', 'Elkhorn', 'Papillion', 'Millard', 'Bellevue'].map(city => (
                  <li key={city} style={{ fontSize: '0.87rem', color: 'var(--text-mid)' }}>{city}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>© {new Date().getFullYear()} Ashton Holiday Lighting. All rights reserved.</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Omaha, Nebraska · (402) 889-8640</p>
          </div>
        </div>
      </footer>

      {/* ── SALE BANNER ── */}
      <div className="sale-banner" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div className="sale-banner-inner" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'nowrap' }}>
          <span className="banner-tag-hide" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 3, whiteSpace: 'nowrap' }}>Limited Time</span>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em', textShadow: '0 1px 4px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>
            <strong style={{ color: '#ffe066' }}>50% OFF Installation</strong> — Spring Sale ends soon. Book your free consult now.
          </p>
          <button className="btn" style={{ background: '#fff', color: '#900', padding: '6px 18px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }} onClick={() => scrollTo('booking')}>
            Claim Offer
          </button>
        </div>
      </div>
    </>
  )
}
