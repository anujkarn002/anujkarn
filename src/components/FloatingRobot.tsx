"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshProps } from "@react-three/fiber";

function RobotHead(props: MeshProps) {
  // Simple floating animation
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.15 + 0.2;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.3;
    }
  });
  return (
    <mesh ref={ref} {...props} castShadow>
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
        <meshStandardMaterial color="#f2f2f2" />
      </mesh>
    </mesh>
  );
}

export default function FloatingRobot() {
  return (
    <div style={{ width: 120, height: 120, pointerEvents: "auto" }}>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 50 }} gl={{ alpha: true }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={0.7} />
        <RobotHead />
      </Canvas>
    </div>
  );
}
