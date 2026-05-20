import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', to: '/platform' },
      { label: 'Use cases', to: '/solutions' },
      { label: 'Enterprise', to: '/enterprise' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Learn', to: '/resources' },
      { label: 'Local privacy option', href: 'https://github.com/Crypt0nly/plutus' },
      { label: 'Technical repositories', href: 'https://github.com/Crypt0nly/plutus-cloud' },
      { label: 'Start free in Cloud', href: 'https://app.useplutus.ai' },
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
          <p>Plutus is an AI work assistant that helps teams turn everyday requests into finished research, drafts, files, follow-ups, creative assets, and recurring routines.</p>
          <span className="license">Plain-language cloud workspace · Optional local privacy path</span>
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
        <span>Designed for teams that want AI to finish the busywork.</span>
      </div>
    </footer>
  )
}
