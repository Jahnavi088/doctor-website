import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Vector3 } from 'three'

/**
 * Radiograph-style material: bright fresnel rims, near-transparent faces,
 * a soft glow around the joint line and an optional slow scanning band.
 * Used for the hero knee and the pre-rendered expertise images.
 */
export function createXrayMaterial({
  rim = '#b9e6f5',
  glow = '#4fc4e6',
  joint = new Vector3(0, -0.06, -0.04),
  jointStrength = 1,
  base = 0.07,
}: {
  rim?: string
  glow?: string
  joint?: Vector3
  jointStrength?: number
  base?: number
} = {}) {
  return new ShaderMaterial({
    uniforms: {
      uRim: { value: new Color(rim) },
      uGlow: { value: new Color(glow) },
      uJoint: { value: joint },
      uJointStrength: { value: jointStrength },
      uBase: { value: base },
      uTime: { value: 0 },
      uScan: { value: 1 },
      uOpacity: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vP;
      void main() {
        vP = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uRim;
      uniform vec3 uGlow;
      uniform vec3 uJoint;
      uniform float uJointStrength;
      uniform float uBase;
      uniform float uTime;
      uniform float uScan;
      uniform float uOpacity;
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vP;
      void main() {
        float facing = abs(dot(normalize(vN), normalize(vV)));
        float rim = pow(1.0 - facing, 2.4);
        float d = distance(vP, uJoint);
        float joint = exp(-d * d * 5.0) * uJointStrength * (0.85 + 0.15 * sin(uTime * 1.3));
        // slow band sweeping down the bone, like an imaging pass
        float scanY = 2.4 - mod(uTime * 0.35, 5.6);
        float scan = uScan * exp(-pow((vP.y - scanY) * 7.0, 2.0)) * 0.35;
        vec3 col = uRim * (uBase + rim * 0.95) + uGlow * (joint * 0.75 + scan);
        gl_FragColor = vec4(col * uOpacity, 1.0);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  })
}
