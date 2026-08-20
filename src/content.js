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

// Burger names (Bloom, Jalapeños, Oklahoma, Classic) are kept as-is in both
// languages — they're menu item names, the same way a restaurant menu
// wouldn't translate "Big Mac". Only the description and ingredients change.
export const burgerText = {
  en: {
    bloom: {
      name: 'Bloom',
      headline: 'Fresh crunch. Hard sear.',
      copy: 'Tomato and lettuce bring the crunch; cheddar and smashed beef bring the weight.',
      ingredients: ['Brioche bun', 'Tomato', 'American cheddar', 'Smash beef', 'Lettuce'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'Creamy heat. Clean finish.',
      copy: 'Jalapeños cut through herb cream sauce, American cheese and smashed beef.',
      ingredients: ['Brioche bun', 'Jalapeños', 'Herb cream sauce', 'American cheese', 'Smash beef'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Sweet onions. Crispy edges.',
      copy: 'Caramelized onions, cheddar and smashed beef in a stripped-back build.',
      ingredients: ['Brioche bun', 'American cheddar', 'Smash beef', 'Caramelized onions'],
    },
    classic: {
      name: 'Classic',
      headline: 'Everything a smash needs.',
      copy: 'Pickles, American cheddar, smashed beef and house sauce. Direct and balanced.',
      ingredients: ['Brioche bun', 'Pickles', 'American cheddar', 'Smash beef', 'House sauce'],
    },
  },
  sq: {
    bloom: {
      name: 'Bloom',
      headline: 'E freskët dhe krokante. E pjekur fort.',
      copy: 'Domatja dhe marulja sjellin krokancën; cheddari dhe mishi i shtypur sjellin peshën.',
      ingredients: ['Bukë brioche', 'Domate', 'Cheddar amerikan', 'Mish i shtypur', 'Marule'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'Djegie kremoze. Mbyllje e pastër.',
      copy: 'Jalapeños sjellin djegien mbi salcën kremoze me erëza, djathin amerikan dhe mishin e shtypur.',
      ingredients: ['Bukë brioche', 'Jalapeños', 'Salcë kremoze me erëza', 'Djathë amerikan', 'Mish i shtypur'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Qepë të ëmbla. Buzë krokante.',
      copy: 'Qepë të karamelizuara, cheddar dhe mish i shtypur, në një ndërtim të thjeshtë.',
      ingredients: ['Bukë brioche', 'Cheddar amerikan', 'Mish i shtypur', 'Qepë të karamelizuara'],
    },
    classic: {
      name: 'Classic',
      headline: 'Gjithçka që i duhet një smash-i.',
      copy: 'Turshi, cheddar amerikan, mish i shtypur dhe salcë shtëpie. E thjeshtë dhe e balancuar.',
      ingredients: ['Bukë brioche', 'Turshi', 'Cheddar amerikan', 'Mish i shtypur', 'Salcë shtëpie'],
    },
  },
}
