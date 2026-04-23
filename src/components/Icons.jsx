// Minimal inline icon set — stroke-based, lucide-style
const Icon = ({ d, size = 22, stroke = 1.5, className = '', children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
       className={className}>
    {children || <path d={d} />}
  </svg>
)

export const IconMountain = (p) => <Icon {...p}><path d="M3 20l6-10 4 6 3-4 5 8H3z"/><circle cx="16" cy="6" r="1.4"/></Icon>
export const IconWifi = (p) => <Icon {...p}><path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="0.8" fill="currentColor"/></Icon>
export const IconParking = (p) => <Icon {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 17V8h3.5a2.5 2.5 0 0 1 0 5H9"/></Icon>
export const IconFlame = (p) => <Icon {...p}><path d="M12 3c.6 3 3 4.5 3 7.5a3 3 0 0 1-6 0c0-1.5 1-2 1-3.5-2 1-3.5 3.5-3.5 6.5a5.5 5.5 0 0 0 11 0c0-4-3-6-5.5-10.5z"/></Icon>
export const IconPlay = (p) => <Icon {...p}><path d="M4 19V9l4 2 4-6 4 6 4-2v10"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></Icon>
export const IconKitchen = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 7v.01"/><path d="M12 7v.01"/><path d="M8 14v3"/><path d="M14 14h3v3h-3z"/></Icon>
export const IconBalcony = (p) => <Icon {...p}><path d="M3 20h18"/><path d="M5 20v-6h14v6"/><path d="M9 14v6"/><path d="M15 14v6"/><path d="M7 11l5-5 5 5"/></Icon>
export const IconShield = (p) => <Icon {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></Icon>
export const IconTowel = (p) => <Icon {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 7h14"/><path d="M9 11v6"/><path d="M12 11v6"/><path d="M15 11v6"/></Icon>
export const IconArrow = (p) => <Icon {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></Icon>
export const IconArrowUp = (p) => <Icon {...p}><path d="M7 17L17 7"/><path d="M9 7h8v8"/></Icon>
export const IconStar = (p) => <Icon {...p}><path d="M12 3l2.8 6 6.2.9-4.5 4.3 1.1 6.3L12 17.8 6.4 20.5l1.1-6.3L3 9.9 9.2 9z"/></Icon>
export const IconMapPin = (p) => <Icon {...p}><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></Icon>
export const IconPhone = (p) => <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></Icon>
export const IconMail = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></Icon>
export const IconGlobe = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></Icon>
export const IconInstagram = (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></Icon>
export const IconFacebook = (p) => <Icon {...p}><path d="M15 3h-3a5 5 0 0 0-5 5v3H4v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z"/></Icon>
export const IconClose = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>
export const IconChevL = (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>
export const IconChevR = (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>
export const IconCheck = (p) => <Icon {...p}><path d="M5 13l4 4L19 7"/></Icon>
export const IconRaft = (p) => <Icon {...p}><path d="M3 17c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1"/><path d="M3 20c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1"/><path d="M7 13l5-8 5 8"/><path d="M10 13h4"/></Icon>
export const IconCastle = (p) => <Icon {...p}><path d="M3 20V9l2 1V6l2 2V5l2 2V6l2-2 2 2V5l2 2V8l2-2v4l2-1v11"/><path d="M3 20h18"/><path d="M10 20v-5h4v5"/></Icon>
export const IconSki = (p) => <Icon {...p}><path d="M4 20L20 4"/><path d="M6 18L18 6"/><circle cx="16" cy="6" r="1.5"/><path d="M3 20h18"/></Icon>
export const IconSpa = (p) => <Icon {...p}><path d="M12 4c0 4-3 6-3 9a3 3 0 0 0 6 0c0-3-3-5-3-9z"/><path d="M5 14c1 3 3.5 5 7 5s6-2 7-5"/></Icon>
export const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>
export const IconCar = (p) => <Icon {...p}><path d="M5 17h14v-4l-2-5H7l-2 5v4z"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></Icon>
export const IconCalendar = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></Icon>
export const IconUsers = (p) => <Icon {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M15 20c0-2 2-4 4-4s4 1.5 4 3.5"/></Icon>
export const IconHome = (p) => <Icon {...p}><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/></Icon>

export const ICONS = {
  IconMountain, IconWifi, IconParking, IconFlame, IconPlay, IconKitchen, IconBalcony,
  IconShield, IconTowel, IconArrow, IconArrowUp, IconStar, IconMapPin, IconPhone,
  IconMail, IconGlobe, IconInstagram, IconFacebook, IconClose, IconChevL, IconChevR,
  IconCheck, IconRaft, IconCastle, IconSki, IconSpa, IconClock, IconCar, IconCalendar,
  IconUsers, IconHome,
}
