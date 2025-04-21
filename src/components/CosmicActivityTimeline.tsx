"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// --- Matte Black & White Theme ---
const BW = {
  white: '#fff',
  black: '#181818', // matte black
  gray: '#888',
  darkGray: '#222',
  lightGray: '#eee',
};

// Dummy static data for activity timeline
const timelineEvents = [
  {
    id: "1",
    type: "project",
    title: "Galactic Portfolio Launch",
    date: "2024-01-15",
    description: "Launched my cosmic-themed portfolio website!",
    color: BW.white,
    icon: "planet"
  },
  {
    id: "2",
    type: "blog",
    title: "How to Animate Stars",
    date: "2024-03-10",
    description: "Wrote a blog post on animating stars in React.",
    color: BW.gray,
    icon: "comet"
  },
  {
    id: "3",
    type: "experience",
    title: "Joined SpaceTech Labs",
    date: "2024-05-01",
    description: "Started as a Full Stack Engineer at SpaceTech Labs.",
    color: BW.white,
    icon: "ufo"
  }
];

// Helper: cartoon/anime-style icons as SVG/JSX
function SparkleEffect({ position = [0, 0, 0], scale = 1, active = false }) {
  const group = useRef<any>(undefined);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.children.forEach((mesh: any, i: number) => {
        mesh.position.x = Math.cos(clock.getElapsedTime() * 1.8 + i) * scale * (1 + 0.12 * Math.sin(clock.getElapsedTime() + i));
        mesh.position.y = Math.sin(clock.getElapsedTime() * 1.8 + i) * scale * (1 + 0.12 * Math.cos(clock.getElapsedTime() + i));
        mesh.scale.setScalar(0.18 + 0.08 * Math.sin(clock.getElapsedTime() * 2 + i * 2));
      });
    }
  });
  return (
    <group ref={group}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={BW.white} transparent opacity={active ? 0.38 : 0.22} />
        </mesh>
      ))}
    </group>
  );
}

function CosmicIcon({ icon, color }: { icon: string; color: string }) {
  switch (icon) {
    case "planet":
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.7, 48, 48]} />
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} />
          {/* Outline */}
          <mesh>
            <sphereGeometry args={[0.75, 48, 48]} />
            <meshBasicMaterial color={BW.white} wireframe opacity={0.18} transparent />
          </mesh>
        </mesh>
      );
    case "comet":
      return (
        <group>
          <mesh>
            <sphereGeometry args={[0.38, 24, 24]} />
            <meshStandardMaterial color={BW.white} roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Tail */}
          <mesh position={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.14, 1.3, 16]} />
            <meshStandardMaterial color={BW.gray} roughness={0.9} metalness={0.1} opacity={0.7} transparent />
          </mesh>
        </group>
      );
    case "ufo":
      return (
        <group>
          <mesh>
            <cylinderGeometry args={[0.5, 1.1, 0.3, 32]} />
            <meshStandardMaterial color={BW.gray} roughness={0.35} metalness={0.5} />
          </mesh>
          {/* Dome */}
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={BW.white} roughness={0.1} metalness={0.6} opacity={0.8} transparent />
          </mesh>
        </group>
      );
    default:
      return null;
  }
}

function StardustPath({ points }: { points: THREE.Vector3[] }) {
  return (
    <group>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 128, 0.12, 12, false]} />
        <meshStandardMaterial color={BW.white} roughness={0.7} metalness={0.2} emissive={BW.white} emissiveIntensity={0.23} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function TimelineNode({ event, position, onClick }: any) {
  const meshRef = useRef<any>(undefined);
  const [hovered, setHovered] = useState(false);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.07 + (hovered ? 0.16 : 0);
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() + position[0]) * 0.3 + (hovered ? 0.25 : 0);
      meshRef.current.scale.setScalar(hovered ? 1.18 : 1.0);
    }
  });
  return (
    <group
      ref={meshRef}
      position={position}
      onClick={e => { e.stopPropagation(); onClick(); }}
      onPointerOver={e => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={e => { e.stopPropagation(); setHovered(false); }}
      onPointerDown={e => e.stopPropagation()}
      onPointerUp={e => e.stopPropagation()}
      onPointerMissed={e => e.stopPropagation()}
    >
      <CosmicIcon icon={event.icon} color={event.color} />
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <span
          style={{
            color: event.color,
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 600,
            textShadow: `0 0 8px ${BW.black}99`,
            fontSize: 16,
            letterSpacing: 2,
            filter: 'drop-shadow(0 0 4px #000a)'
          }}
        >
          {event.title}
        </span>
      </Html>
    </group>
  );
}

export const CosmicActivityTimeline = ({ flyToIndex, setFlyToIndex }: { flyToIndex?: number | null, setFlyToIndex?: (idx: number | null) => void }) => {
  const points = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < timelineEvents.length; i++) {
      const t = i * 1.7;
      arr.push(new THREE.Vector3(
        Math.cos(t) * (2.2 + 0.2 * i),
        Math.sin(t) * (2.2 + 0.2 * i) + Math.sin(i * 1.1) * 0.4 + i * 0.7,
        i * 1.25
      ));
    }
    return arr;
  }, []);

  // Listen for flyTo requests from parent
  useEffect(() => {
    function handleRequest(e: CustomEvent) {
      const idx = e.detail.index;
      if (typeof idx === "number" && points[idx]) {
        window.dispatchEvent(new CustomEvent("cosmic-flyto", { detail: { x: points[idx].x, y: points[idx].y, z: points[idx].z } }));
      }
    }
    window.addEventListener("cosmic-request-flyto", handleRequest as any);
    return () => window.removeEventListener("cosmic-request-flyto", handleRequest as any);
  }, [points]);

  // Info card state
  const [selected, setSelected] = useState<number | null>(null);
  // Timeline progress state
  const [progress, setProgress] = useState(-1);

  // Scroll to event when progress changes
  useEffect(() => {
    if (progress >= 0 && progress < points.length) {
      const y = (points[progress].z / (points[points.length - 1].z + 3)) * (document.body.scrollHeight - window.innerHeight);
      window.scrollTo({ top: y, behavior: "smooth" });
      if (setFlyToIndex) setFlyToIndex(progress);
    }
  }, [progress]);

  return (
    <>
      <StardustPath points={points} />
      {timelineEvents.map((ev, i) => (
        <TimelineNode
          key={ev.id}
          event={ev}
          position={[points[i].x, points[i].y, points[i].z]}
          onClick={() => { setSelected(i); if (setFlyToIndex) setFlyToIndex(i); }}
        />
      ))}
      {/* Info Card */}
      {selected !== null && (
        <Html
          position={[points[selected].x, points[selected].y + 1, points[selected].z]}
          center
          distanceFactor={7}
        >
          <div style={{
            background: BW.black,
            border: `2px solid ${BW.white}`,
            borderRadius: 18,
            boxShadow: `0 0 24px 6px ${BW.white}55`,
            padding: 24,
            color: BW.white,
            fontFamily: 'Orbitron, sans-serif',
            minWidth: 220,
            maxWidth: 320,
            zIndex: 9999
          }}>
            <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 6 }}>{timelineEvents[selected].title}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 12 }}>{timelineEvents[selected].date}</div>
            <div style={{ fontSize: 15, marginBottom: 10 }}>{timelineEvents[selected].description}</div>
            <button onClick={() => setSelected(null)} style={{
              background: BW.white,
              color: BW.black,
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              padding: '6px 18px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              marginTop: 8,
              boxShadow: `0 0 10px ${BW.white}99`
            }}>Close</button>
          </div>
        </Html>
      )}
      {/* Journey Buttons - now a floating overlay */}
      <Html
        position={[0, 0, 0]}
        center
        zIndexRange={[1000, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 32,
            zIndex: 1000,
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}
        >
          {progress === -1 && (
            <button onClick={() => setProgress(0)} style={{
              background: BW.white, color: BW.black, fontWeight: 700, fontFamily: 'Orbitron, sans-serif',
              fontSize: 22, borderRadius: 16, border: 'none', padding: '18px 56px', cursor: 'pointer', boxShadow: '0 0 32px #fffcc', letterSpacing: 2, pointerEvents: 'auto',
              transition: 'transform 0.2s',
            }}>Start Journey</button>
          )}
          {progress > -1 && progress < timelineEvents.length - 1 && (
            <button onClick={() => setProgress(progress + 1)} style={{
              background: BW.white, color: BW.black, fontWeight: 700, fontFamily: 'Orbitron, sans-serif',
              fontSize: 20, borderRadius: 14, border: 'none', padding: '14px 44px', cursor: 'pointer', boxShadow: '0 0 18px #fffcc', letterSpacing: 1, pointerEvents: 'auto',
              transition: 'transform 0.2s',
            }}>Next Event</button>
          )}
          {progress === timelineEvents.length - 1 && (
            <span style={{ color: BW.white, fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: 18, background: BW.black, borderRadius: 10, padding: '12px 36px', boxShadow: '0 0 18px #fffcc' }}>Journey Complete!</span>
          )}
        </div>
      </Html>
    </>
  );
};
