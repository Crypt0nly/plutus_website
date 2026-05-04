import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import InstallModal from './InstallModal'

const CLOUD_URL = 'https://app.useplutus.ai/?tab=chat'

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://useplutus.ai/install.sh | bash',
  windows: 'iwr -useb https://useplutus.ai/install.ps1 | iex',
}

const OS_LABELS = {
  unix: { short: 'macOS / Linux' },
  windows: { short: 'Windows' },
}

const TERMINAL_LINES = [
  { text: '> plutus: research top 5 CRM tools and draft a comparison doc', delay: 0.2, color: '#a855f7' },
  { text: '✓ Browsing 12 sources...', delay: 0.8, color: '#22c55e' },
  { text: '✓ Comparison document created', delay: 1.4, color: '#22c55e' },
  { text: '✓ Sent summary to your Gmail', delay: 1.9, color: '#22c55e' },
  { text: '✓ Calendar reminder set for follow-up', delay: 2.3, color: '#06b6d4' },
  { text: 'Done. What else should I handle?', delay: 2.7, color: '#e2e8f0' },
]

function detectOS() {
  const ua = navigator.userAgent || ''
  if (ua.includes('Win')) return 'windows'
  return 'unix'
}

function TerminalLine({ text, color, delay }) {
  const [visible, setVisible] = useState(false)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true)
      let index = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, index + 1))
        index += 1
        if (index >= text.length) clearInterval(interval)
      }, 22)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [text, delay])

  if (!visible) return null

  return (
    <div
      style={{
        color,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 'clamp(11px, 2.5vw, 13px)',
        lineHeight: '1.8',
        wordBreak: 'break-word',
      }}
    >
      {displayed}
      {displayed.length < text.length && <span style={{ opacity: 0.7 }}>_</span>}
    </div>
  )
}

export default function Hero() {
  const [os, setOs] = useState('unix')
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

  return (
    <>
      {showModal && <InstallModal os={os} onClose={() => setShowModal(false)} />}

      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(92px, 15vw, 128px) clamp(16px, 4vw, 24px) clamp(44px, 8vw, 84px)',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(760px, 110vw)',
            height: 'min(760px, 110vw)',
            background:
              'radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(6,182,212,0.08) 35%, transparent 72%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.24)',
            borderRadius: 999,
            padding: '7px 16px',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: '#d8b4fe',
            marginBottom: 26,
            fontWeight: 600,
            flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
              boxShadow: '0 0 10px rgba(34,197,94,0.8)',
              flexShrink: 0,
            }}
          />
          Now with team workspaces, voice mode, and 12+ integrations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(36px, 7vw, 84px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: 'clamp(-1.5px, -0.5vw, -3px)',
            maxWidth: 980,
            marginBottom: 22,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #ede9fe 45%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Stop chatting with AI.
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
            Start delegating to it.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: 'clamp(15px, 3vw, 19px)',
            color: '#94a3b8',
            maxWidth: 720,
            marginBottom: 34,
            lineHeight: 1.75,
            position: 'relative',
            zIndex: 1,
            padding: '0 8px',
          }}
        >
          Plutus is an AI agent that <strong style={{ color: '#f8fafc' }}>actually does your work</strong> — research,
          emails, file management, web browsing, coding, and more. It connects to your tools, remembers
          context, and executes tasks end-to-end. Not another chatbot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 20,
            position: 'relative',
            zIndex: 1,
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
              padding: '15px 24px',
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
                ? '0 14px 40px rgba(168,85,247,0.38)'
                : '0 10px 28px rgba(168,85,247,0.26)',
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
              padding: '15px 24px',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              color: '#e2e8f0',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '-0.3px',
              background: localHover ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              boxShadow: localHover ? '0 10px 32px rgba(15,23,42,0.35)' : 'none',
              transition: 'all 0.2s ease',
              minWidth: 220,
            }}
          >
            Download Local (Free)
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 30,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {[
            'No credit card required',
            'Works with ChatGPT, Claude & Gemini',
            'Team workspaces included',
          ].map(item => (
            <span
              key={item}
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 13,
                color: '#cbd5e1',
                fontWeight: 600,
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.6 }}
          style={{
            width: '100%',
            maxWidth: 980,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 18,
            marginBottom: 34,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              textAlign: 'left',
              background:
                'linear-gradient(180deg, rgba(168,85,247,0.16) 0%, rgba(15,23,42,0.82) 100%)',
              border: '1px solid rgba(168,85,247,0.24)',
              borderRadius: 20,
              padding: '24px clamp(20px, 4vw, 28px)',
              boxShadow: '0 24px 60px rgba(168,85,247,0.12)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                color: '#f8fafc',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}
            >
              Recommended
            </div>
            <h3
              style={{
                fontSize: 26,
                color: '#ffffff',
                fontWeight: 800,
                marginBottom: 10,
                letterSpacing: '-0.8px',
              }}
            >
              Plutus Cloud
            </h3>
            <p style={{ fontSize: 15, color: '#dbe4f0', lineHeight: 1.7, marginBottom: 18 }}>
              Sign in and start delegating in under 60 seconds. Your AI workspace with memory,
              connectors, team collaboration, and voice mode — all hosted.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                'Instant setup — no downloads or config',
                'Persistent memory that grows with you',
                'Team workspaces with shared context',
                '12+ integrations (Gmail, Discord, GitHub...)',
              ].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    color: '#e2e8f0',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: '#4ade80', fontWeight: 800 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              textAlign: 'left',
              background: 'rgba(15,23,42,0.72)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: '24px clamp(20px, 4vw, 28px)',
              boxShadow: '0 24px 60px rgba(2,8,23,0.22)',
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
                marginBottom: 16,
              }}
            >
              Open Source
            </div>
            <h3
              style={{
                fontSize: 26,
                color: '#ffffff',
                fontWeight: 800,
                marginBottom: 10,
                letterSpacing: '-0.8px',
              }}
            >
              Plutus Local
            </h3>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 18 }}>
              Full AI agent on your own machine. Same power, total privacy. Connect it to Cloud
              via Bridge when you want the best of both worlds.
            </p>
            <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
              {[
                'Windows, macOS, and Linux',
                '100% private — nothing leaves your machine',
                'Open-source and free forever',
                'Bridge to Cloud for remote access',
              ].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    color: '#cbd5e1',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: '#06b6d4', fontWeight: 800 }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Object.entries(OS_LABELS).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setOs(key)}
                  style={{
                    background: os === key ? 'rgba(6,182,212,0.16)' : 'rgba(255,255,255,0.03)',
                    border:
                      os === key
                        ? '1px solid rgba(6,182,212,0.35)'
                        : '1px solid rgba(255,255,255,0.08)',
                    color: os === key ? '#67e8f9' : '#94a3b8',
                    padding: '6px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {info.short}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: 720,
            background: 'rgba(8,8,14,0.72)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18,
            padding: '18px clamp(16px, 4vw, 22px)',
            marginBottom: 'clamp(34px, 7vw, 52px)',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 18px 44px rgba(2,8,23,0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 12,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc' }}>
                Prefer local right away?
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                One command. Full agent on your machine in under 2 minutes.
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#e2e8f0',
                padding: '10px 14px',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Guided install
            </button>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
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
                padding: '7px 12px',
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: 720,
            background: 'rgba(8,8,14,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'clamp(12px, 2vw, 18px)',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(168,85,247,0.1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <span
              style={{
                marginLeft: 8,
                fontSize: 'clamp(10px, 2vw, 12px)',
                color: '#475569',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              plutus workspace
            </span>
          </div>
          <div
            style={{
              padding: 'clamp(14px, 3vw, 22px) clamp(14px, 3vw, 24px)',
              minHeight: 'clamp(130px, 24vw, 190px)',
              textAlign: 'left',
            }}
          >
            {TERMINAL_LINES.map((line, index) => (
              <TerminalLine key={index} {...line} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          style={{
            marginTop: 'clamp(28px, 6vw, 58px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: '#334155',
            fontSize: 12,
          }}
        >
          <span>See what Plutus can do</span>
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
