import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kater-lang'

// Order here is the order the switcher renders them in.
export const LANGS = ['sq', 'en', 'it']

// Endonyms: a language is listed the way its own speakers write it, so the
// options read the same whichever language the site is currently in.
export const LANG_NAMES = { sq: 'Shqip', en: 'English', it: 'Italiano' }

function detectDefaultLanguage() {
  if (typeof navigator === 'undefined') return 'en'
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  for (const candidate of candidates) {
    const code = (candidate || '').toLowerCase()
    if (code.startsWith('sq')) return 'sq'
    if (code.startsWith('it')) return 'it'
    if (code.startsWith('en')) return 'en'
  }
  return 'en'
}

// Persisted across visits, otherwise inferred from the browser's language
// list — a Tirana site should open in Albanian for an Albanian browser
// without asking, and remember an explicit switch after that.
export function useLanguage() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (LANGS.includes(saved)) return saved
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
    skipLink: 'Skip to the burgers',
    ticker: ['Four burgers', 'Made when you order', '21 Dhjetori · Tirana'],
    tickerAria: 'Katër Burgers highlights',
    nav: { menu: 'The burgers', why: 'Why four', visit: 'Find us' },
    orderOnWolt: 'Order on Wolt',
    call: (phone) => `Call ${phone}`,
    callDot: (phone) => `Call · ${phone}`,
    orCall: (phone) => `Or call ${phone}`,
    languageLabel: 'Language',
    brandHome: 'Katër Burgers home',
    ariaIngredients: 'ingredients',
    burgerAlt: (name) => `${name} burger`,
    switchTo: { en: 'Switch to English', sq: 'Switch to Albanian', it: 'Switch to Italian' },
    hero: {
      eyebrow: 'Smash burgers · Tirana',
      titleLine1: 'Four burgers.',
      titleStrong: 'Smashed to order.',
      lead: 'Fresh beef, never frozen, pressed hard on the griddle so the edges go crisp. Four burgers — that is the whole menu.',
      priceLabel: 'Each',
    },
    menu: {
      eyebrow: 'The whole menu',
      titleLine1: 'Four burgers.',
      titleStrong: 'Pick yours.',
      body: 'Nothing here is filler. Four different burgers, made when you order them, exactly as they are listed.',
      badgeLine1: 'Made',
      badgeLine2: 'to order',
      double: (n) => `double ${n} L`,
    },
    why: {
      eyebrow: 'Why four?',
      titleLine1: 'A short menu.',
      titleStrong: 'Every burger done properly.',
      lead: 'A short menu means every ingredient has a job.',
      body: 'Bloom is the freshest of the four, with tomato and lettuce. Jalapeños is the one that brings the heat. Oklahoma is caramelised onions over beef and cheddar, with no sauce at all. Classic is the familiar one, with pickles and house sauce.',
      principles: [
        { n: '01', title: 'Four burgers', body: 'Clear choices, distinct flavours' },
        { n: '02', title: 'Fresh beef', body: 'Smashed for crisp edges' },
        { n: '03', title: 'Real layers', body: 'Every ingredient does something' },
        { n: '04', title: 'Made to order', body: 'We start once you order' },
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
      eyebrow: 'Where to find us',
      titleLine1: '21 Dhjetori.',
      titleStrong: 'Tirana.',
      body: 'Pick your burger, eat in or take it with you.',
      address: 'Rruga e Kavajës, Kryqëzimi 21 Dhjetori — next to Ushqimore Zuna, Tiranë 1001',
      open: 'Open',
      hours1: 'Sun – Thu · 12:00 – 01:00',
      hours2: 'Fri – Sat · 12:00 – 03:00',
      service: 'Service',
      serviceValue: 'Eat in and takeaway',
      directions: 'See on the map',
    },
    closing: {
      eyebrow: 'Now you know all four',
      titleLine1: 'Which one',
      titleStrong: 'are you ordering?',
    },
    footer: {
      tagline: 'Four burgers. One address. Tirana.',
      legal: '© 2026 Katër Burgers. All rights reserved.',
    },
  },
  sq: {
    skipLink: 'Kalo te burgerat',
    ticker: ['Katër burgera', 'Bëhen në moment', '21 Dhjetori · Tiranë'],
    tickerAria: 'Katër Burgers — pikat kryesore',
    nav: { menu: 'Burgerat', why: 'Pse katër', visit: 'Na gjeni' },
    orderOnWolt: 'Porosit në Wolt',
    call: (phone) => `Telefono ${phone}`,
    callDot: (phone) => `Telefono · ${phone}`,
    orCall: (phone) => `Ose telefono ${phone}`,
    languageLabel: 'Gjuha',
    brandHome: 'Katër Burgers — faqja kryesore',
    ariaIngredients: 'përbërësit',
    burgerAlt: (name) => `Burgeri ${name}`,
    switchTo: { en: 'Kalo në anglisht', sq: 'Kalo në shqip', it: 'Kalo në italisht' },
    hero: {
      eyebrow: 'Smash burger · Tiranë',
      titleLine1: 'Katër burgera.',
      titleStrong: 'Bëhen në moment.',
      lead: 'Mish viçi i freskët, kurrë i ngrirë. E shtypim fort sa të dalë krokant në buzë. Katër burgera — kaq ka menuja.',
      priceLabel: 'Copa',
    },
    menu: {
      eyebrow: 'E gjithë menuja',
      titleLine1: 'Katër burgera.',
      titleStrong: 'Zgjidh të tëndin.',
      body: 'Asgjë e tepërt. Katër burgera të ndryshëm, që i bëjmë kur i porosit, pikërisht siç i lexon këtu.',
      badgeLine1: 'Bëhet',
      badgeLine2: 'në moment',
      double: (n) => `dopio ${n} L`,
    },
    why: {
      eyebrow: 'Pse katër?',
      titleLine1: 'Menu e shkurtër.',
      titleStrong: 'Bërë si duhet.',
      lead: 'Kur menuja është e shkurtër, çdo përbërës ka punën e vet.',
      body: 'Bloom është më i freskëti nga të katërt, me domate dhe marule. Jalapeño është ai që djeg. Oklahoma ka qepë të karamelizuara mbi mish dhe cheddar, pa asnjë salcë. Classic është klasiku, me turshi dhe salcë shtëpie.',
      principles: [
        { n: '01', title: 'Katër burgera', body: 'Zgjedhje e qartë, shije e veçantë' },
        { n: '02', title: 'Mish i freskët', body: 'Shtypet sa të dalë krokant' },
        { n: '03', title: 'Shtresa të vërteta', body: 'Çdo përbërës bën punën e vet' },
        { n: '04', title: 'Bëhet me porosi', body: 'Nisim pasi ti zgjedh' },
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
      eyebrow: 'Ku na gjen',
      titleLine1: '21 Dhjetori.',
      titleStrong: 'Tiranë.',
      body: 'Zgjidh burgerin, ha këtu ose merre me vete.',
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
      tagline: 'Katër burgera. Një adresë. Tiranë.',
      legal: '© 2026 Katër Burgers. Të gjitha të drejtat e rezervuara.',
    },
  },
  it: {
    skipLink: 'Vai ai burger',
    ticker: ['Quattro burger', 'Fatti al momento', '21 Dhjetori · Tirana'],
    tickerAria: 'Katër Burgers — in evidenza',
    nav: { menu: 'I burger', why: 'Perché quattro', visit: 'Dove siamo' },
    orderOnWolt: 'Ordina su Wolt',
    call: (phone) => `Chiama ${phone}`,
    callDot: (phone) => `Chiama · ${phone}`,
    orCall: (phone) => `Oppure chiama ${phone}`,
    languageLabel: 'Lingua',
    brandHome: 'Katër Burgers — home',
    ariaIngredients: 'ingredienti',
    burgerAlt: (name) => `Burger ${name}`,
    switchTo: { en: "Passa all'inglese", sq: "Passa all'albanese", it: "Passa all'italiano" },
    hero: {
      eyebrow: 'Smash burger · Tirana',
      titleLine1: 'Quattro burger.',
      titleStrong: 'Schiacciati al momento.',
      lead: 'Carne di manzo fresca, mai congelata, schiacciata forte sulla piastra perché i bordi vengano croccanti. Quattro burger: il menu è tutto qui.',
      priceLabel: 'Cad.',
    },
    menu: {
      eyebrow: 'Tutto il menu',
      titleLine1: 'Quattro burger.',
      titleStrong: 'Scegli il tuo.',
      body: 'Niente riempitivi. Quattro burger diversi, fatti quando li ordini, esattamente come li leggi qui.',
      badgeLine1: 'Fatto',
      badgeLine2: 'al momento',
      double: (n) => `doppio ${n} L`,
    },
    why: {
      eyebrow: 'Perché quattro?',
      titleLine1: 'Menu corto.',
      titleStrong: 'Fatto come si deve.',
      lead: 'Con un menu corto ogni ingrediente ha un compito.',
      body: 'Bloom è il più fresco dei quattro, con pomodoro e lattuga. Jalapeños è quello piccante. Oklahoma ha cipolle caramellate su carne e cheddar, senza nessuna salsa. Classic è quello classico, con cetriolini e salsa della casa.',
      principles: [
        { n: '01', title: 'Quattro burger', body: 'Scelte chiare, gusti distinti' },
        { n: '02', title: 'Carne fresca', body: 'Schiacciata per bordi croccanti' },
        { n: '03', title: 'Strati veri', body: 'Ogni ingrediente fa qualcosa' },
        { n: '04', title: 'Fatto al momento', body: 'Si parte quando ordini' },
      ],
    },
    reviews: {
      eyebrow: 'Su Google',
      titleLine1: 'Cinque stelle.',
      titleStrong: 'Ogni volta.',
      ratingOf: (value) => `${value} su 5`,
      countLabel: (count) => `${count} recensioni su Google`,
      seeAll: 'Vedi tutte le recensioni su Google',
      googleReview: 'Recensione Google',
    },
    visit: {
      eyebrow: 'Dove trovarci',
      titleLine1: '21 Dhjetori.',
      titleStrong: 'Tirana.',
      body: 'Scegli il tuo burger, mangia qui o portalo via.',
      address: 'Rruga e Kavajës, Kryqëzimi 21 Dhjetori — accanto a Ushqimore Zuna, Tiranë 1001',
      open: 'Aperto',
      hours1: 'Dom – Gio · 12:00 – 01:00',
      hours2: 'Ven – Sab · 12:00 – 03:00',
      service: 'Servizio',
      serviceValue: 'Sul posto e da asporto',
      directions: 'Vedi sulla mappa',
    },
    closing: {
      eyebrow: 'Ora li conosci tutti e quattro',
      titleLine1: 'Quale',
      titleStrong: 'ordini?',
    },
    footer: {
      tagline: 'Quattro burger. Un indirizzo. Tirana.',
      legal: '© 2026 Katër Burgers. Tutti i diritti riservati.',
    },
  },
}
