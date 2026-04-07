import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By downloading, installing, or using Plutus ("the Software"), or by accessing this website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Software or this website.\n\nThese Terms apply to all users of Plutus, regardless of how the software is obtained (directly from GitHub, a package manager, or any other distribution channel).`,
  },
  {
    title: '2. Description of the Software',
    content: `Plutus is an open-source AI-powered desktop automation tool that allows users to automate repetitive tasks on their computer using natural language instructions. The Software is developed and maintained by Felix Graef as a personal open-source project.\n\nPlutus is provided free of charge and is not a commercial SaaS product. There are no paid tiers, subscriptions, or service-level agreements unless explicitly stated otherwise.`,
  },
  {
    title: '3. Open-Source License',
    content: `Plutus is released under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the conditions of the MIT License included with the source code.\n\nThe full MIT License text is available in the LICENSE file at github.com/Crypt0nly/plutus. Nothing in these Terms of Service limits or overrides the rights granted to you under the MIT License.`,
  },
  {
    title: '4. Permitted Use',
    content: `You may use Plutus for any lawful purpose, including personal productivity, professional automation workflows, research, and education. You may integrate Plutus with third-party AI APIs and services as permitted by their respective terms of service.\n\nYou may modify, fork, and redistribute Plutus in accordance with the MIT License.`,
  },
  {
    title: '5. Prohibited Use',
    content: `You agree not to use Plutus to:\n\n• Violate any applicable law or regulation, including privacy laws and computer fraud statutes;\n• Automate unauthorized access to systems, accounts, or data you do not own or have explicit permission to access;\n• Engage in phishing, fraud, spamming, or any form of malicious automation;\n• Circumvent security measures on systems, websites, or applications;\n• Harass, stalk, or harm any individual;\n• Generate or distribute content that is illegal, defamatory, or violates intellectual property rights;\n• Use the Software in any manner that could damage, disable, or impair systems you do not own.`,
  },
  {
    title: '6. Third-Party AI Services',
    content: `Plutus may be configured to interact with third-party AI APIs (such as OpenAI, Anthropic, Google, or locally hosted models). Your use of such services is governed by their respective terms of service and privacy policies. Felix Graef is not responsible for the content, availability, or practices of any third-party service.\n\nYou are solely responsible for obtaining and securing any API keys or credentials required to use third-party services with Plutus.`,
  },
  {
    title: '7. Disclaimer of Warranties',
    content: `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.\n\nFelix Graef does not warrant that the Software will be error-free, uninterrupted, or free of security vulnerabilities. Automation tools interact with your operating system and applications — you assume full responsibility for any effects arising from running automated workflows on your machine.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FELIX GRAEF OR ANY CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, BUSINESS INTERRUPTION, OR PERSONAL INJURY) ARISING FROM YOUR USE OF OR INABILITY TO USE THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.\n\nFELIX GRAEF'S TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER SHALL NOT EXCEED ZERO DOLLARS ($0), AS THE SOFTWARE IS PROVIDED FREE OF CHARGE.`,
  },
  {
    title: '9. Indemnification',
    content: `You agree to indemnify, defend, and hold harmless Felix Graef and any contributors from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your use of Plutus, your violation of these Terms, or your violation of any applicable law or the rights of any third party.`,
  },
  {
    title: '10. Intellectual Property',
    content: `The Plutus name, logo, and associated branding are the intellectual property of Felix Graef. The Software's source code is licensed under the MIT License as described in Section 3. Nothing in these Terms grants you the right to use the Plutus name or logo in a way that implies endorsement of a derivative product without prior written consent.`,
  },
  {
    title: '11. Changes to the Software and Terms',
    content: `Felix Graef reserves the right to modify or discontinue the Software at any time without notice. These Terms may be updated periodically; the effective date at the top of this page will reflect the most recent revision. Continued use of the Software after changes to these Terms constitutes acceptance of the revised Terms.`,
  },
  {
    title: '12. Governing Law',
    content: `These Terms are governed by and construed in accordance with the laws of Germany, without regard to its conflict-of-law provisions. Any disputes arising from these Terms or your use of Plutus shall be subject to the exclusive jurisdiction of the courts located in Germany.`,
  },
  {
    title: '13. Contact',
    content: `Questions about these Terms of Service should be directed to Felix Graef via the GitHub repository at github.com/Crypt0nly/plutus. Please open an issue or discussion thread for general inquiries.`,
  },
]

export default function TermsOfService() {
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
              Terms of Service
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
              <strong style={{ color: '#a855f7' }}>Short version:</strong> Plutus is free, open-source software under the MIT License. Use it responsibly and lawfully. It is provided without warranty — you accept it as-is. Felix Graef is not liable for any damages arising from your use of the software.
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
                  whiteSpace: para.startsWith('•') ? 'pre-line' : undefined,
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
              to="/privacy"
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
              ← Privacy Policy
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
