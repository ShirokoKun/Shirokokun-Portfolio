'use client';

import { useRef, useEffect, useState } from 'react';
import { Linkedin, Github, Instagram, Music, Twitter, FileText } from 'lucide-react';
import { PERSONAL_INFO, RESUME_LINK } from '@/constants/personal';

const social = PERSONAL_INFO.social as Record<string, string>;

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: social.linkedin },
  { icon: Github, label: "GitHub", href: social.github },
  { icon: Instagram, label: "Instagram", href: social.instagram },
  ...(social.spotify ? [{ icon: Music, label: "Spotify", href: social.spotify }] : []),
  { icon: FileText, label: "Resume", href: RESUME_LINK },
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
              href={`mailto:${PERSONAL_INFO.alternateEmail}`}
              className="text-lg sm:text-xl md:text-2xl font-medium inline-block mb-8 hover:text-gray-300 transition-colors duration-300 break-all"
            >
              {PERSONAL_INFO.alternateEmail}
            </a>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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