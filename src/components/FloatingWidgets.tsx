import React from "react";
import { FaUserAstronaut, FaProjectDiagram, FaRegClock, FaTools, FaQuoteLeft, FaBlog, FaEnvelope } from "react-icons/fa";

const widgets = [
  {
    id: "about",
    label: "About",
    icon: <FaUserAstronaut size={22} />,
    position: "top-12 left-10",
    target: "#about"
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FaProjectDiagram size={22} />,
    position: "top-1/3 left-5",
    target: "#projects"
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: <FaRegClock size={22} />,
    position: "top-1/2 right-10",
    target: "#timeline"
  },
  {
    id: "skills",
    label: "Skills",
    icon: <FaTools size={22} />,
    position: "bottom-1/3 left-10",
    target: "#skills"
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <FaQuoteLeft size={22} />,
    position: "bottom-24 right-12",
    target: "#testimonials"
  },
  {
    id: "blog",
    label: "Blog",
    icon: <FaBlog size={22} />,
    position: "bottom-1/4 left-1/2",
    target: "#blog"
  },
  {
    id: "contact",
    label: "Contact",
    icon: <FaEnvelope size={22} />,
    position: "bottom-10 right-10",
    target: "#contact"
  },
];

export const FloatingWidgets = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {widgets.map(w => (
        <a
          key={w.id}
          href={w.target}
          className={`absolute ${w.position} pointer-events-auto group select-none`}
          style={{ zIndex: 30 }}
        >
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-black/60 border-2 border-accent shadow-accent-glow hover:scale-110 hover:bg-accent/80 hover:text-black transition-all duration-300 cursor-pointer animate-float">
            <span className="text-accent group-hover:text-black transition-all duration-200">
              {w.icon}
            </span>
          </div>
          <span className="mt-2 text-xs font-orbitron text-accent group-hover:text-black bg-black/70 px-2 py-1 rounded opacity-80 group-hover:opacity-100 transition-all duration-200 shadow-accent-glow">
            {w.label}
          </span>
        </a>
      ))}
    </div>
  );
};
