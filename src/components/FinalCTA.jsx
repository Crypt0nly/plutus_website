import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import InstallModal from './InstallModal'

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  windows: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
}

function detectOS() {
  const ua = navigator.userAgent || ''
  if (ua.includes('Win')) return 'windows'
  return 'unix'
}

export default function FinalCTA() {
  const [copied, setCopied] = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [os, setOs] = useState('unix')

  useEffect(() => {
    setOs(detectOS())
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[os])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const osLabel = os === 'windows' ? '🪟 Windows' : '🍎 macOS / Linux'

  return (
    <>
      {showModal && <InstallModal os={os} onClose={() => setShowModal(false)} />}

      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 4vw, 24px)',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(700px, 100vw)', height: 'min(400px, 80vw)',
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
              fontSize: 'clamp(28px, 5vw, 60px)',
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
              fontSize: 'clamp(15px, 3vw, 17px)',
              color: '#64748b',
              maxWidth: 480,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}>
              Thousands of people already use Plutus to save hours every week. It's free, private, and it doesn't just chat — it actually does the work for you.
            </p>

            {/* Primary Install Button */}
            <motion.button
              onClick={() => setShowModal(true)}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: 'clamp(12px, 2.5vw, 15px) clamp(20px, 4vw, 32px)',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(14px, 3vw, 16px)',
                fontWeight: 700,
                letterSpacing: '-0.3px',
                color: 'white',
                background: btnHover
                  ? 'linear-gradient(135deg, #9333ea, #6d28d9)'
                  : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                boxShadow: btnHover
                  ? '0 8px 32px rgba(168,85,247,0.45), 0 0 0 1px rgba(168,85,247,0.3)'
                  : '0 4px 20px rgba(168,85,247,0.3), 0 0 0 1px rgba(168,85,247,0.2)',
                transition: 'all 0.2s ease',
                marginBottom: 16,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Install Plutus for {osLabel}
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
              <span style={{ fontSize: 11, color: '#334155', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                or copy this install command
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Install command */}
            <div style={{
              background: 'rgba(10,10,15,0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 18px)',
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
              No credit card · No account · No cloud · 100% free
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
