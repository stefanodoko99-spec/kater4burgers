import React, { useEffect, useRef } from 'react'

const STACKS = {
  bloom: {
    folder: 'bloom',
    layers: [
      ['bloom-01-top-bun.png', 1],
      ['bloom-02-tomato.png', 34],
      ['bloom-03-american-cheddar.png', 41],
      ['bloom-04-smash-beef.png', 46],
      ['bloom-05-lettuce.png', 52],
      ['bloom-06-bottom-bun.png', 56],
    ],
    spread: [-0.24, -0.13, -0.035, 0.105, 0.21, 0.33],
  },
  jalapenos: {
    folder: 'jalapenos',
    layers: [
      ['jalapenos-01-top-bun.png', 0],
      ['jalapenos-02-jalapenos.png', 34],
      ['jalapenos-03-herb-cream-sauce.png', 41],
      ['jalapenos-04-american-cheese.png', 43],
      ['jalapenos-05-smash-beef.png', 50],
      ['jalapenos-06-bottom-bun.png', 57],
    ],
    spread: [-0.24, -0.14, -0.045, 0.045, 0.18, 0.32],
  },
  oklahoma: {
    folder: 'oklahoma',
    layers: [
      ['oklahoma-01-top-bun.png', 0],
      ['oklahoma-02-american-cheddar.png', 40],
      ['oklahoma-03-smash-beef.png', 48],
      ['oklahoma-04-caramelized-onions.png', 55],
      ['oklahoma-05-bottom-bun.png', 58],
    ],
    spread: [-0.23, -0.09, 0.07, 0.2, 0.33],
  },
  classic: {
    folder: 'classic-generated/final',
    layers: [
      ['classic-ai-01-top-bun.png', -7],
      ['classic-ai-02-pickles.png', 31],
      ['classic-ai-03-cheddar.png', 34],
      ['classic-ai-04-smash-beef.png', 43],
      ['classic-ai-05-house-sauce.png', 47],
      ['classic-ai-06-bottom-bun.png', 50],
    ],
    spread: [-0.23, -0.14, -0.04, 0.13, 0.245, 0.375],
  },
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const range = (value, start, end) => clamp((value - start) / (end - start))
const smooth = (value) => value * value * (3 - 2 * value)

export default function FourBurgerStage({ burgers, progress, reduceMotion }) {
  const sceneRefs = useRef([])
  const layerRefs = useRef([])

  useEffect(() => {
    let frameId

    const render = () => {
      const p = reduceMotion ? 0.875 : progress.current.value
      const isMobile = window.innerWidth <= 760
      const segment = 1 / burgers.length
      const separationUnit = Math.min(
        window.innerWidth * (isMobile ? 0.52 : 0.28),
        isMobile ? 250 : 430,
      )

      burgers.forEach((burger, burgerIndex) => {
        const scene = sceneRefs.current[burgerIndex]
        if (!scene) return

        const local = (p - burgerIndex * segment) / segment
        const enter = burgerIndex === 0
          ? 1
          : smooth(range(local, -0.16, 0.08))
        const exit = burgerIndex === burgers.length - 1
          ? 1
          : 1 - smooth(range(local, 0.8, 1.08))
        const visibility = enter * exit
        const expand = smooth(range(local, 0.12, 0.43))
        const rebuild = smooth(range(local, 0.55, 0.78))
        const separation = reduceMotion ? 0 : expand * (1 - rebuild)
        const enterY = (1 - enter) * (isMobile ? 32 : 56)
        const exitY = smooth(range(local, 0.84, 1.08)) * (isMobile ? -30 : -54)
        const scale = 0.92 + enter * 0.08 - (1 - exit) * 0.045
        const rotateY = (1 - enter) * 5 - (1 - exit) * 4

        scene.style.opacity = String(visibility)
        scene.style.visibility = visibility < 0.01 ? 'hidden' : 'visible'
        scene.style.transform = `translate3d(-50%, calc(-50% + ${enterY + exitY}px), 0) scale(${scale}) rotateY(${rotateY}deg)`

        const stack = STACKS[burger.model]
        layerRefs.current[burgerIndex]?.forEach((layer, layerIndex) => {
          if (!layer) return
          const y = stack.spread[layerIndex] * separationUnit * separation
          const z = (stack.layers.length - layerIndex) * 7 * separation
          layer.style.transform = `translate3d(0, ${y}px, ${z}px)`
        })
      })

      frameId = window.requestAnimationFrame(render)
    }

    frameId = window.requestAnimationFrame(render)
    return () => window.cancelAnimationFrame(frameId)
  }, [burgers, progress, reduceMotion])

  return (
    <div className="four-burger-stage" role="img" aria-label="Four Katër burgers shown one by one with their ingredient layers">
      {burgers.map((burger, burgerIndex) => {
        const stack = STACKS[burger.model]
        return (
          <figure
            className="burger-scene"
            data-burger={burger.model}
            key={burger.name}
            ref={(node) => { sceneRefs.current[burgerIndex] = node }}
            style={{ '--burger-accent': burger.accent }}
            aria-hidden="true"
          >
            <span className="burger-scene__halo" />
            <span className="burger-scene__number">{burger.number}</span>
            {stack.layers.map(([file, top], layerIndex) => (
              <img
                className="burger-scene__layer"
                src={`/images/ingredients/${stack.folder}/${file}`}
                alt=""
                decoding="async"
                draggable="false"
                key={file}
                ref={(node) => {
                  if (!layerRefs.current[burgerIndex]) layerRefs.current[burgerIndex] = []
                  layerRefs.current[burgerIndex][layerIndex] = node
                }}
                style={{ top: `${top}%`, zIndex: stack.layers.length - layerIndex + 2 }}
              />
            ))}
          </figure>
        )
      })}
    </div>
  )
}
