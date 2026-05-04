import { motion } from 'framer-motion'
import {
  IconRocket,
  IconBrain,
  IconUsers,
  IconPlugConnected,
  IconMicrophone,
  IconArrowsExchange,
} from '@tabler/icons-react'

const features = [
  {
    icon: <IconRocket size={24} />,
    title: 'Executes, Not Just Answers',
    description:
      'Plutus doesn\'t just tell you how to do something — it does it. Research, write documents, send emails, organize files, browse the web, and manage your calendar. End-to-end task completion.',
    color: '#a855f7',
  },
  {
    icon: <IconBrain size={24} />,
    title: 'Persistent Memory & Skills',
    description:
      'Plutus remembers everything — your preferences, past conversations, and context. It builds reusable skills over time, getting smarter and faster the more you use it.',
    color: '#06b6d4',
  },
  {
    icon: <IconUsers size={24} />,
    title: 'Team Workspaces',
    description:
      'Create organizations, build teams, and share context. Org-wide memory, team intelligence, and role-based access let your whole team delegate to the same AI agent.',
    color: '#22c55e',
  },
  {
    icon: <IconPlugConnected size={24} />,
    title: '12+ Integrations',
    description:
      'Connect Gmail, Discord, Telegram, WhatsApp, GitHub, Google Calendar, Google Drive, Vercel, and more. Plutus works inside your existing tools — not alongside them.',
    color: '#f59e0b',
  },
  {
    icon: <IconMicrophone size={24} />,
    title: 'Voice Mode',
    description:
      'Talk to Plutus and it talks back — while executing tools in real time. Hands-free task delegation with the same full execution power as text mode.',
    color: '#ec4899',
  },
  {
    icon: <IconArrowsExchange size={24} />,
    title: 'Cloud + Local Bridge',
    description:
      'Run in the cloud for instant access, or locally for total privacy. The Bridge connects both: your cloud agent can execute tasks on your local machine when needed.',
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
            Capabilities
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            An AI that works{' '}
            <span className="gradient-text">as hard as you do.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#55556a', maxWidth: 640, margin: '0 auto' }}>
            Other tools give you answers. Plutus gives you results. It connects to your stack,
            remembers your context, and finishes the job.
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
