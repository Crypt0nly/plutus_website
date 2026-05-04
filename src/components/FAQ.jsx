import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What makes Plutus different from ChatGPT or other AI chatbots?',
    a: 'Chatbots give you answers. Plutus gives you results. It doesn\'t just tell you how to send an email — it sends the email. It doesn\'t explain how to organize files — it organizes them. Plutus is an execution agent: it connects to your real tools (Gmail, GitHub, Calendar, etc.), remembers your context, and completes tasks end-to-end without you lifting a finger.',
  },
  {
    q: 'Do I need technical skills to use Plutus?',
    a: 'Not at all. You interact with Plutus in plain language — just describe what you need done. Whether you\'re a student, freelancer, founder, or developer, Plutus handles the complexity behind the scenes. No coding, no configuration wizards, no learning curve.',
  },
  {
    q: 'What\'s the difference between Plutus Cloud and Plutus Local?',
    a: 'Plutus Cloud is the hosted version — sign in from any browser and start working instantly. It includes team workspaces, persistent memory, all integrations, and voice mode. Plutus Local is the open-source desktop agent that runs entirely on your machine for maximum privacy. You can even connect both via Bridge: your cloud agent dispatches tasks to your local machine when needed.',
  },
  {
    q: 'Is my data safe?',
    a: 'In Cloud mode, your data is encrypted at rest, isolated per user via Clerk authentication, and never shared with other users or used for training. In Local mode, nothing ever leaves your machine — period. You choose the privacy level that fits your workflow.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plutus Cloud offers a free tier to get started. Paid plans unlock more workers, memory, and integrations. Plutus Local is 100% free and open-source forever. In both modes, you bring your own AI model key (OpenAI, Claude, Gemini) or use a free local model via Ollama.',
  },
  {
    q: 'What can Plutus actually do?',
    a: 'Research topics across the web, draft and send emails, manage files and folders, browse websites autonomously, write and edit code, create documents and spreadsheets, schedule calendar events, monitor GitHub repos, post to Discord/Telegram, organize your Google Drive, run shell commands, and much more. If you can do it on a computer, Plutus can probably do it for you.',
  },
  {
    q: 'Can my team use Plutus together?',
    a: 'Yes. Plutus Cloud supports full team workspaces — create an organization, invite members, assign roles, and share context. Organization-wide memory means your team\'s AI agent knows your company\'s processes, preferences, and history. Teams within orgs let you scope access and context further.',
  },
  {
    q: 'Which AI models does Plutus support?',
    a: 'Plutus works with OpenAI (GPT-4, GPT-4o), Anthropic (Claude 3.5, Claude 4), Google (Gemini), DeepSeek, and any model you can run locally via Ollama. You can switch models anytime or let Plutus route to the best model per task automatically.',
  },
  {
    q: 'What integrations are available?',
    a: 'Gmail, Discord, Telegram, WhatsApp, GitHub, Google Calendar, Google Drive, Vercel, Netlify, and custom API connectors. More are added regularly. Each connector lets Plutus act inside that service — not just read from it, but send messages, create issues, schedule events, and deploy code.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{
      padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)',
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
          padding: 'clamp(14px, 3vw, 18px) clamp(14px, 3vw, 20px)',
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
              padding: '0 clamp(14px, 3vw, 20px) 18px',
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
