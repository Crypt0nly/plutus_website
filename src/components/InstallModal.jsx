import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  windows: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
}

const STEPS = {
  unix: [
    {
      icon: '⌨️',
      title: 'Open Terminal',
      desc: 'Press',
      keys: ['⌘', 'Space'],
      after: ', type "Terminal", and press Enter.',
      alt: 'Or find Terminal in Applications → Utilities.',
    },
    {
      icon: '📋',
      title: 'Paste & run this command',
      isCommand: true,
    },
    {
      icon: '🎉',
      title: 'Done!',
      desc: 'Plutus will install and open automatically in your browser at',
      link: 'http://localhost:7777',
    },
  ],
  windows: [
    {
      icon: '⌨️',
      title: 'Open PowerShell',
      desc: 'Press',
      keys: ['Win', 'X'],
      after: ', then click "Windows PowerShell" or "Terminal" from the menu.',
      alt: 'Or search "PowerShell" in the Start menu.',
    },
    {
      icon: '📋',
      title: 'Paste & run this command',
      isCommand: true,
    },
    {
      icon: '🎉',
      title: 'Done!',
      desc: 'Plutus will install and open automatically in your browser at',
      link: 'http://localhost:7777',
    },
  ],
}

export default function InstallModal({ os, onClose }) {
  const [copied, setCopied] = useState(false)
  const cmd = INSTALL_COMMANDS[os]
  const steps = STEPS[os]

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const osLabel = os === 'windows' ? 'Windows' : 'macOS / Linux'
  const termLabel = os === 'windows' ? 'PowerShell' : 'Terminal'

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgb(12, 14, 22)',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: 20,
            padding: '32px',
            maxWidth: 520,
            width: '100%',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.1)',
            position: 'relative',
            zIndex: 9999,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#64748b',
              width: 32,
              height: 32,
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.target.style.color = '#e2e8f0'; e.target.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { e.target.style.color = '#64748b'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: 100,
              padding: '4px 12px',
              fontSize: 12,
              color: '#c084fc',
              fontWeight: 600,
              marginBottom: 12,
              letterSpacing: '0.3px',
            }}>
              {os === 'windows' ? '🪟' : '🍎'} {osLabel}
            </div>
            <h2 style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '-0.5px',
              marginBottom: 6,
            }}>
              Install Plutus in 60 seconds
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              Just open {termLabel} and run one command — Plutus sets everything up automatically.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                {/* Step number */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: i === steps.length - 1
                    ? 'rgba(34,197,94,0.15)'
                    : 'rgba(168,85,247,0.15)',
                  border: `1px solid ${i === steps.length - 1 ? 'rgba(34,197,94,0.3)' : 'rgba(168,85,247,0.3)'}`,
                  color: i === steps.length - 1 ? '#22c55e' : '#c084fc',
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  {i + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#e2e8f0',
                    marginBottom: step.isCommand ? 10 : 4,
                  }}>
                    {step.title}
                  </div>

                  {step.isCommand ? (
                    /* Command box */
                    <div>
                      <div style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(168,85,247,0.2)',
                        borderRadius: 10,
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 8,
                      }}>
                        <span style={{
                          color: '#a855f7',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 13,
                          flexShrink: 0,
                        }}>$</span>
                        <code style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 12,
                          color: '#e2e8f0',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {cmd}
                        </code>
                      </div>
                      <button
                        onClick={copy}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '9px 18px',
                          borderRadius: 8,
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 700,
                          color: 'white',
                          background: copied
                            ? 'linear-gradient(135deg, #16a34a, #15803d)'
                            : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                          boxShadow: copied
                            ? '0 4px 16px rgba(34,197,94,0.3)'
                            : '0 4px 16px rgba(168,85,247,0.3)',
                          transition: 'all 0.2s ease',
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      >
                        {copied ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied to clipboard!
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Copy command
                          </>
                        )}
                      </button>
                      <p style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: '#475569',
                        lineHeight: 1.5,
                      }}>
                        Then paste it into {termLabel} and press <kbd style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: 4,
                          padding: '1px 5px',
                          fontSize: 11,
                          color: '#94a3b8',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>Enter</kbd>
                      </p>
                    </div>
                  ) : step.link ? (
                    /* Done step */
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                      {step.desc}{' '}
                      <span style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                        {step.link}
                      </span>
                    </p>
                  ) : (
                    /* Regular step with keyboard shortcut */
                    <div>
                      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 4 }}>
                        {step.desc}{' '}
                        {step.keys && step.keys.map((k, ki) => (
                          <span key={ki}>
                            <kbd style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.15)',
                              borderRadius: 5,
                              padding: '2px 7px',
                              fontSize: 12,
                              color: '#c084fc',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontWeight: 600,
                            }}>{k}</kbd>
                            {ki < step.keys.length - 1 && (
                              <span style={{ color: '#334155', margin: '0 3px', fontSize: 11 }}>+</span>
                            )}
                          </span>
                        ))}
                        {step.after}
                      </p>
                      {step.alt && (
                        <p style={{ fontSize: 12, color: '#334155', fontStyle: 'italic' }}>
                          {step.alt}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 24,
            padding: '12px 16px',
            background: 'rgba(34,197,94,0.05)',
            border: '1px solid rgba(34,197,94,0.12)',
            borderRadius: 10,
            fontSize: 12,
            color: '#475569',
            lineHeight: 1.6,
          }}>
            <span style={{ color: '#22c55e', fontWeight: 600 }}>✓ Safe & open source</span>
            {' '}— The installer only downloads Plutus via pip and creates a shortcut. No admin rights required.{' '}
            <a
              href="https://github.com/Crypt0nly/plutus"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#a855f7', textDecoration: 'none' }}
            >
              View source on GitHub ↗
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
