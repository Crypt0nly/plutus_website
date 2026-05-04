import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const sections = [
  {
    title: '1. Overview',
    content: `Plutus is an AI execution agent available in two modes: Plutus Cloud (a hosted web application at app.useplutus.ai) and Plutus Local (an open-source desktop agent). This Privacy Policy explains how each mode handles your information. Your privacy model depends on which mode you use.`,
  },
  {
    title: '2. Plutus Cloud — Data We Collect',
    content: `When you use Plutus Cloud, we collect and store the following to provide the service:\n\n• Account information (email, name) via Clerk authentication\n• Conversation history and messages\n• Agent memory (facts, preferences, context you provide)\n• Skills and scheduled tasks you create\n• Connector configurations (e.g., which integrations you enable)\n• Organization and team membership data\n\nThis data is stored in encrypted PostgreSQL databases with per-user isolation. Your data is never shared with other users, used for AI model training, or sold to third parties.`,
  },
  {
    title: '3. Plutus Local — Data Handling',
    content: `When you use Plutus Local, all data remains on your machine. Conversations, memory, skills, and files are stored in a local SQLite database. Nothing is transmitted to our servers unless you explicitly enable Cloud Sync via the Bridge feature.\n\nIf you enable Bridge connectivity, only the data you choose to sync (memory, skills, tasks) is transmitted to Plutus Cloud servers over encrypted WebSocket connections.`,
  },
  {
    title: '4. Third-Party AI Providers',
    content: `Both modes connect to third-party AI APIs (OpenAI, Anthropic, Google, etc.) as configured by you. Your prompts and conversations are sent directly to these providers under their respective privacy policies. In Cloud mode, API calls are made from our servers. In Local mode, API calls are made directly from your machine.\n\nWe encourage you to review the privacy policies of any AI provider you choose to use.`,
  },
  {
    title: '5. Integrations and Connectors',
    content: `When you connect third-party services (Gmail, Discord, GitHub, etc.), Plutus accesses those services on your behalf using OAuth tokens or API keys you provide. We store these credentials securely and use them only to execute tasks you request. You can revoke access at any time from your connector settings.`,
  },
  {
    title: '6. Open-Source Transparency',
    content: `Plutus Local is fully open source under the AGPL-3.0 License. The source code is publicly available on GitHub at github.com/Crypt0nly/plutus. You are welcome to inspect, audit, fork, and modify the code at any time.`,
  },
  {
    title: '7. Data Retention and Deletion',
    content: `In Cloud mode, your data is retained as long as your account is active. You can delete conversations, memories, and skills at any time from the dashboard. Account deletion removes all associated data.\n\nIn Local mode, data retention is entirely within your control. Delete your local database files at any time.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `Plutus is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information, please contact us so we can take appropriate action.`,
  },
  {
    title: '9. Security',
    content: `Plutus Cloud uses industry-standard security measures including encrypted data at rest, TLS for data in transit, per-user data isolation via Clerk authentication, and regular security reviews. However, no method of transmission over the internet is 100% secure.\n\nFor Plutus Local, security is a shared responsibility — keep your operating system, dependencies, and API keys secure.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated effective date. Continued use of Plutus or this website after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: '11. Contact',
    content: `If you have questions about this Privacy Policy, please open an issue on the GitHub repository at github.com/Crypt0nly/plutus or contact Felix Graef directly through GitHub.`,
  },
]

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', background: '#050507', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(168,85,247,0.06) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px) clamp(32px, 6vw, 56px)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              color: '#a855f7',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              Legal
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 800,
              margin: '0 0 16px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Privacy Policy
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 2vw, 16px)', margin: 0 }}>
              Effective date: April 7, 2026 &nbsp;·&nbsp; Plutus by Felix Graef
            </p>
          </div>
        </div>

        {/* Back link */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(20px, 4vw, 32px) clamp(16px, 5vw, 40px) 0' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#a855f7',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: 'clamp(24px, 5vw, 40px) clamp(16px, 5vw, 40px) clamp(48px, 10vw, 80px)',
        }}>
          {/* Intro callout */}
          <div style={{
            padding: 'clamp(16px, 3vw, 24px)',
            background: 'rgba(168,85,247,0.06)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: 12,
            marginBottom: 40,
          }}>
            <p style={{ margin: 0, color: '#c084fc', fontSize: 15, lineHeight: 1.7 }}>
              <strong style={{ color: '#a855f7' }}>Short version:</strong> Plutus Cloud stores your data securely with per-user encryption and never shares it. Plutus Local keeps everything on your device. In both modes, your data is never sold or used for AI training. The local edition is fully open-source and auditable on GitHub.
            </p>
          </div>

          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                fontWeight: 700,
                color: '#e2e8f0',
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}>
                {s.title}
              </h2>
              {s.content.split('\n\n').map((para, j) => (
                <p key={j} style={{
                  color: '#94a3b8',
                  fontSize: 'clamp(14px, 1.8vw, 15px)',
                  lineHeight: 1.75,
                  margin: j < s.content.split('\n\n').length - 1 ? '0 0 14px' : 0,
                }}>
                  {para}
                </p>
              ))}
              {i < sections.length - 1 && (
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginTop: 36 }} />
              )}
            </div>
          ))}

          {/* Bottom nav */}
          <div style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: '#a855f7',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to home
            </Link>
            <Link
              to="/terms"
              style={{
                color: '#475569',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              Terms of Service →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
