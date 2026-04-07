import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const sections = [
  {
    title: '1. Overview',
    content: `Plutus is a free, open-source AI desktop automation tool built by Felix Graef and released under the MIT License. This Privacy Policy explains how Plutus handles information when you use the application or visit this website. Because Plutus runs locally on your machine, your data never leaves your device by default.`,
  },
  {
    title: '2. Information We Collect',
    content: `Plutus itself collects no personal information. The application runs entirely on your local machine and does not transmit usage data, telemetry, or personal identifiers to any remote server operated by this project.\n\nThis website (plutus-website) may collect standard web server logs (IP address, browser type, referring URL, pages visited, timestamp) solely for operational and security purposes. No tracking pixels, advertising networks, or cross-site identifiers are used.`,
  },
  {
    title: '3. How the Application Uses Data',
    content: `When you use Plutus to automate desktop tasks, the application may process screen content, keystrokes, file paths, and application state locally on your device in order to execute automation workflows. This data is processed in memory and is not stored permanently unless you explicitly save a workflow or log file to disk yourself.\n\nAny integration with third-party AI providers (such as OpenAI or Anthropic APIs) is configured and initiated solely by you. API keys and request payloads are transmitted directly from your machine to the chosen provider under that provider's privacy policy — Felix Graef and the Plutus project have no access to this data.`,
  },
  {
    title: '4. Third-Party Services',
    content: `Plutus may optionally connect to external AI APIs (e.g., OpenAI, Anthropic, Ollama) as configured by you. Each of these services has its own privacy policy and data-handling practices. We encourage you to review the policies of any third-party service you choose to integrate.\n\nThis website is hosted on third-party infrastructure. Standard hosting provider logs may apply.`,
  },
  {
    title: '5. Open-Source Transparency',
    content: `Plutus is fully open source under the MIT License. The complete source code is publicly available on GitHub at github.com/Crypt0nly/plutus. You are welcome to inspect, audit, fork, and modify the code at any time. This transparency is our strongest privacy guarantee.`,
  },
  {
    title: '6. Data Retention',
    content: `Because Plutus operates locally, any retention of data is entirely within your control. Workflow files, logs, or automation scripts stored on disk can be deleted by you at any time. Felix Graef and the Plutus project retain no copies of your local data.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `Plutus is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information through this website, please contact us so we can take appropriate action.`,
  },
  {
    title: '8. Security',
    content: `We take reasonable precautions to protect this website from unauthorized access. However, no method of transmission over the internet is 100% secure. For the application itself, security is a shared responsibility — keep your operating system, dependencies, and API keys secure.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated effective date. Continued use of Plutus or this website after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: '10. Contact',
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
              <strong style={{ color: '#a855f7' }}>Short version:</strong> Plutus runs entirely on your device. We do not collect, store, or sell your personal data. The source code is fully open and auditable on GitHub.
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
