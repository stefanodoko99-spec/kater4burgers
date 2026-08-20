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
    story: {
      ariaLabel: 'Meet the four Katër burgers',
      burgerOf: (n) => `Burger ${n} / 04`,
      scrollCue: 'Scroll through all four',
    },
    menu: {
      eyebrow: 'The complete menu',
      titleLine1: 'Four burgers.',
      titleStrong: 'Pick your stack.',
      body: 'No filler builds. Four distinct burgers, smashed to order and finished exactly as listed.',
      badgeLine1: 'Smashed',
      badgeLine2: 'to order',
      double: (n) => `double ${n} L`,
    },
    why: {
      eyebrow: 'Why four?',
      titleLine1: 'A short menu.',
      titleStrong: 'A serious smash.',
      lead: 'Four builds let every ingredient have a job.',
      body: 'Bloom brings freshness. Jalapeños brings heat. Oklahoma brings onions and sear. Classic keeps the balance tight.',
      principles: [
        { n: '01', title: 'Four builds', body: 'Clear choices, distinct flavor' },
        { n: '02', title: 'Fresh beef', body: 'Smashed for crisp edges' },
        { n: '03', title: 'Real layers', body: 'Every ingredient earns its place' },
        { n: '04', title: 'Built to order', body: 'Assembled when you choose' },
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
      body: 'Choose your burger, dine in or take it with you.',
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
    skipLink: 'Kalo tek katër bergerët',
    ticker: ['Katër bergerë', 'Të shtypur në porosi', '21 Dhjetori · Tiranë'],
    tickerAria: 'Katër Burgers - risitë',
    nav: { menu: 'Bergerët', why: 'Pse katër', visit: 'Na gjeni' },
    orderOnWolt: 'Porosit në Wolt',
    call: (phone) => `Telefono ${phone}`,
    callDot: (phone) => `Telefono · ${phone}`,
    orCall: (phone) => `Ose telefono ${phone}`,
    openNav: 'Hap menynë',
    closeNav: 'Mbyll menynë',
    brandHome: 'Katër Burgers - faqja kryesore',
    ariaIngredients: 'përbërësit',
    burgerAlt: (name) => `Berger ${name}`,
    switchTo: { en: 'Kalo në anglisht', sq: 'Kalo në shqip' },
    story: {
      ariaLabel: 'Njihuni me katër bergerët Katër',
      burgerOf: (n) => `Berger ${n} / 04`,
      scrollCue: 'Lëviz poshtë për të parë të katërta',
    },
    menu: {
      eyebrow: 'Menyja e plotë',
      titleLine1: 'Katër bergerë.',
      titleStrong: 'Zgjidh burgerin tënd.',
      body: 'Pa përbërës të tepërt. Katër bergerë të veçantë, të shtypur në porosi dhe të përgatitur saktësisht siç përshkruhen.',
      badgeLine1: 'Të shtypur',
      badgeLine2: 'në porosi',
      double: (n) => `Double ${n} L`,
    },
    why: {
      eyebrow: 'Pse katër?',
      titleLine1: 'Një menu e shkurtër.',
      titleStrong: 'Një smash serioz.',
      lead: 'Katër burgerë lejojnë çdo përbërës të ketë rolin e vet.',
      body: 'Bloom sjell freskinë. Jalapeños sjell djegien. Oklahoma sjell qepët dhe kruskën. Classic ruan balancën e përsosur.',
      principles: [
        { n: '01', title: 'Katër burgerë', body: 'Zgjedhje të qarta, shije të veçanta' },
        { n: '02', title: 'Mish i freskët', body: 'I shtypur për buzë krokante' },
        { n: '03', title: 'Shtresa të vërteta', body: 'Çdo përbërës e meriton vendin e vet' },
        { n: '04', title: 'Përgatitet me porosi', body: 'Montohet kur ti vendos' },
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
      eyebrow: 'Ku i gjen të katërta',
      titleLine1: '21 Dhjetori.',
      titleStrong: 'Tiranë.',
      body: 'Zgjidh burgerin tënd, ha aty ose merre me vete.',
      address: 'Rruga e Kavajës, Kryqëzimi 21 Dhjetori — pranë Ushqimore Zuna, Tiranë 1001',
      open: 'Hapur',
      hours1: 'Die – Enj · 12:00 – 01:00',
      hours2: 'Pre – Sht · 12:00 – 03:00',
      service: 'Shërbimi',
      serviceValue: 'Në lokal & për me vete',
      directions: 'Merr udhëzime',
    },
    closing: {
      eyebrow: 'I njeh të katërta',
      titleLine1: 'Cilin',
      titleStrong: 'po porosit?',
    },
    footer: {
      tagline: 'Katër bergerë. Një adresë. Tiranë.',
      legal: '© 2026 Katër Burgers. Të gjitha të drejtat e rezervuara.',
    },
  },
}
