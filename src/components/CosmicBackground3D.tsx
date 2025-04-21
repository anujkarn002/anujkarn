"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Spaceship({ position, speed, color }: { position: [number, number, number]; speed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Animate spaceship in a slow random orbit
  // (For demo, just rotate and float for now)
  return (
    <mesh ref={meshRef} position={position}>
      {/* Simple stylized spaceship: cone (body) + cylinder (engine) */}
      <coneGeometry args={[0.3, 1, 16]} />
      <meshStandardMaterial color={color} />
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 12]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </mesh>
  );
}

export default function CosmicBackground3D() {
  // Spaceships with random positions/colors
  const ships = [
    { pos: [-3, 1, -8], speed: 0.1, color: "#e0e0e0" },
    { pos: [2, -1, -7], speed: 0.07, color: "#aeefff" },
    { pos: [0, 2.5, -10], speed: 0.09, color: "#fff6b0" },
    { pos: [-2, -2, -9], speed: 0.08, color: "#ffb6e6" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Stars radius={30} depth={60} count={2000} factor={3} fade speed={1} />
        <Suspense fallback={null}>
          {ships.map((s, i) => (
            <Spaceship key={i} position={s.pos} speed={s.speed} color={s.color} />
          ))}
        </Suspense>
        {/* No OrbitControls for non-interactive bg */}
      </Canvas>
    </div>
  );
}
