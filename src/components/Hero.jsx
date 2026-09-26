import { IconArrow, IconStarFill } from './Icons.jsx'
import { useHeroStage } from '../lib/useHeroStage.js'
import heroOwner from '../assets/hero-owner-clean.webp'
import heroOwnerMobile from '../assets/hero-owner-clean-mobile.webp'

// Hero: balkon apartamentu z widokiem na Trzy Korony, w dzień.
//
// Historia tej sekcji, żeby nikt nie wrócił do poprzedniego układu:
// do 15.09.2026 stało tu ujęcie z drona o zmierzchu (wideo + plakat) oraz przełącznik
// wideo/grafika. Właściciele odrzucili to jako za ciemne. Zmiana samego overlaya na
// jasny nic nie dawała — mediana jasności tamtego kadru wynosiła 28/255, więc kremowa
// zasłona robiła z niego szarą breję zamiast rozjaśnić. Wideo i przełącznik usunięte,
// pliki `public/video/` skasowane.
//
// GRAFIKA, NIE ZDJĘCIE — obraz dostarczony przez właściciela i wybrany przez niego
// 15.09.2026. Logotyp z nieba usunięto w retuszu, szyld na ścianie został.
// Kadru nie podpisujemy jako fotografii — dlatego nie ma podpisu „Widok z balkonu".
//
// Gdyby hero miało wrócić do zdjęcia: jasne kadry realnego obiektu to
// `obiekt-front.webp` i `obiekt-od-ogrodu.webp`, a z drona da się zrobić
// dzienne ujęcie w tym samym kadrze co grafika.
//
// Tekst jest CIEMNY na jasnym tle — to odwrotnie niż w PageHero na podstronach, które
// nadal stoją na ciemnych ilustracjach. Dlatego Nav rozpoznaje stronę główną osobno
// (patrz `lightHero` w Nav.jsx) i od góry renderuje ciemne napisy.
export function Hero() {
  const on = useHeroStage()

  return (
    <section className={`hero-stage relative overflow-hidden bg-cream ${on ? 'on' : ''}`}
             style={{ minHeight: '100svh' }}>
      {/* Na telefonie osobny kadr pionowy — wersja pozioma na wąskim ekranie
          pokazywałaby sam dach zamiast bryły z górami w tle. */}
      <picture>
        <source media="(max-width: 767px)" srcSet={heroOwnerMobile} />
        <img
          src={heroOwner}
          alt="Willa Wójcik o zachodzie słońca, pod masywem Trzech Koron"
          width="1920" height="1072"
          fetchPriority="high" decoding="async"
          className="hero-photo absolute inset-0 w-full h-full object-cover object-center"
        />
      </picture>

      {/* Zasłony kremowe, nie czarne. Dwie skrajności, które już przerabialiśmy:
          szeroki gradient na pół kadru gasi zdjęcie, a zbyt słaby zostawia nagłówek
          na graniach i dachu. Rozwiązanie: światło PUNKTOWE — elipsa zakotwiczona
          w lewym dolnym rogu, dokładnie tam gdzie leży kolumna tekstu. Prawy górny
          róg kadru (niebo, grań, bryła) zostaje nietknięty. */}
      <div className="absolute inset-0 hidden md:block" style={{ background: 'radial-gradient(48% 34% at 28% 70%, rgba(245,241,232,0.97) 0%, rgba(245,241,232,0.94) 46%, rgba(245,241,232,0.70) 68%, rgba(245,241,232,0.28) 84%, transparent 100%)' }} />
      {/* Krótki pas pod nawigacją, żeby ciemne napisy nie stały na samym niebie */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(245,241,232,0.52) 0%, rgba(245,241,232,0.10) 9%, transparent 17%)' }} />
      {/* Mobile: kolumna tekstu zajmuje dolne 55%, więc góra kadru zostaje czysta,
          a światło narasta dopiero od 34% wysokości. */}
      <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(245,241,232,0.38) 50%, rgba(245,241,232,0.72) 60%, rgba(245,241,232,0.80) 78%, rgba(245,241,232,0.84) 100%)' }} />

      {/* Treść */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-16 md:pb-20 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-3xl">
          <h1 className="font-serif text-charcoal text-balance leading-[0.98] font-medium"
              style={{ fontSize: 'clamp(44px, 6.1vw, 86px)' }}>
            <span className="hero-el block" style={{ '--d': '.08s' }}>Balkon z widokiem</span>{' '}
            <span className="hero-el block italic font-normal text-forest" style={{ '--d': '.16s' }}>
              na Trzy Korony.
            </span>{' '}
            {/* Fraza i miejscowość w H1 (SEO), wizualnie jako mały wiersz pod hasłem —
                w jasnej strefie zasłony, nad skałami byłby nieczytelny */}
            <span className="hero-el eyebrow block leading-normal text-charcoal/80 mt-6 md:mt-7" style={{ '--d': '.22s' }}>
              Noclegi w Sromowcach Niżnych, Pieniny
            </span>
          </h1>

          <div className="hero-el mt-8 md:mt-11 flex flex-row flex-wrap items-center gap-3 md:gap-4"
               style={{ '--d': '.28s' }}>
            <a href="#kontakt"
               className="btn-prim inline-flex shrink-0 items-center gap-2 md:gap-3 px-6 md:px-8 py-4 rounded-full text-[14px] font-semibold tracking-wide whitespace-nowrap text-cream">
              Sprawdź dostępność
              <IconArrow size={16} />
            </a>
            <a href="#apartamenty"
               className="btn-dark-ghost inline-flex shrink-0 items-center gap-2 px-5 md:px-7 py-4 rounded-full text-[14px] font-semibold tracking-wide whitespace-nowrap">
              Zobacz apartamenty
            </a>
          </div>

          {/* Oceny: zwarty pasek zamiast trzech dużych bloków. Duże serifowe liczby
              zajmowały jedną trzecią wysokości hero i konkurowały z nagłówkiem.
              Logotypy dostawców świadomie POMINIĘTE — Google i Booking.com mają
              wytyczne ograniczające użycie znaków w sposób sugerujący rekomendację;
              gwiazdka plus nazwa serwisu niosą tę samą informację. */}
          <div className="hero-el mt-7 md:mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-charcoal/15 max-w-xl"
               style={{ '--d': '.38s' }}>
            {[['4,9', 'Google'], ['9,8', 'Booking.com'], ['10', 'nocowanie.pl']].map(([ocena, serwis]) => (
              <div key={serwis} className="flex items-center gap-1.5">
                <IconStarFill size={12} className="text-gold-3 shrink-0" />
                <span className="text-[13px] font-semibold text-charcoal leading-none">{ocena}</span>
                <span className="text-[11px] text-charcoal/70 leading-none">{serwis}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
