// Pola formularzy jako wyraźne boxy (decyzja 2026-07-08): jasne wypełnienie + obrys,
// focus = zielona ramka (box-shadow, bez skoku layoutu). 16px — poniżej iOS przybliża
// stronę przy focusie. Wspólne: formularz zapytania (BookingForm) i wybór terminu (StayPicker).
export const inputClass = "w-full bg-white/70 border border-charcoal/20 rounded-sm px-4 py-3.5 text-charcoal text-[16px] placeholder:text-charcoal/65 outline-none focus:bg-white focus:border-forest focus:shadow-[0_0_0_1px_var(--color-forest)] transition-[border-color,box-shadow,background-color] caret-forest"
