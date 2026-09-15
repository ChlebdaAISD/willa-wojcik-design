import { useEffect } from 'react'
import { Router, Route, Switch, useLocation } from 'wouter'
import { Nav } from './components/Nav.jsx'
import { Footer } from './components/Footer.jsx'
import { useReveal } from './lib/useReveal.js'

import Home from './pages/Home.jsx'
import Apartamenty from './pages/Apartamenty.jsx'
import Pokoje from './pages/Pokoje.jsx'
import Galeria from './pages/Galeria.jsx'
import Okolica from './pages/Okolica.jsx'
import SplywDunajcem from './pages/okolica/SplywDunajcem.jsx'
import TrzyKorony from './pages/okolica/TrzyKorony.jsx'
import KladkaCzerwonyKlasztor from './pages/okolica/KladkaCzerwonyKlasztor.jsx'
import Kontakt from './pages/Kontakt.jsx'
import PolitykaPrywatnosci from './pages/PolitykaPrywatnosci.jsx'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => { if (typeof window !== 'undefined') window.scrollTo(0, 0) }, [location])
  return null
}

export default function App({ ssrPath }) {
  useReveal()

  return (
    <Router ssrPath={ssrPath}>
      <div>
        {/* Pierwszy element w kolejności tabulacji: pozwala pominąć nagłówek
            (logo + 6 linków + CTA + hamburger) i wejść prosto w treść strony.
            Widoczny dopiero po sfokusowaniu klawiaturą. */}
        <a href="#tresc"
           className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                      focus:bg-cream focus:text-forest focus:px-5 focus:py-3 focus:rounded-full
                      focus:text-[14px] focus:font-semibold focus:shadow-lg">
          Przejdź do treści
        </a>
        <ScrollToTop />
        <Nav />
        <main id="tresc" tabIndex={-1}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/apartamenty" component={Apartamenty} />
            <Route path="/pokoje" component={Pokoje} />
            <Route path="/galeria" component={Galeria} />
            <Route path="/okolica" component={Okolica} />
            <Route path="/okolica/splyw-dunajcem" component={SplywDunajcem} />
            <Route path="/okolica/trzy-korony" component={TrzyKorony} />
            <Route path="/okolica/kladka-czerwony-klasztor" component={KladkaCzerwonyKlasztor} />
            <Route path="/kontakt" component={Kontakt} />
            <Route path="/polityka-prywatnosci" component={PolitykaPrywatnosci} />
            {/* 404 → strona główna */}
            <Route component={Home} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
