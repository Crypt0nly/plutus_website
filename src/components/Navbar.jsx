import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IconMenu2, IconX } from '@tabler/icons-react'

const CLOUD_URL = 'https://app.useplutus.ai'

const links = [
  { label: 'How it works', to: '/platform' },
  { label: 'Use cases', to: '/solutions' },
  { label: 'Enterprise', to: '/enterprise' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Learn', to: '/resources' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={scrolled || menuOpen ? 'site-nav scrolled' : 'site-nav'}>
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <img src="/logo.svg" alt="Plutus" />
          <span>Plutus</span>
        </Link>

        <nav className="nav-links desktop-nav" aria-label="Primary navigation">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'active' : undefined}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions desktop-nav">
          <Link to="/solutions" className="nav-secondary">See examples</Link>
          <a href={CLOUD_URL} className="nav-primary">Start free</a>
        </div>

        <button className="mobile-menu-btn" aria-label="Toggle navigation menu" onClick={() => setMenuOpen(value => !value)}>
          {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {links.map(link => (
              <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : undefined}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-actions">
            <a href={CLOUD_URL} className="btn btn-primary" onClick={() => setMenuOpen(false)}>Start free</a>
            <Link to="/solutions" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>See examples</Link>
          </div>
        </div>
      )}
    </header>
  )
}
