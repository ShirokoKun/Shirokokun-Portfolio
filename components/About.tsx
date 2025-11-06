'use client';

import { useRef, useEffect, useState } from 'react';
import { Terminal, TrendingUp, Music, Film, Zap, Code2, PenTool, BarChart } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './Animations';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<any>> = {
  Terminal,
  TrendingUp,
  Film,
  Music,
  Zap,
  Code2,
  PenTool,
  BarChart,
};

const interests = [
  { 
    icon: Terminal, 
    title: "Frontend Development",
    description: "React.js, Next.js, Tailwind, TypeScript",
    color: "from-indigo-500 via-purple-500 to-blue-500"
  },
  { 
    icon: TrendingUp, 
    title: "UI/UX Design",
    description: "Wireframes, interaction design, front-end integration",
    color: "from-blue-500 via-cyan-400 to-teal-500"
  },
  { 
    icon: Film, 
    title: "Video Editing",
    description: "DaVinci Resolve, After Effects, CapCut (5+ yrs, 100+ projects)",
    color: "from-teal-400 via-cyan-500 to-blue-600"
  },
  { 
    icon: Music, 
    title: "Graphic Design",
    description: "Photoshop, Figma, Canva for posters, branding, UI mockups",
    color: "from-purple-500 via-pink-500 to-indigo-400"
  },
  { 
    icon: Music, 
    title: "Music Production",
    description: "FL Studio, audio production, sound design, music composition",
    color: "from-orange-500 via-red-500 to-pink-500"
  },
  { 
    icon: Code2, 
    title: "Creative Coding",
    description: "p5.js, interactive graphics, data visualization, generative art",
    color: "from-green-500 via-emerald-500 to-teal-500"
  },
  { 
    icon: PenTool, 
    title: "Content Writing",
    description: "Technical writing, blog posts, marketing copy, documentation",
    color: "from-blue-500 via-indigo-500 to-purple-500"
  },
  { 
    icon: BarChart, 
    title: "Marketing Operations",
    description: "Campaign management, analytics, SEO, social media strategy",
    color: "from-yellow-500 via-orange-500 to-red-500"
  }
];

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-12 md:py-24"
    >
      <FadeIn>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">What I Do</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A multidisciplinary creative exploring the intersection of technology, design, and storytelling.
            </p>
          </div>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => {
              const IconComponent = interest.icon;
              return (
                <StaggerItem key={interest.title} index={index}>
                  <motion.div
                    className="glass-card p-6 h-full flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${interest.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{interest.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </FadeIn>
    </section>
  );
}