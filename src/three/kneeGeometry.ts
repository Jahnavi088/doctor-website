import { BufferAttribute, BufferGeometry, Box3, Vector3 } from 'three'

/** Decodes public/models/knee.bin (written by tools/build_knee.py). */
export type KneeParts = Record<'femur' | 'tibia' | 'fibula' | 'patella' | 'meniscus', BufferGeometry>
type AnyParts = Record<string, BufferGeometry>

type Header = {
  min: [number, number, number]
  max: [number, number, number]
  parts: { name: string; count: number; indices: number; pos: number; nrm: number; idx: number }[]
}

let cache: Promise<KneeParts> | null = null

export function loadKnee(): Promise<KneeParts> {
  cache ??= fetch('/models/knee.bin')
    .then((r) => {
      if (!r.ok) throw new Error(`knee.bin ${r.status}`)
      return r.arrayBuffer()
    })
    .then((b) => decode(b) as KneeParts)
  cache.catch(() => (cache = null))
  return cache
}

export function decode(buf: ArrayBuffer): AnyParts {
  const dv = new DataView(buf)
  if (dv.getUint32(0, true) !== 0x45454e4b) throw new Error('bad knee.bin')
  const hlen = dv.getUint32(4, true)
  const header = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 8, hlen))) as Header
  const base = 8 + hlen
  const min = new Vector3(...header.min)
  const size = new Vector3(...header.max).sub(min)
  const out: AnyParts = {}

  for (const p of header.parts) {
    const q = new Int16Array(buf, base + p.pos, p.count * 3)
    const pos = new Float32Array(p.count * 3)
    for (let i = 0; i < p.count; i++) {
      pos[i * 3] = min.x + ((q[i * 3] + 32768) / 65535) * size.x
      pos[i * 3 + 1] = min.y + ((q[i * 3 + 1] + 32768) / 65535) * size.y
      pos[i * 3 + 2] = min.z + ((q[i * 3 + 2] + 32768) / 65535) * size.z
    }
    const n8 = new Int8Array(buf, base + p.nrm, p.count * 4)
    const nrm = new Float32Array(p.count * 3)
    for (let i = 0; i < p.count; i++) {
      nrm[i * 3] = n8[i * 4] / 127
      nrm[i * 3 + 1] = n8[i * 4 + 1] / 127
      nrm[i * 3 + 2] = n8[i * 4 + 2] / 127
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(pos, 3))
    g.setAttribute('normal', new BufferAttribute(nrm, 3))
    g.setIndex(new BufferAttribute(new Uint16Array(buf.slice(base + p.idx, base + p.idx + p.indices * 2)), 1))
    g.boundingBox = new Box3().setFromBufferAttribute(g.getAttribute('position') as BufferAttribute)
    g.computeBoundingSphere()
    out[p.name] = g
  }
  return out
}
