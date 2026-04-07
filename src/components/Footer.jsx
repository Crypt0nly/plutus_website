import { Link } from 'react-router-dom'

const externalLinks = [
  { label: 'GitHub', href: 'https://github.com/Crypt0nly/plutus' },
]

const anchorLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Install', href: '#install' },
  { label: 'FAQ', href: '#faq' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

const linkStyle = {
  color: '#475569',
  textDecoration: 'none',
  fontSize: 13,
  fontWeight: 500,
  transition: 'color 0.2s',
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'clamp(12px, 3vw, 20px)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.svg" alt="Plutus" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, color: '#94a3b8', fontSize: 15 }}>Plutus</span>
          <span style={{ color: '#334155', fontSize: 13, marginLeft: 8 }}>AGPL-3.0 License</span>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {externalLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#a855f7'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >
              {l.label}
            </a>
          ))}
          {anchorLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#a855f7'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >
              {l.label}
            </a>
          ))}
          <span style={{ color: '#1e293b', fontSize: 13 }}>·</span>
          {legalLinks.map(l => (
            <Link
              key={l.label}
              to={l.to}
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div style={{ fontSize: 12, color: '#334155' }}>
          © {new Date().getFullYear()} Plutus · Built with ❤️ by Felix Graef
        </div>
      </div>
    </footer>
  )
}
