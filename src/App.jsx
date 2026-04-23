import { useEffect } from 'react'
import { About } from './components/About.jsx'
import { Amenities } from './components/Amenities.jsx'
import { Apartments } from './components/Apartments.jsx'
import { BookingForm } from './components/BookingForm.jsx'
import { Footer } from './components/Footer.jsx'
import { Gallery } from './components/Gallery.jsx'
import { Hero } from './components/Hero.jsx'
import { Location } from './components/Location.jsx'
import { Nav } from './components/Nav.jsx'
import { Reviews } from './components/Reviews.jsx'
import { useReveal } from './lib/useReveal.js'

export default function App() {
  useReveal()
  useEffect(() => { document.body.classList.add('ready') }, [])

  return (
    <div className="fouc ready">
      <Nav />
      <Hero />
      <About />
      <Apartments />
      <Amenities />
      <Gallery />
      <Location />
      <Reviews />
      <BookingForm />
      <Footer />
    </div>
  )
}
