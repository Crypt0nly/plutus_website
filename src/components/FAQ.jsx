import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Is my API key safe?',
    a: 'Yes. Your API key is stored locally in a config file with chmod 600 permissions — readable only by you. Plutus never sends your key to any external server. Zero telemetry.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plutus itself is 100% free and open source (MIT license). You only pay for the LLM API calls you make — typically a few cents per complex task. You can also use Ollama for fully local, zero-cost inference.',
  },
  {
    q: 'What can Plutus actually do?',
    a: 'Plutus can write and run code, browse the web, manage files, send messages, create tools on the fly, spawn parallel workers, and chain all of this together to complete complex multi-step goals. If it can\'t do something, it writes a tool to do it.',
  },
  {
    q: 'Do I need Docker or a server?',
    a: 'No. Plutus runs entirely on your local machine. One install command, no containers, no cloud dependencies. It opens a local web UI at localhost:3000.',
  },
  {
    q: 'Which AI providers are supported?',
    a: 'Anthropic (Claude), OpenAI (GPT-4/5), Google Gemini, and Ollama (local models like Llama, Mistral, etc.). You can switch providers per task.',
  },
  {
    q: 'Is it really open source?',
    a: 'Yes — MIT license. Fork it, modify it, self-host it. The full source is on GitHub. No hidden SaaS layer, no vendor lock-in.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{
      padding: '100px 24px',
      position: 'relative', zIndex: 1,
      background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.02) 50%, transparent 100%)',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 100,
            padding: '4px 14px',
            fontSize: 12,
            color: '#f59e0b',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            FAQ
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            color: '#f8fafc',
            lineHeight: 1.1,
          }}>
            Questions? We've got{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              answers.
            </span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              {...faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ q, a, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      style={{
        background: isOpen ? 'rgba(168,85,247,0.05)' : 'rgba(255,255,255,0.02)',
        border: isOpen ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: 20,
            color: isOpen ? '#a855f7' : '#475569',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 20px 18px',
              fontSize: 14,
              color: '#94a3b8',
              lineHeight: 1.7,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
