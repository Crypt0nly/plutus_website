import { motion } from 'framer-motion'

const links = [
  { label: 'GitHub', href: 'https://github.com/Crypt0nly/plutus_website', external: true },
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Install', href: '#install' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '40px 24px',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28,
            borderRadius: 7,
            background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: 'white', fontFamily: 'serif',
          }}>₱</div>
          <span style={{ fontWeight: 700, color: '#94a3b8', fontSize: 15 }}>Plutus</span>
          <span style={{ color: '#334155', fontSize: 13, marginLeft: 8 }}>MIT License</span>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              style={{
                color: '#475569',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#a855f7'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >
              {l.label}
            </a>
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
