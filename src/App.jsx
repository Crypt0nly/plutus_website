import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Install from './components/Install'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ParticleField from './components/ParticleField'

export default function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault()
        const el = document.querySelector(a.getAttribute('href'))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleField />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Install />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
