'use client';

import { useRef, useEffect, useState } from 'react';
import { Code, Camera } from 'lucide-react';

export default function Craft() {
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
      id="craft"
      ref={sectionRef}
      className={`py-24 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-12">My Craft</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 p-6 rounded-3xl text-left flex flex-col h-full">
            <div>
              <Code className="text-3xl mb-3 text-white" />
              <h3 className="text-2xl font-bold mb-3">UI/UX Development</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Crafting intuitive, beautiful, and human-centered digital experiences.
              </p>
            </div>
            <div className="mt-auto">
              <a 
                href="#work-uiux" 
                className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-3xl text-left flex flex-col h-full">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-3xl mb-3 text-white w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.66-.42-1.2-1.03-1.41-.09-.03-.2-.09-.2-.18 0-.1.08-.18.18-.18h1.53c.85 0 1.53-.68 1.53-1.53v-.17c0-1.84-1.49-3.33-3.33-3.33H8.83c-.37 0-.67-.3-.67-.67 0-.37.3-.66.67-.66h2.67A2 2 0 0 0 13.5 9c0-1.1-.9-2-2-2h-2a2 2 0 0 0-2 2c0 1.1.9 2 2 2h.17C10.5 11 11 11.5 11 12.17v.33c0 .92.75 1.67 1.67 1.67h1.16c.3 0 .58.12.79.33.21.21.33.49.33.79 0 .62-.5 1.12-1.12 1.12h-2.67c-1.1 0-2 .9-2 2 0 1.1.9 2 2 2h.5"/>
              </svg>
              <h3 className="text-2xl font-bold mb-3">Graphic Design</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Creating visually stunning designs that communicate effectively.
              </p>
            </div>
            <div className="mt-auto">
              <a 
                href="#work-design" 
                className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                View Designs
              </a>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-3xl text-left flex flex-col h-full">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-3xl mb-3 text-white w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              <h3 className="text-2xl font-bold mb-3">Video Editing</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Crafting compelling visual stories through motion and sound.
              </p>
            </div>
            <div className="mt-auto">
              <a 
                href="#work-video" 
                className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Watch Reels
              </a>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-3xl text-left flex flex-col h-full">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-3xl mb-3 text-white w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              <h3 className="text-2xl font-bold mb-3">Web Development</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Building responsive, performant websites with modern technologies.
              </p>
            </div>
            <div className="mt-auto">
              <a 
                href="#work-web" 
                className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                View Websites
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}