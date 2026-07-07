import { Link } from 'wouter'
import { IconArrow } from '../Icons.jsx'

// Warianty. UWAGA (perf): nie używamy transition-all (scroll lag) — .btn-prim/.btn-ghost
// mają własne przejścia w index.css; cream/gold dostają transition-colors.
const VARIANTS = {
  primary: 'btn-prim text-cream',                                        // forest, na jasnym tle
  cream: 'bg-cream text-forest hover:bg-white transition-colors duration-300', // wysoki kontrast na CIEMNYM tle
  gold: 'bg-gold text-charcoal hover:bg-gold-2 hover:text-cream transition-colors duration-300',
  ghost: 'btn-ghost',           // jasna ramka, na ciemnym tle
  ghostDark: 'btn-dark-ghost',  // ciemna ramka, na jasnym tle
}

const SIZES = {
  sm: 'px-6 py-3 text-[13px]',
  md: 'px-8 py-4 text-[14px]',
  lg: 'px-9 py-[18px] text-[15px]',
}

// icon: true → strzałka; węzeł JSX → własna ikona; false → brak.
export function Button({
  href, onClick, type = 'button',
  variant = 'primary', size = 'md', icon = true,
  className = '', children, ...rest
}) {
  const cls = `group inline-flex shrink-0 items-center gap-3 rounded-full font-semibold whitespace-nowrap tracking-wide ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`
  const iconEl = icon === true
    ? <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
    : (icon || null)
  const inner = <>{children}{iconEl}</>

  if (href && href.startsWith('/')) {
    return <Link href={href} className={cls} onClick={onClick} {...rest}>{inner}</Link>
  }
  if (href) {
    return <a href={href} className={cls} onClick={onClick} {...rest}>{inner}</a>
  }
  return <button type={type} onClick={onClick} className={cls} {...rest}>{inner}</button>
}
