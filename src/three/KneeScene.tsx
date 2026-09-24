import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Color,
  Group,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PMREMGenerator,
  TubeGeometry,
  Vector3,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { loadKnee, type KneeParts } from "./kneeGeometry";
import type { KneeMode } from "../data/site";

export type KneeVariant = "hero" | "explore";

export type KneeSceneProps = {
  variant: KneeVariant;
  mode?: KneeMode;
  reducedMotion: boolean;
  active: boolean;
  /** extra yaw (radians) from user dragging / keyboard, owned by the parent */
  userYaw?: MutableRefObject<number>;
  onReady?: () => void;
};

/* Pointer position across the whole viewport, -1..1. Shared by every scene. */
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );
}

const PIVOT = new Vector3(0, 0.2, -0.1); // approximate centre of the femoral condyles' curvature
const ACCENT = new Color("#7fb9c7");

function Studio() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pm.dispose();
    };
  }, [gl, scene]);
  return (
    <>
      <directionalLight position={[-3, 5, 4]} intensity={1.2} />
      <directionalLight
        position={[4, -1, -3]}
        intensity={0.45}
        color="#d6e7ec"
      />
      <ambientLight intensity={0.15} />
    </>
  );
}

/** Pulls the camera back on portrait canvases so the joint stays framed on phones. */
function CameraFit({ base }: { base: number }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    camera.position.z = base * Math.max(1, 0.95 / aspect);
    camera.updateProjectionMatrix();
  }, [camera, size, base]);
  return null;
}

function Ligament({
  points,
  material,
}: {
  points: [number, number, number][];
  material: MeshPhysicalMaterial;
}) {
  const geo = useMemo(
    () =>
      new TubeGeometry(
        new CatmullRomCurve3(points.map((p) => new Vector3(...p))),
        40,
        0.034,
        10,
        false,
      ),
    [points],
  );
  useEffect(() => () => geo.dispose(), [geo]);
  return <mesh geometry={geo} material={material} scale={[1, 1, 1]} />;
}

const MCL: [number, number, number][] = [
  [-0.64, 0.36, -0.1],
  [-0.73, 0.05, -0.08],
  [-0.77, -0.38, -0.06],
  [-0.64, -0.76, -0.02],
  [-0.5, -1.08, 0.02],
];
const LCL: [number, number, number][] = [
  [0.63, 0.36, -0.12],
  [0.71, 0.02, -0.14],
  [0.76, -0.36, -0.2],
  [0.71, -0.6, -0.24],
];

function Knee({
  parts,
  variant,
  mode = "mobility",
  reducedMotion,
  userYaw,
  onReady,
}: KneeSceneProps & { parts: KneeParts }) {
  const frame = useRef<Group>(null);
  const root = useRef<Group>(null);
  const tibia = useRef<Group>(null);
  const patella = useRef<Group>(null);
  const patellaSeat = useRef<Group>(null);
  const s = useRef({
    t: 0,
    flex: 0,
    yaw: -0.45,
    pitch: 0,
    lig: 0,
    axis: 0,
    hl: 0,
    shift: 0,
    first: true,
  });
  const invalidate = useThree((st) => st.invalidate);

  const mats = useMemo(() => {
    const bone = new MeshPhysicalMaterial({
      color: variant === "hero" ? "#dfe3e6" : "#d9dee1",
      metalness: variant === "hero" ? 0.6 : 0.5,
      roughness: 0.34,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
    });
    const pat = bone.clone();
    const meniscus = new MeshPhysicalMaterial({
      color: ACCENT,
      metalness: 0.1,
      roughness: 0.5,
      transparent: true,
      opacity: 0,
    });
    const ligament = new MeshPhysicalMaterial({
      color: ACCENT,
      metalness: 0.05,
      roughness: 0.5,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const axis = new MeshBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    return {
      bone,
      pat,
      meniscus,
      ligament,
      axis,
      boneColor: bone.color.clone(),
    };
  }, [variant]);
  useEffect(
    () => () =>
      Object.values(mats).forEach((m) => "dispose" in m && m.dispose()),
    [mats],
  );

  // With reduced motion the scene renders on demand; redraw when the mode changes.
  useEffect(() => {
    invalidate();
  }, [mode, invalidate]);

  useFrame((_, delta) => {
    const st = s.current;
    const dt = Math.min(delta, 0.05);
    const still = reducedMotion;
    if (!still) st.t += dt;
    const explore = variant === "explore";

    // --- targets
    let flex = 0;
    let yaw = -0.45;
    let lig = 0;
    let axis = 0;
    let hl = 0;
    let shift = 0;
    if (explore) {
      if (mode === "mobility") {
        flex = still ? 0.75 : (0.5 - 0.5 * Math.cos(st.t * 0.75)) * 1.1;
        yaw = -1.2;
        shift = -0.32; // keep the swinging tibia inside the frame
      } else if (mode === "stability") {
        yaw = -0.12;
        lig = 0.92;
        hl = 1;
      } else {
        flex = still ? 0.45 : 0.3 + 0.35 * (0.5 - 0.5 * Math.cos(st.t * 0.6));
        yaw = -0.75;
        axis = 0.55;
        hl = 1;
      }
    } else if (!still) {
      yaw =
        -0.45 +
        Math.sin(st.t * 0.12) * 0.32 -
        Math.min(window.scrollY, 900) * 0.0006;
    }
    if (!still) yaw += pointer.x * (explore ? 0.12 : 0.22);
    yaw += userYaw?.current ?? 0;
    const pitch = still ? 0.04 : 0.04 + pointer.y * (explore ? 0.05 : 0.08);

    // --- ease towards targets (snap on the first frame and with reduced motion)
    const k = still || st.first ? 1 : 1 - Math.exp(-dt * 3.2);
    st.flex += (flex - st.flex) * k;
    st.yaw += (yaw - st.yaw) * k;
    st.pitch += (pitch - st.pitch) * k;
    const kf = still || st.first ? 1 : 1 - Math.exp(-dt * 2.4);
    st.lig += (lig - st.lig) * kf;
    st.axis += (axis - st.axis) * kf;
    st.hl += (hl - st.hl) * kf;
    st.shift += (shift - st.shift) * kf;
    if (frame.current) frame.current.position.x = st.shift;

    if (root.current) {
      root.current.rotation.set(st.pitch, st.yaw, 0);
      root.current.position.y = still
        ? 0
        : Math.sin(st.t * 0.55) * (explore ? 0.02 : 0.05);
    }
    if (tibia.current) tibia.current.rotation.x = st.flex;
    // the kneecap glides round the front of the femur: it turns less than the tibia
    // and is drawn in towards the condyles as the knee bends
    // (radial pull-in fitted to the femur's anterior profile measured in tools/build_knee.py)
    const pa = st.flex * 0.75;
    if (patella.current) patella.current.rotation.x = pa;
    if (patellaSeat.current) {
      const pull = 0.15 * pa + 0.03 * pa * pa;
      patellaSeat.current.position.set(0, -pull * 0.484, -pull * 0.875);
    }

    mats.ligament.opacity = st.lig;
    mats.ligament.visible = st.lig > 0.01;
    mats.axis.opacity = st.axis;
    mats.axis.visible = st.axis > 0.01;
    // menisci are only shown when they are the subject (stability)
    mats.meniscus.opacity = st.lig;
    mats.meniscus.visible = st.lig > 0.01;
    mats.pat.color
      .copy(mats.boneColor)
      .lerp(ACCENT, mode === "function" ? st.hl * 0.7 : 0);

    if (st.first) {
      st.first = false;
      requestAnimationFrame(() => onReady?.());
    }
  });

  const neg = PIVOT.clone().negate();
  return (
    <group ref={frame}>
      <group ref={root}>
        <mesh geometry={parts.femur} material={mats.bone} />
        <group position={PIVOT}>
          <group ref={patella}>
            <group ref={patellaSeat}>
              <group position={neg}>
                <mesh geometry={parts.patella} material={mats.pat} />
              </group>
            </group>
          </group>
          <group ref={tibia}>
            <group position={neg}>
              <mesh geometry={parts.tibia} material={mats.bone} />
              <mesh geometry={parts.fibula} material={mats.bone} />
              <mesh geometry={parts.meniscus} material={mats.meniscus} />
            </group>
          </group>
        </group>
        {variant === "explore" && (
          <>
            <Ligament points={MCL} material={mats.ligament} />
            <Ligament points={LCL} material={mats.ligament} />
            <mesh material={mats.axis} position={[0, 0, 0.05]}>
              <cylinderGeometry args={[0.006, 0.006, 5.4, 6]} />
            </mesh>
            <mesh
              material={mats.axis}
              position={PIVOT}
              rotation={[0, Math.PI / 2, 0]}
            >
              <torusGeometry args={[0.95, 0.006, 6, 96]} />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}

export default function KneeScene(props: KneeSceneProps) {
  const [parts, setParts] = useState<KneeParts | null>(null);
  useEffect(() => {
    let alive = true;
    loadKnee()
      .then((p) => alive && setParts(p))
      .catch((err) => {
        // the fine-line drawing stays visible as the fallback
        console.warn("Knee model unavailable:", err);
      });
    return () => {
      alive = false;
    };
  }, []);

  const hero = props.variant === "hero";
  return (
    <Canvas
      dpr={[1, hero ? 1.5 : 1.75]}
      frameloop={
        !props.active ? "never" : props.reducedMotion ? "demand" : "always"
      }
      camera={{
        fov: hero ? 22 : 24,
        position: [0, hero ? 0.1 : 0.05, hero ? 12.4 : 8.6],
        near: 0.1,
        far: 50,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Studio />
      {!hero && <CameraFit base={8.6} />}
      {parts && <Knee {...props} parts={parts} />}
    </Canvas>
  );
}
