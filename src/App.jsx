import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RealBurgerStack from './components/RealBurgerStack.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const burgers = [
  {
    number: '01',
    season: 'Spring',
    name: 'Bloom',
    copy: 'Green, bright and juicy — the first bite of the year.',
    ingredients: ['Brioche bun', 'Tomato', 'American cheddar', 'Smash beef', 'Lettuce'],
    image: '/images/bloom.jpg',
    tone: 'green',
    model: 'bloom',
  },
  {
    number: '02',
    season: 'Summer',
    name: 'Jalapeños',
    copy: 'Heat, herbs and cream — summer with a proper kick.',
    ingredients: ['Brioche bun', 'Jalapeños', 'Herb cream sauce', 'American cheese', 'Smash beef'],
    image: '/images/jalapenos.jpg',
    tone: 'yellow',
    model: 'jalapenos',
  },
  {
    number: '03',
    season: 'Autumn',
    name: 'Oklahoma',
    copy: 'Onions smashed straight into the patty — deep and sweet.',
    ingredients: ['Brioche bun', 'American cheddar', 'Smash beef', 'Caramelized onions'],
    image: '/images/oklahoma.jpg',
    tone: 'orange',
    model: 'oklahoma',
  },
  {
    number: '04',
    season: 'Winter',
    name: 'Classic',
    copy: 'Beef, cheddar, pickles, house sauce. Nothing else needed.',
    ingredients: ['Brioche bun', 'Pickles', 'American cheddar', 'Smash beef', 'House sauce'],
    image: '/images/classic.jpg',
    tone: 'blue',
    model: 'classic',
  },
]

const chapters = [
  { id: 'intro', eyebrow: 'Seasonal · Smash-grilled · Local', line1: 'One burger.', line2: 'Four seasons.', note: 'Scroll to expand it' },
  { id: 'stack', eyebrow: '01 · Ground fresh daily', line1: 'Every layer', line2: 'earns its place.', note: 'Fresh. Never frozen.' },
  { id: 'craft', eyebrow: '02 · Smash-grilled', line1: 'Fresh. Loud.', line2: 'Built to order.', note: 'Crispy edges. Juicy center.' },
  { id: 'rebuild', eyebrow: '03 · Back together', line1: 'Every layer.', line2: 'Perfectly placed.', note: 'The full burger returns.' },
  { id: 'finale', eyebrow: '04 · Ready to bite', line1: 'Whole again.', line2: 'Made for you.', note: '21 Dhjetori · Tirana', cta: true },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function StoryTitle({ chapter, index }) {
  const Tag = index === 0 ? 'h1' : 'h2'
  return (
    <Tag className="story-copy__title">
      <span>{chapter.line1}</span>
      <em>{chapter.line2}</em>
    </Tag>
  )
}

function App() {
  const appRef = useRef(null)
  const storyRef = useRef(null)
  const progress = useRef({ value: 0 })
  const [menuOpen, setMenuOpen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const activeBurger = burgers[3]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const storyTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        })

        storyTimeline.to(progress.current, { value: 1, duration: 1 }, 0)

        const chapterEls = gsap.utils.toArray('.story-copy')
        gsap.set(chapterEls, { autoAlpha: 0, y: 32 })
        gsap.set(chapterEls[0], { autoAlpha: 1, y: 0 })
        chapterEls.forEach((chapter, index) => {
          const start = index * 0.2
          if (index > 0) {
            storyTimeline.to(chapter, { autoAlpha: 1, y: 0, duration: 0.04, ease: 'power2.out' }, start - 0.005)
          }
          storyTimeline.to(chapter, { autoAlpha: 1, duration: index === chapterEls.length - 1 ? 0.155 : 0.105 }, start + 0.035)
          if (index !== chapterEls.length - 1) {
            storyTimeline.to(chapter, { autoAlpha: 0, y: -24, duration: 0.04, ease: 'power2.in' }, start + 0.145)
          }
        })

        gsap.to('.story-progress__fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: storyRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        })

        return () => {
          progress.current.value = 0
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        progress.current.value = 0.9
        gsap.set('.story-copy', { autoAlpha: 0 })
        gsap.set('.story-copy:last-of-type', { autoAlpha: 1, y: 0 })
      })

      const cards = gsap.utils.toArray('.burger-card')
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 56,
          autoAlpha: 0,
          rotation: index % 2 ? 1.5 : -1.5,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: appRef },
  )

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={appRef} className="site-shell">
      <a className="skip-link" href="#story">Skip to the story</a>

      <div className="ticker" aria-label="Restaurant update">
        <div className="ticker__track">
          <span>Open daily 12pm — late</span><i />
          <span>Ground fresh today</span><i />
          <span>Now serving Jalapeños — the Summer drop</span><i />
          <span aria-hidden="true">Open daily 12pm — late</span><i aria-hidden="true" />
          <span aria-hidden="true">Ground fresh today</span><i aria-hidden="true" />
        </div>
      </div>

      <header className="header">
        <a className="brand" href="#story" aria-label="Katër Burgers home">
          <img src="/images/logo-kater.png" alt="Katër Burgers" width="1200" height="282" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#menu">The Four</a>
          <a href="#story-section">Story</a>
          <a href="#visit">Find us</a>
        </nav>
        <a className="pill pill--blue header__cta" href="#menu">See the menu</a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#menu" onClick={closeMenu}>The Four</a>
        <a href="#story-section" onClick={closeMenu}>Story</a>
        <a href="#visit" onClick={closeMenu}>Find us</a>
      </div>

      <main>
        <section id="story" ref={storyRef} className="scroll-story" aria-label="The burger story">
          <div className="story-stage">
            <div className="story-progress" aria-hidden="true"><span className="story-progress__fill" /></div>
            <RealBurgerStack
              progress={progress}
              reduceMotion={reduceMotion}
              variant={activeBurger.model}
              name={activeBurger.name}
            />
            <div className="story-copy-wrap">
              {chapters.map((chapter, index) => (
                <article className={`story-copy story-copy--${chapter.id}`} key={chapter.id}>
                  <p className="eyebrow">{index === 0 ? `${activeBurger.number} · ${activeBurger.season} signature` : chapter.eyebrow}</p>
                  <StoryTitle
                    chapter={index === 0 ? { ...chapter, line1: activeBurger.name, line2: 'layer by layer.' } : chapter}
                    index={index}
                  />
                  <p className="story-note">{index === 0 ? activeBurger.copy : chapter.note}</p>
                  {index === 0 && (
                    <ul className="hero-ingredient-list" aria-label={`${activeBurger.name} ingredients`}>
                      {activeBurger.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                  )}
                  {chapter.cta && (
                    <div className="story-actions">
                      <a className="pill pill--blue" href="#menu">Explore the Four <ArrowIcon /></a>
                      <a className="text-link" href="#visit">Find us</a>
                    </div>
                  )}
                </article>
              ))}
            </div>
            <div className="scroll-cue" aria-hidden="true"><span>Scroll</span><i /></div>
            <p className="scene-label" aria-hidden="true">Real ingredients · Scroll-built</p>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div>Four seasons <span>✦</span> One burger <span>✦</span> Smash-grilled <span>✦</span> Never frozen <span>✦</span></div>
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The menu · The four</p>
              <h2>Four seasons.<br /><em>Four burgers.</em></h2>
            </div>
            <p>One signature build for every season, smash-grilled to order and finished with house sauces.</p>
          </div>
          <div className="burger-grid">
            {burgers.map((burger) => (
              <article className={`burger-card burger-card--${burger.tone}`} key={burger.name}>
                <div className="burger-card__topline"><span>{burger.number}</span><span>{burger.season}</span></div>
                <div className="burger-card__image-wrap">
                  <img src={burger.image} alt={`${burger.name} — ${burger.copy}`} width="1280" height="852" loading="lazy" />
                  <span className="burger-card__stamp">Smash<br />fresh</span>
                </div>
                <div className="burger-card__body">
                  <h3>{burger.name}</h3>
                  <p>{burger.copy}</p>
                  <ul aria-label={`${burger.name} ingredients`}>
                    {burger.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story-section" className="brand-story section-pad">
          <div className="brand-story__mark" aria-hidden="true">4</div>
          <div className="brand-story__copy">
            <p className="eyebrow">Our story</p>
            <h2>Four flavors,<br />one <em>obsession.</em></h2>
            <p className="brand-story__lead">We believe a burger should taste like the moment you’re in.</p>
            <p>So we built four — each tuned to its season, sourced fresh, smash-grilled to order, and finished with house sauces you won’t find anywhere else.</p>
            <p className="brand-story__bold">No frozen patties. No shortcuts. Just bold, seasonal craft.</p>
          </div>
          <div className="brand-story__principles">
            <div><span>01</span><strong>Fresh daily</strong><small>Ground in-house, never frozen</small></div>
            <div><span>02</span><strong>Seasonal sourcing</strong><small>Ingredients at their peak</small></div>
            <div><span>03</span><strong>Smash-grilled</strong><small>Crispy edges, juicy center</small></div>
            <div><span>04</span><strong>House sauces</strong><small>Recipes you can’t copy</small></div>
          </div>
        </section>

        <section id="visit" className="visit-section section-pad">
          <div className="visit-section__intro">
            <p className="eyebrow">Come say hi</p>
            <h2>Find <em>us.</em></h2>
            <p>One home, right in the heart of Tirana — dine in or grab it to go.</p>
          </div>
          <div className="location-card">
            <div className="location-card__copy">
              <span className="location-dot" />
              <h3>Tirana — 21 Dhjetori</h3>
              <p>Rruga 21 Dhjetori — right beside Ushqimore Zuna, Tiranë</p>
              <dl>
                <div><dt>Open</dt><dd>Sun – Thu · 12:00pm – 1:00am<br />Fri – Sat · 12:00pm – 3:00am</dd></div>
                <div><dt>Service</dt><dd>Dine in & takeaway</dd></div>
              </dl>
              <a className="pill pill--blue" href="https://www.google.com/maps/place/Kater+Burgers/@41.3259692,19.8038652,19z/data=!4m6!3m5!1s0x1350317118dee2f7:0x9158e3d71e372308!8m2!3d41.3259692!4d19.8038652" target="_blank" rel="noreferrer">Get directions <ArrowIcon /></a>
            </div>
            <div className="location-card__graphic" aria-hidden="true">
              <div className="map-grid" />
              <div className="map-pin"><span /></div>
              <span className="map-label">21 Dhjetori</span>
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-cta__orbit" aria-hidden="true">KATËR · BURGERS · TIRANA · </div>
          <p className="eyebrow">Come hungry</p>
          <h2>Hungry for<br /><em>the Four?</em></h2>
          <div className="closing-cta__actions">
            <a className="pill pill--cream" href="#visit">Find the location <ArrowIcon /></a>
            <a className="text-link text-link--light" href="#menu">See the menu</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/images/logo-kater.png" alt="Katër Burgers" width="1200" height="282" />
        <p>One for every season. Served cool.</p>
        <div className="footer__links"><a href="#menu">The Four</a><a href="#story-section">Story</a><a href="#visit">Find us</a></div>
        <p className="footer__legal">© 2026 Katër Burgers. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
