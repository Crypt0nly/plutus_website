import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ── Connector definitions ─────────────────────────────────────────────────────
const connectors = [
  {
    name: 'Discord',
    color: '#5865F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram',
    color: '#26A5E4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: 'Gmail',
    color: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
  {
    name: 'Google Calendar',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M19.5 3h-2.25V1.5a.75.75 0 0 0-1.5 0V3h-7.5V1.5a.75.75 0 0 0-1.5 0V3H4.5A2.25 2.25 0 0 0 2.25 5.25v15A2.25 2.25 0 0 0 4.5 22.5h15a2.25 2.25 0 0 0 2.25-2.25v-15A2.25 2.25 0 0 0 19.5 3zm.75 17.25a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V9h16.5v11.25zm0-12.75H3.75V5.25a.75.75 0 0 1 .75-.75h2.25V6a.75.75 0 0 0 1.5 0V4.5h7.5V6a.75.75 0 0 0 1.5 0V4.5h2.25a.75.75 0 0 1 .75.75V7.5z"/>
      </svg>
    ),
  },
  {
    name: 'Google Drive',
    color: '#34A853',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M4.433 22.396l2.042-3.536H22.5l-2.043 3.536H4.433zm-.205-.356L1.5 17.504l7.04-12.192 2.728 4.724-7.04 12.004zm15.587-3.536H5.185L12.225 6.31l7.59 12.194zM12.225 4.5L9.497.776 16.536 0l2.728 4.5H12.225z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    color: '#e2e8f0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    color: '#e2e8f0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    ),
  },
  {
    name: 'Netlify',
    color: '#00C7B7',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482-.053-.315-2.12-2.1-1.533.359zm11.933 5.491l-3.748-3.712-2.548 1.133 6.264 2.604.032-.025zM9.34 3.796L8.95 6.153l1.848-.432L9.34 3.796zm-3.586 3.04l2.35 2.328 1.498-3.55L5.754 6.836zm6.47 6.856l1.098-1.08-1.218-.516-.985 1.517.982.08h.123zm-3.815-3.803L6.44 7.925l-.748 4.488 2.717-4.524zm-4.997.17L1.688 8.2 0 9.866l4.412-3.803zm.586 8.97l.024-.032-.69-.68-.024.032.69.68zm-1.714-1.69l.024-.032-.69-.68-.024.032.69.68zm1.128 1.11l.024-.032-.69-.68-.024.032.69.68zm.586.58l.024-.032-.69-.68-.024.032.69.68zm1.128 1.11l.024-.032-.69-.68-.024.032.69.68zm.586.58l.024-.032-.69-.68-.024.032.69.68zm1.128 1.11l.024-.032-.69-.68-.024.032.69.68zm.586.58l.024-.032-.69-.68-.024.032.69.68zm.542.534l.024-.032-.69-.68-.024.032.69.68zm-5.32-5.254l.024-.032-.69-.68-.024.032.69.68zm10.64 2.668l-1.338-1.323-.978 1.506 2.316-.183zm-4.997-7.826l-2.717 4.524 3.13.255 1.537-2.366-1.95-2.413zm2.39 5.11l-3.13-.255-.978 1.506 3.13.255.978-1.506zm4.997-1.506l-3.13-.255-.978 1.506 3.13.255.978-1.506zm-1.956 3.012l-3.13-.255-.978 1.506 3.13.255.978-1.506zm-1.956 3.012l-3.13-.255-.978 1.506 3.13.255.978-1.506zm4.997-1.506l-3.13-.255-.978 1.506 3.13.255.978-1.506zm-1.956 3.012l-3.13-.255-.978 1.506 3.13.255.978-1.506z"/>
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    color: '#10a37f',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.681zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    color: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.57 3.52zm4.132 9.959L8.453 7.687 6.205 13.48h4.496z"/>
      </svg>
    ),
  },
  {
    name: 'Custom API',
    color: '#f59e0b',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
]

// ── Single orbiting pill using rAF ────────────────────────────────────────────
function OrbitPill({ connector, startAngleDeg, radius, speedDeg, cx, cy }) {
  const ref = useRef(null)
  const angleRef = useRef((startAngleDeg * Math.PI) / 180)

  useEffect(() => {
    let rafId
    let last = null

    const tick = (ts) => {
      if (last === null) last = ts
      const dt = (ts - last) / 1000 // seconds
      last = ts

      angleRef.current += (speedDeg * Math.PI) / 180 * dt

      const x = cx + radius * Math.cos(angleRef.current)
      const y = cy + radius * Math.sin(angleRef.current)

      if (ref.current) {
        ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [cx, cy, radius, speedDeg])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '7px 13px 7px 9px',
        background: `${connector.color}12`,
        border: `1px solid ${connector.color}30`,
        borderRadius: 999,
        backdropFilter: 'blur(6px)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: 'default',
        willChange: 'transform',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 18px ${connector.color}40`
        e.currentTarget.style.background = `${connector.color}22`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = `${connector.color}12`
      }}
    >
      <span style={{ color: connector.color, display: 'flex', alignItems: 'center' }}>
        {connector.icon}
      </span>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#c8c8d8' }}>
        {connector.name}
      </span>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Connectors() {
  const [size, setSize] = useState({ w: 600, h: 600 })
  const wrapRef = useRef(null)

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        const vw = window.innerWidth
        // Scale down more aggressively on mobile
        const inner = Math.min(Math.max(vw * 0.18, 90), 220)
        const outer = inner + Math.min(Math.max(vw * 0.1, 60), 100)
        const total = (outer + 70) * 2
        setSize({ inner, outer, total })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { inner = 180, outer = 280, total = 700 } = size
  const cx = 0   // relative to center
  const cy = 0

  // Evenly distribute pills on each ring
  const innerRing = connectors.slice(0, 6)
  const outerRing = connectors.slice(6)

  const innerSpeed = 5    // degrees per second — slow, elegant
  const outerSpeed = -3.5 // counter-clockwise, slightly slower

  return (
    <section id="connectors" style={{ padding: 'clamp(60px, 10vw, 100px) 0', overflow: 'hidden' }}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(36px, 8vw, 72px)' }}
        >
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#8b5cf6',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12,
          }}>
            Connectors
          </p>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            Plug in your whole world.{' '}
            <span className="gradient-text">Instantly.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            color: '#55556a',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Plutus connects to the apps and services you already use — and if it has an API,
            you can add it yourself in seconds.
          </p>
        </motion.div>

        {/* Orbit canvas */}
        <motion.div
          ref={wrapRef}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            height: total,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Orbit ring guides */}
          <div style={{
            position: 'absolute',
            width: outer * 2,
            height: outer * 2,
            borderRadius: '50%',
            border: '1px dashed rgba(139,92,246,0.10)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            width: inner * 2,
            height: inner * 2,
            borderRadius: '50%',
            border: '1px dashed rgba(139,92,246,0.16)',
            pointerEvents: 'none',
          }} />

          {/* Center glow */}
          <div style={{
            position: 'absolute',
            width: 'clamp(100px, 25vw, 180px)',
            height: 'clamp(100px, 25vw, 180px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Center symbol */}
          <div style={{
            position: 'absolute',
            width: 'clamp(48px, 12vw, 76px)',
            height: 'clamp(48px, 12vw, 76px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.22), rgba(6,182,212,0.12))',
            border: '1.5px solid rgba(168,85,247,0.38)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(168,85,247,0.18)',
            zIndex: 5,
          }}>
            <img src="/logo.svg" alt="Plutus" style={{ width: 'clamp(28px, 8vw, 48px)', height: 'clamp(28px, 8vw, 48px)', objectFit: 'contain' }} />
          </div>

          {/* Pill layer — positioned relative to the center of the container */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
            {innerRing.map((c, i) => (
              <OrbitPill
                key={c.name}
                connector={c}
                startAngleDeg={(360 / innerRing.length) * i}
                radius={inner}
                speedDeg={innerSpeed}
                cx={cx}
                cy={cy}
              />
            ))}
            {outerRing.map((c, i) => (
              <OrbitPill
                key={c.name}
                connector={c}
                startAngleDeg={(360 / outerRing.length) * i + 30}
                radius={outer}
                speedDeg={outerSpeed}
                cx={cx}
                cy={cy}
              />
            ))}
          </div>
        </motion.div>

        {/* "And more" + connect anything */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
            maxWidth: 600,
          }}>
            {['Notion', 'Slack', 'Spotify', 'Stripe', 'Shopify', 'Airtable', 'Jira', 'Linear'].map(app => (
              <span key={app} style={{
                padding: '5px 13px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 999,
                fontSize: 12,
                color: '#6b6b80',
                fontWeight: 500,
              }}>
                {app}
              </span>
            ))}
            <span style={{
              padding: '5px 13px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 999,
              fontSize: 12,
              color: '#6b6b80',
              fontWeight: 500,
            }}>
              and more...
            </span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 24px)',
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.18)',
            borderRadius: 14,
            maxWidth: 500,
            textAlign: 'center',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>🔌</span>
            <p style={{ fontSize: 13, color: '#9a8abf', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: '#c4b5fd' }}>Connect anything.</strong>{' '}
              If it has an API, Plutus can use it. Define any endpoint once and control it with plain English.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
