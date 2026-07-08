import { Eyebrow } from './Eyebrow.jsx'

// Nagłówek sekcji: nadtytuł + serifowy H2 (z możliwością kursywy w tytule przez JSX).
// title może być stringiem lub JSX (np. z <span className="italic font-[380]">…</span>).
export function SectionHeading({ eyebrow, title, tone = 'dark', as: Tag = 'h2', align = 'left', className = '' }) {
  const color = tone === 'light' ? 'text-cream' : 'text-charcoal'
  const alignCls = align === 'center' ? 'items-center text-center' : ''
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && <Eyebrow tone={tone} className="mb-6">{eyebrow}</Eyebrow>}
      <Tag className={`font-serif ${color} leading-[1.05] text-balance`}
           style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
        {title}
      </Tag>
    </div>
  )
}
