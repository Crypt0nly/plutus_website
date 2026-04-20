import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InstallModal from './InstallModal'

const CLOUD_URL = 'https://app.useplutus.ai/?tab=chat'

function detectOS() {
  const ua = navigator.userAgent || ''
  if (ua.includes('Win')) return 'windows'
  if (ua.includes('Mac')) return 'mac'
  return 'linux'
}

const osConfig = {
  windows: {
    label: 'Windows',
    version: 'Windows 10 / 11',
    cmd: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
  },
  mac: {
    label: 'macOS',
    version: 'macOS 12+',
    cmd: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  },
  linux: {
    label: 'Linux',
    version: 'Ubuntu, Debian, Arch & more',
    cmd: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  },
}

export default function Install() {
  const [os, setOs] = useState('windows')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [cloudHover, setCloudHover] = useState(false)
  const [localHover, setLocalHover] = useState(false)

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

      <section
        id="install"
        style={{
          padding: 'clamp(64px, 10vw, 110px) 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="section-container" style={{ maxWidth: 1160 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.24)',
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: 12,
                color: '#c084fc',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Cloud or Local
            </div>
            <h2
              style={{
                fontSize: 'clamp(30px, 4vw, 46px)',
                fontWeight: 800,
                letterSpacing: '-1.5px',
                color: '#f8fafc',
                lineHeight: 1.08,
                marginBottom: 14,
              }}
            >
              Choose the way you want to run{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Plutus
              </span>
            </h2>
            <p
              style={{
                color: '#94a3b8',
                fontSize: 'clamp(15px, 2.4vw, 17px)',
                lineHeight: 1.8,
                maxWidth: 700,
                margin: '0 auto',
              }}
            >
              Most teams should start in the cloud for the fastest onboarding. Power users can still
              download the local edition for a self-managed, open-source workflow.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: 22,
              alignItems: 'stretch',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{
                background:
                  'linear-gradient(180deg, rgba(168,85,247,0.16) 0%, rgba(15,23,42,0.9) 100%)',
                border: '1px solid rgba(168,85,247,0.24)',
                borderRadius: 22,
                padding: 'clamp(24px, 4vw, 34px)',
                boxShadow: '0 26px 80px rgba(168,85,247,0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  right: -80,
                  width: 220,
                  height: 220,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.22), transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 18,
                }}
              >
                Recommended for most users
              </div>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-1px',
                  marginBottom: 12,
                }}
              >
                Plutus Cloud
              </h3>
              <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.8, marginBottom: 22 }}>
                Start instantly in your browser, connect your tools, and move straight into real AI
                workflows without any device setup or install friction.
              </p>

              <div style={{ display: 'grid', gap: 12, marginBottom: 26 }}>
                {[
                  'Fastest path from homepage to active workspace',
                  'Best choice for hosted connectors, shared channels, and team use',
                  'Perfect for customers who want speed and simplicity',
                ].map(item => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      color: '#f8fafc',
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    <span style={{ color: '#4ade80', fontWeight: 800 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={CLOUD_URL}
                onMouseEnter={() => setCloudHover(true)}
                onMouseLeave={() => setCloudHover(false)}
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '15px 22px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 800,
                  background: cloudHover
                    ? 'linear-gradient(135deg, #9333ea, #6d28d9)'
                    : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  boxShadow: cloudHover
                    ? '0 14px 38px rgba(168,85,247,0.34)'
                    : '0 10px 26px rgba(168,85,247,0.24)',
                  transition: 'all 0.2s ease',
                  marginBottom: 14,
                }}
              >
                Start in Cloud
              </a>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                  color: '#cbd5e1',
                  fontSize: 12,
                }}
              >
                <span>Instant signup</span>
                <span>No local install</span>
                <span>Hosted workspace</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 22,
                padding: 'clamp(24px, 4vw, 34px)',
                boxShadow: '0 24px 70px rgba(2,8,23,0.16)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.04)',
                  color: '#94a3b8',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 18,
                }}
              >
                Best for control and privacy
              </div>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-1px',
                  marginBottom: 12,
                }}
              >
                Plutus Local
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.8, marginBottom: 22 }}>
                Download the open-source desktop edition when you want Plutus running on your own
                machine with a self-managed workflow.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  marginBottom: 18,
                }}
              >
                {Object.entries(osConfig).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setOs(key)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 999,
                      border:
                        os === key
                          ? '1px solid rgba(6,182,212,0.35)'
                          : '1px solid rgba(255,255,255,0.08)',
                      background: os === key ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.03)',
                      color: os === key ? '#67e8f9' : '#94a3b8',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={os}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'rgba(8,8,14,0.66)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 16,
                    padding: '18px 18px 16px',
                    marginBottom: 18,
                  }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>
                      Plutus for {current.label}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>
                      {current.version} · Open source · Free forever
                    </div>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    onMouseEnter={() => setLocalHover(true)}
                    onMouseLeave={() => setLocalHover(false)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      padding: '14px 18px',
                      borderRadius: 14,
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#e2e8f0',
                      background: localHover ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                      transition: 'all 0.2s ease',
                      marginBottom: 12,
                    }}
                  >
                    Download Local for {current.label}
                  </button>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 'clamp(10px, 2vw, 18px)',
                      flexWrap: 'wrap',
                      color: '#64748b',
                      fontSize: 12,
                      marginBottom: 16,
                    }}
                  >
                    <span>No account required</span>
                    <span>Guided setup included</span>
                    <span>Runs locally</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14 }}>
                    <button
                      onClick={() => setShowAdvanced(value => !value)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: 12,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: 0,
                        fontFamily: 'inherit',
                        fontWeight: 600,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
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
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      Advanced install via command line
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
                          <div
                            style={{
                              marginTop: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.07)',
                              borderRadius: 12,
                              padding: '10px 12px',
                            }}
                          >
                            <span
                              style={{
                                color: '#06b6d4',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: 13,
                                flexShrink: 0,
                              }}
                            >
                              $
                            </span>
                            <code
                              style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: 'clamp(10px, 2.2vw, 12px)',
                                color: '#cbd5e1',
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                minWidth: 0,
                              }}
                            >
                              {current.cmd}
                            </code>
                            <button
                              onClick={copyCmd}
                              style={{
                                background: copied ? 'rgba(34,197,94,0.14)' : 'rgba(255,255,255,0.05)',
                                border:
                                  copied
                                    ? '1px solid rgba(34,197,94,0.3)'
                                    : '1px solid rgba(255,255,255,0.08)',
                                color: copied ? '#4ade80' : '#cbd5e1',
                                padding: '5px 10px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontSize: 11,
                                fontWeight: 700,
                                transition: 'all 0.2s',
                                flexShrink: 0,
                              }}
                            >
                              {copied ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div
                style={{
                  display: 'grid',
                  gap: 10,
                  color: '#cbd5e1',
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {[
                  'Ideal for developers, privacy-first users, and self-hosted workflows',
                  'Open-source codebase with a lighter desktop footprint',
                  'Great fallback option for users who prefer running everything locally',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#06b6d4', fontWeight: 800 }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginTop: 22,
              fontSize: 13,
              color: '#475569',
            }}
          >
            Cloud for fastest onboarding. Local for maximum control. Both are part of the same
            Plutus product.
          </motion.p>
        </div>
      </section>
    </>
  )
}
