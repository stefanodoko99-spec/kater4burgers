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
      headline: 'This is the freshest of the four.',
      copy: 'Tomato and lettuce keep it fresh, while the cheddar and the smashed beef give it the weight. It is the one you can eat without feeling heavy afterwards.',
      ingredients: ['Brioche bun', 'Tomato', 'American cheddar', 'Smashed beef', 'Lettuce'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'It brings the heat without overdoing it.',
      copy: 'The jalapeños bring the heat, the herb cream sauce softens it, and underneath sit American cheese and smashed beef. Order this one if you like it spicy.',
      ingredients: ['Brioche bun', 'Jalapeños', 'Herb cream sauce', 'American cheese', 'Smashed beef'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'The caramelised onions are what make it.',
      copy: 'Caramelised onions sit over smashed beef and American cheddar. There is no sauce and no salad in this one — just those three things in a brioche bun.',
      ingredients: ['Brioche bun', 'American cheddar', 'Smashed beef', 'Caramelised onions'],
    },
    classic: {
      name: 'Classic',
      headline: 'This is the classic, with no surprises.',
      copy: 'Pickles, American cheddar, smashed beef and house sauce make the combination everyone already knows. Simple and balanced.',
      ingredients: ['Brioche bun', 'Pickles', 'American cheddar', 'Smashed beef', 'House sauce'],
    },
  },
  sq: {
    bloom: {
      name: 'Bloom',
      headline: 'Është më i freskëti nga të katërt.',
      copy: 'Domatja dhe marulja e mbajnë të freskët, ndërsa cheddari dhe mishi i shtypur i japin peshë. Është ai që e ha pa u rënduar.',
      ingredients: ['Bukë brioche', 'Domate', 'Cheddar amerikan', 'Mish i shtypur', 'Marule'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'Djeg sa duhet, pa e tepruar.',
      copy: 'Jalapeño i jep djegien, salca kremoze me erëza e zbut, dhe poshtë tyre rrinë djathi amerikan dhe mishi i shtypur. Porosite këtë nëse të pëlqen pikanti.',
      ingredients: ['Bukë brioche', 'Jalapeño', 'Salcë kremoze me erëza', 'Djathë amerikan', 'Mish i shtypur'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Qepa e karamelizuar është ajo që e bën.',
      copy: 'Qepët e karamelizuara rrinë mbi mishin e shtypur dhe cheddarin amerikan. Këtu nuk ka as salcë, as zarzavate — vetëm këto të treja në bukë brioche.',
      ingredients: ['Bukë brioche', 'Cheddar amerikan', 'Mish i shtypur', 'Qepë të karamelizuara'],
    },
    classic: {
      name: 'Classic',
      headline: 'Është klasiku, pa surpriza.',
      copy: 'Turshia, cheddari amerikan, mishi i shtypur dhe salca e shtëpisë bëjnë kombinimin që e njeh gjithkush. I thjeshtë dhe i balancuar.',
      ingredients: ['Bukë brioche', 'Turshi', 'Cheddar amerikan', 'Mish i shtypur', 'Salcë shtëpie'],
    },
  },
  it: {
    bloom: {
      name: 'Bloom',
      headline: 'È il più fresco dei quattro.',
      copy: 'Pomodoro e lattuga lo tengono fresco, mentre il cheddar e la carne schiacciata gli danno peso. È quello che si mangia senza appesantirsi.',
      ingredients: ['Pane brioche', 'Pomodoro', 'Cheddar americano', 'Carne schiacciata', 'Lattuga'],
    },
    jalapenos: {
      name: 'Jalapeños',
      headline: 'È piccante, ma senza esagerare.',
      copy: 'I jalapeños danno il piccante, la salsa cremosa alle erbe lo smorza, e sotto ci sono il formaggio americano e la carne schiacciata. Ordina questo se ti piace il piccante.',
      ingredients: ['Pane brioche', 'Jalapeños', 'Salsa cremosa alle erbe', 'Formaggio americano', 'Carne schiacciata'],
    },
    oklahoma: {
      name: 'Oklahoma',
      headline: 'Sono le cipolle caramellate a farlo.',
      copy: 'Le cipolle caramellate stanno sopra la carne schiacciata e il cheddar americano. Qui non c\'è salsa e non c\'è verdura: solo questi tre ingredienti nel pane brioche.',
      ingredients: ['Pane brioche', 'Cheddar americano', 'Carne schiacciata', 'Cipolle caramellate'],
    },
    classic: {
      name: 'Classic',
      headline: 'È il classico, senza sorprese.',
      copy: 'Cetriolini, cheddar americano, carne schiacciata e salsa della casa formano la combinazione che conoscono tutti. Semplice ed equilibrato.',
      ingredients: ['Pane brioche', 'Cetriolini', 'Cheddar americano', 'Carne schiacciata', 'Salsa della casa'],
    },
  },
}
