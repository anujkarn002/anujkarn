import React from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Timeline events as nodes along a glowing spiral path
const timelineEvents = [
  { id: "start", label: "Launch", color: "#5ee7ff", pos: [0, 0, 0] },
  { id: "about", label: "About", color: "#ffb347", pos: [1.5, 1.5, 0.5] },
  { id: "projects", label: "Projects", color: "#e066ff", pos: [3.2, 2.2, 1.2] },
  { id: "skills", label: "Skills", color: "#ff6666", pos: [5, 2.5, 2] },
  { id: "testimonials", label: "Testimonials", color: "#fff176", pos: [7, 1.8, 2.8] },
  { id: "blog", label: "Blog", color: "#7ec850", pos: [8.5, 0, 3.5] },
  { id: "contact", label: "Contact", color: "#00baff", pos: [10, -2, 4.5] },
];

function TimelinePath() {
  // Create a glowing spiral path
  const curve = new THREE.CatmullRomCurve3(
    timelineEvents.map(e => new THREE.Vector3(...e.pos)), false, "catmullrom", 0.5
  );
  const points = curve.getPoints(120);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#5ee7ff"
        linewidth={2}
        transparent
        opacity={0.6}
      />
    </line>
  );
}

function TimelineNode({ event }: { event: typeof timelineEvents[0] }) {
  // Animate glow
  const meshRef = React.useRef<any>();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = 0.25 + 0.15 * Math.sin(clock.getElapsedTime() * 2 + event.pos[0]);
    }
  });
  return (
    <group position={[event.pos[0], event.pos[1], event.pos[2]]}>
      <mesh
        ref={meshRef}
        onClick={() => {
          const el = document.querySelector(`#${event.id}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      >
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={event.color}
          emissive={event.color}
          emissiveIntensity={0.22}
          metalness={0.2}
          roughness={0.42}
        />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <span
          style={{
            color: event.color,
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 600,
            textShadow: `0 0 8px ${event.color}99`,
            fontSize: 15,
            letterSpacing: 2,
            filter: 'drop-shadow(0 0 4px #000a)'
          }}
        >
          {event.label}
        </span>
      </Html>
    </group>
  );
}

export const CosmicTimeline = () => (
  <>
    <TimelinePath />
    {timelineEvents.map(ev => (
      <TimelineNode key={ev.id} event={ev} />
    ))}
  </>
);
