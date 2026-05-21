import { useEffect } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import {
  IconArrowRight,
  IconBrain,
  IconBrowserCheck,
  IconCalendarTime,
  IconCheck,
  IconClipboardCheck,
  IconCloud,
  IconCode,
  IconDatabase,
  IconDeviceDesktop,
  IconFileDescription,
  IconFiles,
  IconGitBranch,
  IconMail,
  IconMicrophone,
  IconPhoto,
  IconPlugConnected,
  IconRocket,
  IconRoute,
  IconShieldCheck,
  IconSparkles,
  IconTerminal2,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleField from './components/ParticleField'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

const cloudUrl = 'https://app.useplutus.ai'
const githubUrl = 'https://github.com/Crypt0nly/plutus'
const cloudRepoUrl = 'https://github.com/Crypt0nly/plutus-cloud'

const capabilityPillars = [
  {
    icon: IconSparkles,
    title: 'Finished work, not more instructions',
    text: 'Ask for an outcome in normal language and Plutus can research, write, organize, create, and follow through across your everyday tools.',
  },
  {
    icon: IconBrain,
    title: 'Remembers how you work',
    text: 'Your preferences, contacts, past projects, reusable steps, and saved files stay available, so you do not have to explain everything again.',
  },
  {
    icon: IconPlugConnected,
    title: 'Works inside the tools you already use',
    text: 'Bring Plutus into email, calendars, chat, files, websites, business apps, and private computer tasks without forcing your team into a new workflow.',
  },
  {
    icon: IconShieldCheck,
    title: 'People stay in control',
    text: 'Approvals, team spaces, shared context, and clear activity trails help teams delegate confidently without giving up oversight.',
  },
]

const proofStats = [
  ['Start without setup', 'Open Plutus in a browser and describe the work in plain language.'],
  ['Handles busywork', 'Research, writing, email drafts, files, calendars, websites, and creative assets.'],
  ['Remembers context', 'Keep projects, preferences, contacts, and reusable routines in one workspace.'],
  ['Team ready', 'Invite people, share knowledge, review work, and keep control over what gets done.'],
]

const platformLayers = [
  {
    icon: IconCloud,
    title: 'Plutus Cloud',
    description: 'The easiest way to start: sign in from any browser, talk or type what you need, and let Plutus prepare work your team can use.',
  },
  {
    icon: IconDeviceDesktop,
    title: 'Local Bridge',
    description: 'When a task needs your private computer, Bridge lets Plutus complete approved work locally while you keep control of access.',
  },
  {
    icon: IconDatabase,
    title: 'Persistent context',
    description: 'Plutus keeps the important details from projects, people, files, and past conversations so each new request starts with context.',
  },
  {
    icon: IconRoute,
    title: 'Workflow engine',
    description: 'Turn repeated routines into guided workflows with reminders, handoffs, approvals, saved outputs, and clear status updates.',
  },
]

const toolGroups = [
  {
    title: 'Everyday office work',
    tools: ['Research summaries', 'Documents', 'Email drafts', 'Calendar help', 'File organization'],
  },
  {
    title: 'Business operations',
    tools: ['Website research', 'Report preparation', 'Data cleanup', 'Recurring checklists', 'Status updates'],
  },
  {
    title: 'Customer and team communication',
    tools: ['Inbox context', 'Follow-up drafts', 'Contact notes', 'Team chat', 'Connected apps'],
  },
  {
    title: 'Creative and technical support',
    tools: ['Image generation', 'Website assets', 'Code assistance', 'GitHub work', 'Reusable files'],
  },
]

const solutions = [
  {
    icon: IconUsers,
    title: 'Founders and managers',
    text: 'Turn vague ideas into finished briefs, plans, launch assets, competitor research, and follow-up drafts without coordinating five different tools.',
    outcomes: ['Project briefs and launch plans', 'Market and competitor summaries', 'Reusable team context'],
  },
  {
    icon: IconClipboardCheck,
    title: 'Operations and admin teams',
    text: 'Let Plutus handle repeatable checklists, reports, file cleanup, information gathering, and handoffs so people spend less time on manual coordination.',
    outcomes: ['Recurring reports and reminders', 'Organized files and records', 'Approval checkpoints'],
  },
  {
    icon: IconMail,
    title: 'Sales and customer teams',
    text: 'Keep track of customer context, draft thoughtful replies, prepare follow-ups, and summarize conversations before the next meeting or support handoff.',
    outcomes: ['Customer-aware email drafts', 'Follow-up reminders', 'Multi-channel context'],
  },
  {
    icon: IconBrowserCheck,
    title: 'Research, product, and engineering',
    text: 'From customer research to product specs and code tasks, Plutus can collect context, prepare documents, create assets, and support technical execution when needed.',
    outcomes: ['Research and decision memos', 'Product-ready documents', 'Optional code and GitHub support'],
  },
]

const connectorPlanets = [
  { name: 'Notion', logo: '/connectors/notion.svg', color: '#f8fafc', ring: 'inner' },
  { name: 'Stripe', logo: '/connectors/stripe.svg', color: '#635bff', ring: 'inner' },
  { name: 'Slack', logo: '/connectors/slack.svg', color: '#36c5f0', ring: 'inner' },
  { name: 'Gmail', logo: '/connectors/gmail.svg', color: '#ea4335', ring: 'middle' },
  { name: 'Calendar', logo: '/connectors/googlecalendar.svg', color: '#4285f4', ring: 'middle' },
  { name: 'Drive', logo: '/connectors/googledrive.svg', color: '#fbbc04', ring: 'middle' },
  { name: 'Jira', logo: '/connectors/jira.svg', color: '#2684ff', ring: 'outer' },
  { name: 'Shopify', logo: '/connectors/shopify.svg', color: '#7ab55c', ring: 'outer' },
  { name: 'HubSpot', logo: '/connectors/hubspot.svg', color: '#ff7a59', ring: 'outer' },
  { name: 'WhatsApp', logo: '/connectors/whatsapp.svg', color: '#25d366', ring: 'outer' },
]

const workflowStory = [
  {
    icon: IconMicrophone,
    kicker: 'A plain request',
    title: '“A customer payment failed. Save the account and tell the right team.”',
    text: 'Someone explains the outcome in everyday language. No workflow builder, no scripts, no technical setup.',
  },
  {
    icon: IconDatabase,
    kicker: 'Context gathered',
    title: 'Plutus checks Notion for account notes and Stripe for the billing issue.',
    text: 'It connects the dots between customer history, plan details, invoice status, open risks, and the account owner.',
  },
  {
    icon: IconBrain,
    kicker: 'Decision prepared',
    title: 'It turns scattered information into a clear next-step summary.',
    text: 'The team gets a plain-language explanation, recommended action, customer-ready reply, and approval checkpoint.',
  },
  {
    icon: IconMail,
    kicker: 'Team informed',
    title: 'The right people receive the handoff with everything they need.',
    text: 'Sales, finance, or support can review, send, update the workspace, and move the customer toward resolution.',
  },
]

const enterpriseControls = [
  ['Simple team access', 'Invite members, separate workspaces, manage organizations, and keep each team’s context organized.'],
  ['Human approval points', 'Choose what Plutus can do on its own, what needs review, and where sensitive work should run.'],
  ['Flexible privacy choices', 'Use the hosted workspace, keep sensitive tasks local, or combine both depending on how your business works.'],
  ['Fits existing systems', 'Connect common tools now and extend Plutus to the internal apps and processes your team depends on.'],
]

const pricingPlans = [
  {
    name: 'Starter',
    audience: 'For anyone who wants to remove repetitive work from their day.',
    price: 'Start free',
    cta: 'Start Free in Cloud',
    href: cloudUrl,
    features: ['Plain-language task delegation', 'Memory for your work', 'Core work tools', 'Local open-source option'],
  },
  {
    name: 'Pro',
    audience: 'For freelancers, founders, and teams running important recurring work.',
    price: 'Scale usage',
    cta: 'Start delegating',
    href: cloudUrl,
    highlighted: true,
    features: ['More connected tools', 'Voice mode', 'Scheduled routines', 'Saved workspace files', 'Cloud and local work'],
  },
  {
    name: 'Enterprise',
    audience: 'For organizations that need shared knowledge, approvals, and control.',
    price: 'Custom',
    cta: 'Talk to us',
    href: githubUrl,
    features: ['Team workspaces', 'Approvals and oversight', 'Custom connections', 'Deployment guidance', 'Priority roadmap alignment'],
  },
]

function PageShell({ children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="site-shell">
      <ParticleField />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><IconSparkles size={15} />{children}</div>
}

function CTAGroup({ compact = false }) {
  return (
    <div className={compact ? 'cta-row cta-row-compact' : 'cta-row'}>
      <a className="btn btn-primary" href={cloudUrl}>Start Free in Cloud <IconArrowRight size={18} /></a>
      <Link className="btn btn-secondary" to="/solutions">See what Plutus can do</Link>
    </div>
  )
}

function SectionHeader({ eyebrow, title, text, centered = false }) {
  return (
    <div className={centered ? 'section-heading centered' : 'section-heading'}>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}



function HeroOutcomeVisual() {
  return (
    <aside className="hero-command-center" aria-label="Example of Plutus preparing work across connected tools">
      <div className="command-ambient command-ambient-one" />
      <div className="command-ambient command-ambient-two" />

      <div className="command-topbar">
        <div className="command-window-dots" aria-hidden="true"><span /><span /><span /></div>
        <strong>Plutus</strong>
        <span>Live</span>
      </div>

      <div className="command-request-card">
        <span>Task</span>
        <p>Prepare the renewal follow-up.</p>
      </div>

      <div className="command-canvas" aria-hidden="true">
        <div className="command-flow-line flow-line-mail" />
        <div className="command-flow-line flow-line-files" />
        <div className="command-flow-line flow-line-team" />

        <div className="command-core-node">
          <div className="command-core-logo"><img src="/logo.svg" alt="" /></div>
          <span>Plutus</span>
          <strong>Working</strong>
        </div>

        <div className="command-tool-node tool-node-mail"><IconMail size={18} /><span>Draft</span></div>
        <div className="command-tool-node tool-node-files"><IconFiles size={18} /><span>Notes</span></div>
        <div className="command-tool-node tool-node-team"><IconUsers size={18} /><span>Notify</span></div>
      </div>

      <div className="command-approval-card">
        <IconCheck size={18} />
        <div>
          <strong>Ready</strong>
          <span>Review and send.</span>
        </div>
      </div>
    </aside>
  )
}

function SolarSystemShowcase() {
  const orbitGroups = [
    { ring: 'inner', className: 'orbit-inner', duration: '34s', radius: '118px', offset: -90 },
    { ring: 'middle', className: 'orbit-middle', duration: '44s', radius: '169px', offset: 30 },
    { ring: 'outer', className: 'orbit-outer', duration: '56s', radius: '222px', offset: 45 },
  ]

  const renderPlanet = (connector, index, total, offset = 0) => {
    const angle = `${offset + ((360 / total) * index)}deg`

    return (
      <div className="connector-planet" key={connector.name} style={{ '--angle': angle, '--color': connector.color }}>
        <span className="connector-logo-card" aria-label={connector.name}>
          <img src={connector.logo} alt={`${connector.name} logo`} />
        </span>
      </div>
    )
  }

  return (
    <div className="solar-showcase" aria-label="Animated Plutus connector solar system">
      <div className="solar-rings" aria-hidden="true">
        <span className="solar-ring ring-one" />
        <span className="solar-ring ring-two" />
        <span className="solar-ring ring-three" />
      </div>
      <div className="solar-center">
        <div className="solar-logo-glow"><img src="/logo.svg" alt="Plutus" /></div>
      </div>
      {orbitGroups.map(({ ring, className, duration, radius, offset }) => {
        const planets = connectorPlanets.filter(connector => connector.ring === ring)

        return (
          <div className={`connector-orbit ${className}`} key={ring} style={{ '--duration': duration, '--radius': radius }}>
            {planets.map((connector, index) => renderPlanet(connector, index, planets.length, offset))}
          </div>
        )
      })}
    </div>
  )
}

function WorkflowStory() {
  return (
    <div className="workflow-story">
      <div className="workflow-story-copy">
        <SectionHeader eyebrow="Plutus in action" title="Watch one request move through the business." text="Instead of showing technical layers, this story shows what a real user sees: Plutus understanding the goal, finding context, informing the right people, and helping finish the job." />
        <div className="workflow-step-list">
          {workflowStory.map(({ icon: Icon, kicker, title, text }, index) => (
            <article className="workflow-step-card" key={title}>
              <div className="workflow-step-index">0{index + 1}</div>
              <Icon size={23} />
              <div>
                <span>{kicker}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="workflow-action-stage" aria-label="Illustration of Plutus completing a customer workflow">
        <div className="request-bubble user-bubble"><strong>User</strong><span>“Save this customer before they churn.”</span></div>
        <div className="action-node notion-node"><b>Notion</b><span>Account notes found</span></div>
        <div className="action-node stripe-node"><b>Stripe</b><span>Invoice failed today</span></div>
        <div className="action-node plutus-node"><img src="/logo.svg" alt="" /><b>Plutus</b><span>Summary + next action ready</span></div>
        <div className="action-node team-node"><b>Team</b><span>Support brief sent for review</span></div>
        <div className="action-line line-a" />
        <div className="action-line line-b" />
        <div className="action-line line-c" />
        <div className="action-line line-d" />
        <div className="approval-card"><IconCheck size={18} /><span>Reply drafted, owner assigned, workspace updated.</span></div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <PageShell>
      <section className="hero-section">
        <div className="hero-grid section-container">
          <div className="hero-copy">
            <Eyebrow>AI work assistant</Eyebrow>
            <h1>Busywork handled. You stay in control.</h1>
            <p className="hero-lede">
              Plutus drafts, researches, organizes, and follows up across your apps — with approval before anything important happens.
            </p>
            <CTAGroup />
            <div className="hero-trust-row">
              <span><IconShieldCheck size={16} /> Human-approved</span>
              <span><IconWorld size={16} /> Works across apps</span>
            </div>
          </div>
          <HeroOutcomeVisual />
        </div>
      </section>

      <section className="connector-universe-section section-padding">
        <div className="section-container connector-universe-grid">
          <div className="connector-universe-copy">
            <SectionHeader eyebrow="Connect the apps you already use" title="Plutus sits in the middle and coordinates the work around you." text="The animation is intentionally simple: Plutus stays at the center, while your everyday business tools move around it. The point is clear for every buyer — one assistant can gather context, create the next step, and keep teams aligned without forcing people into another complicated dashboard." />
            <div className="connector-proof-list">
              <span><IconPlugConnected size={17} /> Business apps stay familiar</span>
              <span><IconUsers size={17} /> Teams get the right handoff</span>
              <span><IconCheck size={17} /> People approve important actions</span>
            </div>
          </div>
          <SolarSystemShowcase />
        </div>
      </section>

      <section className="proof-strip section-container">
        {proofStats.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader centered eyebrow="Why Plutus" title="Built for results people can understand." text="Plutus turns a normal request into useful output: it understands the goal, gathers context, uses the right tools, saves the work, and tells you what changed." />
          <div className="feature-grid four">
            {capabilityPillars.map(({ icon: Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section section-padding">
        <div className="section-container split-grid">
          <div>
            <SectionHeader eyebrow="Simple when you start, powerful when you scale" title="Use it from the browser, by voice, or with private local work." text="Start with a simple request like “summarize this research” or “draft my follow-up emails.” Add connected tools, recurring routines, and local computer access only when your team needs them." />
            <CTAGroup compact />
          </div>
          <div className="layer-list">
            {platformLayers.map(({ icon: Icon, title, description }) => (
              <div className="layer-item" key={title}>
                <Icon size={23} />
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding use-case-stage-section">
        <div className="section-container">
          <WorkflowStory />
          <div className="solution-grid flashy-cards">
            {solutions.map(({ icon: Icon, title, text, outcomes }) => (
              <article className="solution-card" key={title}>
                <div className="solution-icon"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>{outcomes.map(item => <li key={item}><IconCheck size={16} />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-banner section-container">
        <div>
          <span>Ready to hand off the busywork?</span>
          <h2>Start with one task today. Plutus can grow with your team from there.</h2>
        </div>
        <CTAGroup compact />
      </section>
    </PageShell>
  )
}

function PlatformPage() {
  return (
    <PageShell>
      <PageHero eyebrow="How it works" title="A work assistant that understands the goal and prepares the output." text="Plutus brings chat, voice, memory, connected tools, saved files, team workspaces, and optional local computer access into one simple experience." />
      <section className="section-padding">
        <div className="section-container platform-diagram">
          {platformLayers.map(({ icon: Icon, title, description }) => (
            <article key={title}>
              <Icon size={30} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-padding alt-section">
        <div className="section-container">
          <SectionHeader centered eyebrow="What it can help with" title="One assistant for everyday tasks and advanced work." text="Plutus can browse websites, prepare documents, organize files, draft messages, create images, connect apps, and support technical teams when needed." />
          <div className="tool-grid">
            {toolGroups.map(group => (
              <article className="tool-card" key={group.title}>
                <h3>{group.title}</h3>
                <div>{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <DeepDiveCTA />
    </PageShell>
  )
}

function SolutionsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Use cases" title="Show people Plutus doing the work, not explaining the technology." text="Give Plutus a business outcome: rescue a customer, prepare a launch, clean up a process, brief a team, or turn scattered information into the next action." />
      <section className="section-padding use-case-stage-section">
        <div className="section-container">
          <WorkflowStory />
        </div>
      </section>
      <section className="section-padding alt-section">
        <div className="section-container solution-grid wide flashy-cards">
          {solutions.map(({ icon: Icon, title, text, outcomes }) => (
            <article className="solution-card large" key={title}>
              <div className="solution-icon"><Icon size={26} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>{outcomes.map(item => <li key={item}><IconCheck size={16} />{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <DeepDiveCTA />
    </PageShell>
  )
}

function EnterprisePage() {
  return (
    <PageShell>
      <PageHero eyebrow="Enterprise" title="AI assistance your whole organization can trust." text="Plutus is designed for teams that want faster work, shared knowledge, privacy choices, approvals, and clear control over what AI is allowed to do." />
      <section className="section-padding">
        <div className="section-container enterprise-grid">
          {enterpriseControls.map(([title, text]) => (
            <article className="enterprise-card" key={title}>
              <IconShieldCheck size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-padding alt-section">
        <div className="section-container compare-grid">
          <div>
            <SectionHeader eyebrow="Privacy choice" title="Start in the cloud, keep sensitive work local, or combine both." text="Different teams have different comfort levels. Plutus supports a hosted workspace, a local option for private computer tasks, and Bridge when you want the convenience of both." />
          </div>
          <div className="comparison-card">
            <div><strong>Cloud</strong><span>Fast rollout, shared workspace, browser access.</span></div>
            <div><strong>Local</strong><span>Private work on the user’s own machine.</span></div>
            <div><strong>Bridge</strong><span>Browser simplicity with local computer reach.</span></div>
          </div>
        </div>
      </section>
      <DeepDiveCTA />
    </PageShell>
  )
}

function PricingPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Pricing" title="Start with one task. Scale when the value is clear." text="Choose the path that fits how your team works today: try it personally, delegate recurring work, or roll it out with shared controls." />
      <section className="section-padding">
        <div className="section-container pricing-grid">
          {pricingPlans.map(plan => (
            <article className={plan.highlighted ? 'pricing-card highlighted' : 'pricing-card'} key={plan.name}>
              <h3>{plan.name}</h3>
              <p>{plan.audience}</p>
              <strong>{plan.price}</strong>
              <ul>{plan.features.map(feature => <li key={feature}><IconCheck size={16} />{feature}</li>)}</ul>
              <a className="btn btn-secondary full" href={plan.href}>{plan.cta}</a>
            </article>
          ))}
        </div>
      </section>
      <DeepDiveCTA />
    </PageShell>
  )
}

function ResourcesPage() {
  const resourceCards = [
    { icon: IconRocket, title: 'Start in the browser', text: 'Open Plutus Cloud and try a real task without installing anything.', href: cloudUrl, label: 'Open Cloud' },
    { icon: IconFileDescription, title: 'Understand the product', text: 'Learn how Plutus turns requests into research, drafts, files, workflows, and saved outputs.', to: '/solutions', label: 'See use cases' },
    { icon: IconTerminal2, title: 'Use the local option', text: 'Choose Plutus Local when you want private work to happen on your own machine.', href: githubUrl, label: 'View local option' },
    { icon: IconGitBranch, title: 'Technical details', text: 'Review the open-source repositories when your technical team is ready to go deeper.', href: cloudRepoUrl, label: 'View repository' },
  ]

  return (
    <PageShell>
      <PageHero eyebrow="Learn" title="Start simple, then go deeper when you need to." text="Explore plain-language use cases first, then review the hosted workspace, local option, and technical repositories when your team is ready." />
      <section className="section-padding">
        <div className="section-container resource-grid">
          {resourceCards.map(({ icon: Icon, title, text, href, to, label }) => {
            const CardTag = to ? Link : 'a'
            const cardProps = to ? { to } : { href }
            return (
              <CardTag className="resource-card" key={title} {...cardProps}>
                <Icon size={26} />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{label} <IconArrowRight size={16} /></span>
              </CardTag>
            )
          })}
        </div>
      </section>
      <section className="section-padding alt-section">
        <div className="section-container faq-mini">
          <SectionHeader centered eyebrow="Buyer questions" title="Questions non-technical teams usually ask." />
          <div className="faq-grid">
            <article><h3>Is Plutus only a chatbot?</h3><p>No. Chatbots mostly answer questions. Plutus is built to help produce finished work: research, drafts, files, follow-ups, assets, and workflows.</p></article>
            <article><h3>Do I need to be technical?</h3><p>No. You can describe what you need in everyday language. Plutus handles the tool selection, context gathering, and output preparation behind the scenes.</p></article>
            <article><h3>Can teams control what happens?</h3><p>Yes. Teams can use shared workspaces, approvals, privacy choices, and human review so Plutus helps without removing oversight.</p></article>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero section-container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{text}</p>
      <CTAGroup compact />
    </section>
  )
}

function DeepDiveCTA() {
  return (
    <section className="final-banner section-container">
      <div>
        <span>Make AI useful for real work.</span>
        <h2>Move from asking questions to getting ready-to-review work back.</h2>
      </div>
      <CTAGroup compact />
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  )
}
