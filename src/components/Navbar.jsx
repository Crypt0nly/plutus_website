import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Install', href: '#install' },
  { label: 'FAQ', href: '#faq' },
]

const styles = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    background: 'rgba(5,5,7,0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: 'white',
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: '-0.5px',
  },
  logoIcon: {
    width: 32, height: 32,
    borderRadius: 8,
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 800,
    color: 'white',
    fontFamily: 'serif',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    listStyle: 'none',
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  cta: {
    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 0.2s, transform 0.2s',
    display: 'inline-block',
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={styles.inner}>
        {/* Logo */}
        <a href="#" style={styles.logo}>
          <div style={styles.logoIcon}>₱</div>
          <span>Plutus</span>
        </a>

        {/* Desktop links */}
        <ul style={{ ...styles.links, display: 'flex' }} className="desktop-nav">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                style={styles.link}
                onMouseEnter={e => e.target.style.color = '#a855f7'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://github.com/Crypt0nly/plutus_website"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.cta}
          onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }}
        >
          GitHub ↗
        </a>
      </div>
    </motion.nav>
  )
}
