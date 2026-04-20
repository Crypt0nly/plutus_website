import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    label: 'Choose your path',
    title: 'Start in Cloud or run Local',
    desc: 'Plutus gives you two ways to begin. Start instantly in the cloud for the fastest onboarding, or download the local edition when you want full control on your own machine.',
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
            Plutus Cloud
          </div>
          <div style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
            Browser-based setup with the shortest path to a working agent.
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
            Plutus Local
          </div>
          <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>
            Downloadable desktop workflow for control, privacy, and open-source flexibility.
          </div>
        </div>
      </div>
    ),
    color: '#a855f7',
  },
  {
    number: '2',
    label: 'Connect your stack',
    title: 'Bring your models, tools, and channels',
    desc: 'Connect Plutus to the AI models and workflows you already use. The same product philosophy applies across both modes: Plutus should plug into the tools that matter to your work.',
    visual: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 520 }}>
        {['OpenAI', 'Claude', 'Gemini', 'WhatsApp', 'Gmail', 'GitHub'].map((name, index) => (
          <span
            key={name}
            style={{
              padding: '7px 14px',
              background:
                index < 3 ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.04)',
              border:
                index < 3
                  ? '1px solid rgba(6,182,212,0.2)'
                  : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: index < 3 ? '#67e8f9' : '#94a3b8',
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
    label: 'Get work done',
    title: 'Give Plutus a task and let it execute',
    desc: 'Once your workspace is ready, Plutus moves from chat into action. Ask it to research, draft, organize, route, or follow through on the work that normally eats up your time.',
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
          'Summarize these leads and draft follow-ups',
          'Research the best providers and give me a recommendation',
          'Organize my files and send me the finished result',
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
            Three steps to a working{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Plutus workflow
            </span>
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
            The cloud path is the fastest route for most buyers. The local path stays available for
            users who want self-managed execution on their own machine.
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
          {['Cloud for speed', 'Local for control', 'One Plutus experience'].map(text => (
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
