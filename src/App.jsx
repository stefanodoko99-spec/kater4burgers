import React, { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { burgersBase, burgerText } from './content.js'
import { LANG_NAMES, LANGS, ui, useLanguage } from './i18n.js'
import { ratingSummary, reviews } from './reviews.js'

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

const STAR_PATH = 'M12 2.6l2.83 6.28 6.89.66-5.2 4.6 1.55 6.76L12 17.6l-6.07 3.3 1.55-6.76-5.2-4.6 6.89-.66z'

function Stars({ rating, label }) {
  const full = Math.round(rating)
  return (
    <span className="stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className={i < full ? 'is-filled' : ''}>
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}

// A native <select> rather than a custom listbox: it is one tap on mobile,
// where this control now sits in place of the old nav button, and it comes
// with keyboard support and the platform's own picker for free.
function LanguageSelect({ lang, setLang, t }) {
  return (
    <div className="lang-select">
      <svg className="lang-select__globe" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
      <select value={lang} onChange={(event) => setLang(event.target.value)} aria-label={t.languageLabel}>
        {LANGS.map((code) => (
          <option key={code} value={code}>{LANG_NAMES[code]}</option>
        ))}
      </select>
      <svg className="lang-select__chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}

function App() {
  const appRef = useRef(null)
  const [lang, setLang] = useLanguage()

  const t = ui[lang]
  const burgers = useMemo(
    () => burgersBase.map((burger) => ({ ...burger, ...burgerText[lang][burger.model] })),
    [lang],
  )

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Every animation lives inside the no-preference branch, so under
      // prefers-reduced-motion nothing runs and each element simply stays at
      // its natural, visible state - no separate fallback to keep in sync.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
      })

      return () => mm.revert()
    },
    { scope: appRef },
  )


  return (
    <div ref={appRef} className="site-shell">
      <a className="skip-link" href="#menu">{t.skipLink}</a>

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
        <div className="header__actions">
          <LanguageSelect lang={lang} setLang={setLang} t={t} />
          <a className="pill pill--blue header__cta" href={WOLT_URL} target="_blank" rel="noreferrer">{t.orderOnWolt}</a>
        </div>
      </header>

      <main>
        <section id="story" className="hero">
          <div className="hero__copy">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 className="hero__title">{t.hero.titleLine1}<strong>{t.hero.titleStrong}</strong></h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__actions">
              <a className="pill pill--blue" href={WOLT_URL} target="_blank" rel="noreferrer">{t.orderOnWolt} <ArrowIcon /></a>
              <a className="pill" href={`tel:${PHONE_E164}`}>{t.callDot(PHONE_DISPLAY)}</a>
            </div>
            <a className="hero__rating" href={ratingSummary.url} target="_blank" rel="noreferrer">
              <Stars rating={ratingSummary.value} label={t.reviews.ratingOf(ratingSummary.value.toFixed(1))} />
              <span><strong>{ratingSummary.value.toFixed(1)}</strong> · {t.reviews.countLabel(ratingSummary.count)}</span>
            </a>
          </div>

          <figure className="hero__card">
            <img
              src="/images/bloom.jpg"
              alt={t.burgerAlt(burgers[0].name)}
              width="1280"
              height="852"
              fetchPriority="high"
            />
            <figcaption>
              <span>{t.hero.priceLabel}</span>
              <strong>{PRICE_SINGLE} L</strong>
            </figcaption>
          </figure>
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
          </div>
          <div className="brand-story__principles reveal">
            {t.why.principles.map((item) => (
              <div key={item.n}><span>{item.n}</span><strong>{item.title}</strong><small>{item.body}</small></div>
            ))}
          </div>
        </section>

        <section id="reviews" className="reviews-section section-pad">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">{t.reviews.eyebrow}</p>
              <h2>{t.reviews.titleLine1}<br /><strong>{t.reviews.titleStrong}</strong></h2>
            </div>
            <a className="reviews-summary" href={ratingSummary.url} target="_blank" rel="noreferrer">
              <span className="reviews-summary__value">{ratingSummary.value.toFixed(1)}</span>
              <Stars rating={ratingSummary.value} label={t.reviews.ratingOf(ratingSummary.value.toFixed(1))} />
              <span className="reviews-summary__count">{t.reviews.countLabel(ratingSummary.count)}</span>
            </a>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card reveal" key={review.author}>
                <Stars rating={review.rating} label={t.reviews.ratingOf(review.rating)} />
                <p className="review-card__text">“{review.text}”</p>
                <p className="review-card__author">
                  {review.author}
                  <span>{t.reviews.googleReview}</span>
                </p>
              </article>
            ))}
          </div>

          <a className="text-link reveal" href={ratingSummary.url} target="_blank" rel="noreferrer">{t.reviews.seeAll}</a>
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
