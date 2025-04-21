import React from "react";
import Image from "next/image";

// Define celestial portals: id, label, image, position, target section
const portals = [
  {
    id: "about",
    label: "About",
    img: "/celestial/realistic-planet-illustration.png",
    style: { top: "12%", left: "18%", width: 120, zIndex: 20 },
    target: "#about"
  },
  {
    id: "projects",
    label: "Projects",
    img: "/celestial/earth-ball-planet-isolated.png",
    style: { top: "65%", left: "12%", width: 90, zIndex: 18 },
    target: "#projects"
  },
  {
    id: "timeline",
    label: "Timeline",
    img: "/celestial/cosmic-marble-planet-swirling-nebula-purple-galaxy.jpg",
    style: { top: "30%", right: "13%", width: 110, zIndex: 22, borderRadius: 60 },
    target: "#timeline"
  },
  {
    id: "skills",
    label: "Skills",
    img: "/celestial/fiery-planet-surface-textures-intense-orange-red-hues-celestial-body.jpg",
    style: { top: "70%", right: "17%", width: 80, zIndex: 17, borderRadius: 40 },
    target: "#skills"
  },
  {
    id: "testimonials",
    label: "Testimonials",
    img: "/celestial/stunning-3d-render-ringed-planet-celestial-body-cosmic-wonder.jpg",
    style: { top: "45%", left: "50%", width: 100, zIndex: 19, borderRadius: 50 },
    target: "#testimonials"
  },
  {
    id: "blog",
    label: "Blog",
    img: "/celestial/cosmic-swirl-pink-galaxy-nebula.jpg",
    style: { top: "80%", left: "55%", width: 80, zIndex: 16, borderRadius: 40 },
    target: "#blog"
  },
  {
    id: "contact",
    label: "Contact",
    img: "/celestial/alien-planet-deep-space-exploration-cosmic-mystery.jpg",
    style: { top: "10%", right: "10%", width: 95, zIndex: 21, borderRadius: 48 },
    target: "#contact"
  },
];

export const CelestialPortals = () => (
  <div className="fixed inset-0 pointer-events-none z-30">
    {portals.map(portal => (
      <a
        key={portal.id}
        href={portal.target}
        className="group absolute flex flex-col items-center pointer-events-auto"
        style={{ ...portal.style, position: "absolute" }}
      >
        <div className="relative group-hover:scale-110 transition-transform duration-300 animate-float">
          <Image
            src={portal.img}
            alt={portal.label}
            width={portal.style.width}
            height={portal.style.width}
            style={{ borderRadius: portal.style.borderRadius || 9999, boxShadow: "0 0 24px 8px #5ee7ff55" }}
            className="shadow-accent-glow"
          />
          <span className="absolute left-1/2 top-full -translate-x-1/2 mt-2 px-3 py-1 rounded-full bg-black/80 text-accent font-orbitron text-xs whitespace-nowrap shadow-accent-glow opacity-90 group-hover:opacity-100 transition-all">
            {portal.label}
          </span>
        </div>
      </a>
    ))}
  </div>
);
