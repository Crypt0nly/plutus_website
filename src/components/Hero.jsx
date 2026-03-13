import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  windows: 'iwr https://useplutus.ai/install.ps1 | iex',
}

const OS_LABELS = { unix: 'macOS / Linux', windows: 'Windows' }

function detectOS() {
  const ua = navigator.userAgent || ''
  if (ua.includes('Win')) return 'windows'
  return 'unix'
}

// Animated typing terminal lines
const TERMINAL_LINES = [
  { text: '$ plutus start', delay: 0.2, color: '#a855f7' },
  { text: '✓ Loading agent runtime...', delay: 0.6, color: '#22c55e' },
  { text: '✓ Connecting to Anthropic API...', delay: 1.0, color: '#22c55e' },
  { text: '✓ Spawning subprocess pool (4 workers)', delay: 1.4, color: '#22c55e' },
  { text: '✓ Dynamic tool loader ready', delay: 1.8, color: '#22c55e' },
  { text: '🤖 Plutus is ready. What can I help you with?', delay: 2.2, color: '#06b6d4' },
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
    <div style={{ color, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: '1.8', opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {displayed}
      {displayed.length < text.length && <span style={{ opacity: 0.7 }}>_</span>}
    </div>
  )
}

export default function Hero() {
  const [os, setOs] = useState('unix')
  const [copied, setCopied] = useState(false)
  const [installCount, setInstallCount] = useState(2847)
  const terminalRef = useRef(null)

  useEffect(() => {
    setOs(detectOS())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setInstallCount(c => c + Math.floor(Math.random() * 3 + 1))
    }, 8000 + Math.random() * 7000)
    return () => clearInterval(interval)
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[os])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 80px',
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
    }}>
      {/* Glow blobs */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 600,
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
          fontSize: 13,
          color: '#c084fc',
          marginBottom: 28,
          fontWeight: 500,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
        Open Source · Free Forever · Private by Design · v1.2
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-3px',
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
          Your Personal AI.
        </span>
        <br />
        <span style={{
          background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Does the work for you.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          fontSize: 18,
          color: '#94a3b8',
          maxWidth: 560,
          marginBottom: 48,
          lineHeight: 1.7,
          position: 'relative', zIndex: 1,
        }}
      >
        Plutus is a free AI assistant that lives on your computer. Write emails, organize files,
        automate tedious tasks, build software, or research anything — just tell it what you need in plain English.
      </motion.p>

      {/* Install box */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 580, position: 'relative', zIndex: 1 }}
      >
        {/* OS tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, justifyContent: 'center' }}>
          {Object.entries(OS_LABELS).map(([key, label]) => (
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
              {label}
            </button>
          ))}
        </div>

        {/* Command box */}
        <div style={{
          background: 'rgba(10,10,15,0.8)',
          border: '1px solid rgba(168,85,247,0.25)',
          borderRadius: 12,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          boxShadow: '0 0 40px rgba(168,85,247,0.1)',
        }}>
          <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#e2e8f0', flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#64748b', marginRight: 8 }}>$</span>
            {INSTALL_COMMANDS[os]}
          </code>
          <button
            onClick={copy}
            style={{
              background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(168,85,247,0.15)',
              border: copied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(168,85,247,0.3)',
              color: copied ? '#22c55e' : '#a855f7',
              padding: '6px 14px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>

        {/* Install counter */}
        <motion.div
          key={installCount}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 10, fontSize: 12, color: '#475569', textAlign: 'center' }}
        >
          <span style={{ color: '#22c55e', marginRight: 4 }}>🟢</span>
          <span style={{ fontWeight: 600, color: '#64748b' }}>{installCount.toLocaleString()}</span> installs today
        </motion.div>
      </motion.div>

      {/* Terminal preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        ref={terminalRef}
        style={{
          marginTop: 64,
          width: '100%',
          maxWidth: 640,
          background: 'rgba(8,8,14,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.1)',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Terminal titlebar */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 8, fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>plutus — bash</span>
        </div>
        {/* Terminal body */}
        <div style={{ padding: '20px 24px', minHeight: 180 }}>
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
        style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#334155', fontSize: 12 }}
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
  )
}
