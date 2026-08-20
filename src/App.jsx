import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FourBurgerStage from './components/FourBurgerStage.jsx'
import { burgersBase, burgerText } from './content.js'
import { ui, useLanguage } from './i18n.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Katër Burgers, Tirana. Displayed in the national format locals recognise,
// dialled in E.164 so the link works from abroad and from saved contacts.
const PHONE_DISPLAY = '069 342 2433'
const PHONE_E164 = '+355693422433'
const WOLT_URL = 'https://wolt.com/en/alb/tirana/restaurant/kater-burgers'

// Every burger is the same price single; the double adds 200.
const PRICE_SINGLE = 700
const PRICE_DOUBLE = 900

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function LanguageSwitch({ lang, setLang, t, className = '' }) {
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      {['en', 'sq'].map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? 'is-active' : ''}
          aria-pressed={lang === code}
          aria-label={t.switchTo[code]}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function App() {
  const appRef = useRef(null)
  const storyRef = useRef(null)
  const progress = useRef({ value: 0 })
  const [menuOpen, setMenuOpen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [lang, setLang] = useLanguage()

  const t = ui[lang]
  // Non-text fields (image, accent, position) stay fixed; only the words
  // change, and every card keeps its `model` key across a language switch so
  // GSAP-animated DOM nodes are never remounted.
  const burgers = useMemo(
    () => burgersBase.map((burger) => ({ ...burger, ...burgerText[lang][burger.model] })),
    [lang],
  )

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
    { scope: appRef, dependencies: [lang] },
  )

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={appRef} className="site-shell">
      <a className="skip-link" href="#story">{t.skipLink}</a>

      <div className="ticker" aria-label={t.tickerAria}>
        <div className="ticker__track">
          {t.ticker.map((label) => (
            <React.Fragment key={label}><span>{label}</span><i /></React.Fragment>
          ))}
          {t.ticker.map((label) => (
            <React.Fragment key={`dup-${label}`}><span>{label}</span><i aria-hidden="true" /></React.Fragment>
          ))}
        </div>
      </div>

      <header className="header">
        <a className="brand" href="#story" aria-label={t.brandHome}>
          <img src="/images/logo-kater.png" alt="Katër Burgers" width="1200" height="282" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#menu">{t.nav.menu}</a>
          <a href="#why-four">{t.nav.why}</a>
          <a href="#visit">{t.nav.visit}</a>
        </nav>
        <div className="header__actions">
          <LanguageSwitch lang={lang} setLang={setLang} t={t} className="lang-switch--desktop" />
          <a className="pill pill--blue header__cta" href={WOLT_URL} target="_blank" rel="noreferrer">{t.orderOnWolt}</a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t.closeNav : t.openNav}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#menu" onClick={closeMenu}>{t.nav.menu}</a>
        <a href="#why-four" onClick={closeMenu}>{t.nav.why}</a>
        <a href="#visit" onClick={closeMenu}>{t.nav.visit}</a>
        <LanguageSwitch lang={lang} setLang={setLang} t={t} className="lang-switch--mobile" />
        <a className="pill pill--blue mobile-menu__cta" href={WOLT_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>{t.orderOnWolt}</a>
        <a className="pill mobile-menu__cta" href={`tel:${PHONE_E164}`} onClick={closeMenu}>{t.call(PHONE_DISPLAY)}</a>
      </div>

      <main>
        <section id="story" ref={storyRef} className="scroll-story" aria-label={t.story.ariaLabel}>
          <div className="story-stage">
            <div className="story-progress" aria-hidden="true"><span className="story-progress__fill" /></div>

            <FourBurgerStage burgers={burgers} progress={progress} reduceMotion={reduceMotion} />

            <div className="story-copy-wrap">
              {burgers.map((burger, index) => {
                const Tag = index === 0 ? 'h1' : 'h2'
                return (
                  <article className={`story-copy story-copy--${burger.model}`} key={burger.model}>
                    <p className="eyebrow">{t.story.burgerOf(burger.number)}</p>
                    <Tag className="story-copy__title">
                      <span>{burger.name}</span>
                      <strong>{burger.headline}</strong>
                    </Tag>
                    <p className="story-note">{burger.copy}</p>
                    <ul className="hero-ingredient-list" aria-label={`${burger.name} ${t.ariaIngredients}`}>
                      {burger.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                  </article>
                )
              })}
            </div>

            <ol className="story-index" aria-hidden="true">
              {burgers.map((burger) => (
                <li className="story-index__item" key={burger.model}>
                  <span>{burger.number}</span>{burger.name}
                </li>
              ))}
            </ol>

            <div className="scroll-cue" aria-hidden="true"><span>{t.story.scrollCue}</span><i /></div>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div>{burgers.map((burger) => <React.Fragment key={burger.model}>{burger.name} <span>·</span> </React.Fragment>)}</div>
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">{t.menu.eyebrow}</p>
              <h2>{t.menu.titleLine1}<br /><strong>{t.menu.titleStrong}</strong></h2>
            </div>
            <p>{t.menu.body}</p>
          </div>

          <div className="burger-grid">
            {burgers.map((burger) => (
              <article className="burger-card" key={burger.model} style={{ '--burger-accent': burger.accent }}>
                <div className="burger-card__topline"><span>{burger.number} / 04</span><span>Katër Burgers</span></div>
                <div className="burger-card__image-wrap">
                  <img src={burger.image} alt={t.burgerAlt(burger.name)} width="1280" height="852" loading="lazy" />
                  <span className="burger-card__badge">{t.menu.badgeLine1}<br />{t.menu.badgeLine2}</span>
                </div>
                <div className="burger-card__body">
                  <p className="burger-card__headline">{burger.headline}</p>
                  <div className="burger-card__title-row">
                    <h3>{burger.name}</h3>
                    <p className="burger-card__price">
                      <strong>{PRICE_SINGLE} L</strong>
                      <span>{t.menu.double(PRICE_DOUBLE)}</span>
                    </p>
                  </div>
                  <p>{burger.copy}</p>
                  <ul aria-label={`${burger.name} ${t.ariaIngredients}`}>
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
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2>{t.why.titleLine1}<br /><strong>{t.why.titleStrong}</strong></h2>
            <p className="brand-story__lead">{t.why.lead}</p>
            <p>{t.why.body}</p>
          </div>
          <div className="brand-story__principles reveal">
            {t.why.principles.map((item) => (
              <div key={item.n}><span>{item.n}</span><strong>{item.title}</strong><small>{item.body}</small></div>
            ))}
          </div>
        </section>

        <section id="visit" className="visit-section section-pad">
          <div className="visit-section__intro reveal">
            <p className="eyebrow">{t.visit.eyebrow}</p>
            <h2>{t.visit.titleLine1}<br /><strong>{t.visit.titleStrong}</strong></h2>
            <p>{t.visit.body}</p>
          </div>
          <div className="location-card reveal">
            <div className="location-card__copy">
              <span className="location-dot" />
              <h3>Katër Burgers</h3>
              <p>{t.visit.address}</p>
              <dl>
                <div><dt>{t.visit.open}</dt><dd>{t.visit.hours1}<br />{t.visit.hours2}</dd></div>
                <div><dt>{t.visit.service}</dt><dd>{t.visit.serviceValue}</dd></div>
              </dl>
              <div className="location-card__actions">
                <a className="pill pill--blue" href={WOLT_URL} target="_blank" rel="noreferrer">{t.orderOnWolt} <ArrowIcon /></a>
                <a className="pill" href={`tel:${PHONE_E164}`}>{t.callDot(PHONE_DISPLAY)}</a>
                <a className="pill" href="https://www.google.com/maps/place/Kater+Burgers/@41.3259692,19.8038652,19z/data=!4m6!3m5!1s0x1350317118dee2f7:0x9158e3d71e372308!8m2!3d41.3259692!4d19.8038652" target="_blank" rel="noreferrer">{t.visit.directions} <ArrowIcon /></a>
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
          <p className="eyebrow">{t.closing.eyebrow}</p>
          <h2>{t.closing.titleLine1}<br /><strong>{t.closing.titleStrong}</strong></h2>
          <div className="closing-cta__actions">
            <a className="pill pill--cream" href={WOLT_URL} target="_blank" rel="noreferrer">{t.orderOnWolt} <ArrowIcon /></a>
            <a className="text-link text-link--light" href={`tel:${PHONE_E164}`}>{t.orCall(PHONE_DISPLAY)}</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/images/logo-kater.png" alt="Katër Burgers" width="1200" height="282" />
        <p>{t.footer.tagline}</p>
        <div className="footer__links"><a href="#menu">{t.nav.menu}</a><a href="#why-four">{t.nav.why}</a><a href="#visit">{t.nav.visit}</a></div>
        <p className="footer__legal">{t.footer.legal}</p>
      </footer>
    </div>
  )
}

export default App
