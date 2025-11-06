'use client';

import { useRef, useEffect, useState } from 'react';
import { Linkedin, Github, Instagram, Music, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Music, label: "Spotify", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" }
];

export default function Footer() {
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
    <footer 
      id="contact"
      ref={sectionRef}
      className={`py-24 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-black/70 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Let&apos;s Connect</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind, or just want to talk about code, design, or development? My inbox is always open.
            </p>
            <a 
              href="mailto:kun.shiroko02@gmail.com"
              className="text-2xl md:text-3xl font-medium inline-block mb-8 hover:text-gray-300 transition-colors duration-300"
            >
              kun.shiroko02@gmail.com
            </a>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 text-2xl hover:text-white hover:scale-125 transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}