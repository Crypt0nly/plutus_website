import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  {
    id: 'mac',
    label: '🍎 macOS',
    steps: [
      { cmd: 'curl -fsSL https://www.useplutus.ai/install.sh | bash', desc: 'Download & install Plutus' },
      { cmd: 'plutus config set ANTHROPIC_API_KEY sk-ant-...', desc: 'Set your API key' },
      { cmd: 'plutus start', desc: 'Launch the agent' },
    ]
  },
  {
    id: 'linux',
    label: '🐧 Linux',
    steps: [
      { cmd: 'curl -fsSL https://www.useplutus.ai/install.sh | bash', desc: 'Download & install Plutus' },
      { cmd: 'export ANTHROPIC_API_KEY=sk-ant-...', desc: 'Set your API key' },
      { cmd: 'plutus start', desc: 'Launch the agent' },
    ]
  },
  {
    id: 'windows',
    label: '🪟 Windows',
    steps: [
      { cmd: 'iwr https://www.useplutus.ai/install.ps1 | iex', desc: 'Download & install Plutus (PowerShell)' },
      { cmd: '$env:ANTHROPIC_API_KEY = "sk-ant-..."', desc: 'Set your API key' },
      { cmd: 'plutus start', desc: 'Launch the agent' },
    ]
  },
]

export default function Install() {
  const [active, setActive] = useState('mac')
  const [copied, setCopied] = useState(null)

  const copyCmd = (cmd, idx) => {
    navigator.clipboard.writeText(cmd)
    setCopied(idx)
    setTimeout(() => setCopied(null), 1800)
  }

  const activeTab = tabs.find(t => t.id === active)

  return (
    <section id="install" style={{
      padding: '100px 24px',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 100,
            padding: '4px 14px',
            fontSize: 12,
            color: '#22c55e',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Quick Install
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            color: '#f8fafc',
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            Up and running{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in 60 seconds
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>
            Three commands. No Docker. No config files. No nonsense.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'rgba(8,8,14,0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Title bar */}
          <div style={{
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />

            {/* OS tabs */}
            <div style={{ marginLeft: 16, display: 'flex', gap: 4 }}>
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  style={{
                    background: active === t.id ? 'rgba(168,85,247,0.2)' : 'transparent',
                    border: active === t.id ? '1px solid rgba(168,85,247,0.35)' : '1px solid transparent',
                    color: active === t.id ? '#c084fc' : '#475569',
                    padding: '3px 10px',
                    borderRadius: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Commands */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ padding: '24px 20px' }}
            >
              {activeTab.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    marginBottom: i < activeTab.steps.length - 1 ? 20 : 0,
                  }}
                >
                  <div style={{
                    fontSize: 11,
                    color: '#334155',
                    marginBottom: 6,
                    fontFamily: 'JetBrains Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    # Step {i + 1} — {step.desc}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8,
                    padding: '10px 14px',
                  }}>
                    <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, flexShrink: 0 }}>$</span>
                    <code style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 13,
                      color: '#e2e8f0',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {step.cmd}
                    </code>
                    <button
                      onClick={() => copyCmd(step.cmd, i)}
                      style={{
                        background: copied === i ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                        border: copied === i ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        color: copied === i ? '#22c55e' : '#475569',
                        padding: '4px 10px',
                        borderRadius: 5,
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        flexShrink: 0,
                      }}
                    >
                      {copied === i ? '✓' : 'Copy'}
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Done message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: 20,
                  padding: '12px 16px',
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.15)',
                  borderRadius: 8,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  color: '#22c55e',
                }}
              >
                🎉 Plutus is running at http://localhost:3000
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#334155' }}
        >
          Requires Python 3.10+ · Works on macOS, Linux, and Windows (WSL) · No Docker required
        </motion.p>
      </div>
    </section>
  )
}
