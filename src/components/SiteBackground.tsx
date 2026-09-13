"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { usePointerRef, useReducedMotion } from "../hooks/usePointer";

function DriftingShip({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.3 + position[0]) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });
  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[0.3, 1, 16]} />
      <meshStandardMaterial color={color} />
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 12]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </mesh>
  );
}

const SHIPS: { position: [number, number, number]; color: string }[] = [
  { position: [-3, 1, -8], color: "#e0e0e0" },
  { position: [2, -1, -7], color: "#5ee7ff" },
  { position: [0, 2.5, -10], color: "#ffb02e" },
];

function useWarpBoost(reduceMotion: boolean) {
  const boost = useRef(0);
  useEffect(() => {
    if (reduceMotion) return;
    const handler = () => {
      boost.current = 1;
    };
    window.addEventListener("robot-warp", handler);
    return () => window.removeEventListener("robot-warp", handler);
  }, [reduceMotion]);
  return boost;
}

function Scene({ reduceMotion, pointer }: { reduceMotion: boolean; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const boost = useWarpBoost(reduceMotion);
  const extraSpin = useRef(0);
  useFrame(({ clock }, delta) => {
    if (!group.current || reduceMotion) return;
    if (boost.current > 0) {
      extraSpin.current += boost.current * delta * 4;
      boost.current = Math.max(0, boost.current - delta * 0.6);
    }
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.006 + pointer.current.x * 0.05 + extraSpin.current;
    group.current.rotation.x = Math.sin(t * 0.02) * 0.03 + pointer.current.y * 0.03;
  });
  return (
    <group ref={group}>
      <Stars radius={30} depth={60} count={1600} factor={2.4} saturation={0} fade speed={reduceMotion ? 0 : 0.3} />
      {SHIPS.map((s, i) => (
        <DriftingShip key={i} {...s} />
      ))}
    </group>
  );
}

export default function SiteBackground() {
  const pointer = usePointerRef();
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 13], fov: 55 }} gl={{ alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Scene reduceMotion={reduceMotion} pointer={pointer} />
      </Canvas>
    </div>
  );
}
