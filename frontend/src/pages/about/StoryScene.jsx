import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import { MathUtils } from 'three'

const VIOLET = '#9700ff'
const VIOLET_DEEP = '#6e00ba'
const INK = '#0e0b12'

/**
 * Glass core inside a wireframe shell, circled by three thin rings — an "idea" taking shape.
 * The whole rig leans toward the cursor; `still` (reduced motion) freezes every animation.
 */
function IdeaCore({ still }) {
  const rig = useRef()
  const core = useRef()
  const shell = useRef()
  const rings = useRef()

  useFrame((state, delta) => {
    if (still) return
    // Mouse parallax: ease the rig toward the pointer instead of snapping to it.
    const { x, y } = state.pointer
    rig.current.rotation.y = MathUtils.damp(rig.current.rotation.y, x * 0.45, 3, delta)
    rig.current.rotation.x = MathUtils.damp(rig.current.rotation.x, -y * 0.3, 3, delta)
    rig.current.position.x = MathUtils.damp(rig.current.position.x, x * 0.15, 3, delta)

    // Auto-rotation: the parts turn at different speeds so the silhouette keeps changing.
    core.current.rotation.x += delta * 0.18
    core.current.rotation.y += delta * 0.24
    shell.current.rotation.y -= delta * 0.1
    rings.current.rotation.z += delta * 0.12
  })

  return (
    // Scaled so the outer ring (r 2.75) stays well inside the frame.
    <group ref={rig} scale={0.6}>
      <Float speed={still ? 0 : 1.6} rotationIntensity={0.35} floatIntensity={0.9} floatingRange={[-0.12, 0.12]}>
        {/* Glass core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshPhysicalMaterial
            color={VIOLET}
            roughness={0.12}
            metalness={0.05}
            transmission={0.85}
            thickness={1.4}
            ior={1.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={VIOLET}
            emissiveIntensity={0.25}
            flatShading
          />
        </mesh>

        {/* Wireframe shell */}
        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.22} />
        </mesh>

        {/* Orbit rings */}
        <group ref={rings}>
          {[
            { r: 2.05, rot: [Math.PI / 2.3, 0.2, 0], color: VIOLET, opacity: 0.9 },
            { r: 2.4, rot: [Math.PI / 1.7, -0.5, 0.4], color: VIOLET_DEEP, opacity: 0.45 },
            { r: 2.75, rot: [Math.PI / 2.8, 0.9, -0.3], color: INK, opacity: 0.18 },
          ].map((ring) => (
            <mesh key={ring.r} rotation={ring.rot}>
              <torusGeometry args={[ring.r, 0.012, 16, 160]} />
              <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  )
}

/**
 * The full canvas. Lighting comes from in-scene Lightformers rather than an HDR file,
 * so the scene makes no network requests. `active` pauses rendering while off-screen.
 */
export default function StoryScene({ active = true, still = false }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? (still ? 'demand' : 'always') : 'never'}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={1.2} color={VIOLET} />

      <IdeaCore still={still} />

      <Sparkles count={40} scale={[7, 5, 4]} size={2} speed={still ? 0 : 0.25} opacity={0.6} color={VIOLET} />

      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 4, -4]} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={2.5} color={VIOLET} position={[-4, 0, 2]} scale={3} />
        <Lightformer form="rect" intensity={1.5} color="#ebddff" position={[4, -2, 2]} scale={[2, 6, 1]} />
      </Environment>
    </Canvas>
  )
}
