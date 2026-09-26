import { Link } from 'wouter'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { NAV_LINKS } from '../data/site.js'

// Strona błędu. Prerender zapisuje ją jako dist/public/404.html, a Cloudflare
// (not_found_handling: "404-page") serwuje ją ze statusem 404.
export default function NotFound() {
  return (
    <>
      <PageHero
        title="Nie znaleźliśmy tej strony"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Błąd 404' }]}
      />
      <section className="relative bg-cream py-16 md:py-24">
        <Container>
          <p className="text-charcoal/75 text-[17px] leading-[1.8] max-w-2xl">
            Adres mógł się zmienić albo zawierać literówkę. Zapraszamy na jedną ze stron:
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                      className="inline-flex items-center px-5 py-3 rounded-full border border-charcoal/20 text-charcoal text-[14px] font-semibold hover:bg-charcoal/5 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
