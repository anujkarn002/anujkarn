"use client";
import Link from "next/link";
import BackgroundStars from "../components/BackgroundStars";
import FloatingRobot from "../components/FloatingRobot";
import { FaLaptop, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFileAlt, FaRegFileAlt, FaRegFolderOpen } from "react-icons/fa";
import { useActivities } from "../hooks/useActivities";

const experience = [
  {
    position: "Full Stack Engineer",
    company: "PivotX Advisors",
    location: "India",
    isRemote: true,
    isOnsite: false,
    isPresent: true
  },
  {
    position: "Full Stack Developer",
    company: "Upstem Technologies",
    location: "Australia",
    isRemote: true,
    isOnsite: false,
    isPresent: false
  },
  {
    position: "Software Engineer",
    company: "Leapfrog Technology",
    location: "Nepal",
    isRemote: false,
    isOnsite: true,
    isPresent: false
  },
  {
    position: "Software Developer",
    company: "Sunya Health Solutions",
    location: "Nepal",
    isRemote: false,
    isOnsite: true,
    isPresent: false
  }
];

export default function Home() {
  const { activities } = useActivities();

  return (
    <>
      <BackgroundStars />
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 font-mono bg-matte-black text-white">
        <div className="flex flex-col items-center justify-center w-full px-6 pt-24 pb-12" style={{ minHeight: '70vh' }}>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight text-center retro-shadow">Anuj Karn</h1>
          <h2 className="text-lg md:text-2xl text-white/70 font-light mb-2 text-center retro-title">Software Engineer. Space & Technology Enthusiast.</h2>
          <p className="max-w-2xl text-center text-white/60 text-base md:text-lg mb-8 retro-desc">
            Building elegant tools for humans and exploring the universe through code.
          </p>
          <div className="flex gap-3 items-center justify-center mb-8 mt-2">
            <a href="https://github.com/anujkarn002" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition text-2xl" title="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com/in/anujkarn002" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition text-2xl" title="LinkedIn"><FaLinkedin /></a>
            <a href="/resume/Anuj_Karn_Resume_01_04_2025.pdf" download className="text-white/70 hover:text-white transition text-2xl" title="Résumé"><FaFileAlt /></a>
          </div>
          <div className="flex flex-col gap-12 w-full max-w-2xl mt-8 mb-6">
            {activities.length > 100 && (
              <section>
                <h3 className="text-white text-base font-bold retro-section mb-4">Recent activities</h3>
                <ul className="flex flex-col gap-4">
                  {activities.slice(0, 4).map((item, i) => (
                    <li key={i} className="text-base md:text-lg group hover:bg-white/5 transition rounded px-2 -mx-2 py-1 flex flex-col">
                      <span className="flex items-center gap-2">
                        {item.type === 'Post' ? (
                          <FaRegFileAlt className="text-xs text-white/40" />
                        ) : (
                          <FaRegFolderOpen className="text-xs text-white/40" />
                        )}
                        <Link
                          href={item.type === 'Post' ? `/posts/${item.id}` : `/projects/${item.id}`}
                          className="block text-white underline-offset-2 group-hover:underline transition"
                        >
                          {item.title}
                        </Link>
                      </span>
                      <span className="flex items-center gap-2 mt-0.5">
                        <span className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                        <span className="text-xs text-white/50">{item.tags && item.tags.join(', ')}</span>
                        <span className="text-xs text-white/30">{item.date}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end">
                  <Link href="/activity" className="retro-link text-xs px-4 py-1">See more</Link>
                </div>
              </section>
            )}
            <hr className="border-t border-white/10 my-8" />
            <section>
              <h3 className="text-white text-base font-bold retro-section mb-4">Skills</h3>
              <p className="text-white/70 text-sm">Python, TypeScript, Go, React, Next.js, Docker, AWS, PostgreSQL, OpenCV, CI/CD, C#, Agile</p>
            </section>
            <hr className="border-t border-white/10 my-8" />
            <section>
              <h3 className="text-white text-base font-bold retro-section mb-4">Experience</h3>
              <ul className="flex flex-col gap-4">
                {experience.map((exp, i) => (
                  <li key={i} className="text-base md:text-lg hover:bg-white/5 transition rounded px-2 -mx-2 py-1">
                    <span className="flex items-center gap-2 text-white text-base">
                      {exp.position}
                      {exp.isPresent && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide border border-white/30">Current</span>
                      )}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-white/70">
                      {exp.company}, {exp.location}
                      {exp.isRemote && <FaLaptop title="Remote" className="inline text-base text-white/40" />}
                      {exp.isOnsite && <FaMapMarkerAlt title="On Site" className="inline text-base text-white/40" />}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          {/* Floating 3D Robot */}
          <div className="fixed bottom-8 right-8 z-20">
            <FloatingRobot />
          </div>
        </div>
      </main>
      <style jsx global>{`
        .retro-shadow {
          text-shadow: 2px 2px 0 #222, 4px 4px 0 #000;
        }
        .retro-title {
          letter-spacing: 0.1em;
        }
        .retro-desc {
          font-family: 'IBM Plex Mono', 'Fira Mono', 'Menlo', monospace;
        }
        .retro-section {
          letter-spacing: 0.08em;
          border-left: 4px solid #fff;
          padding-left: 0.5em;
        }
        .retro-link {
          color: #fff;
          font-weight: 700;
          text-decoration: none;
          padding: 0.5em 1.2em;
          border-radius: 9999px;
          background: transparent;
          border: 2px solid #fff;
          transition: background 0.2s, color 0.2s;
          font-size: 1rem;
        }
        .retro-link.resume-btn {
          border-color: #5eead4;
          color: #5eead4;
        }
        .retro-link.resume-btn:hover {
          background: #5eead4;
          color: #111;
        }
        .retro-link:hover {
          background: #fff;
          color: #111;
        }
      `}</style>
    </>
  );
}
