"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePointerRef, useReducedMotion } from "../hooks/usePointer";

const EASTER_EGG_CLICKS = 5;

function RobotHead({ pointer, reduceMotion, spinBoost }: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduceMotion: boolean;
  spinBoost: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    if (spinBoost.current > 0) {
      ref.current.rotation.z += spinBoost.current * delta * 10;
      spinBoost.current = Math.max(0, spinBoost.current - delta * 1.2);
    } else {
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.1);
    }

    if (reduceMotion) {
      ref.current.position.y = 0.2;
      return;
    }

    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 2) * 0.15 + 0.2;
    // Head tracks the pointer instead of a purely autonomous sway.
    const targetY = pointer.current.x * 0.5;
    const targetX = -pointer.current.y * 0.3;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.06);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.06);
  });

  return (
    <mesh ref={ref} castShadow>
      {/* Head */}
      <sphereGeometry args={[0.32, 32, 32]} />
      <meshStandardMaterial color="#fff" />
      {/* Eyes */}
      <mesh position={[-0.12, 0.07, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.12, 0.07, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.18, 12]} />
        <meshStandardMaterial color="#aaa" />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#5ee7ff" emissive="#5ee7ff" emissiveIntensity={0.6} />
      </mesh>
    </mesh>
  );
}

export default function FloatingRobot() {
  const pointer = usePointerRef();
  const reduceMotion = useReducedMotion();
  const spinBoost = useRef(0);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    spinBoost.current = 1;
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= EASTER_EGG_CLICKS) {
      window.dispatchEvent(new CustomEvent("robot-warp"));
      setClickCount(0);
    }
  };

  return (
    <div
      style={{ width: 120, height: 120, pointerEvents: "auto", cursor: "pointer" }}
      onClick={handleClick}
      title="Click me"
    >
      <Canvas camera={{ position: [0, 0, 2.2], fov: 50 }} gl={{ alpha: true }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={0.7} />
        <RobotHead pointer={pointer} reduceMotion={reduceMotion} spinBoost={spinBoost} />
      </Canvas>
    </div>
  );
}
