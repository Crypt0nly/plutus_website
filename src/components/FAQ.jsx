import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Do I need to be a developer to use Plutus?',
    a: 'Not at all. Plutus is built for everyone — students, freelancers, small business owners, creators, and yes, developers too. You just type what you want in plain English. If you can describe it, Plutus can do it.',
  },
  {
    q: 'Is my data private and safe?',
    a: 'Yes. Everything runs on your own computer. Your files, your conversations, and your API keys never leave your machine. There\'s zero tracking, zero telemetry, and zero cloud storage. Your data is yours alone.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plutus itself is 100% free and always will be. You only pay for the AI you use — typically a few cents per task through providers like OpenAI or Anthropic. You can also use Ollama to run AI models locally at zero cost.',
  },
  {
    q: 'What kinds of things can Plutus do?',
    a: 'Almost anything you do on a computer. Organize files, draft emails, write documents, research topics, create spreadsheets, build websites, automate repetitive tasks, write and run code, browse the web — and much more. If it can\'t do something yet, it teaches itself how.',
  },
  {
    q: 'Do I need to install anything complicated?',
    a: 'No. It\'s one command — copy, paste, done. No Docker, no servers, no complicated setup. It runs on your computer and opens a simple web interface in your browser at localhost:3000.',
  },
  {
    q: 'Which AI models can I use?',
    a: 'Plutus works with all major AI providers: Anthropic (Claude), OpenAI (ChatGPT), Google Gemini, and Ollama for free local models. You can switch between them anytime based on your preference or budget.',
  },
  {
    q: 'Is it really free and open source?',
    a: 'Yes — MIT license, which means the code is fully public and free to use. There\'s no hidden subscription, no premium tier, no catch. The full source code is available on GitHub for anyone to inspect.',
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
