import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', to: '/platform' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Enterprise', to: '/enterprise' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resources', to: '/resources' },
      { label: 'Plutus Local', href: 'https://github.com/Crypt0nly/plutus' },
      { label: 'Plutus Cloud', href: 'https://github.com/Crypt0nly/plutus-cloud' },
      { label: 'Launch Cloud', href: 'https://app.useplutus.ai' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

function FooterLink({ link }) {
  if (link.href) {
    return <a href={link.href}>{link.label}</a>
  }
  return <Link to={link.to}>{link.label}</Link>
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand footer-logo">
            <img src="/logo.svg" alt="Plutus" />
            <span>Plutus</span>
          </Link>
          <p>The enterprise AI agent platform for cloud workspaces, local computer control, memory, connectors, workflows, and governed execution.</p>
          <span className="license">AGPL-3.0 local agent · Hosted cloud platform</span>
        </div>

        <div className="footer-columns">
          {columns.map(column => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(link => <FooterLink key={link.label} link={link} />)}
            </nav>
          ))}
        </div>
      </div>
      <div className="section-container footer-bottom">
        <span>© {new Date().getFullYear()} Plutus. Built by Felix Graef.</span>
        <span>Designed for operators who need AI to finish the job.</span>
      </div>
    </footer>
  )
}
