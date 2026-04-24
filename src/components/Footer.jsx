import { IconFacebook, IconInstagram } from './Icons.jsx'

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream/80 pt-20 pb-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="reveal pb-16 border-b border-cream/10">
          <div className="font-serif leading-[0.9] text-cream text-balance"
               style={{ fontSize: 'clamp(60px, 11vw, 180px)', fontWeight: 380 }}>
            Willa <span className="italic font-[340]">Wójcik</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-14 pb-12">
          <div>
            <div className="eyebrow text-cream/50 mb-5">Nocleg</div>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#apartamenty" className="hover:text-cream">Apartamenty 4–5 os.</a></li>
              <li><a href="#apartamenty" className="hover:text-cream">Pokoje 2–3 os.</a></li>
              <li><a href="#udogodnienia" className="hover:text-cream">Udogodnienia</a></li>
              <li><a href="#galeria" className="hover:text-cream">Galeria</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/50 mb-5">Okolica</div>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#lokalizacja" className="hover:text-cream">Pieniny</a></li>
              <li><a href="#lokalizacja" className="hover:text-cream">Spływ Dunajcem</a></li>
              <li><a href="#lokalizacja" className="hover:text-cream">Zamek w Niedzicy</a></li>
              <li><a href="#lokalizacja" className="hover:text-cream">Termy Bania</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/50 mb-5">Kontakt</div>
            <ul className="space-y-3 text-[14px]">
              <li>ul. Pod Brzegami 18</li>
              <li>34-443 Sromowce Niżne</li>
              <li>+48 604 12 34 56</li>
              <li>rezerwacja@willawojcik.pl</li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-cream/50 mb-5">Śledź nas</div>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-full border border-cream/20 hover:bg-cream/10 flex items-center justify-center">
                <IconInstagram size={18} stroke={1.3} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-cream/20 hover:bg-cream/10 flex items-center justify-center">
                <IconFacebook size={18} stroke={1.3} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-cream/45">
          <div>© 2026 Willa Wójcik · Wszystkie prawa zastrzeżone</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream/80">Polityka prywatności</a>
            <a href="#" className="hover:text-cream/80">Regulamin</a>
            <a href="#" className="hover:text-cream/80">49°24′N · 20°22′E</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
