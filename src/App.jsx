import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  IconDeviceMobile,
  IconFileDescription,
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
    icon: IconTerminal2,
    title: 'Autonomous execution',
    text: 'Delegate real work across files, shell commands, codebases, browsers, APIs, and cloud workspaces instead of stopping at advice.',
  },
  {
    icon: IconBrain,
    title: 'Persistent memory and skills',
    text: 'Plutus remembers context, preferences, workflows, contacts, reusable skills, and the assets created during previous sessions.',
  },
  {
    icon: IconPlugConnected,
    title: 'Connected operating layer',
    text: 'Connect GitHub, Gmail, Discord, Telegram, calendars, custom APIs, MCP servers, and your local machine through Bridge.',
  },
  {
    icon: IconShieldCheck,
    title: 'Governed by design',
    text: 'Guardrails, approvals, audit-friendly execution, organizations, and workspace controls make powerful automation usable in teams.',
  },
]

const proofStats = [
  ['Cloud + local', 'Use the browser, private desktop agent, or both through Bridge.'],
  ['40+ tools', 'Filesystem, shell, browser, GitHub, email, workflows, media assets, and more.'],
  ['Always-on', 'Run scheduled tasks, reusable workflows, and persistent workspace automations.'],
  ['Team ready', 'Organizations, shared context, contact history, feedback loops, and governance.'],
]

const platformLayers = [
  {
    icon: IconCloud,
    title: 'Plutus Cloud',
    description: 'A managed web workspace for chat, voice, tools, connectors, memory, organizations, workflows, scheduled tasks, and workspace assets.',
  },
  {
    icon: IconDeviceDesktop,
    title: 'Local Bridge',
    description: 'A secure bridge daemon lets the cloud agent execute approved tasks on your machine, including shell commands, file actions, app launching, and sync.',
  },
  {
    icon: IconDatabase,
    title: 'Persistent context',
    description: 'Memory, skills, tasks, contacts, generated files, and conversation history stay available so Plutus improves with every interaction.',
  },
  {
    icon: IconRoute,
    title: 'Workflow engine',
    description: 'Turn repeatable work into durable workflows with agent steps, tool actions, notifications, approvals, handoffs, and auditable runs.',
  },
]

const toolGroups = [
  {
    title: 'Engineering and code',
    tools: ['Shell execution', 'File editing', 'Code analysis', 'GitHub automation', 'Dynamic tool creation'],
  },
  {
    title: 'Operations and research',
    tools: ['Browser automation', 'Web research', 'Document drafting', 'Data processing', 'Scheduled reports'],
  },
  {
    title: 'Communication',
    tools: ['Email intelligence', 'Contacts', 'Calendar actions', 'Discord and Telegram', 'Custom APIs'],
  },
  {
    title: 'Creative assets',
    tools: ['AI image generation', 'Saved workspace files', 'Website-ready assets', 'File delivery', 'Reusable outputs'],
  },
]

const solutions = [
  {
    icon: IconCode,
    title: 'Engineering teams',
    text: 'Ship faster by letting Plutus inspect repositories, edit files, run commands, create tools, summarize diffs, and coordinate coding workflows.',
    outcomes: ['Repository-aware task execution', 'GitHub and shell automation', 'Worker-style task delegation'],
  },
  {
    icon: IconClipboardCheck,
    title: 'Operations teams',
    text: 'Automate recurring operational tasks, generate reports, monitor workflows, and connect internal tools without building a custom automation stack.',
    outcomes: ['Scheduled task execution', 'Connector-driven workflows', 'Approval checkpoints'],
  },
  {
    icon: IconMail,
    title: 'Sales and support',
    text: 'Use contact history and connected inboxes to draft responses, classify intent, follow up, and keep customer context available across channels.',
    outcomes: ['Contact-aware email handling', 'Draft-first support flows', 'Multi-channel context'],
  },
  {
    icon: IconBrowserCheck,
    title: 'Research and strategy',
    text: 'Ask Plutus to gather information, browse sources, compare options, build documents, analyze data, and turn outputs into reusable workspace files.',
    outcomes: ['Browser-backed research', 'Document creation', 'Workspace knowledge reuse'],
  },
]

const enterpriseControls = [
  ['Identity and tenancy', 'Clerk-based authentication, organization views, member management, and isolated user workspaces.'],
  ['Execution guardrails', 'Permission tiers, approval flows, audit-friendly tool events, and local-vs-cloud execution boundaries.'],
  ['Deployment flexibility', 'Run fully managed in the cloud, operate locally, or combine both with Bridge for private machine access.'],
  ['Integration strategy', 'Native connectors plus Custom API and MCP support for enterprise systems that do not fit a standard SaaS mold.'],
]

const pricingPlans = [
  {
    name: 'Starter',
    audience: 'For individuals evaluating autonomous work.',
    price: 'Start free',
    cta: 'Launch Plutus Cloud',
    href: cloudUrl,
    features: ['Browser chat workspace', 'Memory and skills', 'Core tools', 'Local open-source option'],
  },
  {
    name: 'Pro',
    audience: 'For power users and builders running serious workflows.',
    price: 'Scale usage',
    cta: 'Start building',
    href: cloudUrl,
    highlighted: true,
    features: ['Advanced tools and connectors', 'Voice mode', 'Scheduled tasks', 'Workspace assets', 'Bridge connectivity'],
  },
  {
    name: 'Enterprise',
    audience: 'For teams that need governance, support, and control.',
    price: 'Custom',
    cta: 'Talk to us',
    href: githubUrl,
    features: ['Organization workflows', 'Governance and approvals', 'Custom connectors', 'Deployment guidance', 'Priority roadmap alignment'],
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
      <a className="btn btn-primary" href={cloudUrl}>Start in Cloud <IconArrowRight size={18} /></a>
      <a className="btn btn-secondary" href={githubUrl}>View GitHub</a>
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

function HomePage() {
  return (
    <PageShell>
      <section className="hero-section">
        <div className="hero-grid section-container">
          <div className="hero-copy">
            <Eyebrow>Enterprise AI agent platform</Eyebrow>
            <h1>Give every team an AI operator that can actually do the work.</h1>
            <p className="hero-lede">
              Plutus combines a cloud workspace, local machine control, persistent memory, connectors, workflows, voice, and governed tool execution into one autonomous AI platform.
            </p>
            <CTAGroup />
            <div className="hero-trust-row">
              <span><IconShieldCheck size={16} /> Governed execution</span>
              <span><IconDeviceMobile size={16} /> Mobile-ready UX</span>
              <span><IconWorld size={16} /> Cloud and local</span>
            </div>
          </div>
          <div className="hero-product-card" aria-label="Plutus product preview">
            <div className="product-toolbar"><span /> <span /> <span /><strong>plutus.run</strong></div>
            <div className="agent-card active">
              <div><strong>Plutus</strong><p>Preparing the enterprise rollout workspace.</p></div>
              <span className="status-pill">Working</span>
            </div>
            <div className="workflow-stack">
              <div><IconBrowserCheck size={18} /> Research competitors</div>
              <div><IconCode size={18} /> Update landing page</div>
              <div><IconPhoto size={18} /> Generate hero assets</div>
              <div><IconMail size={18} /> Draft launch emails</div>
            </div>
            <div className="terminal-preview mono">
              <span>$ plutus task "ship launch site"</span>
              <span className="terminal-success">✓ synced workspace assets</span>
              <span className="terminal-success">✓ opened pull request</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip section-container">
        {proofStats.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader centered eyebrow="Why Plutus" title="Built for outcomes, not chat transcripts." text="The platform is designed around persistent execution loops: understand context, choose tools, complete tasks, save assets, and keep improving." />
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
            <SectionHeader eyebrow="Complete operating model" title="Cloud convenience with local power when you need it." text="Start in a browser, add connectors, use voice, schedule recurring tasks, and optionally let Plutus operate on your private desktop through Bridge." />
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

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader centered eyebrow="Use cases" title="One agentic layer for the work every team repeats." text="Plutus is broad enough for cross-functional work, but concrete enough for production workflows." />
          <div className="solution-grid">
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
          <span>Ready to delegate real work?</span>
          <h2>Launch Plutus Cloud or inspect the open-source local agent today.</h2>
        </div>
        <CTAGroup compact />
      </section>
    </PageShell>
  )
}

function PlatformPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Platform" title="The execution stack for autonomous business work." text="Plutus unifies cloud collaboration, local execution, persistent memory, external connectors, generated assets, and workflow orchestration." />
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
          <SectionHeader centered eyebrow="Tooling" title="A broad tool catalog exposed through one model interface." text="Plutus can decide when to browse, write files, use connectors, run code, deliver files, generate images, or coordinate long-running workflows." />
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
      <PageHero eyebrow="Solutions" title="Practical AI operators for engineering, operations, research, and customer work." text="Every page, connector, workflow, and generated asset is designed to help Plutus complete tasks end-to-end." />
      <section className="section-padding">
        <div className="section-container solution-grid wide">
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
      <section className="section-padding alt-section">
        <div className="section-container workflow-panel">
          <SectionHeader eyebrow="Workflow example" title="From prompt to shipped output." text="Plutus can understand the goal, inspect context, use tools, save files, request approval, and continue from memory later." />
          <div className="timeline">
            {['Understand the goal', 'Gather context', 'Execute with tools', 'Save reusable assets', 'Report and iterate'].map((step, index) => <div key={step}><strong>0{index + 1}</strong><span>{step}</span></div>)}
          </div>
        </div>
      </section>
      <DeepDiveCTA />
    </PageShell>
  )
}

function EnterprisePage() {
  return (
    <PageShell>
      <PageHero eyebrow="Enterprise" title="Powerful autonomy with the controls teams need." text="Plutus is designed for organizations that want AI execution without losing context, oversight, or deployment flexibility." />
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
            <SectionHeader eyebrow="Deployment choice" title="Use the cloud, keep work local, or combine both." text="The enterprise story is not one-size-fits-all. Plutus supports a hosted experience, a local agent, and a bridge between the two for teams that need private-machine capabilities." />
          </div>
          <div className="comparison-card">
            <div><strong>Cloud</strong><span>Fast rollout, shared workspace, browser access.</span></div>
            <div><strong>Local</strong><span>Private execution on the user machine.</span></div>
            <div><strong>Bridge</strong><span>Cloud UX with local computer reach.</span></div>
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
      <PageHero eyebrow="Pricing" title="Start fast. Scale into governed autonomous work." text="Choose the adoption path that matches your current stage: individual experimentation, serious workflow automation, or enterprise rollout." />
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
    { icon: IconGitBranch, title: 'Open-source local agent', text: 'Inspect, run, and modify Plutus Local from GitHub.', href: githubUrl, label: 'Open GitHub' },
    { icon: IconFileDescription, title: 'Cloud platform repository', text: 'Review the hosted backend, frontend, bridge, and cloud architecture.', href: cloudRepoUrl, label: 'View cloud repo' },
    { icon: IconTerminal2, title: 'Install locally', text: 'Use the local Plutus runtime when you want private machine execution.', href: githubUrl, label: 'Read install guide' },
    { icon: IconRocket, title: 'Launch hosted workspace', text: 'Start in the browser and connect Plutus to your daily tools.', href: cloudUrl, label: 'Open Cloud' },
  ]

  return (
    <PageShell>
      <PageHero eyebrow="Resources" title="Everything evaluators need to understand and start Plutus." text="Explore the hosted product, open-source local agent, architecture, and deployment model from one place." />
      <section className="section-padding">
        <div className="section-container resource-grid">
          {resourceCards.map(({ icon: Icon, title, text, href, label }) => (
            <a className="resource-card" href={href} key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{text}</p>
              <span>{label} <IconArrowRight size={16} /></span>
            </a>
          ))}
        </div>
      </section>
      <section className="section-padding alt-section">
        <div className="section-container faq-mini">
          <SectionHeader centered eyebrow="Buyer questions" title="Common evaluation questions." />
          <div className="faq-grid">
            <article><h3>Is Plutus only a chatbot?</h3><p>No. Plutus is built around tool execution, workflows, file outputs, memory, connectors, and local computer access through Bridge.</p></article>
            <article><h3>Can it create reusable assets?</h3><p>Yes. Workspace files, delivered outputs, and generated images can be saved and reused in websites, apps, reports, and later sessions.</p></article>
            <article><h3>Can teams control execution?</h3><p>Yes. The product includes organizations, guardrails, approvals, and a cloud/local architecture that can match different risk boundaries.</p></article>
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
        <span>Make AI operational.</span>
        <h2>Move from isolated prompts to persistent autonomous workflows.</h2>
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
