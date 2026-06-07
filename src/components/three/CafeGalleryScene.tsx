"use client"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function FloatingFrame({ position, rotation, scale }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.15
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[2]) * 0.15
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1.4, 1.0, 0.06]} />
      <meshStandardMaterial
        color="#C58A45"
        metalness={0.7}
        roughness={0.3}
        emissive="#3A2510"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function CoffeeRing() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.004
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusGeometry args={[1.4, 0.08, 16, 80]} />
      <meshStandardMaterial
        color="#D7A85B"
        metalness={0.8}
        roughness={0.2}
        emissive="#5A3820"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

function Scene() {
  const frames: Array<{ pos: [number, number, number]; rot: [number, number, number]; scale: number }> = [
    { pos: [-3.5, 1.2, -3], rot: [0.1, 0.3, 0.05], scale: 1.0 },
    { pos: [3.5, -0.8, -4], rot: [-0.1, -0.4, -0.05], scale: 0.9 },
    { pos: [-2.0, -1.5, -2], rot: [0.2, 0.2, 0.1], scale: 0.75 },
    { pos: [2.2, 1.8, -5], rot: [-0.15, 0.5, -0.08], scale: 1.1 },
    { pos: [0.5, -2.0, -3], rot: [0.05, -0.2, 0.15], scale: 0.8 },
  ]

  return (
    <>
      <ambientLight intensity={0.4} color="#FF9955" />
      <pointLight position={[5, 5, 2]} intensity={1.2} color="#D7A85B" />
      <pointLight position={[-5, -3, -1]} intensity={0.6} color="#C58A45" />
      <pointLight position={[0, -5, -3]} intensity={0.4} color="#FF6622" />
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      {frames.map((f, i) => (
        <FloatingFrame key={i} position={f.pos} rotation={f.rot} scale={f.scale} />
      ))}
      <CoffeeRing />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export default function CafeGalleryScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  )
}
