"""
Builds the stylised knee-joint mesh used by the 3D visualisations.

The bones are modelled as smooth signed-distance fields (ellipsoids and tapered
capsules blended with a smooth-min), meshed with marching cubes, then written to
a compact quantised binary (public/models/knee.bin) that src/three/kneeGeometry.ts decodes.

Run:  python tools/build_knee.py        (needs numpy, scipy, scikit-image)

Axes: +Y up, +X lateral (fibula side), +Z anterior (towards the viewer).
"""
import json
import struct
from pathlib import Path

import numpy as np
from skimage.measure import marching_cubes

VOXEL = 0.027
OUT = Path(__file__).resolve().parent.parent / "public" / "models" / "knee.bin"
CUT = 2.15  # shafts are cut flat at +/- this height, like the femur in the MK mark


# ---------- SDF primitives ----------
def ellipsoid(p, c, r):
    q = (p - np.asarray(c)) / np.asarray(r)
    k0 = np.linalg.norm(q, axis=-1)
    k1 = np.linalg.norm(q / np.asarray(r), axis=-1)
    return k0 * (k0 - 1.0) / np.maximum(k1, 1e-6)


def capsule(p, a, b, ra, rb):
    a, b = np.asarray(a, float), np.asarray(b, float)
    pa, ba = p - a, b - a
    t = np.clip((pa @ ba) / (ba @ ba), 0, 1)[..., None]
    return np.linalg.norm(pa - ba * t, axis=-1) - (ra + (rb - ra) * t[..., 0])


def smin(a, b, k):
    h = np.maximum(k - np.abs(a - b), 0) / k
    return np.minimum(a, b) - h * h * k * 0.25


def smax(a, b, k):
    return -smin(-a, -b, k)


def union(ds, k):
    d = ds[0]
    for e in ds[1:]:
        d = smin(d, e, k)
    return d


def slab(p, lo, hi, k=0.04):
    y = p[..., 1]
    return smax(lo - y, y - hi, k)


# ---------- bones ----------
def femur(p):
    d = union([
        capsule(p, (0.02, 0.75, -0.02), (0.06, 2.6, 0.02), 0.30, 0.235),
        ellipsoid(p, (0.0, 0.52, -0.04), (0.60, 0.46, 0.44)),
        ellipsoid(p, (-0.33, 0.20, -0.10), (0.33, 0.34, 0.50)),  # medial condyle
        ellipsoid(p, (0.33, 0.23, -0.08), (0.31, 0.31, 0.47)),   # lateral condyle
        ellipsoid(p, (0.0, 0.34, 0.22), (0.46, 0.30, 0.24)),     # trochlea
    ], 0.20)
    # intercondylar notch: open from below and behind, so the condyles read as two
    notch = ellipsoid(p, (0.0, -0.12, -0.30), (0.10, 0.30, 0.42))
    d = smax(d, -notch, 0.08)
    groove = capsule(p, (0.0, 0.22, 0.52), (0.0, 0.70, 0.40), 0.085, 0.06)
    d = smax(d, -groove, 0.12)
    return smax(d, slab(p, -2, CUT), 0.03)


def tibia(p):
    d = union([
        ellipsoid(p, (0.0, -0.40, -0.06), (0.70, 0.14, 0.48)),   # plateau
        ellipsoid(p, (0.0, -0.68, -0.04), (0.50, 0.40, 0.40)),   # metaphysis
        capsule(p, (0.0, -0.85, 0.0), (-0.04, -2.6, 0.02), 0.30, 0.20),
        ellipsoid(p, (0.02, -0.86, 0.27), (0.12, 0.20, 0.09)),   # tuberosity
    ], 0.24)
    # very shallow articular dishes
    d = smax(d, -ellipsoid(p, (-0.30, -0.10, -0.06), (0.26, 0.16, 0.32)), 0.08)
    d = smax(d, -ellipsoid(p, (0.31, -0.11, -0.06), (0.24, 0.15, 0.30)), 0.08)
    return smax(d, slab(p, -CUT, 2), 0.03)


def fibula(p):
    d = union([
        ellipsoid(p, (0.60, -0.70, -0.24), (0.14, 0.17, 0.14)),
        capsule(p, (0.61, -0.80, -0.23), (0.52, -2.6, -0.14), 0.09, 0.075),
    ], 0.12)
    return smax(d, slab(p, -CUT, 2), 0.03)


def patella(p):
    d = union([
        ellipsoid(p, (0.0, 0.54, 0.52), (0.25, 0.28, 0.14)),
        ellipsoid(p, (0.0, 0.36, 0.50), (0.12, 0.14, 0.10)),     # apex
    ], 0.12)
    return d


def meniscus(p, cx, r, tube, gap_dir):
    # C-shaped ring on the tibial plateau, open towards the intercondylar area
    q = p - np.array([cx, -0.245, -0.06])
    ang = np.arctan2(q[..., 2], q[..., 0] * gap_dir)
    # wedge-like cross-section: thicker at the rim, thin towards the centre
    radial = np.hypot(q[..., 0], q[..., 2] / 1.25) - r
    ring = np.sqrt((radial / 1.4) ** 2 + (q[..., 1] / 0.55) ** 2) - tube
    opening = np.abs(ang) - 0.55  # carve out the side facing the midline
    return smax(ring, -opening * 0.25, 0.02)


PARTS = {
    "femur": (femur, (-0.75, -0.25, -0.70), (0.75, CUT + 0.05, 0.62)),
    "tibia": (tibia, (-0.80, -CUT - 0.05, -0.62), (0.80, -0.18, 0.50)),
    "fibula": (fibula, (0.38, -CUT - 0.05, -0.45), (0.80, -0.48, -0.05)),
    "patella": (patella, (-0.35, 0.18, 0.40), (0.35, 0.92, 0.75)),
    "meniscus": (lambda p: np.minimum(meniscus(p, -0.30, 0.19, 0.05, 1), meniscus(p, 0.31, 0.17, 0.05, -1)),
                 (-0.65, -0.32, -0.45), (0.65, -0.10, 0.35)),
}


def build(fn, lo, hi):
    lo, hi = np.asarray(lo), np.asarray(hi)
    axes = [np.arange(lo[i], hi[i] + VOXEL, VOXEL) for i in range(3)]
    grid = np.stack(np.meshgrid(*axes, indexing="ij"), -1)
    field = fn(grid)
    verts, faces, _, _ = marching_cubes(field, 0.0, spacing=(VOXEL,) * 3)
    verts += lo
    # normals from the analytic field gradient (smoother than face normals)
    e = VOXEL * 0.5
    n = np.stack([fn(verts + np.eye(3)[i] * e) - fn(verts - np.eye(3)[i] * e) for i in range(3)], -1)
    n /= np.linalg.norm(n, axis=-1, keepdims=True) + 1e-9
    faces = faces[:, ::-1]  # outward winding for three.js
    return verts.astype(np.float32), n.astype(np.float32), faces.astype(np.uint32)


def write(parts, out):
    allv = np.concatenate([v for v, _, _ in parts.values()])
    bmin, bmax = allv.min(0), allv.max(0)
    header = {"min": bmin.tolist(), "max": bmax.tolist(), "parts": []}
    blob = bytearray()
    for name, (v, n, f) in parts.items():
        assert len(v) < 65536, f"{name}: {len(v)} verts"
        q = np.round((v - bmin) / (bmax - bmin) * 65535 - 32768).astype(np.int16)
        nq = np.round(n * 127).astype(np.int8)
        nq = np.concatenate([nq, np.zeros((len(nq), 1), np.int8)], 1)
        entry = {"name": name, "count": len(v), "indices": int(f.size)}
        entry["pos"] = len(blob); blob += q.tobytes()
        while len(blob) % 4: blob += bytes(1)
        entry["nrm"] = len(blob); blob += nq.tobytes()
        entry["idx"] = len(blob); blob += f.astype(np.uint16).tobytes()
        while len(blob) % 4: blob += bytes(1)
        header["parts"].append(entry)
        print(f"{name:12s} verts={len(v):6d} tris={len(f):6d}")
    hj = json.dumps(header).encode()
    hj += b" " * ((4 - len(hj) % 4) % 4)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(b"KNEE" + struct.pack("<I", len(hj)) + hj + bytes(blob))
    print("wrote", out, f"{out.stat().st_size / 1024:.0f} KB")


# ---------- extras: only used to pre-render the expertise images (tools/sprites) ----------
def rounded_disc(p, c, rx, rz, half_h, r=0.02):
    """Flat elliptical plate (rounded edges) in the XZ plane."""
    q = p - np.asarray(c)
    e = np.hypot(q[..., 0] / rx, q[..., 2] / rz)
    d2 = (e - 1.0) * min(rx, rz)
    dy = np.abs(q[..., 1]) - half_h
    out = np.hypot(np.maximum(d2, 0), np.maximum(dy, 0))
    return out + np.minimum(np.maximum(d2, dy), 0) - r


def femoral_component(p):
    bone = femur(p)
    shell = smax(bone - 0.05, -(bone + 0.004), 0.01)
    y, z = p[..., 1], p[..., 2]
    # distal and posterior condyles, plus the anterior flange over the trochlea
    region = np.minimum(y - 0.36, np.maximum(y - 0.66, 0.12 - z))
    return smax(shell, region, 0.02)


def tibial_tray(p):
    tray = rounded_disc(p, (0.0, -0.31, -0.06), 0.66, 0.46, 0.012, 0.012)
    stem = capsule(p, (0.0, -0.32, -0.04), (0.0, -0.95, -0.02), 0.085, 0.05)
    keel = rounded_disc(p, (0.0, -0.45, -0.04), 0.34, 0.07, 0.10, 0.01)
    return smin(smin(tray, stem, 0.05), keel, 0.04)


def tibial_insert(p):
    ins = rounded_disc(p, (0.0, -0.245, -0.06), 0.63, 0.43, 0.03, 0.02)
    ins = smax(ins, -ellipsoid(p, (-0.30, -0.02, -0.06), (0.26, 0.2, 0.34)), 0.03)
    ins = smax(ins, -ellipsoid(p, (0.31, -0.03, -0.06), (0.24, 0.19, 0.32)), 0.03)
    return ins


FX_Y = -1.30  # fracture height on the tibial shaft


def fracture_plane(p):
    # oblique, slightly irregular fracture line
    x, y, z = p[..., 0], p[..., 1], p[..., 2]
    return y - (FX_Y + 0.22 * x + 0.03 * np.sin(x * 40) + 0.02 * np.sin(z * 33))


def tibia_proximal(p):
    return smax(tibia(p), -(fracture_plane(p) - 0.018), 0.01)


def tibia_distal(p):
    return smax(tibia(p), fracture_plane(p) + 0.018, 0.01)


EXTRAS = {
    "femur": PARTS["femur"],
    "tibia": PARTS["tibia"],
    "fibula": PARTS["fibula"],
    "patella": PARTS["patella"],
    "fem_comp": (femoral_component, (-0.75, -0.25, -0.72), (0.75, 0.75, 0.66)),
    "tib_tray": (tibial_tray, (-0.72, -1.02, -0.56), (0.72, -0.26, 0.44)),
    "tib_insert": (tibial_insert, (-0.70, -0.30, -0.54), (0.70, -0.17, 0.42)),
    "tib_prox": (tibia_proximal, (-0.80, -1.62, -0.62), (0.80, -0.18, 0.50)),
    "tib_dist": (tibia_distal, (-0.40, -CUT - 0.05, -0.40), (0.40, -0.98, 0.40)),
}


def main():
    import sys
    if "--extras" in sys.argv:
        out = Path(__file__).resolve().parent / "sprites" / "knee-extras.bin"
        write({k: build(*v) for k, v in EXTRAS.items()}, out)
    else:
        write({k: build(*v) for k, v in PARTS.items()}, OUT)


if __name__ == "__main__":
    main()
