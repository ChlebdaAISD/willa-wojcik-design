import { Link } from 'wouter'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SectionHeading } from '../components/ui/SectionHeading.jsx'
import { Button } from '../components/ui/Button.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { GalleryLink } from '../components/ui/GalleryLink.jsx'
import { AmenitiesSection, RulesSection } from '../components/StaySections.jsx'
import { IconArrowUp } from '../components/Icons.jsx'
import { PHOTOS, ROOMS } from '../data/content.js'

// Pokoje 1–8 — realne zdjęcia i dane od właścicielki (14.09.2026): 21 m²,
// 250 zł za dobę dla dwóch osób, 280 zł dla trzech, cztery pokoje na piętrze
// z balkonem i cztery na parterze z tarasem. Treść i liczby żyją w ROOMS
// (src/data/content.js) — ta strona ich nie duplikuje.

// Podział piętro/parter: jedyna rzecz, która różni pokoje między sobą.
const FLOORS = [
  {
    key: 'pietro',
    photo: PHOTOS.pokojPietroWidok,
    alt: 'Pokój na piętrze — łóżko, biurko z czajnikiem, telewizor i przeszklone drzwi na balkon',
    eyebrow: 'Cztery pokoje',
    title: 'Piętro, balkon',
    text: 'Na balkonie stoją krzesła i stolik. Widać z niego ogród i wzgórza nad Sromowcami Niżnymi, a z części pokoi masyw Trzech Koron — o konkretną stronę prosimy pytać przy rezerwacji.',
  },
  {
    key: 'parter',
    photo: PHOTOS.pokojeParterTarasy,
    alt: 'Tarasy pokoi na parterze — wyłożone kostką, z fotelami, wychodzące wprost na trawnik',
    eyebrow: 'Cztery pokoje',
    title: 'Parter, taras',
    text: 'Z pokoju wychodzą Państwo przeszklonymi drzwiami na własny taras z fotelami, a z tarasu prosto na trawnik. Do placu zabaw i altany z grillem jest stamtąd kilkanaście kroków.',
  },
]

// Łazienka: układ powtarzalny w każdym z ośmiu pokoi (zdjęcia z trzech różnych).
const BATHROOM_PHOTOS = [
  { src: PHOTOS.lazienkaUmywalka, alt: 'Łazienka w pokoju — kabina prysznicowa, umywalka nablatowa i suszarka do włosów przy lustrze' },
  { src: PHOTOS.lazienkaDrewno, alt: 'Łazienka w pokoju — drewnopodobne płytki, kabina z deszczownicą i ręczniki pod umywalką' },
  { src: PHOTOS.lazienkaPokoj, alt: 'Łazienka w pokoju — grzejnik drabinkowy z ręcznikiem, kabina prysznicowa i lustro z oświetleniem' },
]

export default function Pokoje() {
  return (
    <>
      <PageHero
        title="Pokoje w Sromowcach Niżnych"
        image={PHOTOS.heroPokoje}
        imageAlt="Ilustracja: pokój w Willi Wójcik — rzeźbione drewniane łóżko, poduszki z parzenicą i mural z górami za ścianką z brzozowych pni"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Pokoje' }]}
      />

      {/* Intro */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 reveal">
              <SectionHeading eyebrow="01 — Dla par i mniejszych ekip" title={<>Osiem pokoi, każdy <span className="italic font-normal">z własną łazienką</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty max-w-xl">
                <p>
                  Każdy pokój ma 21 m², łóżko małżeńskie 160 × 200, małą sofę rozkładaną
                  i łazienkę tylko dla Państwa. Dwie osoby płacą 250 zł za dobę, trzy — 280 zł.
                </p>
                <p>
                  Cztery pokoje na piętrze mają balkon, cztery na parterze taras wychodzący
                  na ogród. Poza tym wyposażenie jest identyczne, więc nie ma tu droższych
                  i tańszych wariantów tego samego.
                </p>
                <p>
                  Śniadania przygotowują Państwo we własnym zakresie — do dyspozycji jest
                  wspólna kuchnia 45 m², czynna o każdej porze.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ '--d': '.12s' }}>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5 lg:border-l lg:border-charcoal/15 lg:pl-8">
                {[['8', 'pokoi 2–3 osobowych'], ['21', 'm² każdy'], ['4,9', 'ocena w Google (135 opinii)']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif text-forest leading-none" style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500 }}>{n}</div>
                    <div className="eyebrow text-charcoal/70 mt-2 text-[10.5px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Wyposażenie, cena i galeria pokoi */}
      <section id={ROOMS.id} className="relative scroll-mt-24 bg-cream-2 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl reveal">
            <SectionHeading eyebrow="02 — Pokoje 1–8" title={<>Ten sam standard <span className="italic font-normal">w każdym z ośmiu</span>.</>} />
            <p className="mt-7 text-[17px] leading-[1.85] text-pretty text-charcoal/75">
              {ROOMS.intro}
            </p>
          </div>

          <ul className="reveal mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl" style={{ '--d': '.08s' }}>
            {ROOMS.features.map((f) => (
              <li key={f} className="flex items-baseline gap-3 text-[14.5px] leading-snug text-charcoal/80">
                <span className="w-3 h-px bg-gold/70 shrink-0 translate-y-[-3px]" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <div className="reveal mt-12 md:mt-14 flex items-end justify-between gap-6 flex-wrap max-w-3xl" style={{ '--d': '.14s' }}>
            <div>
              <div className="font-serif leading-none text-forest"
                   style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 500 }}>
                {ROOMS.price}
              </div>
              <div className="mt-2 text-[13.5px] leading-snug text-charcoal/65">{ROOMS.priceNote}</div>
            </div>
            <Button href="/kontakt" size="sm">Zapytaj o termin</Button>
          </div>

          <GalleryGrid photos={ROOMS.photos} className="mt-14 md:mt-20" hideThumbLabels />
          <GalleryLink />

          <p className="reveal mt-12 text-[13.5px] max-w-2xl text-charcoal/70">
            Wolne terminy potwierdzamy telefonicznie lub mailem, bez prowizji portali.
            Rezerwację potwierdza zaliczka 30% wartości pobytu.
          </p>
        </Container>
      </section>

      {/* Piętro czy parter — realny podział ośmiu pokoi */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="03 — Piętro czy parter"
            title={<>Cztery z balkonem, <span className="italic font-normal">cztery z tarasem</span>.</>}
            className="max-w-2xl mb-14 reveal"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {FLOORS.map((f, i) => (
              <article key={f.key} className="reveal card-lift group bg-cream-2 rounded-sm overflow-hidden" style={{ '--d': `${i * 0.08}s` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img src={f.photo} alt={f.alt} loading="lazy" decoding="async"
                       width="1800" height="1013"
                       className="absolute inset-0 w-full h-full object-cover zoom-img" />
                </div>
                <div className="p-8 md:p-10">
                  <div className="eyebrow text-charcoal/65 mb-2.5">{f.eyebrow}</div>
                  <h3 className="font-serif text-charcoal text-2xl md:text-3xl leading-tight" style={{ fontWeight: 500 }}>{f.title}</h3>
                  <p className="mt-4 text-charcoal/70 text-[15px] leading-relaxed text-pretty">{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Łazienka */}
      <section className="relative bg-stone py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 reveal">
              <SectionHeading eyebrow="04 — Łazienka" title={<>Łazienka <span className="italic font-normal">przy pokoju</span>, nie na korytarzu.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[16px] leading-[1.8] text-pretty">
                <p>
                  Każda z ośmiu łazienek ma kabinę z deszczownicą, umywalkę na drewnianym
                  blacie, lustro z oświetleniem i suszarkę do włosów przykręconą do ściany.
                  Ręczniki czekają na półce pod umywalką, świeże na każdy pobyt.
                </p>
                <p>
                  Po powrocie ze szlaku albo ze spływu kurtka i ręcznik wyschną do rana
                  na grzejniku drabinkowym.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 md:gap-4">
              {BATHROOM_PHOTOS.map((p, i) => (
                <div key={p.src} className="reveal relative overflow-hidden rounded-sm" style={{ aspectRatio: '3/4', '--d': `${i * 0.07}s` }}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async"
                       width="1013" height="1800"
                       className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Kuchnia wspólna */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '16/9' }}>
                <img src={PHOTOS.wspolneKuchnia} alt="Wspólna kuchnia Willi Wójcik połączona z jadalnią i kanapami, z fototapetą tatrzańskiej hali na ścianie" loading="lazy" decoding="async"
                     width="1800" height="1013"
                     className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ '--d': '.1s' }}>
              <SectionHeading eyebrow="05 — Kuchnia wspólna" title={<>45 m² kuchni <span className="italic font-normal">do Państwa dyspozycji</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[16px] leading-[1.8] text-pretty max-w-xl">
                <p>
                  Śniadania przygotowują Państwo sami, dlatego kuchnia jest otwarta o każdej
                  porze. Znajdą tam Państwo lodówkę, kuchenkę z okapem, mikrofalówkę, ekspres
                  i czajnik, a obok stoją stoły dla kilku rodzin i kanapy pod fototapetą
                  z górską halą.
                </p>
                <p>
                  Latem gotowanie przenosi się do ogrodu — altana z grillem stoi kilkanaście
                  metrów od wyjścia, z widokiem na Pieniny.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-link do apartamentów */}
      <section className="relative bg-cream-2 py-14 md:py-16">
        <Container>
          <div className="reveal flex items-baseline justify-between gap-6 flex-wrap">
            <p className="text-charcoal/75 text-[16px] max-w-xl text-pretty">
              Jadą Państwo w czwórkę albo z dziadkami? Trzy apartamenty z własnym aneksem
              kuchennym przyjmą od 4 do 6 osób, od 450 zł za dobę — w tym wolnostojący 60 m²
              w osobnym budynku.
            </p>
            <Link href="/apartamenty" className="inline-flex items-center gap-1.5 text-forest text-[14px] font-semibold group/l whitespace-nowrap hover:text-forest-2 transition-colors">
              Apartamenty z balkonem na Trzy Korony
              <IconArrowUp size={15} className="transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <AmenitiesSection number="06" className="bg-cream" />
      <RulesSection />
      <CTASection />
    </>
  )
}
