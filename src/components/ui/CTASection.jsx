import { Container } from './Container.jsx'
import { Button } from './Button.jsx'
import { SITE } from '../../data/site.js'
import { IconPhone } from '../Icons.jsx'

// Końcowy blok CTA — spójny na każdej podstronie. Dwa kanały: zapytanie + telefon.
export function CTASection({
  title = 'Sprawdzą Państwo wolny termin?',
  text = 'Odpowiadamy tego samego dnia. Rezerwując bezpośrednio, płacą Państwo mniej niż przez portale — bez prowizji.',
}) {
  return (
    <section className="relative bg-forest text-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.22), transparent 70%)' }} />
      <Container className="relative text-center flex flex-col items-center">
        <h2 className="font-serif text-cream leading-[1.05] text-balance max-w-3xl"
            style={{ fontSize: 'clamp(30px, 4.4vw, 54px)', fontWeight: 440 }}>
          {title}
        </h2>
        {text && <p className="mt-5 text-cream/75 text-lg max-w-xl text-pretty">{text}</p>}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button href="/kontakt" variant="cream" size="lg">Zapytaj o wolny termin</Button>
          <Button href={SITE.phoneHref} variant="ghost" size="lg" icon={<IconPhone size={16} />}>
            {SITE.phone}
          </Button>
        </div>
      </Container>
    </section>
  )
}
