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
  useEffect(() => { document.body.classList.add('ready') }, [])

  return (
    <Router ssrPath={ssrPath}>
      <div className="fouc ready">
        <ScrollToTop />
        <Nav />
        <main>
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
