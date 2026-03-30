import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import InstallModal from './InstallModal'

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  windows: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
}

const OS_LABELS = {
  unix: { short: 'macOS / Linux', icon: '🍎' },
  windows: { short: 'Windows', icon: '🪟' },
}

function detectOS() {
  const ua = navigator.userAgent || ''
  if (ua.includes('Win')) return 'windows'
  return 'unix'
}

// Animated typing terminal lines
const TERMINAL_LINES = [
  { text: '$ plutus start', delay: 0.2, color: '#a855f7' },
  { text: '✓ Setting things up...', delay: 0.6, color: '#22c55e' },
  { text: '✓ Connecting to your AI...', delay: 1.0, color: '#22c55e' },
  { text: '✓ Getting everything ready...', delay: 1.4, color: '#22c55e' },
  { text: '✓ All set!', delay: 1.8, color: '#22c55e' },
  { text: '🤖 Plutus is ready. What do you need done?', delay: 2.2, color: '#06b6d4' },
]

function TerminalLine({ text, color, delay }) {
  const [visible, setVisible] = useState(false)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 25)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [text, delay])

  if (!visible) return null
  return (
    <div style={{ color, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(11px, 2.5vw, 13px)', lineHeight: '1.8', opacity: visible ? 1 : 0, transition: 'opacity 0.3s', wordBreak: 'break-word' }}>
      {displayed}
      {displayed.length < text.length && <span style={{ opacity: 0.7 }}>_</span>}
    </div>
  )
}

export default function Hero() {
  const [os, setOs] = useState('unix')
  const [copied, setCopied] = useState(false)
  const [installHover, setInstallHover] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const terminalRef = useRef(null)

  useEffect(() => {
    setOs(detectOS())
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[os])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const osInfo = OS_LABELS[os]

  return (
    <>
      {showModal && <InstallModal os={os} onClose={() => setShowModal(false)} />}

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 4vw, 24px) clamp(40px, 8vw, 80px)',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute',
          top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(600px, 100vw)', height: 'min(600px, 100vw)',
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: 100,
            padding: '6px 16px',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: '#c084fc',
            marginBottom: 28,
            fontWeight: 500,
            flexWrap: 'wrap',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e', flexShrink: 0 }} />
          Open Source · Free Forever · Private by Design · v1.2
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(32px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: 'clamp(-1.5px, -0.5vw, -3px)',
            maxWidth: 900,
            marginBottom: 24,
            position: 'relative', zIndex: 1,
          }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e2d9f3 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Your Personal AI Agent.
          </span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            It doesn't chat. It acts.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: 'clamp(15px, 3vw, 18px)',
            color: '#94a3b8',
            maxWidth: 560,
            marginBottom: 'clamp(32px, 6vw, 64px)',
            lineHeight: 1.7,
            position: 'relative', zIndex: 1,
            padding: '0 8px',
          }}
        >
          Plutus is a free AI that lives on your computer. It doesn't just answer questions — it actually does things for you. It can write emails, organize your files, do research, build documents, and handle tasks you'd normally spend hours on.
        </motion.p>

        {/* ── Install box ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 1 }}
        >
          {/* OS selector tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(OS_LABELS).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setOs(key)}
                style={{
                  background: os === key ? 'rgba(168,85,247,0.2)' : 'transparent',
                  border: os === key ? '1px solid rgba(168,85,247,0.4)' : '1px solid transparent',
                  color: os === key ? '#c084fc' : '#64748b',
                  padding: '4px 14px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.3px',
                }}
              >
                {info.icon} {info.short}
              </button>
            ))}
          </div>

          {/* Primary Install Button */}
          <motion.button
            onClick={() => setShowModal(true)}
            onMouseEnter={() => setInstallHover(true)}
            onMouseLeave={() => setInstallHover(false)}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 'clamp(13px, 3vw, 17px) clamp(16px, 4vw, 28px)',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 700,
              letterSpacing: '-0.3px',
              color: 'white',
              background: installHover
                ? 'linear-gradient(135deg, #9333ea, #6d28d9)'
                : 'linear-gradient(135deg, #a855f7, #7c3aed)',
              boxShadow: installHover
                ? '0 8px 32px rgba(168,85,247,0.45), 0 0 0 1px rgba(168,85,247,0.3)'
                : '0 4px 20px rgba(168,85,247,0.3), 0 0 0 1px rgba(168,85,247,0.2)',
              transition: 'all 0.2s ease',
              marginBottom: 16,
            }}
          >
            {/* Install icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Install Plutus for {osInfo.icon} {osInfo.short}
          </motion.button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: 11, color: '#334155', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              or copy this install command
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Command box */}
          <div style={{
            background: 'rgba(10,10,15,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}>
            <code style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(10px, 2.2vw, 12px)',
              color: '#94a3b8',
              flex: 1,
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              minWidth: 0,
            }}>
              <span style={{ color: '#475569', marginRight: 8 }}>$</span>
              {INSTALL_COMMANDS[os]}
            </code>
            <button
              onClick={copy}
              style={{
                background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                border: copied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
                color: copied ? '#22c55e' : '#64748b',
                padding: '5px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Hints */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px, 2vw, 16px)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#334155' }}>Takes under 2 minutes</span>
            <span style={{ fontSize: 12, color: '#334155' }}>·</span>
            <span style={{ fontSize: 12, color: '#334155' }}>No account needed</span>
          </div>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ref={terminalRef}
          style={{
            marginTop: 'clamp(40px, 8vw, 80px)',
            width: '100%',
            maxWidth: 640,
            background: 'rgba(8,8,14,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'clamp(10px, 2vw, 16px)',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.1)',
            position: 'relative', zIndex: 1,
          }}
        >
          {/* Terminal titlebar */}
          <div style={{
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 8, fontSize: 'clamp(10px, 2vw, 12px)', color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>plutus — bash</span>
          </div>
          {/* Terminal body */}
          <div style={{ padding: 'clamp(12px, 3vw, 20px) clamp(12px, 3vw, 24px)', minHeight: 'clamp(120px, 25vw, 180px)' }}>
            {TERMINAL_LINES.map((line, i) => (
              <TerminalLine key={i} {...line} />
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          style={{ marginTop: 'clamp(30px, 6vw, 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#334155', fontSize: 12 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
