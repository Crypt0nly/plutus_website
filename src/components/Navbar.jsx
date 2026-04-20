import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const CLOUD_URL = 'https://app.useplutus.ai/?tab=chat'
const GITHUB_URL = 'https://github.com/Crypt0nly/plutus'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Cloud & Local', href: '#install' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Integrations', href: '#connectors' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          ...(scrolled || menuOpen
            ? {
                background: 'rgba(5,5,7,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }
            : {}),
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-0.5px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/logo.svg"
                alt="Plutus"
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
            </div>
            <span>Plutus</span>
          </Link>

          <ul
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              listStyle: 'none',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {links.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={event => {
                    event.target.style.color = '#e2e8f0'
                  }}
                  onMouseLeave={event => {
                    event.target.style.color = '#94a3b8'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={event => {
                event.target.style.background = 'rgba(255,255,255,0.05)'
                event.target.style.borderColor = 'rgba(255,255,255,0.16)'
              }}
              onMouseLeave={event => {
                event.target.style.background = 'rgba(255,255,255,0.02)'
                event.target.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              GitHub
            </a>
            <a
              href={CLOUD_URL}
              style={{
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s',
                display: 'inline-block',
                boxShadow: '0 8px 24px rgba(168,85,247,0.28)',
              }}
              onMouseEnter={event => {
                event.target.style.opacity = '0.9'
                event.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={event => {
                event.target.style.opacity = '1'
                event.target.style.transform = 'translateY(0)'
              }}
            >
              Start in Cloud
            </a>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(value => !value)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: '#e2e8f0',
              zIndex: 110,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(5,5,7,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 24,
            }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  fontSize: 22,
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: 12,
                  transition: 'background 0.2s',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={CLOUD_URL}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: links.length * 0.05, duration: 0.3 }}
              style={{
                marginTop: 16,
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 12px 30px rgba(168,85,247,0.25)',
              }}
            >
              Start in Cloud
            </motion.a>
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: links.length * 0.05 + 0.05, duration: 0.3 }}
              style={{
                color: '#cbd5e1',
                padding: '12px 24px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              View GitHub
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
