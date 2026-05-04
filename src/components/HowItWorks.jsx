import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    label: 'Sign up in seconds',
    title: 'Create your workspace — cloud or local',
    desc: 'Start in the cloud with one click (no install, no config), or download the local agent for full privacy. Either way, you\'re up and running in under a minute.',
    visual: (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 10,
          width: '100%',
          maxWidth: 460,
        }}
      >
        <div
          style={{
            padding: '14px 16px',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.24)',
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: '#d8b4fe', marginBottom: 6 }}>
            Cloud (Recommended)
          </div>
          <div style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
            Instant browser access. Memory, connectors, and team workspaces included.
          </div>
        </div>
        <div
          style={{
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: '#67e8f9', marginBottom: 6 }}>
            Local (Open Source)
          </div>
          <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>
            Full agent on your machine. Total privacy. Free forever.
          </div>
        </div>
      </div>
    ),
    color: '#a855f7',
  },
  {
    number: '2',
    label: 'Connect your tools',
    title: 'Plug in the services you already use',
    desc: 'Link Gmail, Discord, Telegram, GitHub, Google Calendar, and more. Plutus works inside your tools — sending emails, managing repos, scheduling meetings — without you switching tabs.',
    visual: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 520 }}>
        {['Gmail', 'Discord', 'Telegram', 'GitHub', 'Google Calendar', 'WhatsApp', 'Google Drive'].map((name, index) => (
          <span
            key={name}
            style={{
              padding: '7px 14px',
              background:
                index < 4 ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.04)',
              border:
                index < 4
                  ? '1px solid rgba(6,182,212,0.2)'
                  : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: index < 4 ? '#67e8f9' : '#94a3b8',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    ),
    color: '#06b6d4',
  },
  {
    number: '3',
    label: 'Delegate and done',
    title: 'Tell Plutus what to do — it handles the rest',
    desc: 'Give it a task in plain language. Plutus researches, writes, organizes, sends, schedules, and follows up. It remembers context from last time and gets better with every interaction.',
    visual: (
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '100%',
          maxWidth: 430,
        }}
      >
        {[
          'Research competitors and draft a strategy memo',
          'Send follow-up emails to everyone from yesterday\'s meeting',
          'Monitor this GitHub repo and alert me on new issues',
          'Organize my Drive folder and summarize key docs',
        ].map(example => (
          <div
            key={example}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              background: 'rgba(168,85,247,0.06)',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 13, color: '#a855f7', flexShrink: 0 }}>›</span>
            <span
              style={{
                fontSize: 'clamp(12px, 2.5vw, 13px)',
                color: '#cbd5e1',
                fontStyle: 'italic',
              }}
            >
              "{example}"
            </span>
          </div>
        ))}
      </div>
    ),
    color: '#22c55e',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.03) 50%, transparent 100%)',
      }}
    >
      <div className="section-container" style={{ maxWidth: 920 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 72px)' }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: 100,
              padding: '4px 14px',
              fontSize: 12,
              color: '#06b6d4',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            How it works
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-1.5px',
              color: '#f8fafc',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            From zero to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              done
            </span>{' '}
            in three steps
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              color: '#94a3b8',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            No complicated setup. No learning curve. Sign up, connect your tools, and start
            delegating work to your AI agent immediately.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
          <div
            className="timeline-line"
            style={{
              position: 'absolute',
              left: 27,
              top: 56,
              bottom: 56,
              width: 1,
              background: 'linear-gradient(180deg, #a855f7, #06b6d4, #22c55e)',
              opacity: 0.15,
              pointerEvents: 'none',
            }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="step-row"
              style={{ display: 'flex', gap: 'clamp(14px, 3vw, 24px)', alignItems: 'flex-start' }}
            >
              <div
                style={{
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
                  fontSize: 'clamp(15px, 3vw, 18px)',
                  color: step.color,
                  fontWeight: 800,
                }}
              >
                {step.number}
              </div>

              <div style={{ flex: 1, paddingTop: 6, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: step.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 8,
                  }}
                >
                  {step.label}
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(16px, 3vw, 20px)',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: 8,
                    letterSpacing: '-0.3px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 'clamp(13px, 2.5vw, 15px)',
                    lineHeight: 1.8,
                    marginBottom: 16,
                    maxWidth: 620,
                  }}
                >
                  {step.desc}
                </p>
                {step.visual}
              </div>
            </motion.div>
          ))}
        </div>

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
          {['Executes real tasks', 'Remembers everything', 'Gets smarter over time'].map(text => (
            <div
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: '#64748b',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#a855f7' }}>•</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
