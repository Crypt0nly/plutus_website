import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('curl -fsSL https://www.useplutus.ai/install.sh | bash')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
              Your AI agent.
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Your keys. Your rules.
            </span>
          </h2>

          <p style={{
            fontSize: 17,
            color: '#64748b',
            maxWidth: 480,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Join thousands of developers who've already replaced their manual workflows with an autonomous AI agent that actually gets things done.
          </p>

          {/* Install command */}
          <div style={{
            background: 'rgba(10,10,15,0.9)',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: 12,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            maxWidth: 520,
            margin: '0 auto 16px',
            boxShadow: '0 0 60px rgba(168,85,247,0.1)',
          }}>
            <code style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13,
              color: '#e2e8f0',
              flex: 1,
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: '#64748b', marginRight: 8 }}>$</span>
              curl -fsSL https://www.useplutus.ai/install.sh | bash
            </code>
            <button
              onClick={copy}
              style={{
                background: copied ? 'rgba(34,197,94,0.15)' : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                border: copied ? '1px solid rgba(34,197,94,0.3)' : 'none',
                color: copied ? '#22c55e' : 'white',
                padding: '8px 18px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {copied ? '✓ Copied!' : 'Install Now'}
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
