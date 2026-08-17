import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const COLORS = {
  bun: '#c86f22',
  bunLight: '#e89b3f',
  beef: '#4a1f13',
  char: '#24100b',
  cheese: '#f2a91c',
  lettuce: '#5d9238',
  tomato: '#d9452f',
  onion: '#f2d9db',
  pickle: '#4d7e38',
  cream: '#f7f9ff',
  paper: '#ffffff',
  blue: '#244ac8',
  red: '#e13a2c',
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const range = (value, start, end) => clamp((value - start) / (end - start))
const smooth = (value) => value * value * (3 - 2 * value)
const mix = (from, to, value) => from + (to - from) * smooth(clamp(value))

function Material({ color, roughness = 0.68, metalness = 0 }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
}

function SesameSeeds() {
  const seeds = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => {
        const angle = index * 2.39996
        const radius = 0.28 + ((index * 37) % 100) / 100 * 1.18
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius * 0.8
        const dome = Math.sqrt(Math.max(0, 1 - (x * x) / 2.65 - (z * z) / 1.9))
        return { x, z, y: 0.23 + dome * 0.55, rot: angle + 0.35 }
      }),
    [],
  )

  return seeds.map((seed, index) => (
    <mesh key={index} position={[seed.x, seed.y, seed.z]} rotation={[0.2, seed.rot, 0.15]} scale={[0.055, 0.018, 0.13]}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial color="#fff0bd" roughness={0.8} />
    </mesh>
  ))
}

function TopBun({ partRef }) {
  return (
    <group ref={partRef}>
      <mesh scale={[1.08, 0.72, 0.94]} castShadow receiveShadow>
        <sphereGeometry args={[1.72, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Material color={COLORS.bunLight} roughness={0.58} />
      </mesh>
      <mesh position={[0, 0.02, 0]} scale={[1.06, 0.16, 0.92]} castShadow>
        <sphereGeometry args={[1.7, 40, 16]} />
        <Material color={COLORS.bun} roughness={0.66} />
      </mesh>
      <SesameSeeds />
    </group>
  )
}

function BottomBun({ partRef }) {
  return (
    <group ref={partRef}>
      <mesh scale={[1.08, 0.32, 0.94]} castShadow receiveShadow>
        <sphereGeometry args={[1.7, 40, 18]} />
        <Material color={COLORS.bunLight} roughness={0.62} />
      </mesh>
      <mesh position={[0, -0.13, 0]} scale={[1.04, 0.19, 0.9]} castShadow>
        <sphereGeometry args={[1.68, 40, 16]} />
        <Material color={COLORS.bun} roughness={0.7} />
      </mesh>
    </group>
  )
}

function Patty({ partRef }) {
  const edgePieces = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({ angle: (i / 18) * Math.PI * 2, scale: 0.12 + (i % 3) * 0.025 })),
    [],
  )
  return (
    <group ref={partRef}>
      <mesh castShadow receiveShadow scale={[1, 0.78, 0.92]}>
        <cylinderGeometry args={[1.56, 1.5, 0.46, 36, 2]} />
        <Material color={COLORS.beef} roughness={0.92} />
      </mesh>
      {edgePieces.map((piece, index) => (
        <mesh
          key={index}
          position={[Math.cos(piece.angle) * 1.5, -0.1 + (index % 2) * 0.16, Math.sin(piece.angle) * 1.36]}
          scale={piece.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <Material color={index % 4 === 0 ? COLORS.char : COLORS.beef} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function Cheese({ partRef }) {
  return (
    <group ref={partRef} rotation={[0, Math.PI / 4, 0]}>
      <RoundedBox args={[2.65, 0.12, 2.65]} radius={0.12} smoothness={4} castShadow>
        <Material color={COLORS.cheese} roughness={0.62} />
      </RoundedBox>
      {[[-1.1, -0.17, 0], [1.1, -0.17, 0], [0, -0.17, 1.1], [0, -0.17, -1.1]].map((position, index) => (
        <mesh key={index} position={position} rotation={[0, 0, index % 2 ? -0.18 : 0.18]}>
          <sphereGeometry args={[0.35, 16, 10]} />
          <Material color={COLORS.cheese} roughness={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function Lettuce({ partRef }) {
  return (
    <group ref={partRef}>
      <mesh scale={[1, 0.12, 0.9]}>
        <sphereGeometry args={[1.68, 32, 14]} />
        <Material color={COLORS.lettuce} roughness={0.92} />
      </mesh>
      {Array.from({ length: 16 }, (_, index) => {
        const angle = (index / 16) * Math.PI * 2
        return (
          <mesh key={index} position={[Math.cos(angle) * 1.58, 0, Math.sin(angle) * 1.42]} scale={[0.34, 0.07, 0.34]}>
            <sphereGeometry args={[1, 12, 8]} />
            <Material color={index % 2 ? '#7dac49' : COLORS.lettuce} roughness={1} />
          </mesh>
        )
      })}
    </group>
  )
}

function Tomato({ partRef }) {
  return (
    <group ref={partRef}>
      {[-0.56, 0.56].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, 0.03]} castShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.16, 32]} />
          <Material color={COLORS.tomato} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function Pickles({ partRef }) {
  return (
    <group ref={partRef}>
      {[[-0.55, -0.03, 0.55], [0.55, -0.03, 0.5], [0, -0.02, -0.55]].map((position, index) => (
        <mesh key={index} position={position} rotation={[0, index * 0.4, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.11, 22]} />
          <Material color={COLORS.pickle} roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function Jalapenos({ partRef }) {
  return (
    <group ref={partRef}>
      {[[-0.62, 0, 0.45], [0.52, 0, 0.34], [0, 0, -0.5]].map((position, index) => (
        <mesh key={index} position={position} rotation={[Math.PI / 2, 0, index * 0.45]}>
          <torusGeometry args={[0.4, 0.14, 12, 30]} />
          <Material color={index % 2 ? '#497b32' : '#5d913a'} roughness={0.88} />
        </mesh>
      ))}
    </group>
  )
}

function CaramelizedOnions({ partRef }) {
  return (
    <group ref={partRef}>
      {[-0.7, 0, 0.7].map((x, index) => (
        <mesh key={x} position={[x, 0, (index - 1) * 0.16]} rotation={[Math.PI / 2, 0, index * 0.32]}>
          <torusGeometry args={[0.5, 0.105, 10, 28]} />
          <Material color={index % 2 ? '#c68b5b' : '#a9653d'} roughness={0.82} />
        </mesh>
      ))}
    </group>
  )
}

function SauceLayer({ partRef, color = '#f2e6cb' }) {
  return (
    <group ref={partRef}>
      <mesh scale={[1, 0.12, 0.9]}>
        <sphereGeometry args={[1.5, 32, 12]} />
        <Material color={color} roughness={0.6} />
      </mesh>
      {[-1.15, -0.38, 0.38, 1.15].map((x, index) => (
        <mesh key={x} position={[x, -0.08 - (index % 2) * 0.06, 0.58]} scale={[0.25, 0.2, 0.18]}>
          <sphereGeometry args={[1, 12, 8]} />
          <Material color={color} roughness={0.62} />
        </mesh>
      ))}
    </group>
  )
}

const BURGER_LAYERS = {
  bloom: ['bottom', 'lettuce', 'patty', 'cheese', 'tomato', 'top'],
  jalapenos: ['bottom', 'patty', 'cheese', 'herbCream', 'jalapenos', 'top'],
  oklahoma: ['bottom', 'onions', 'patty', 'cheese', 'top'],
  classic: ['bottom', 'houseSauce', 'patty', 'cheese', 'pickles', 'top'],
}

function BurgerLayer({ type, partRef }) {
  if (type === 'bottom') return <BottomBun partRef={partRef} />
  if (type === 'lettuce') return <Lettuce partRef={partRef} />
  if (type === 'patty') return <Patty partRef={partRef} />
  if (type === 'cheese') return <Cheese partRef={partRef} />
  if (type === 'tomato') return <Tomato partRef={partRef} />
  if (type === 'pickles') return <Pickles partRef={partRef} />
  if (type === 'jalapenos') return <Jalapenos partRef={partRef} />
  if (type === 'onions') return <CaramelizedOnions partRef={partRef} />
  if (type === 'herbCream') return <SauceLayer partRef={partRef} color="#f0ead8" />
  if (type === 'houseSauce') return <SauceLayer partRef={partRef} color="#f0ba69" />
  return <TopBun partRef={partRef} />
}

function Burger({ progress, burgerRef, variant }) {
  const partRefs = useRef([])
  const layers = BURGER_LAYERS[variant] ?? BURGER_LAYERS.bloom

  const setPartRef = (index) => (node) => {
    partRefs.current[index] = node
  }

  useFrame(() => {
    const p = progress.current.value
    const expand = range(p, 0.07, 0.2)
    const collapse = range(p, 0.22, 0.42)
    const separation = smooth(expand) * (1 - smooth(collapse))
    const enterBox = range(p, 0.62, 0.82)
    const finale = range(p, 0.84, 1)
    const topIndex = Math.max(layers.length - 1, 1)
    const stackedHeight = 1.42 + layers.length * 0.06
    const explodedHeight = 3.5 + Math.max(layers.length - 5, 0) * 0.18
    partRefs.current.forEach((part, index) => {
      if (!part) return
      const stackedY = (index / topIndex) * stackedHeight
      const explodedY = (index / topIndex) * explodedHeight
      part.position.y = mix(stackedY, explodedY, separation)
      part.position.x = Math.sin(index * 1.6) * separation * 0.65
      part.rotation.y = separation * (index % 2 ? -0.34 : 0.34)
    })
    if (burgerRef.current) {
      burgerRef.current.position.y = mix(0.2, -1.34, enterBox)
      burgerRef.current.position.x = mix(0, 0.35, finale)
      burgerRef.current.rotation.y = p * 0.34 + Math.sin(p * Math.PI) * 0.18
      burgerRef.current.scale.setScalar(mix(1, 0.86, enterBox))
    }
  })

  return (
    <group ref={burgerRef}>
      {layers.map((layer, index) => (
        <BurgerLayer type={layer} partRef={setPartRef(index)} key={`${variant}-${layer}`} />
      ))}
    </group>
  )
}

function BurgerBox({ progress }) {
  const box = useRef()
  const lid = useRef()
  useFrame(() => {
    const p = progress.current.value
    const reveal = range(p, 0.54, 0.7)
    const settle = range(p, 0.72, 0.9)
    if (box.current) {
      box.current.visible = p > 0.48
      box.current.position.y = mix(-5.8, -1.68, reveal)
      box.current.rotation.y = mix(-0.35, 0.03, reveal)
      box.current.scale.setScalar(mix(0.7, 1, reveal))
    }
    if (lid.current) lid.current.rotation.x = mix(-1.35, -0.2, settle)
  })

  return (
    <group ref={box}>
      <RoundedBox args={[4.9, 0.25, 4.25]} radius={0.22} smoothness={6} position={[0, -0.62, 0]} receiveShadow castShadow>
        <Material color={COLORS.paper} roughness={0.78} />
      </RoundedBox>
      <RoundedBox args={[4.95, 1.0, 0.22]} radius={0.14} smoothness={4} position={[0, -0.13, -2.04]} castShadow>
        <Material color={COLORS.paper} roughness={0.78} />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.94, 4.0]} radius={0.12} smoothness={4} position={[-2.38, -0.14, 0]} castShadow>
        <Material color={COLORS.paper} roughness={0.78} />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.94, 4.0]} radius={0.12} smoothness={4} position={[2.38, -0.14, 0]} castShadow>
        <Material color={COLORS.paper} roughness={0.78} />
      </RoundedBox>
      <group ref={lid} position={[0, -0.5, -2.1]}>
        <RoundedBox args={[4.95, 0.2, 4.3]} radius={0.24} smoothness={6} position={[0, 0, -2.1]} castShadow receiveShadow>
          <Material color={COLORS.paper} roughness={0.74} />
        </RoundedBox>
        <RoundedBox args={[2.5, 0.08, 0.58]} radius={0.12} smoothness={4} position={[0, 0.14, -2.08]}>
          <Material color={COLORS.blue} roughness={0.65} />
        </RoundedBox>
      </group>
    </group>
  )
}

function Fries({ progress }) {
  const group = useRef()
  const fries = useMemo(
    () => Array.from({ length: 12 }, (_, index) => ({ x: -0.7 + (index % 4) * 0.42, y: 0.7 + (index % 3) * 0.28, z: -0.34 + Math.floor(index / 4) * 0.28, r: (index % 2 ? -1 : 1) * 0.08 * index })),
    [],
  )
  useFrame(() => {
    const p = range(progress.current.value, 0.78, 0.97)
    if (!group.current) return
    group.current.visible = progress.current.value > 0.74
    group.current.position.x = mix(-6.6, -4.7, p)
    group.current.position.y = mix(-3.2, 2.65, p)
    group.current.rotation.z = mix(-0.25, -0.06, p)
    group.current.scale.setScalar(mix(0.62, 0.68, p))
  })
  return (
    <group ref={group}>
      {fries.map((fry, index) => (
        <RoundedBox key={index} args={[0.3, 2.7, 0.3]} radius={0.08} smoothness={3} position={[fry.x, fry.y, fry.z]} rotation={[fry.r * 0.5, 0, fry.r]} castShadow>
          <Material color={index % 3 ? '#f3b735' : '#ffd365'} roughness={0.72} />
        </RoundedBox>
      ))}
      <RoundedBox args={[2.3, 2.1, 1.45]} radius={0.26} smoothness={5} position={[0, -0.25, 0]} castShadow>
        <Material color={COLORS.blue} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[1.25, 0.16, 0.13]} radius={0.08} smoothness={3} position={[0, 0.1, 0.76]}>
        <Material color={COLORS.cream} roughness={0.75} />
      </RoundedBox>
    </group>
  )
}

function SauceCup({ color, x, progress, delay = 0 }) {
  const cup = useRef()
  useFrame(() => {
    const p = range(progress.current.value, 0.8 + delay, 0.98)
    if (!cup.current) return
    cup.current.visible = progress.current.value > 0.76
    cup.current.position.x = mix(6.2, x, p)
    cup.current.position.y = mix(-3, -1.55 + Math.abs(x) * 0.06, p)
    cup.current.rotation.y = mix(0.8, -0.12, p)
  })
  return (
    <group ref={cup}>
      <mesh castShadow>
        <cylinderGeometry args={[0.72, 0.58, 0.6, 32]} />
        <Material color={COLORS.paper} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.04, 32]} />
        <Material color={color} roughness={0.54} />
      </mesh>
    </group>
  )
}

function World({ progress, reduceMotion, variant }) {
  const world = useRef()
  const burger = useRef()

  useFrame((state, delta) => {
    const p = progress.current.value
    if (world.current) {
      const pointerX = reduceMotion ? 0 : state.pointer.x * 0.13
      const pointerY = reduceMotion ? 0 : state.pointer.y * 0.06
      world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, pointerX + (p - 0.5) * 0.09, 3.5, delta)
      world.current.rotation.x = THREE.MathUtils.damp(world.current.rotation.x, -pointerY, 3.5, delta)
      const editorialOffset = Math.cos(p * Math.PI * 5) * 1.25 * (1 - range(p, 0.86, 1)) + 0.85 * range(p, 0.84, 1)
      const expansion = smooth(range(p, 0.07, 0.2)) * (1 - smooth(range(p, 0.22, 0.42)))
      const targetX = state.size.width < 700 ? 0 : editorialOffset - expansion * 0.75
      const targetY = p > 0.82 ? 0.48 : mix(-0.3, -1.3, expansion)
      world.current.position.x = THREE.MathUtils.damp(world.current.position.x, targetX, 3, delta)
      world.current.position.y = THREE.MathUtils.damp(world.current.position.y, targetY, 2.6, delta)
    }
    const expandDistance = mix(10.4, 12.8, range(p, 0.06, 0.2))
    const collapseDistance = mix(12.8, 10.2, range(p, 0.22, 0.42))
    const buildDistance = p < 0.22 ? expandDistance : collapseDistance
    const cameraDistance = mix(buildDistance, 11.8, range(p, 0.78, 1))
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, cameraDistance, 3, delta)
    state.camera.lookAt(0, 0.55, 0)
  })

  return (
    <>
      <color attach="background" args={[COLORS.paper]} />
      <fog attach="fog" args={[COLORS.paper, 12, 20]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 6]} intensity={2.6} color="#fff7e8" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 3, 4]} intensity={1.35} color="#a8bdff" />
      <pointLight position={[0, 2, -5]} intensity={8} color="#f4a73f" distance={16} />
      <group ref={world} position={[0, -0.3, 0]}>
        <BurgerBox progress={progress} />
        <Burger key={variant} progress={progress} burgerRef={burger} variant={variant} />
        <Fries progress={progress} />
        <SauceCup color={COLORS.red} x={3.55} progress={progress} />
        <SauceCup color={COLORS.cheese} x={4.65} progress={progress} delay={0.035} />
      </group>
    </>
  )
}

export default function BurgerWorld({ progress, reduceMotion, variant = 'bloom' }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 10.2], fov: 40, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      aria-label={`Interactive 3D ${variant} burger starting whole, expanding into its ingredients, re-forming, and entering a takeaway box`}
    >
      <World progress={progress} reduceMotion={reduceMotion} variant={variant} />
    </Canvas>
  )
}
