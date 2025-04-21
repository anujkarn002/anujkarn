"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { CosmicActivityTimeline } from "./CosmicActivityTimeline";

// Each section as a planet/portal
const planets = [
  { id: "about", label: "About", color: "#5ee7ff", position: [-6, 0, 0], size: 1.2 },
  { id: "projects", label: "Projects", color: "#ffb347", position: [-2, 2.5, 0], size: 1 },
  { id: "timeline", label: "Timeline", color: "#e066ff", position: [2, 2, 0], size: 1.1 },
  { id: "skills", label: "Skills", color: "#ff6666", position: [6, 0, 0], size: 1 },
  { id: "testimonials", label: "Testimonials", color: "#fff176", position: [2, -2.5, 0], size: 1 },
  { id: "blog", label: "Blog", color: "#7ec850", position: [-2, -2.5, 0], size: 0.95 },
  { id: "contact", label: "Contact", color: "#00baff", position: [0, 0, 0], size: 1.5, isMain: true },
];

function Planet({ color, position, size, label, id, isMain }: any) {
  return (
    <group position={position}>
      <mesh
        castShadow
        receiveShadow
        onClick={() => {
          const el = document.querySelector(`#${id}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      >
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isMain ? 0.25 : 0.12}
          metalness={0.35}
          roughness={0.45}
        />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <span
          style={{
            color: color,
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
            textShadow: `0 0 8px ${color}99`,
            fontSize: isMain ? 28 : 18,
            letterSpacing: 2,
            filter: 'drop-shadow(0 0 4px #000a)'
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

export const Cosmic3DScene = () => {
  // --- SCROLL SYNC ---
  const cameraRef = useRef<any>(null);
  const [flyToIndex, setFlyToIndex] = useState<number | null>(null);
  // Animate camera on flyToIndex change
  useEffect(() => {
    if (flyToIndex !== null && cameraRef.current) {
      // Get event position from CosmicActivityTimeline's points
      // We'll use a custom event for communication
      const handle = (e: CustomEvent) => {
        if (e.detail && typeof e.detail.z === "number") {
          // Animate camera to target position (z, y, x)
          const cam = cameraRef.current;
          const start = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
          const end = { x: e.detail.x, y: e.detail.y, z: e.detail.z + 4 };
          let t = 0;
          function animate() {
            t += 0.03;
            cam.position.x = start.x + (end.x - start.x) * t;
            cam.position.y = start.y + (end.y - start.y) * t;
            cam.position.z = start.z + (end.z - start.z) * t;
            if (t < 1) requestAnimationFrame(animate);
            else setFlyToIndex(null);
          }
          animate();
        }
      };
      window.addEventListener("cosmic-flyto", handle as any, { once: true });
      // Dispatch event to get position from timeline
      window.dispatchEvent(new CustomEvent("cosmic-request-flyto", { detail: { index: flyToIndex } }));
    }
  }, [flyToIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const t = docHeight > 0 ? scrollY / docHeight : 0;
      // Animate camera along Z axis for a parallax effect
      if (cameraRef.current) {
        cameraRef.current.position.z = 13 - t * 7;
        cameraRef.current.position.y = t * 3.5;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 13], fov: 55 }} shadows gl={{ alpha: true }} onCreated={({ camera }) => { cameraRef.current = camera; }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={1.1} color="#5ee7ff" />
        <Stars radius={30} depth={60} count={1600} factor={2.2} saturation={0.9} fade speed={0.7} />
        <Suspense fallback={null}>
          <CosmicActivityTimeline flyToIndex={flyToIndex} setFlyToIndex={setFlyToIndex} />
          {planets.map((p) => (
            <Planet key={p.id} {...p} />
          ))}
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
