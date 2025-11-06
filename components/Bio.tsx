'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Coffee } from 'lucide-react';

// Import real brand icons from react-icons
import { 
  SiAdobephotoshop, 
  SiFigma, 
  SiAdobeaftereffects, 
  SiDavinciresolve, 
  SiBlender, 
  SiCanva, 
  SiAdobeillustrator, 
  SiFramer,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiNodedotjs
} from 'react-icons/si';

import { VscCode } from 'react-icons/vsc';

// Import additional icons for tools without specific brand icons
import { 
  Video, 
  Mic, 
  Cpu,
  Wand2,
  Globe,
  Music
} from 'lucide-react';

const highlights = [
  { icon: MapPin, text: "IIIT Bhubaneswar" },
  { icon: Calendar, text: "5+ Years Experience" },
  { icon: Coffee, text: "100+ Creative Projects" },
];






// Design & Creative Tools
const designTools = [
  { name: "Adobe Photoshop", icon: SiAdobephotoshop },
  { name: "Figma", icon: SiFigma },
  { name: "After Effects", icon: SiAdobeaftereffects },
  { name: "CapCut", icon: Video },
  { name: "Alight Motion", icon: Video },
  { name: "FL Studio", icon: Music },
  { name: "DaVinci Resolve", icon: SiDavinciresolve },
  { name: "TouchDesigner", icon: Cpu },
  { name: "Canva", icon: SiCanva },
  { name: "Illustrator", icon: SiAdobeillustrator }
];

// Development Tools
const devTools = [
  { name: "VS Code", icon: VscCode },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Python", icon: SiPython },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Framer", icon: SiFramer }
];

// AI & Automation Tools
const aiTools = [
  { name: "Eleven Labs", icon: Mic },
  { name: "Trae AI", icon: Cpu },
  { name: "Cursor AI", icon: Wand2 }
];

export default function Bio() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px', threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="bio"
      ref={sectionRef}
      className={`py-12 md:py-24 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio Content - Left Side */}
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                About Me
              </h2>
              <div className="w-20 h-1 bg-white rounded-full"></div>
              <div className="inline-block px-4 py-2 glass-surface rounded-full">
                <span className="text-sm font-medium text-white">Creative Generalist</span>
              </div>
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-gray-300">
                I'm Swastik Gupta, a multidisciplinary creative and final-year Computer Science student at IIIT Bhubaneswar. 
                Over the past 5+ years, I've explored and combined different mediums — video editing, photography, UI/UX, 
                graphic design, and coding — to craft seamless digital experiences. I've worked on 100+ creative projects 
                across editing, social media management, and design, while also being actively involved in societies, 
                festivals, and internships.
              </p>
              
              <p className="text-gray-400">
                For me, creativity is not just about aesthetics but about systems, emotions, and connection. Whether I'm 
                designing an interface, editing a film, or building a brand identity, I focus on blending clarity with 
                character — minimal design with bold accents, professional with personal. My goal is to bridge technology, 
                storytelling, and design into experiences that feel immersive, interactive, and human.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mb-6">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-800/50"
                >
                  <highlight.icon className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-medium">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Tools I Use */}
            <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800 mb-6">
              <h4 className="text-lg font-semibold text-white mb-6 text-center">Tools I Use</h4>
              
              {/* Design Tools */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-400 mb-3 text-left">Design & Creative</h5>
                <div className="flex flex-wrap gap-3">
                  {designTools.map((tool, index) => (
                    <div 
                      key={index}
                      className="group relative w-12 h-12 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                      title={tool.name}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        {tool.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Tools */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-400 mb-3 text-left">Development</h5>
                <div className="flex flex-wrap gap-3">
                  {devTools.map((tool, index) => (
                    <div 
                      key={index}
                      className="group relative w-12 h-12 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                      title={tool.name}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        {tool.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI & Automation Tools */}
              <div>
                <h5 className="text-sm font-medium text-gray-400 mb-3 text-left">AI & Automation</h5>
                <div className="flex flex-wrap gap-3">
                  {aiTools.map((tool, index) => (
                    <div 
                      key={index}
                      className="group relative w-12 h-12 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                      title={tool.name}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        {tool.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* CTA Button */}
            <div className="pt-4">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Let's Work Together
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Photo - Right Side */}
          <div className="relative">
            <div className="relative group">
              {/* Main photo container with dynamic effects */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-1">
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="relative w-full h-80 bg-zinc-800">
                    <Image
                      src="https://drive.google.com/uc?export=view&id=1vFKfMfB19ZmSiJruxdoATxGvQIRMVskV"
                      alt="Swastik Gupta"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Floating elements for dynamic effect */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-zinc-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-3xl border border-zinc-700/50 group-hover:border-zinc-500/50 transition-colors duration-500 pointer-events-none"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-8 right-8 w-64 h-64 bg-gradient-to-br from-zinc-800/30 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-8 left-8 w-48 h-48 bg-gradient-to-tr from-zinc-700/20 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
