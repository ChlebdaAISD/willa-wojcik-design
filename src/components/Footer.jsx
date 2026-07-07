import { Link } from 'wouter'
import { Container } from './ui/Container.jsx'
import { IconFacebook, IconInstagram } from './Icons.jsx'
import { SITE } from '../data/site.js'

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream/80 pt-20 pb-10 overflow-hidden">
      <Container>
        <div className="reveal pb-16 border-b border-cream/10">
          <div className="font-serif leading-[0.9] text-cream text-balance"
               style={{ fontSize: 'clamp(56px, 11vw, 170px)', fontWeight: 380 }}>
            Willa <span className="italic font-[340]">Wójcik</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-14 pb-12">
          <div>
            <div className="eyebrow text-cream/50 mb-5">Nocleg</div>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/pokoje-i-apartamenty" className="hover:text-cream transition-colors">Pokoje i apartamenty</Link></li>
              <li><Link href="/galeria" className="hover:text-cream transition-colors">Galeria</Link></li>
              <li><Link href="/kontakt" className="hover:text-cream transition-colors">Rezerwacja</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/50 mb-5">Okolica</div>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/okolica/splyw-dunajcem" className="hover:text-cream transition-colors">Spływ Dunajcem</Link></li>
              <li><Link href="/okolica/trzy-korony" className="hover:text-cream transition-colors">Trzy Korony</Link></li>
              <li><Link href="/okolica/kladka-czerwony-klasztor" className="hover:text-cream transition-colors">Czerwony Klasztor</Link></li>
              <li><Link href="/okolica" className="hover:text-cream transition-colors">Wszystkie atrakcje</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/50 mb-5">Kontakt</div>
            <ul className="space-y-3 text-[14px]">
              <li>{SITE.street}</li>
              <li>{SITE.postal} {SITE.city}</li>
              <li><a href={SITE.phoneHref} className="hover:text-cream transition-colors">{SITE.phone}</a></li>
              <li><a href={SITE.emailHref} className="hover:text-cream transition-colors">{SITE.email}</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/50 mb-5">Śledź nas</div>
            <div className="flex gap-3">
              <a href={SITE.instagram} aria-label="Instagram" className="w-11 h-11 rounded-full border border-cream/20 hover:bg-cream/10 flex items-center justify-center transition-colors">
                <IconInstagram size={18} stroke={1.3} />
              </a>
              <a href={SITE.facebook} aria-label="Facebook" className="w-11 h-11 rounded-full border border-cream/20 hover:bg-cream/10 flex items-center justify-center transition-colors">
                <IconFacebook size={18} stroke={1.3} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-cream/45">
          <div>© 2026 Willa Wójcik · {SITE.city}</div>
          <div className="flex gap-6">
            <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-cream/80 transition-colors">Mapa dojazdu</a>
            <span>49°23′48″N · 20°24′32″E</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
