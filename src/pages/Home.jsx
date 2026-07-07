import { Hero } from '../components/Hero.jsx'
import { About } from '../components/About.jsx'
import { Apartments } from '../components/Apartments.jsx'
import { Amenities } from '../components/Amenities.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Location } from '../components/Location.jsx'
import { Reviews } from '../components/Reviews.jsx'
import { BookingForm } from '../components/BookingForm.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Apartments />
      <Amenities />
      <Gallery />
      <Location />
      <Reviews />
      <BookingForm />
    </>
  )
}
