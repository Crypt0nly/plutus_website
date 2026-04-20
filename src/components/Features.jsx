import { motion } from 'framer-motion'
import {
  IconKey,
  IconBrandOpenSource,
  IconCpu,
  IconRocket,
  IconBrain,
  IconDevices,
} from '@tabler/icons-react'

const features = [
  {
    icon: <IconRocket size={24} />,
    title: 'Start Instantly in Cloud',
    description:
      'Open a browser, sign in, and start using Plutus immediately. Cloud is the fastest path from curiosity to a working AI workflow.',
    color: '#a855f7',
  },
  {
    icon: <IconDevices size={24} />,
    title: 'Run Local When You Need Control',
    description:
      'Prefer to keep Plutus on your own machine? The local edition stays available for Windows, macOS, and Linux with a lightweight setup flow.',
    color: '#06b6d4',
  },
  {
    icon: <IconCpu size={24} />,
    title: 'Bring Your Own AI',
    description:
      'Use Plutus with ChatGPT, Claude, Gemini, or other models. Plutus is the execution layer that turns model output into completed work.',
    color: '#f59e0b',
  },
  {
    icon: <IconBrain size={24} />,
    title: 'Actions, Not Empty Answers',
    description:
      'Plutus researches, writes, organizes, routes, and delivers results. It is designed to finish tasks, not just continue conversations.',
    color: '#22c55e',
  },
  {
    icon: <IconKey size={24} />,
    title: 'Secure by Design',
    description:
      'Choose the hosted convenience of cloud or the tighter control of local. Either way, the product is built around practical operational trust.',
    color: '#ec4899',
  },
  {
    icon: <IconBrandOpenSource size={24} />,
    title: 'Open-Source Local Foundation',
    description:
      'Plutus Local remains open source and free forever, giving developers and privacy-first users a transparent version they can inspect and run themselves.',
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
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#8b5cf6',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            Why Plutus
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            A real execution layer for{' '}
            <span className="gradient-text">modern AI work.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#55556a', maxWidth: 640, margin: '0 auto' }}>
            Plutus gives you one product with two deployment paths: hosted speed in the cloud, or
            local control on your own machine.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 20,
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{
                y: -6,
                borderColor: `${feature.color}33`,
                boxShadow: `0 0 40px ${feature.color}15`,
              }}
              style={{
                padding: 'clamp(22px, 4vw, 32px)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 18,
                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: `${feature.color}12`,
                  border: `1px solid ${feature.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  marginBottom: 20,
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: '#f0f0f0',
                  letterSpacing: '-0.3px',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: '#8a8a9a',
                  lineHeight: 1.75,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
