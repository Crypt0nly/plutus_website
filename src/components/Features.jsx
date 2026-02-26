import { motion } from 'framer-motion'
import {
  IconKey, IconBrandOpenSource, IconCpu, IconRocket,
  IconBrain, IconDevices
} from '@tabler/icons-react'

const features = [
  {
    icon: <IconKey size={24} />,
    title: 'BYOK — Your Keys, Your Machine',
    description: 'API keys never leave your device. No cloud middleman. No data harvesting. Complete privacy by design.',
    color: '#8b5cf6',
  },
  {
    icon: <IconBrandOpenSource size={24} />,
    title: 'Open Source (MIT)',
    description: 'Fully transparent, auditable code. Fork it, modify it, self-host it. No vendor lock-in, ever.',
    color: '#22d3ee',
  },
  {
    icon: <IconCpu size={24} />,
    title: 'Any LLM Provider',
    description: 'Works with Anthropic Claude, OpenAI GPT, or Ollama for fully local, free inference. Your choice.',
    color: '#f59e0b',
  },
  {
    icon: <IconRocket size={24} />,
    title: 'Parallel Execution',
    description: 'Subprocess orchestration with sandboxed workers. Spin up parallel tasks that execute simultaneously.',
    color: '#22c55e',
  },
  {
    icon: <IconBrain size={24} />,
    title: 'Self-Improving',
    description: 'Creates new tools at runtime. The more you use it, the more capable it becomes. It literally gets smarter.',
    color: '#ec4899',
  },
  {
    icon: <IconDevices size={24} />,
    title: 'Every Platform',
    description: 'Windows, macOS, Linux. One install command. Works everywhere your terminal does.',
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
            Everything you need.{' '}
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#55556a', maxWidth: 500, margin: '0 auto' }}>
            Built for developers who want power without compromise.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                padding: 32,
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
