import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const DOWNLOAD_URLS = {
  unix: 'https://useplutus.ai/install.sh',
  windows: 'https://useplutus.ai/install.ps1',
}

const DOWNLOAD_FILENAMES = {
  unix: 'install.sh',
  windows: 'install.ps1',
}

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  windows: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
}

function detectOS() {
  const ua = navigator.userAgent || ''
  if (ua.includes('Win')) return 'windows'
  return 'unix'
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function FinalCTA() {
  const [copied, setCopied] = useState(false)
  const [dlHover, setDlHover] = useState(false)
  const [os, setOs] = useState('unix')

  useEffect(() => {
    setOs(detectOS())
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[os])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = DOWNLOAD_URLS[os]
    a.download = DOWNLOAD_FILENAMES[os]
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const osLabel = os === 'windows' ? '🪟 Windows' : '🍎 macOS / Linux'

  return (
    <section style={{
      padding: '120px 24px',
      position: 'relative', zIndex: 1,
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 100,
            padding: '5px 14px',
            fontSize: 12,
            color: '#22c55e',
            fontWeight: 600,
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} />
            Free · Open Source · MIT License
          </div>

          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e2d9f3 40%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Stop doing busywork.
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Let Plutus handle it.
            </span>
          </h2>

          <p style={{
            fontSize: 17,
            color: '#64748b',
            maxWidth: 480,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Join thousands of people who've already reclaimed hours of their week with a private, free AI assistant that actually gets things done.
          </p>

          {/* Primary Download Button */}
          <motion.button
            onClick={download}
            onMouseEnter={() => setDlHover(true)}
            onMouseLeave={() => setDlHover(false)}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '15px 32px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '-0.3px',
              color: 'white',
              background: dlHover
                ? 'linear-gradient(135deg, #9333ea, #6d28d9)'
                : 'linear-gradient(135deg, #a855f7, #7c3aed)',
              boxShadow: dlHover
                ? '0 8px 32px rgba(168,85,247,0.45), 0 0 0 1px rgba(168,85,247,0.3)'
                : '0 4px 20px rgba(168,85,247,0.3), 0 0 0 1px rgba(168,85,247,0.2)',
              transition: 'all 0.2s ease',
              marginBottom: 16,
            }}
          >
            <DownloadIcon />
            Download for {osLabel}
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.55)',
              background: 'rgba(0,0,0,0.2)',
              padding: '2px 8px',
              borderRadius: 4,
              letterSpacing: '0.5px',
            }}>
              {DOWNLOAD_FILENAMES[os]}
            </span>
          </motion.button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            maxWidth: 520,
            margin: '0 auto 16px',
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: 11, color: '#334155', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              or use the one-liner
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Install command */}
          <div style={{
            background: 'rgba(10,10,15,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            maxWidth: 520,
            margin: '0 auto 16px',
            boxShadow: '0 0 60px rgba(168,85,247,0.08)',
          }}>
            <code style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              color: '#94a3b8',
              flex: 1,
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
                padding: '7px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <p style={{ fontSize: 12, color: '#334155' }}>
            No credit card · No account · No cloud · Just run it
          </p>
        </motion.div>
      </div>
    </section>
  )
}
