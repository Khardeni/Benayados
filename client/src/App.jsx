import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Histoire from './components/Histoire'
import Terre from './components/Terre'
import Productions from './components/Productions'
import Vision from './components/Vision'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Histoire />
        <Terre />
        <Productions />
        <Vision />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
