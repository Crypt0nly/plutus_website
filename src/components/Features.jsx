import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚡',
    title: 'Subprocess Orchestration',
    desc: 'Spawn multiple parallel worker agents that execute tasks simultaneously. Plutus coordinates them like a conductor — you just describe the goal.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    icon: '🔧',
    title: 'Dynamic Tool Creation',
    desc: 'Plutus writes and registers new Python tools at runtime. If it can\'t do something, it builds the tool to do it — automatically.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    icon: '🛡️',
    title: '4-Tier Guardrails',
    desc: 'Sandboxed execution with layered safety checks. Your system is protected while the agent works autonomously across files, terminals, and browsers.',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.15)',
  },
  {
    icon: '🔑',
    title: 'Bring Your Own Keys',
    desc: 'Your API keys stay on your machine, stored locally with chmod 600 permissions. Zero telemetry, zero data leaving your system.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    icon: '🧠',
    title: 'Built-in Planner',
    desc: 'Persistent memory and step-by-step planning across sessions. Plutus remembers context, tracks goals, and picks up exactly where it left off.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.15)',
  },
  {
    icon: '🖥️',
    title: 'Web UI + Terminal',
    desc: 'A beautiful React dashboard for visual control, plus full terminal access for power users. One agent, two interfaces, infinite possibilities.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Features() {
  return (
    <section id="features" style={{
      padding: '100px 24px',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: 100,
            padding: '4px 14px',
            fontSize: 12,
            color: '#a855f7',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Features
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            color: '#f8fafc',
            marginBottom: 16,
            lineHeight: 1.1,
          }}>
            Not just a chatbot.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              A full agent runtime.
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Plutus doesn't just answer questions — it takes action, writes code, browses the web, and builds its own tools.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, desc, color, glow }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '28px 28px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      whileHover={{
        boxShadow: `0 8px 40px ${glow}, 0 0 0 1px ${color}22`,
        borderColor: `${color}44`,
      }}
    >
      {/* Background glow on hover */}
      <div style={{
        position: 'absolute',
        top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: '50%',
        background: glow,
        filter: 'blur(40px)',
        opacity: 0.5,
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 44, height: 44,
        borderRadius: 10,
        background: `${color}15`,
        border: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
        marginBottom: 16,
      }}>
        {icon}
      </div>

      <h3 style={{
        fontSize: 17,
        fontWeight: 700,
        color: '#f1f5f9',
        marginBottom: 10,
        letterSpacing: '-0.3px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 14,
        color: '#64748b',
        lineHeight: 1.65,
      }}>
        {desc}
      </p>
    </motion.div>
  )
}
