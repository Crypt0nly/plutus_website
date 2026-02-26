import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Install in one command',
    desc: 'Paste a single line into your terminal. Plutus installs itself, sets up the runtime, and opens the web UI — all in under 60 seconds.',
    code: 'curl -fsSL https://www.useplutus.ai/install.sh | bash',
    color: '#a855f7',
  },
  {
    number: '02',
    title: 'Add your API key',
    desc: 'Drop in your Anthropic, OpenAI, or Ollama key. It\'s stored locally on your machine with strict file permissions. Nothing leaves your system.',
    code: 'plutus-ai config set ANTHROPIC_API_KEY sk-ant-...',
    color: '#06b6d4',
  },
  {
    number: '03',
    title: 'Give it a task',
    desc: 'Type any goal in plain English. Plutus breaks it into steps, spawns workers, uses tools, and executes — while you watch it happen in real time.',
    code: '> Build me a REST API for user authentication',
    color: '#22c55e',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: '100px 24px',
      position: 'relative', zIndex: 1,
      background: 'linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.03) 50%, transparent 100%)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}
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
          }}>
            From zero to agent{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in 3 steps
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 28, top: 40, bottom: 40,
            width: 1,
            background: 'linear-gradient(180deg, #a855f7, #06b6d4, #22c55e)',
            opacity: 0.2,
          }} />

          {steps.map((step, i) => (
            <StepCard key={step.number} {...step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ number, title, desc, code, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
    >
      {/* Step number bubble */}
      <div style={{
        width: 56, height: 56,
        borderRadius: '50%',
        background: `${color}15`,
        border: `2px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14, fontWeight: 700,
          color: color,
        }}>
          {number}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: 8 }}>
        <h3 style={{
          fontSize: 20, fontWeight: 700,
          color: '#f1f5f9',
          marginBottom: 8,
          letterSpacing: '-0.3px',
        }}>
          {title}
        </h3>
        <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
          {desc}
        </p>
        <div style={{
          background: 'rgba(10,10,15,0.8)',
          border: `1px solid ${color}20`,
          borderRadius: 8,
          padding: '10px 16px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          color: '#94a3b8',
          display: 'inline-block',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: color, marginRight: 8, opacity: 0.6 }}>{'>'}</span>
          {code.replace(/^[>$] /, '')}
        </div>
      </div>
    </motion.div>
  )
}
