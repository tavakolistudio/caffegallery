"use client"
import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import * as THREE from "three"

function Steam({ xOffset, phase, speed }: { xOffset: number; phase: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshBasicMaterial
    const t = (clock.elapsedTime * speed + phase) % 2.8
    const life = t / 2.8
    ref.current.position.set(
      xOffset + Math.sin(t * 3 + phase) * 0.13,
      1.5 + t * 0.9,
      0.02
    )
    mat.opacity = Math.max(0, (1 - life) * 0.42)
    ref.current.scale.setScalar(0.022 + life * 0.075)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 7, 5]} />
      <meshBasicMaterial color="#DDD5C8" transparent depthWrite={false} />
    </mesh>
  )
}

function CoffeeCup() {
  const ref = useRef<THREE.Group>(null)

  const cupProfile = useMemo(() => [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.44, 0.0),
    new THREE.Vector2(0.47, 0.05),
    new THREE.Vector2(0.50, 0.28),
    new THREE.Vector2(0.56, 0.68),
    new THREE.Vector2(0.63, 1.08),
    new THREE.Vector2(0.68, 1.32),
  ], [])

  const saucerProfile = useMemo(() => [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.38, 0.0),
    new THREE.Vector2(0.62, 0.03),
    new THREE.Vector2(0.88, 0.07),
    new THREE.Vector2(1.02, 0.12),
  ], [])

  const handleGeo = useMemo(() => new THREE.TubeGeometry(
    new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.66, 1.0, 0),
      new THREE.Vector3(1.30, 0.58, 0),
      new THREE.Vector3(0.66, 0.18, 0)
    ), 24, 0.058, 8, false
  ), [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.48
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.09
  })

  const cupMat = {
    color: "#CC9060" as const,
    metalness: 0.10,
    roughness: 0.68,
    emissive: "#1A0800" as const,
    emissiveIntensity: 0.18,
  }

  const steamCfgs = [
    { xOffset: -0.22, phase: 0.0, speed: 0.55 },
    { xOffset: -0.06, phase: 1.0, speed: 0.73 },
    { xOffset:  0.10, phase: 2.0, speed: 0.60 },
    { xOffset:  0.24, phase: 0.5, speed: 0.82 },
    { xOffset:  0.02, phase: 1.5, speed: 0.66 },
    { xOffset: -0.14, phase: 2.5, speed: 0.70 },
  ]

  return (
    <group ref={ref} scale={1.55} position={[0, -0.25, 0]}>
      {/* Cup body */}
      <mesh>
        <latheGeometry args={[cupProfile, 52]} />
        <meshStandardMaterial {...cupMat} />
      </mesh>

      {/* Rim gold ring */}
      <mesh position={[0, 1.325, 0]}>
        <torusGeometry args={[0.68, 0.028, 10, 72]} />
        <meshStandardMaterial color="#E8C070" metalness={0.88} roughness={0.10} />
      </mesh>

      {/* Handle */}
      <mesh geometry={handleGeo}>
        <meshStandardMaterial {...cupMat} />
      </mesh>

      {/* Coffee liquid */}
      <mesh position={[0, 1.315, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.66, 52]} />
        <meshStandardMaterial color="#140602" roughness={0.05} />
      </mesh>

      {/* Foam ring */}
      <mesh position={[0, 1.317, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.63, 52]} />
        <meshBasicMaterial color="#B87840" transparent opacity={0.48} depthWrite={false} />
      </mesh>

      {/* Inner foam center */}
      <mesh position={[0, 1.319, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial color="#D4A060" transparent opacity={0.32} depthWrite={false} />
      </mesh>

      {/* Saucer */}
      <mesh position={[0, -0.12, 0]}>
        <latheGeometry args={[saucerProfile, 52]} />
        <meshStandardMaterial color="#EEE0C8" metalness={0.20} roughness={0.50} />
      </mesh>

      {/* Saucer top surface */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.01, 52]} />
        <meshStandardMaterial color="#F4EAD6" roughness={0.55} />
      </mesh>

      {steamCfgs.map((cfg, i) => <Steam key={i} {...cfg} />)}
    </group>
  )
}

function Bean({ pos, rot, spd, rspd }: {
  pos: [number, number, number]
  rot: [number, number, number]
  spd: number
  rspd: number
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y += rspd
    ref.current.rotation.x += rspd * 0.6
    ref.current.position.y = pos[1] + Math.sin(clock.elapsedTime * spd + pos[0]) * 0.22
  })
  return (
    <group ref={ref} position={pos} rotation={rot}>
      <mesh scale={[1, 1.45, 0.62]}>
        <sphereGeometry args={[0.145, 14, 10]} />
        <meshStandardMaterial color="#4A2008" roughness={0.80} metalness={0.04} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.013, 0.013, 0.38, 6]} />
        <meshBasicMaterial color="#2A1004" />
      </mesh>
    </group>
  )
}

const BEANS: Array<{ pos: [number,number,number]; rot: [number,number,number]; spd: number; rspd: number }> = [
  { pos: [-4.3, 1.4, -4.5], rot: [0.3, 0.8, 0.2], spd: 0.35, rspd: 0.010 },
  { pos: [4.1, -0.9, -5.0], rot: [0.7, 0.3, 0.5], spd: 0.28, rspd: 0.008 },
  { pos: [-2.9, -1.8, -3.5], rot: [1.2, 0.5, 0.1], spd: 0.55, rspd: 0.014 },
  { pos: [3.3, 2.0, -6.0], rot: [0.5, 1.2, 0.8], spd: 0.22, rspd: 0.009 },
  { pos: [1.9, -2.6, -4.0], rot: [0.9, 0.6, 1.0], spd: 0.45, rspd: 0.016 },
  { pos: [-1.6, 2.4, -5.0], rot: [0.2, 0.9, 0.4], spd: 0.32, rspd: 0.008 },
  { pos: [-4.8, -1.1, -6.0], rot: [1.0, 0.4, 0.7], spd: 0.40, rspd: 0.012 },
  { pos: [4.7, 0.6, -4.5], rot: [0.6, 1.0, 0.3], spd: 0.30, rspd: 0.011 },
]

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} color="#FFD4A0" />
      <pointLight position={[4, 5, 3]} intensity={2.8} color="#E8C070" />
      <pointLight position={[-5, 2, 2]} intensity={1.6} color="#FF9055" />
      <pointLight position={[0, -3, 3]} intensity={1.0} color="#C58A45" />
      <pointLight position={[1.5, 2, 5]} intensity={0.9} color="#FFEEDD" />
      <Stars radius={90} depth={50} count={1600} factor={2.2} saturation={0} fade speed={0.35} />
      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.10}>
        <CoffeeCup />
      </Float>
      {BEANS.map((b, i) => <Bean key={i} {...b} />)}
    </>
  )
}

export default function CafeGalleryScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6.2], fov: 54 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  )
}
