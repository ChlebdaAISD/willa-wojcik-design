import { Link, useLocation } from 'wouter'
import { Container } from './ui/Container.jsx'
import { IconInstagram } from './Icons.jsx'
import { SITE } from '../data/site.js'
import logoLockup from '../assets/logo-lockup.webp'

// Klik w link do trasy, na której już jesteśmy, nie zmienia adresu, więc
// ScrollToTop w App.jsx się nie uruchamia — przewijamy ręcznie (jak w Nav).
// `replace`, żeby taki klik nie dokładał duplikatu w historii przeglądarki.
function FooterLink({ href, ...props }) {
  const [location] = useLocation()
  const onClick = () => { if (location === href) window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <Link {...props} href={href} onClick={onClick} replace={location === href} />
}

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream/80 pt-20 pb-10 overflow-hidden">
      <Container>
        <div className="reveal pb-16 border-b border-cream/10">
          {/* Pełny lockup właściciela (sygnet + „Apartamenty i pokoje" + podpis),
              wycięty z jego grafiki */}
          <img src={logoLockup} alt="Willa Wójcik — apartamenty i pokoje"
               width="900" height="479" loading="lazy" decoding="async"
               className="w-full max-w-[175px] md:max-w-[215px] h-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-14 pb-12">
          <div>
            <div className="eyebrow text-cream/70 mb-5">Nocleg</div>
            <ul className="space-y-3 text-[14px]">
              <li><FooterLink href="/apartamenty" className="hover:text-cream transition-colors">Apartamenty</FooterLink></li>
              <li><FooterLink href="/pokoje" className="hover:text-cream transition-colors">Pokoje</FooterLink></li>
              <li><FooterLink href="/galeria" className="hover:text-cream transition-colors">Galeria</FooterLink></li>
              <li><FooterLink href="/kontakt" className="hover:text-cream transition-colors">Rezerwacja</FooterLink></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/70 mb-5">Okolica</div>
            <ul className="space-y-3 text-[14px]">
              <li><FooterLink href="/okolica/splyw-dunajcem" className="hover:text-cream transition-colors">Spływ Dunajcem</FooterLink></li>
              <li><FooterLink href="/okolica/trzy-korony" className="hover:text-cream transition-colors">Trzy Korony</FooterLink></li>
              <li><FooterLink href="/okolica/kladka-czerwony-klasztor" className="hover:text-cream transition-colors">Czerwony Klasztor</FooterLink></li>
              <li><FooterLink href="/okolica" className="hover:text-cream transition-colors">Wszystkie atrakcje</FooterLink></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/70 mb-5">Kontakt</div>
            <ul className="space-y-3 text-[14px]">
              <li>{SITE.street}</li>
              <li>{SITE.postal} {SITE.city}</li>
              <li><a href={SITE.phoneHref} className="hover:text-cream transition-colors">{SITE.phone}</a></li>
              <li><a href={SITE.emailHref} className="hover:text-cream transition-colors">{SITE.email}</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/70 mb-5">Śledź nas</div>
            <div className="flex gap-3">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-cream/20 hover:bg-cream/10 flex items-center justify-center transition-colors">
                <IconInstagram size={18} stroke={1.3} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-cream/75">
          <div className="space-y-1">
            <div>© 2026 Willa Wójcik, {SITE.city}</div>
            {/* Dane usługodawcy — art. 5 ustawy o świadczeniu usług drogą elektroniczną */}
            <div className="text-cream/60">
              {SITE.owner.name}, {SITE.street}, {SITE.postal} {SITE.city}, NIP {SITE.owner.nip}, REGON {SITE.owner.regon}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <FooterLink href="/polityka-prywatnosci" className="hover:text-cream/80 transition-colors">Polityka prywatności</FooterLink>
            <FooterLink href="/regulamin" className="hover:text-cream/80 transition-colors">Regulamin</FooterLink>
            <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-cream/80 transition-colors">Mapa dojazdu</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
