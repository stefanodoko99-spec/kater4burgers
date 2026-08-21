import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kater-lang'

function detectDefaultLanguage() {
  if (typeof navigator === 'undefined') return 'en'
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  return candidates.some((code) => (code || '').toLowerCase().startsWith('sq')) ? 'sq' : 'en'
}

// Persisted across visits, otherwise inferred from the browser's language
// list — a Tirana site should open in Albanian for an Albanian browser
// without asking, and remember an explicit switch after that.
export function useLanguage() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'sq') return saved
    } catch {
      // localStorage can throw in private-browsing contexts; fall through.
    }
    return detectDefaultLanguage()
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Ignore — persistence is a nicety, not a requirement.
    }
  }, [lang])

  return [lang, setLang]
}

export const ui = {
  en: {
    skipLink: 'Skip to the four burgers',
    ticker: ['Four burgers', 'Smashed to order', '21 Dhjetori · Tirana'],
    tickerAria: 'Katër Burgers highlights',
    nav: { menu: 'Four burgers', why: 'Why four', visit: 'Tirana' },
    orderOnWolt: 'Order on Wolt',
    call: (phone) => `Call ${phone}`,
    callDot: (phone) => `Call · ${phone}`,
    orCall: (phone) => `Or call ${phone}`,
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    brandHome: 'Katër Burgers home',
    ariaIngredients: 'ingredients',
    burgerAlt: (name) => `${name} burger`,
    switchTo: { en: 'Switch to English', sq: 'Switch to Albanian' },
    hero: {
      eyebrow: 'Smash burgers · Tiranë',
      titleLine1: 'Four burgers.',
      titleStrong: 'Smashed to order, done properly.',
      lead: 'Fresh beef, never frozen, pressed hard on the flat top for crisp, lacy edges. Four burgers — that is the whole menu.',
      priceLabel: 'Each',
    },
    menu: {
      eyebrow: 'The complete menu',
      titleLine1: 'Four burgers.',
      titleStrong: 'Pick your stack.',
      body: 'Nothing on the menu is filler. Four distinct burgers, smashed to order and finished exactly as listed.',
      badgeLine1: 'Smashed',
      badgeLine2: 'to order',
      double: (n) => `double ${n} L`,
    },
    why: {
      eyebrow: 'Why four?',
      titleLine1: 'A short menu.',
      titleStrong: 'A serious smash.',
      lead: 'A short menu means every ingredient has a job.',
      body: 'Bloom brings the freshness. Jalapeños brings the heat. Oklahoma brings the onions and the sear. Classic keeps everything in balance.',
      principles: [
        { n: '01', title: 'Four burgers', body: 'Clear choices, distinct flavours' },
        { n: '02', title: 'Fresh beef', body: 'Smashed for crisp edges' },
        { n: '03', title: 'Real layers', body: 'Every ingredient earns its place' },
        { n: '04', title: 'Made to order', body: 'Assembled after you order' },
      ],
    },
    reviews: {
      eyebrow: 'On Google',
      titleLine1: 'Five stars.',
      titleStrong: 'Every time.',
      ratingOf: (value) => `${value} out of 5`,
      countLabel: (count) => `${count} Google reviews`,
      seeAll: 'See all reviews on Google',
      googleReview: 'Google review',
    },
    visit: {
      eyebrow: 'Where to get the four',
      titleLine1: '21 Dhjetori.',
      titleStrong: 'Tirana.',
      body: 'Pick your burger, eat in or take it with you.',
      address: 'Rruga e Kavajës, Kryqëzimi 21 Dhjetori — beside Ushqimore Zuna, Tiranë 1001',
      open: 'Open',
      hours1: 'Sun – Thu · 12:00 – 01:00',
      hours2: 'Fri – Sat · 12:00 – 03:00',
      service: 'Service',
      serviceValue: 'Dine in & takeaway',
      directions: 'Get directions',
    },
    closing: {
      eyebrow: 'You know the four',
      titleLine1: 'Which one',
      titleStrong: 'are you ordering?',
    },
    footer: {
      tagline: 'Four burgers. One address. Tirana.',
      legal: '© 2026 Katër Burgers. All rights reserved.',
    },
  },
  sq: {
    skipLink: 'Kalo te katër burgerët',
    ticker: ['Katër burgerë', 'Të shtypur sipas porosisë', '21 Dhjetori · Tiranë'],
    tickerAria: 'Katër Burgers — pikat kryesore',
    nav: { menu: 'Burgerët', why: 'Pse katër', visit: 'Na gjeni' },
    orderOnWolt: 'Porosit në Wolt',
    call: (phone) => `Telefono ${phone}`,
    callDot: (phone) => `Telefono · ${phone}`,
    orCall: (phone) => `Ose telefono ${phone}`,
    openNav: 'Hap menunë',
    closeNav: 'Mbyll menunë',
    brandHome: 'Katër Burgers — faqja kryesore',
    ariaIngredients: 'përbërësit',
    burgerAlt: (name) => `Burgeri ${name}`,
    switchTo: { en: 'Kalo në anglisht', sq: 'Kalo në shqip' },
    hero: {
      eyebrow: 'Smash burger · Tiranë',
      titleLine1: 'Katër burgerë.',
      titleStrong: 'Të shtypur sipas porosisë, si duhet.',
      lead: 'Mish viçi i freskët, kurrë i ngrirë, i shtypur fort në rrasë të nxehtë për buzë krokante. Katër burgerë — kjo është e gjithë menuja.',
      priceLabel: 'Për copë',
    },
    menu: {
      eyebrow: 'Menuja e plotë',
      titleLine1: 'Katër burgerë.',
      titleStrong: 'Zgjidh burgerin tënd.',
      body: 'Asgjë e tepërt. Katër burgerë të veçantë, të shtypur sipas porosisë dhe të përgatitur pikërisht si në përshkrim.',
      badgeLine1: 'Të shtypur',
      badgeLine2: 'sipas porosisë',
      double: (n) => `Dopio ${n} L`,
    },
    why: {
      eyebrow: 'Pse katër?',
      titleLine1: 'Menu e shkurtër.',
      titleStrong: 'Një smash serioz.',
      lead: 'Një menu e shkurtër do të thotë që çdo përbërës ka një rol të qartë.',
      body: 'Bloom sjell freskinë. Jalapeños sjell pikantërinë. Oklahoma sjell qepët dhe skuqjen. Classic i mban të gjitha në balancë.',
      principles: [
        { n: '01', title: 'Katër burgerë', body: 'Zgjedhje e qartë, shije e veçantë' },
        { n: '02', title: 'Mish i freskët', body: 'I shtypur për buzë krokante' },
        { n: '03', title: 'Shtresa të vërteta', body: 'Çdo përbërës e ka vendin e vet' },
        { n: '04', title: 'Bëhet sipas porosisë', body: 'Nis të përgatitet kur ti zgjedh' },
      ],
    },
    reviews: {
      eyebrow: 'Në Google',
      titleLine1: 'Pesë yje.',
      titleStrong: 'Çdo herë.',
      ratingOf: (value) => `${value} nga 5`,
      countLabel: (count) => `${count} vlerësime në Google`,
      seeAll: 'Shiko të gjitha vlerësimet në Google',
      googleReview: 'Vlerësim në Google',
    },
    visit: {
      eyebrow: 'Ku i gjen të katërt',
      titleLine1: '21 Dhjetori.',
      titleStrong: 'Tiranë.',
      body: 'Zgjidh burgerin tënd, ha në lokal ose merre me vete.',
      address: 'Rruga e Kavajës, Kryqëzimi 21 Dhjetori — pranë Ushqimore Zuna, Tiranë 1001',
      open: 'Hapur',
      hours1: 'Die – Enj · 12:00 – 01:00',
      hours2: 'Pre – Sht · 12:00 – 03:00',
      service: 'Shërbimi',
      serviceValue: 'Në lokal dhe me vete',
      directions: 'Shiko në hartë',
    },
    closing: {
      eyebrow: 'Tani i njeh të katërt',
      titleLine1: 'Cilin',
      titleStrong: 'po porosit?',
    },
    footer: {
      tagline: 'Katër burgerë. Një adresë. Tiranë.',
      legal: '© 2026 Katër Burgers. Të gjitha të drejtat e rezervuara.',
    },
  },
}
