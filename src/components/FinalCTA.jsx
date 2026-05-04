import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import InstallModal from './InstallModal'

const CLOUD_URL = 'https://app.useplutus.ai/?tab=chat'

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
  const [showModal, setShowModal] = useState(false)
  const [os, setOs] = useState('unix')
  const [cloudHover, setCloudHover] = useState(false)
  const [localHover, setLocalHover] = useState(false)

  useEffect(() => {
    setOs(detectOS())
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[os])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const osLabel = os === 'windows' ? 'Windows' : 'macOS / Linux'

  return (
    <>
      {showModal && <InstallModal os={os} onClose={() => setShowModal(false)} />}

      <section
        style={{
          padding: 'clamp(60px, 12vw, 120px) clamp(16px, 4vw, 24px)',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(780px, 100vw)',
            height: 'min(460px, 84vw)',
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.24)',
                borderRadius: 100,
                padding: '5px 14px',
                fontSize: 12,
                color: '#d8b4fe',
                fontWeight: 700,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  display: 'inline-block',
                }}
              />
              Ready when you are
            </div>

            <h2
              style={{
                fontSize: 'clamp(30px, 5vw, 62px)',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1.04,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #ede9fe 40%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your to-do list won't
              </span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                finish itself. Or will it?
              </span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(15px, 3vw, 17px)',
                color: '#94a3b8',
                maxWidth: 620,
                margin: '0 auto 36px',
                lineHeight: 1.8,
              }}
            >
              Every hour you spend on repetitive work is an hour Plutus could handle for you.
              Start in the cloud for the fastest path to a working AI workspace, or grab the
              local edition for full control on your own machine.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: 28,
              }}
            >
              <a
                href={CLOUD_URL}
                onMouseEnter={() => setCloudHover(true)}
                onMouseLeave={() => setCloudHover(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '14px 26px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '-0.3px',
                  background: cloudHover
                    ? 'linear-gradient(135deg, #9333ea, #6d28d9)'
                    : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  boxShadow: cloudHover
                    ? '0 12px 36px rgba(168,85,247,0.36)'
                    : '0 8px 24px rgba(168,85,247,0.24)',
                  transition: 'all 0.2s ease',
                  minWidth: 220,
                }}
              >
                Start Free in Cloud
              </a>
              <button
                onClick={() => setShowModal(true)}
                onMouseEnter={() => setLocalHover(true)}
                onMouseLeave={() => setLocalHover(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '14px 26px',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '-0.3px',
                  color: '#e2e8f0',
                  background: localHover ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  transition: 'all 0.2s ease',
                  minWidth: 220,
                }}
              >
                Download Local (Free)
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                gap: 16,
                maxWidth: 760,
                margin: '0 auto 24px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  background: 'rgba(168,85,247,0.08)',
                  border: '1px solid rgba(168,85,247,0.22)',
                  borderRadius: 16,
                  padding: '18px 18px 16px',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: '#d8b4fe', marginBottom: 8 }}>
                  Plutus Cloud
                </div>
                <div style={{ fontSize: 14, color: '#f8fafc', lineHeight: 1.7 }}>
                  No credit card. No install. Sign in and start delegating work to your AI agent
                  in under 60 seconds.
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '18px 18px 16px',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: '#67e8f9', marginBottom: 8 }}>
                  Plutus Local
                </div>
                <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7 }}>
                  Open-source, free forever. Full agent on {osLabel} with total privacy and
                  offline AI support via Ollama.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                maxWidth: 560,
                margin: '0 auto 16px',
              }}
            >
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span
                style={{
                  fontSize: 11,
                  color: '#475569',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Quick install
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div
              style={{
                background: 'rgba(10,10,15,0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 18px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                maxWidth: 560,
                margin: '0 auto 16px',
                boxShadow: '0 0 60px rgba(168,85,247,0.08)',
              }}
            >
              <code
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(10px, 2.2vw, 12px)',
                  color: '#94a3b8',
                  flex: 1,
                  textAlign: 'left',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                }}
              >
                <span style={{ color: '#475569', marginRight: 8 }}>$</span>
                {INSTALL_COMMANDS[os]}
              </code>
              <button
                onClick={copy}
                style={{
                  background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                  border: copied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  color: copied ? '#22c55e' : '#cbd5e1',
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
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p style={{ fontSize: 12, color: '#475569' }}>
              No credit card required. Start delegating in under a minute.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
