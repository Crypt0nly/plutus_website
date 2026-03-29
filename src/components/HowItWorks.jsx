import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    emoji: '⬇️',
    title: 'Download & install',
    desc: 'Click the download button, run the installer, and Plutus opens automatically. No setup wizards, no configuration files — it just works.',
    visual: (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 18px',
        background: 'rgba(168,85,247,0.08)',
        border: '1px solid rgba(168,85,247,0.2)',
        borderRadius: 12,
        width: 'fit-content',
        maxWidth: '100%',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#c084fc' }}>Download Plutus — it's free</span>
      </div>
    ),
    color: '#a855f7',
  },
  {
    number: '2',
    emoji: '🔑',
    title: 'Connect your AI in 30 seconds',
    desc: 'Paste your API key from ChatGPT or Claude — or skip this entirely and use a free local AI. Plutus walks you through it step by step with a friendly setup screen.',
    visual: (
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {['ChatGPT', 'Claude', 'Gemini', 'Free local AI'].map((name, i) => (
          <span key={name} style={{
            padding: '6px 14px',
            background: i === 3 ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${i === 3 ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            color: i === 3 ? '#4ade80' : '#94a3b8',
          }}>
            {i === 3 && <span style={{ marginRight: 4 }}>✓</span>}{name}
          </span>
        ))}
      </div>
    ),
    color: '#06b6d4',
  },
  {
    number: '3',
    emoji: '💬',
    title: 'Just tell it what you need',
    desc: 'Type naturally, like you\'re texting a friend. No commands, no menus to learn. Plutus understands what you mean and gets it done.',
    visual: (
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        maxWidth: 400,
      }}>
        {[
          'Write a professional email to my client',
          'Organize my Downloads folder by type',
          'Build me a simple landing page',
        ].map((example, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            background: 'rgba(168,85,247,0.06)',
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 13, color: '#64748b', flexShrink: 0 }}>💬</span>
            <span style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#94a3b8', fontStyle: 'italic' }}>"{example}"</span>
          </div>
        ))}
      </div>
    ),
    color: '#22c55e',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: 'clamp(60px, 10vw, 100px) 0',
      position: 'relative',
      zIndex: 1,
      background: 'linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.03) 50%, transparent 100%)',
    }}>
      <div className="section-container" style={{ maxWidth: 860 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 72px)' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: 100,
            padding: '4px 14px',
            fontSize: 12,
            color: '#06b6d4',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            How it works
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            color: '#f8fafc',
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Up and running{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in 60 seconds
            </span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            color: '#55556a',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            No coding required. No technical knowledge needed. If you can type a message, you can use Plutus.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
          {/* Vertical connector line — hidden on very small screens */}
          <div className="timeline-line" style={{
            position: 'absolute',
            left: 27,
            top: 56,
            bottom: 56,
            width: 1,
            background: 'linear-gradient(180deg, #a855f7, #06b6d4, #22c55e)',
            opacity: 0.15,
            pointerEvents: 'none',
          }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="step-row"
              style={{ display: 'flex', gap: 'clamp(14px, 3vw, 24px)', alignItems: 'flex-start' }}
            >
              {/* Step bubble */}
              <div style={{
                width: 'clamp(42px, 8vw, 54px)',
                height: 'clamp(42px, 8vw, 54px)',
                borderRadius: '50%',
                background: `${step.color}12`,
                border: `2px solid ${step.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
                fontSize: 'clamp(16px, 3vw, 22px)',
              }}>
                {step.emoji}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: 6, minWidth: 0 }}>
                <h3 style={{
                  fontSize: 'clamp(16px, 3vw, 19px)',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  marginBottom: 8,
                  letterSpacing: '-0.3px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: 'clamp(13px, 2.5vw, 15px)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                  maxWidth: 520,
                }}>
                  {step.desc}
                </p>
                {step.visual}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: 56,
            textAlign: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(12px, 3vw, 24px)',
          }}
        >
          {[
            { icon: '🔒', text: 'No account required' },
            { icon: '💸', text: 'Free forever' },
            { icon: '🖥️', text: 'Works on Windows, Mac & Linux' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: '#475569',
              fontWeight: 500,
            }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
