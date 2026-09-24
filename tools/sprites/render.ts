/**
 * Dev-only renderer for the expertise card images.
 * Builds each scene from the knee meshes (+ implant / fracture extras), and exposes
 * window.renderFrame(i) so tools/sprites/render-sprites.mjs can capture a turntable.
 */
import {
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
  AdditiveBlending,
  DoubleSide,
  SphereGeometry,
  Float32BufferAttribute,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { decode } from '../../src/three/kneeGeometry'
import { createXrayMaterial } from '../../src/three/xray'

const SIZE = 480
const BG = '#0c1a26'
const CYAN = '#5fd0ea'

const item = new URLSearchParams(location.search).get('item') ?? 'replacement'
const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1)
renderer.setSize(SIZE, SIZE)
renderer.setClearColor(BG, 1)
document.body.appendChild(renderer.domElement)

const scene = new Scene()
scene.environment = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture
const camera = new PerspectiveCamera(28, 1, 0.1, 50)

const chrome = new MeshPhysicalMaterial({ color: '#e6ebee', metalness: 1, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.1 })
const poly = new MeshPhysicalMaterial({ color: '#dfe9ec', metalness: 0, roughness: 0.45, transmission: 0.2, thickness: 0.2 })
const holo = new MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.12, side: DoubleSide, depthWrite: false, blending: AdditiveBlending })
const holoLine = new LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.85 })

function glowSprite(size: number, color = CYAN) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  const col = new Color(color)
  const rgb = `${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)}`
  grd.addColorStop(0, `rgba(${rgb},1)`)
  grd.addColorStop(0.25, `rgba(${rgb},0.45)`)
  grd.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const s = new Sprite(new SpriteMaterial({ map: new CanvasTexture(c), blending: AdditiveBlending, depthWrite: false, transparent: true }))
  s.scale.setScalar(size)
  return s
}

function holoPlane(w: number, d: number, y: number) {
  const g = new Group()
  const plane = new Mesh(new PlaneGeometry(w, d, 1, 1), holo)
  plane.rotation.x = -Math.PI / 2
  g.add(plane)
  const edges = new LineSegments(new EdgesGeometry(plane.geometry), holoLine)
  edges.rotation.x = -Math.PI / 2
  g.add(edges)
  // fine grid
  const pts: number[] = []
  for (let i = 1; i < 8; i++) {
    const x = -w / 2 + (w * i) / 8
    pts.push(x, 0, -d / 2, x, 0, d / 2)
    const z = -d / 2 + (d * i) / 8
    pts.push(-w / 2, 0, z, w / 2, 0, z)
  }
  const grid = new LineSegments(undefined, new LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.25 }))
  grid.geometry.setAttribute('position', new Float32BufferAttribute(pts, 3))
  g.add(grid)
  g.position.y = y
  return g
}

const root = new Group()
scene.add(root)
let target = new Vector3(0, -0.1, 0)
let dist = 5.2

async function build() {
  const buf = await (await fetch('./knee-extras.bin')).arrayBuffer()
  const P = decode(buf)
  const xray = (opts: Parameters<typeof createXrayMaterial>[0] = {}) => {
    const m = createXrayMaterial(opts)
    m.uniforms.uScan.value = 0
    m.uniforms.uTime.value = 0
    return m
  }

  if (item === 'replacement') {
    const bone = xray({ jointStrength: 0.35 })
    root.add(new Mesh(P.femur, bone), new Mesh(P.tibia, bone), new Mesh(P.fibula, bone))
    root.add(new Mesh(P.fem_comp, chrome), new Mesh(P.tib_tray, chrome), new Mesh(P.tib_insert, poly))
    target = new Vector3(0, -0.15, 0)
    dist = 6.0
  } else if (item === 'arthroscopy') {
    const bone = xray({ jointStrength: 1.3 })
    root.add(new Mesh(P.femur, bone), new Mesh(P.patella, bone))
    const tib = new Group()
    tib.add(new Mesh(P.tibia, bone), new Mesh(P.fibula, bone))
    // slight flexion opens the joint
    const pivot = new Group()
    pivot.position.set(0, 0.2, -0.1)
    tib.position.set(0, -0.2, 0.1)
    pivot.add(tib)
    pivot.rotation.x = 0.35
    root.add(pivot)
    // arthroscope entering from the front-outer side, probe from the front-inner side
    const scope = new Mesh(new CylinderGeometry(0.035, 0.035, 2.2, 24), chrome)
    const tipAt = new Vector3(0.12, -0.12, 0.05)
    const dir = new Vector3(0.75, 0.25, 1).normalize()
    scope.position.copy(tipAt).addScaledVector(dir, 1.1)
    scope.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), dir)
    root.add(scope)
    const probe = new Mesh(new CylinderGeometry(0.018, 0.018, 1.8, 16), chrome)
    const pTip = new Vector3(-0.15, -0.14, 0.08)
    const pDir = new Vector3(-0.8, 0.2, 1).normalize()
    probe.position.copy(pTip).addScaledVector(pDir, 0.9)
    probe.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), pDir)
    root.add(probe)
    const light = glowSprite(0.9)
    light.position.copy(tipAt)
    root.add(light)
    const tip = new Mesh(new SphereGeometry(0.03, 16, 16), new MeshBasicMaterial({ color: '#e8fbff' }))
    tip.position.copy(tipAt)
    root.add(tip)
    target = new Vector3(0, -0.05, 0.1)
    dist = 5.0
  } else if (item === 'robotic') {
    const bone = xray({ jointStrength: 0.8 })
    root.add(new Mesh(P.femur, bone), new Mesh(P.tibia, bone), new Mesh(P.fibula, bone), new Mesh(P.patella, bone))
    root.add(holoPlane(1.9, 1.5, 0.0), holoPlane(1.9, 1.5, -0.3))
    const axis = new Mesh(new CylinderGeometry(0.006, 0.006, 3.4, 8), new MeshBasicMaterial({ color: CYAN }))
    root.add(axis)
    for (const [r, y] of [
      [0.95, -0.15],
      [0.7, -0.15],
    ] as const) {
      const t = new Mesh(new TorusGeometry(r, 0.006, 8, 128), new MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.6 }))
      t.rotation.x = Math.PI / 2
      t.position.y = y
      root.add(t)
    }
    target = new Vector3(0, -0.15, 0)
    dist = 5.8
  } else if (item === 'trauma') {
    const bone = xray({ joint: new Vector3(0, -1.3, 0), jointStrength: 1.2 })
    root.add(new Mesh(P.tib_prox, bone), new Mesh(P.tib_dist, bone), new Mesh(P.fibula, bone))
    // medial locking plate with screws
    const plateX = -0.235
    const plate = new Mesh(new BoxGeometry(0.035, 1.3, 0.13, 1, 8, 1), chrome)
    plate.position.set(plateX, -1.32, 0.02)
    root.add(plate)
    for (const y of [-0.8, -0.95, -1.1, -1.52, -1.68, -1.84]) {
      const screw = new Mesh(new CylinderGeometry(0.018, 0.014, 0.5, 12), chrome)
      screw.rotation.z = Math.PI / 2
      screw.position.set(plateX + 0.22, y, 0.02)
      const head = new Mesh(new CylinderGeometry(0.032, 0.032, 0.03, 16), chrome)
      head.rotation.z = Math.PI / 2
      head.position.set(plateX - 0.03, y, 0.02)
      root.add(screw, head)
    }
    const g = glowSprite(0.8)
    g.position.set(0, -1.3, 0)
    root.add(g)
    target = new Vector3(0, -1.28, 0)
    dist = 4.1
  }
  ;(window as unknown as { ready: boolean }).ready = true
}

;(window as unknown as { renderFrame: (i: number, n: number) => string }).renderFrame = (i, n) => {
  const a = (i / n) * Math.PI * 2
  root.rotation.y = a
  camera.position.set(target.x, target.y + 0.35, target.z + dist)
  camera.lookAt(target)
  renderer.render(scene, camera)
  return renderer.domElement.toDataURL('image/png')
}

build()
