import React, { useEffect, useMemo, useRef } from 'react'

const STACKS = {
  bloom: [
    ['bloom-01-top-bun.png', 'Brioche top bun', 1],
    ['bloom-02-tomato.png', 'Tomato', 34],
    ['bloom-03-american-cheddar.png', 'American cheddar', 41],
    ['bloom-04-smash-beef.png', 'Smash beef', 46],
    ['bloom-05-lettuce.png', 'Lettuce', 52],
    ['bloom-06-bottom-bun.png', 'Bottom bun', 56],
  ],
  jalapenos: [
    ['jalapenos-01-top-bun.png', 'Brioche top bun', 0],
    ['jalapenos-02-jalapenos.png', 'Jalapeños', 34],
    ['jalapenos-03-herb-cream-sauce.png', 'Herb cream sauce', 41],
    ['jalapenos-04-american-cheese.png', 'American cheese', 43],
    ['jalapenos-05-smash-beef.png', 'Smash beef', 50],
    ['jalapenos-06-bottom-bun.png', 'Bottom bun', 57],
  ],
  oklahoma: [
    ['oklahoma-01-top-bun.png', 'Brioche top bun', 0],
    ['oklahoma-02-american-cheddar.png', 'American cheddar', 40],
    ['oklahoma-03-smash-beef.png', 'Smash beef', 48],
    ['oklahoma-04-caramelized-onions.png', 'Caramelized onions', 55],
    ['oklahoma-05-bottom-bun.png', 'Bottom bun', 58],
  ],
  classic: [
    ['classic-ai-01-top-bun.png', 'Brioche top bun', -7],
    ['classic-ai-02-pickles.png', 'Pickles', 31],
    ['classic-ai-03-cheddar.png', 'American cheddar', 34],
    ['classic-ai-04-smash-beef.png', 'Smash beef', 43],
    ['classic-ai-05-house-sauce.png', 'House sauce', 47],
    ['classic-ai-06-bottom-bun.png', 'Bottom bun', 50],
  ],
}

const ASSET_FOLDERS = {
  classic: 'classic-generated/final',
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const range = (value, start, end) => clamp((value - start) / (end - start))
const smooth = (value) => value * value * (3 - 2 * value)

const CLASSIC_EXPLODED_Y = [-0.23, -0.14, -0.04, 0.13, 0.245, 0.375]

export default function RealBurgerStack({ progress, reduceMotion, variant = 'classic', name = 'Classic' }) {
  const bodyRef = useRef(null)
  const layerRefs = useRef([])
  const layers = useMemo(() => STACKS[variant] ?? STACKS.classic, [variant])
  const assetFolder = ASSET_FOLDERS[variant] ?? variant

  useEffect(() => {
    let frameId

    const render = () => {
      const body = bodyRef.current
      if (!body) return

      const p = reduceMotion ? 1 : progress.current.value
      // Let the full product photo finish fading before its matching layer stack opens.
      const expand = smooth(range(p, 0.14, 0.27))
      const collapse = smooth(range(p, 0.32, 0.49))
      const separation = expand * (1 - collapse)
      const isMobile = window.innerWidth <= 900
      const unit = Math.min(window.innerWidth * (isMobile ? 0.76 : 0.3), isMobile ? 640 : 480)
      const drop = reduceMotion ? 0 : smooth(range(p, 0.84, 1))
      const bodyY = (isMobile ? -24 : 0) + drop * window.innerHeight * (isMobile ? 0.74 : 0.7)
      const exit = reduceMotion ? 1 : 1 - smooth(range(p, 0.955, 1))

      body.style.opacity = String(exit)
      body.style.transform = `translate3d(-50%, calc(-50% + ${bodyY}px), 0)`

      const middle = (layers.length - 1) / 2
      layerRefs.current.forEach((layer, index) => {
        if (!layer) return
        const distance = index - middle
        const expandedY = variant === 'classic' ? CLASSIC_EXPLODED_Y[index] : distance * 0.11
        const y = expandedY * unit * separation
        layer.style.transform = `translate3d(0, ${y}px, 0)`
      })

      frameId = window.requestAnimationFrame(render)
    }

    frameId = window.requestAnimationFrame(render)
    return () => window.cancelAnimationFrame(frameId)
  }, [layers, progress, reduceMotion, variant])

  return (
    <div className="real-burger-stack" role="img" aria-label={`${name} burger assembled from its real ingredient photography`}>
      <div className="real-burger-stack__body" ref={bodyRef}>
        {layers.map(([file, label, top], index) => (
          <img
            className="real-burger-layer"
            src={`/images/ingredients/${assetFolder}/${file}`}
            alt=""
            aria-hidden="true"
            decoding="async"
            draggable="false"
            key={file}
            ref={(node) => { layerRefs.current[index] = node }}
            style={{ top: `${top}%`, zIndex: layers.length - index }}
            title={label}
          />
        ))}
      </div>
    </div>
  )
}
