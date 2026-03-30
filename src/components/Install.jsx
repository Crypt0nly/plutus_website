import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InstallModal from './InstallModal'

function detectOS() {
  const ua = navigator.userAgent
  if (ua.includes('Win')) return 'windows'
  if (ua.includes('Mac')) return 'mac'
  return 'linux'
}

const osConfig = {
  windows: {
    label: 'Windows',
    icon: '🪟',
    version: 'Windows 10 / 11',
    cmd: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
  },
  mac: {
    label: 'macOS',
    icon: '🍎',
    version: 'macOS 12+',
    cmd: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  },
  linux: {
    label: 'Linux',
    icon: '🐧',
    version: 'Ubuntu, Debian, Arch & more',
    cmd: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  },
}

export default function Install() {
  const [os, setOs] = useState('windows')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  useEffect(() => {
    setOs(detectOS())
  }, [])

  const current = osConfig[os]

  const copyCmd = () => {
    navigator.clipboard.writeText(current.cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {showModal && <InstallModal os={os} onClose={() => setShowModal(false)} />}

      <section id="install" style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="section-container" style={{ maxWidth: 700 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div style={{
              display: 'inline-block',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 100,
              padding: '4px 14px',
              fontSize: 12,
              color: '#22c55e',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              Free Download
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-1.5px',
              color: '#f8fafc',
              lineHeight: 1.1,
              marginBottom: 14,
            }}>
              Your AI agent,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ready in minutes
              </span>
            </h2>
            <p style={{ color: '#55556a', fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>
              One click. No technical setup. Your autonomous AI agent is up and running in minutes.
            </p>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'clamp(14px, 3vw, 20px)',
              overflow: 'hidden',
            }}
          >
            {/* OS selector */}
            <div style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}>
              {Object.entries(osConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setOs(key)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 8,
                    border: os === key ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    background: os === key ? 'rgba(168,85,247,0.12)' : 'transparent',
                    color: os === key ? '#c084fc' : '#475569',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cfg.icon} {cfg.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={os}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{ padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)' }}
              >
                {/* OS info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 28,
                }}>
                  <span style={{ fontSize: 'clamp(24px, 5vw, 32px)' }}>{current.icon}</span>
                  <div>
                    <div style={{ fontSize: 'clamp(15px, 3vw, 17px)', fontWeight: 700, color: '#f1f5f9' }}>
                      Plutus for {current.label}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>
                      {current.version} · Free forever · ~50 MB
                    </div>
                  </div>
                </div>

                {/* Big download button */}
                <button
                  onClick={() => setShowModal(true)}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: 'clamp(13px, 2.5vw, 16px) clamp(16px, 3vw, 24px)',
                    borderRadius: 14,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    fontWeight: 700,
                    color: 'white',
                    background: btnHover
                      ? 'linear-gradient(135deg, #9333ea, #6d28d9)'
                      : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    boxShadow: btnHover
                      ? '0 8px 32px rgba(168,85,247,0.45)'
                      : '0 4px 20px rgba(168,85,247,0.3)',
                    transition: 'all 0.2s ease',
                    marginBottom: 12,
                    letterSpacing: '-0.2px',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Plutus for {current.label}
                </button>

                {/* Reassurance row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 'clamp(10px, 2vw, 20px)',
                  flexWrap: 'wrap',
                  marginBottom: 24,
                }}>
                  {['✓ No account needed', '✓ No credit card', '✓ Guided setup included'].map(t => (
                    <span key={t} style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>

                {/* Advanced toggle */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                  <button
                    onClick={() => setShowAdvanced(v => !v)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#334155',
                      fontSize: 12,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: 0,
                      fontFamily: 'inherit',
                    }}
                  >
                    <svg
                      width="12" height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: showAdvanced ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    Advanced: install via command line
                  </button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          marginTop: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          background: 'rgba(8,8,14,0.8)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: 10,
                          padding: '10px 14px',
                        }}>
                          <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, flexShrink: 0 }}>$</span>
                          <code style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: 'clamp(10px, 2.2vw, 12px)',
                            color: '#94a3b8',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            minWidth: 0,
                          }}>
                            {current.cmd}
                          </code>
                          <button
                            onClick={copyCmd}
                            style={{
                              background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.05)',
                              border: copied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.08)',
                              color: copied ? '#22c55e' : '#475569',
                              padding: '4px 10px',
                              borderRadius: 6,
                              cursor: 'pointer',
                              fontSize: 11,
                              fontWeight: 600,
                              transition: 'all 0.2s',
                              flexShrink: 0,
                            }}
                          >
                            {copied ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#2a2a3a' }}
          >
            Works on Windows, macOS & Linux · Requires Python 3.14 · Open source
          </motion.p>

        </div>
      </section>
    </>
  )
}
