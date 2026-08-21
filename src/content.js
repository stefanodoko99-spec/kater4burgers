// Non-text burger data (image, accent, position) is language-independent and
// lives here once. Display text is translated separately in burgerText below,
// keyed by the same `model` id, so switching language never reshuffles or
// remounts the burger cards — only the words inside them change.
export const burgersBase = [
  { number: '01', model: 'bloom', accent: '#b9e58c', image: '/images/bloom.jpg' },
  { number: '02', model: 'jalapenos', accent: '#f3df65', image: '/images/jalapenos.jpg' },
  { number: '03', model: 'oklahoma', accent: '#f3b57a', image: '/images/oklahoma.jpg' },
  { number: '04', model: 'classic', accent: '#9db8ff', image: '/images/classic.jpg' },
]

// Burger names (Bloom, Jalapeños, Oklahoma, Classic) are kept as-is in every
// language — they're menu item names, the same way a restaurant menu
// wouldn't translate "Big Mac". Only the description and ingredients change.
export const burgerText = {
  en: {
    bloom: {
      name: 'Bloom',
      headline: 'The fresh one.',
      copy: 'Tomato and lettuce keep it fresh; cheddar and smashed beef give it the weight.',
      ingredients: ['Brioche bun', 'Tomato', 'American cheddar', 'Smashed beef', 'Lettuce'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'Hot, but creamy with it.',
      copy: 'Jalapeños bring the heat, the herb cream sauce takes the edge off, and underneath there is American cheese and smashed beef.',
      ingredients: ['Brioche bun', 'Jalapeños', 'Herb cream sauce', 'American cheese', 'Smashed beef'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Sweet onions, crisp edges.',
      copy: 'Caramelised onions, cheddar and smashed beef. Nothing else.',
      ingredients: ['Brioche bun', 'American cheddar', 'Smashed beef', 'Caramelised onions'],
    },
    classic: {
      name: 'Classic',
      headline: 'Everything a smash needs.',
      copy: 'Pickles, American cheddar, smashed beef and house sauce. Straightforward, and balanced.',
      ingredients: ['Brioche bun', 'Pickles', 'American cheddar', 'Smashed beef', 'House sauce'],
    },
  },
  sq: {
    bloom: {
      name: 'Bloom',
      headline: 'I freskëti.',
      copy: 'Domatja dhe marulja e mbajnë të freskët; cheddari dhe mishi i shtypur i japin peshën.',
      ingredients: ['Bukë brioche', 'Domate', 'Cheddar amerikan', 'Mish i shtypur', 'Marule'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'Djeg, po me krem.',
      copy: 'Jalapeño djeg sa duhet, salca kremoze me erëza e zbut, dhe poshtë ka djathë amerikan me mish të shtypur.',
      ingredients: ['Bukë brioche', 'Jalapeño', 'Salcë kremoze me erëza', 'Djathë amerikan', 'Mish i shtypur'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Qepë të ëmbla, buzë krokante.',
      copy: 'Qepë të karamelizuara, cheddar dhe mish i shtypur. Asgjë tjetër.',
      ingredients: ['Bukë brioche', 'Cheddar amerikan', 'Mish i shtypur', 'Qepë të karamelizuara'],
    },
    classic: {
      name: 'Classic',
      headline: 'Gjithçka që i duhet një smash-i.',
      copy: 'Turshi, cheddar amerikan, mish i shtypur dhe salca e shtëpisë. E thjeshtë dhe në vend.',
      ingredients: ['Bukë brioche', 'Turshi', 'Cheddar amerikan', 'Mish i shtypur', 'Salcë shtëpie'],
    },
  },
  it: {
    bloom: {
      name: 'Bloom',
      headline: 'Quello fresco.',
      copy: 'Pomodoro e lattuga lo tengono fresco; cheddar e carne schiacciata gli danno peso.',
      ingredients: ['Pane brioche', 'Pomodoro', 'Cheddar americano', 'Carne schiacciata', 'Lattuga'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'Piccante, ma cremoso.',
      copy: 'I jalapeños danno il piccante, la salsa cremosa alle erbe lo smorza, e sotto ci sono formaggio americano e carne schiacciata.',
      ingredients: ['Pane brioche', 'Jalapeños', 'Salsa cremosa alle erbe', 'Formaggio americano', 'Carne schiacciata'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Cipolle dolci, bordi croccanti.',
      copy: "Cipolle caramellate, cheddar e carne schiacciata. Nient'altro.",
      ingredients: ['Pane brioche', 'Cheddar americano', 'Carne schiacciata', 'Cipolle caramellate'],
    },
    classic: {
      name: 'Classic',
      headline: 'Tutto quello che serve a uno smash.',
      copy: 'Cetriolini, cheddar americano, carne schiacciata e salsa della casa. Diretto ed equilibrato.',
      ingredients: ['Pane brioche', 'Cetriolini', 'Cheddar americano', 'Carne schiacciata', 'Salsa della casa'],
    },
  },
}
