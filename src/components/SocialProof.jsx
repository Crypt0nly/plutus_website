import { motion } from 'framer-motion'

const stats = [
  { value: '3', label: 'Platforms', icon: '💻' },
  { value: 'MIT', label: 'License', icon: '📜' },
  { value: '100%', label: 'Private', icon: '🔒' },
]

const providers = [
  { name: 'Anthropic', color: '#d97706' },
  { name: 'OpenAI', color: '#22c55e' },
  { name: 'Ollama', color: '#06b6d4' },
  { name: 'Gemini', color: '#a855f7' },
]

export default function SocialProof() {
  return (
    <section style={{
      padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Stats row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '16px 40px',
          marginBottom: 32,
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: 13, color: '#475569', marginBottom: 2 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.5px' }}>{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Provider logos */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#334155', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>
            Agent powered by the best AI models
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {providers.map((p, i) => (
              <motion.span
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: `rgba(${p.color === '#d97706' ? '217,119,6' : p.color === '#22c55e' ? '34,197,94' : p.color === '#06b6d4' ? '6,182,212' : '168,85,247'},0.08)`,
                  border: `1px solid ${p.color}22`,
                  color: p.color,
                  padding: '5px 14px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                }}
              >
                {p.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
