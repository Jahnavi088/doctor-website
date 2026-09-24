import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Group, Points, PointsMaterial, Vector3 } from 'three'
import { loadKnee, type KneeParts } from './kneeGeometry'
import { createXrayMaterial } from './xray'

type Props = { reducedMotion: boolean; active: boolean; compact: boolean; onReady?: () => void }

const pointer = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    },
    { passive: true },
  )
}

/** Slow-drifting specks that give the dark stage some depth. */
function Dust({ count, still }: { count: number; still: boolean }) {
  const ref = useRef<Points>(null)
  const geo = useMemo(() => {
    const g = new BufferGeometry()
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16
      p[i * 3 + 1] = (Math.random() - 0.5) * 9
      p[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
    }
    g.setAttribute('position', new BufferAttribute(p, 3))
    return g
  }, [count])
  const mat = useMemo(
    () =>
      new PointsMaterial({
        color: new Color('#9fdcef'),
        size: 0.028,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    [],
  )
  useEffect(
    () => () => {
      geo.dispose()
      mat.dispose()
    },
    [geo, mat],
  )
  useFrame((state, dt) => {
    if (still || !ref.current) return
    ref.current.rotation.y += dt * 0.012
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.35
  })
  return <points ref={ref} geometry={geo} material={mat} />
}

function Knee({ parts, reducedMotion, compact, onReady }: Props & { parts: KneeParts }) {
  const root = useRef<Group>(null)
  const viewport = useThree((s) => s.viewport)
  const first = useRef(true)
  const mat = useMemo(() => createXrayMaterial({ joint: new Vector3(0, -0.04, -0.04), jointStrength: 1.15 }), [])
  useEffect(() => () => mat.dispose(), [mat])

  // size the knee to the stage: tall on desktop, behind the portrait on phones
  const scale = (viewport.height * (compact ? 0.92 : 0.9)) / 4.3
  const baseX = compact ? viewport.width * 0.02 : viewport.width * 0.06
  const baseY = compact ? viewport.height * 0.02 : -viewport.height * 0.02

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    mat.uniforms.uTime.value = reducedMotion ? 0 : t
    mat.uniforms.uScan.value = reducedMotion ? 0 : 1
    if (!root.current) return
    const k = first.current || reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 2.5)
    const yaw = reducedMotion ? -0.5 : -0.5 + Math.sin(t * 0.13) * 0.45 + pointer.x * 0.25
    const pitch = reducedMotion ? 0.08 : 0.08 + pointer.y * 0.06
    root.current.rotation.y += (yaw - root.current.rotation.y) * k
    root.current.rotation.x += (pitch - root.current.rotation.x) * k
    root.current.position.y = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.05
    if (first.current) {
      first.current = false
      requestAnimationFrame(() => onReady?.())
    }
  })

  return (
    <group position={[baseX, baseY, 0]} rotation={[0, 0, compact ? 0 : -0.14]} scale={scale}>
      <group ref={root}>
        <mesh geometry={parts.femur} material={mat} />
        <mesh geometry={parts.patella} material={mat} />
        <mesh geometry={parts.tibia} material={mat} />
        <mesh geometry={parts.fibula} material={mat} />
      </group>
    </group>
  )
}

export default function HeroKneeScene(props: Props) {
  const [parts, setParts] = useState<KneeParts | null>(null)
  useEffect(() => {
    let alive = true
    loadKnee()
      .then((p) => alive && setParts(p))
      .catch((err) => console.warn('Knee model unavailable:', err))
    return () => {
      alive = false
    }
  }, [])
  return (
    <Canvas
      dpr={props.compact ? [1, 1.25] : [1, 1.6]}
      frameloop={!props.active ? 'never' : props.reducedMotion ? 'demand' : 'always'}
      camera={{ fov: 30, position: [0, 0, 9], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Dust count={props.compact ? 140 : 380} still={props.reducedMotion} />
      {parts && <Knee {...props} parts={parts} />}
    </Canvas>
  )
}
