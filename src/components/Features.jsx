import { motion } from 'framer-motion'
import {
  IconKey, IconBrandOpenSource, IconCpu, IconRocket,
  IconBrain, IconDevices
} from '@tabler/icons-react'

const features = [
  {
    icon: <IconKey size={24} />,
    title: '100% Private',
    description: 'Your data never leaves your computer. Every action Plutus takes happens locally — no cloud uploads, no tracking, no data harvesting. Full autonomy, full privacy.',
    color: '#8b5cf6',
  },
  {
    icon: <IconBrandOpenSource size={24} />,
    title: 'Free & Open Source',
    description: 'Completely free to use, forever. Built in the open with an MIT license so anyone can inspect, trust, and extend its capabilities.',
    color: '#22d3ee',
  },
  {
    icon: <IconCpu size={24} />,
    title: 'Choose Your AI Brain',
    description: 'Plug in Claude, ChatGPT, Gemini, or run models locally for free with Ollama. The AI model is the brain — Plutus is the hands that do the work.',
    color: '#f59e0b',
  },
  {
    icon: <IconRocket size={24} />,
    title: 'Works in Parallel',
    description: 'Give it multiple tasks and watch them execute simultaneously. Plutus spins up parallel workers that tackle different parts of your request at the same time — like having a team of agents.',
    color: '#22c55e',
  },
  {
    icon: <IconBrain size={24} />,
    title: 'Gets Smarter Over Time',
    description: 'Plutus autonomously creates new tools and skills when it encounters something it can\'t handle yet. It adapts, learns, and becomes a more capable agent the more you use it.',
    color: '#ec4899',
  },
  {
    icon: <IconDevices size={24} />,
    title: 'Works on Any Computer',
    description: 'Windows, macOS, or Linux — one simple install. Plutus runs locally on your machine and takes action across your entire system.',
    color: '#8b5cf6',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#8b5cf6',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12,
          }}>
            Features
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}>
            An agent that acts.{' '}
            <span className="gradient-text">Not a chatbot.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#55556a', maxWidth: 500, margin: '0 auto' }}>
            Plutus doesn't just respond — it takes control, executes tasks, and delivers results.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 20,
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -6,
                borderColor: `${f.color}33`,
                boxShadow: `0 0 40px ${f.color}15`,
              }}
              style={{
                padding: 'clamp(20px, 4vw, 32px)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${f.color}12`,
                border: `1px solid ${f.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: f.color,
                marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 8,
                color: '#f0f0f0',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: '#8a8a9a',
                lineHeight: 1.7,
              }}>
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
