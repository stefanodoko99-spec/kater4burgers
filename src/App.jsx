import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FourBurgerStage from './components/FourBurgerStage.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Katër Burgers, Tirana. Displayed in the national format locals recognise,
// dialled in E.164 so the link works from abroad and from saved contacts.
const PHONE_DISPLAY = '069 342 2433'
const PHONE_E164 = '+355693422433'

const burgers = [
  {
    number: '01',
    name: 'Bloom',
    model: 'bloom',
    accent: '#b9e58c',
    image: '/images/bloom.jpg',
    headline: 'Fresh crunch. Hard sear.',
    copy: 'Tomato and lettuce bring the crunch; cheddar and smashed beef bring the weight.',
    ingredients: ['Brioche bun', 'Tomato', 'American cheddar', 'Smash beef', 'Lettuce'],
  },
  {
    number: '02',
    name: 'Jalapeños',
    model: 'jalapenos',
    accent: '#f3df65',
    image: '/images/jalapenos.jpg',
    headline: 'Creamy heat. Clean finish.',
    copy: 'Jalapeños cut through herb cream sauce, American cheese and smashed beef.',
    ingredients: ['Brioche bun', 'Jalapeños', 'Herb cream sauce', 'American cheese', 'Smash beef'],
  },
  {
    number: '03',
    name: 'Oklahoma',
    model: 'oklahoma',
    accent: '#f3b57a',
    image: '/images/oklahoma.jpg',
    headline: 'Sweet onions. Crispy edges.',
    copy: 'Caramelized onions, cheddar and smashed beef in a stripped-back build.',
    ingredients: ['Brioche bun', 'American cheddar', 'Smash beef', 'Caramelized onions'],
  },
  {
    number: '04',
    name: 'Classic',
    model: 'classic',
    accent: '#9db8ff',
    image: '/images/classic.jpg',
    headline: 'Everything a smash needs.',
    copy: 'Pickles, American cheddar, smashed beef and house sauce. Direct and balanced.',
    ingredients: ['Brioche bun', 'Pickles', 'American cheddar', 'Smash beef', 'House sauce'],
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function App() {
  const appRef = useRef(null)
  const storyRef = useRef(null)
  const progress = useRef({ value: 0 })
  const [menuOpen, setMenuOpen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

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
        const indexEls = gsap.utils.toArray('.story-index__item')
        gsap.set(chapterEls, { autoAlpha: 0, y: 28 })
        gsap.set(chapterEls[0], { autoAlpha: 1, y: 0 })
        gsap.set(indexEls, { opacity: 0.34, x: 0 })
        gsap.set(indexEls[0], { opacity: 1, x: -8 })

        chapterEls.forEach((chapter, index) => {
          const start = index / burgers.length
          const end = (index + 1) / burgers.length
          if (index > 0) {
            storyTimeline.to(chapter, { autoAlpha: 1, y: 0, duration: 0.035, ease: 'power2.out' }, start - 0.015)
            storyTimeline.to(indexEls[index], { opacity: 1, x: -8, duration: 0.035 }, start - 0.015)
          }
          if (index < chapterEls.length - 1) {
            storyTimeline.to(chapter, { autoAlpha: 0, y: -22, duration: 0.035, ease: 'power2.in' }, end - 0.045)
            storyTimeline.to(indexEls[index], { opacity: 0.34, x: 0, duration: 0.035 }, end - 0.045)
          }
        })

        gsap.to('.story-progress__fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })

        gsap.utils.toArray('.reveal').forEach((section) => {
          gsap.from(section, {
            y: 20,
            autoAlpha: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 86%', once: true },
          })
        })

        gsap.from('.burger-card', {
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.burger-grid', start: 'top 82%', once: true },
        })

        return () => {
          progress.current.value = 0
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        progress.current.value = 0.125
        gsap.set('.story-copy', { autoAlpha: 0 })
        gsap.set('.story-copy:first-of-type', { autoAlpha: 1, y: 0 })
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
      <a className="skip-link" href="#story">Skip to the four burgers</a>

      <div className="ticker" aria-label="Katër Burgers highlights">
        <div className="ticker__track">
          <span>Four burgers</span><i />
          <span>Smashed to order</span><i />
          <span>21 Dhjetori · Tirana</span><i />
          <span>Four burgers</span><i aria-hidden="true" />
          <span>Smashed to order</span><i aria-hidden="true" />
          <span>21 Dhjetori · Tirana</span><i aria-hidden="true" />
        </div>
      </div>

      <header className="header">
        <a className="brand" href="#story" aria-label="Katër Burgers home">
          <img src="/images/logo-kater.png" alt="Katër Burgers" width="1200" height="282" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#menu">Four burgers</a>
          <a href="#why-four">Why four</a>
          <a href="#visit">Tirana</a>
        </nav>
        <a className="pill pill--blue header__cta" href="#menu">Pick your burger</a>
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
        <a href="#menu" onClick={closeMenu}>Four burgers</a>
        <a href="#why-four" onClick={closeMenu}>Why four</a>
        <a href="#visit" onClick={closeMenu}>Tirana</a>
        <a className="pill pill--blue mobile-menu__cta" href={`tel:${PHONE_E164}`} onClick={closeMenu}>Call to order</a>
      </div>

      <main>
        <section id="story" ref={storyRef} className="scroll-story" aria-label="Meet the four Katër burgers">
          <div className="story-stage">
            <div className="story-progress" aria-hidden="true"><span className="story-progress__fill" /></div>

            <FourBurgerStage burgers={burgers} progress={progress} reduceMotion={reduceMotion} />

            <div className="story-copy-wrap">
              {burgers.map((burger, index) => {
                const Tag = index === 0 ? 'h1' : 'h2'
                return (
                  <article className={`story-copy story-copy--${burger.model}`} key={burger.name}>
                    <p className="eyebrow">Burger {burger.number} / 04</p>
                    <Tag className="story-copy__title">
                      <span>{burger.name}</span>
                      <strong>{burger.headline}</strong>
                    </Tag>
                    <p className="story-note">{burger.copy}</p>
                    <ul className="hero-ingredient-list" aria-label={`${burger.name} ingredients`}>
                      {burger.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                  </article>
                )
              })}
            </div>

            <ol className="story-index" aria-hidden="true">
              {burgers.map((burger) => (
                <li className="story-index__item" key={burger.name}>
                  <span>{burger.number}</span>{burger.name}
                </li>
              ))}
            </ol>

            <div className="scroll-cue" aria-hidden="true"><span>Scroll through all four</span><i /></div>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div>Bloom <span>·</span> Jalapeños <span>·</span> Oklahoma <span>·</span> Classic <span>·</span></div>
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">The complete menu</p>
              <h2>Four burgers.<br /><strong>Pick your stack.</strong></h2>
            </div>
            <p>No filler builds. Four distinct burgers, smashed to order and finished exactly as listed.</p>
          </div>

          <div className="burger-grid">
            {burgers.map((burger) => (
              <article className="burger-card" key={burger.name} style={{ '--burger-accent': burger.accent }}>
                <div className="burger-card__topline"><span>{burger.number} / 04</span><span>Katër Burgers</span></div>
                <div className="burger-card__image-wrap">
                  <img src={burger.image} alt={`${burger.name} burger`} width="1280" height="852" loading="lazy" />
                  <span className="burger-card__badge">Smashed<br />to order</span>
                </div>
                <div className="burger-card__body">
                  <p className="burger-card__headline">{burger.headline}</p>
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

        <section id="why-four" className="brand-story section-pad">
          <div className="brand-story__mark" aria-hidden="true">4</div>
          <div className="brand-story__copy reveal">
            <p className="eyebrow">Why four?</p>
            <h2>A short menu.<br />A serious <strong>smash.</strong></h2>
            <p className="brand-story__lead">Four builds let every ingredient have a job.</p>
            <p>Bloom brings freshness. Jalapeños brings heat. Oklahoma brings onions and sear. Classic keeps the balance tight.</p>
          </div>
          <div className="brand-story__principles reveal">
            <div><span>01</span><strong>Four builds</strong><small>Clear choices, distinct flavor</small></div>
            <div><span>02</span><strong>Fresh beef</strong><small>Smashed for crisp edges</small></div>
            <div><span>03</span><strong>Real layers</strong><small>Every ingredient earns its place</small></div>
            <div><span>04</span><strong>Built to order</strong><small>Assembled when you choose</small></div>
          </div>
        </section>

        <section id="visit" className="visit-section section-pad">
          <div className="visit-section__intro reveal">
            <p className="eyebrow">Where to get the four</p>
            <h2>21 Dhjetori.<br /><strong>Tirana.</strong></h2>
            <p>Choose your burger, dine in or take it with you.</p>
          </div>
          <div className="location-card reveal">
            <div className="location-card__copy">
              <span className="location-dot" />
              <h3>Katër Burgers</h3>
              <p>Rruga e Kavajës, Kryqëzimi 21 Dhjetori — beside Ushqimore Zuna, Tiranë 1001</p>
              <dl>
                <div><dt>Open</dt><dd>Sun – Thu · 12:00 – 01:00<br />Fri – Sat · 12:00 – 03:00</dd></div>
                <div><dt>Service</dt><dd>Dine in & takeaway</dd></div>
              </dl>
              <div className="location-card__actions">
                <a className="pill pill--blue" href={`tel:${PHONE_E164}`}>Call to order · {PHONE_DISPLAY}</a>
                <a className="pill" href="https://www.google.com/maps/place/Kater+Burgers/@41.3259692,19.8038652,19z/data=!4m6!3m5!1s0x1350317118dee2f7:0x9158e3d71e372308!8m2!3d41.3259692!4d19.8038652" target="_blank" rel="noreferrer">Get directions <ArrowIcon /></a>
              </div>
            </div>
            <div className="location-card__graphic" aria-hidden="true">
              <span className="location-card__four">4</span>
              <div className="map-pin"><span /></div>
              <span className="map-label">21 Dhjetori</span>
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <p className="eyebrow">You know the four</p>
          <h2>Which one<br /><strong>are you ordering?</strong></h2>
          <div className="closing-cta__actions">
            <a className="pill pill--cream" href={`tel:${PHONE_E164}`}>Call to order <ArrowIcon /></a>
            <a className="text-link text-link--light" href="#menu">Compare the four</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/images/logo-kater.png" alt="Katër Burgers" width="1200" height="282" />
        <p>Four burgers. One address. Tirana.</p>
        <div className="footer__links"><a href="#menu">Four burgers</a><a href="#why-four">Why four</a><a href="#visit">Tirana</a></div>
        <p className="footer__legal">© 2026 Katër Burgers. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
