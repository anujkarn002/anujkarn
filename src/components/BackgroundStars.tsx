"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function RotatingStars() {
  const group = useRef<any>(null);
  useFrame(({ clock }) => {
    // Slow, subtle rotation
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.008;
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.03;
    }
  });
  return (
    <group ref={group}>
      <Stars
        radius={30}
        depth={60}
        count={1200}
        factor={2.1}
        saturation={0}
        fade
        speed={0.3}
      />
    </group>
  );
}

export default function BackgroundStars() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 13], fov: 55 }} gl={{ alpha: true }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.3} />
        <RotatingStars />
      </Canvas>
    </div>
  );
}
