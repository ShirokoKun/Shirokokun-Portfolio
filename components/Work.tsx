'use client';

import { useRef, useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from './Animations';

// Using placeholder images - replace with your actual project images
const projects = [
  {
    id: 1,
    title: "Web Portfolio",
    image: "/images/projects/web-portfolio.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Next.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Designs & Posters",
    image: "/images/projects/designs-posters.jpg",
    tags: ["Graphics Design", "Photoshop", "Figma"]
  },
  {
    id: 3,
    title: "Visuals & Edits",
    image: "/images/projects/visuals-edits.jpg",
    tags: ["Video Editing", "After Effects", "TouchDesigner"]
  },
  {
    id: 4,
    title: "Creative Coding",
    image: "/images/projects/creative-coding.jpg",
    tags: ["p5.js", "TouchDesigner", "Generative Art"]
  }
];


export default function Work() {
  const [isVisible, setIsVisible] = useState({ uiux: false });
  const uiuxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'work-uiux') {
              setIsVisible(prev => ({ ...prev, uiux: true }));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.15 }
    );

    if (uiuxRef.current) observer.observe(uiuxRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work">
      <FadeIn>
        <div 
          id="work-uiux"
          ref={uiuxRef}
          className="py-24"
        >
          <div className="max-w-6xl mx-auto px-8 text-center">
            <FadeIn direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-black mb-12">Projects</h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <StaggerItem key={project.id} index={index}>
                  <a 
                    href="/projects" 
                    className="glass-card overflow-hidden group block"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-4">{project.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </FadeIn>

    </section>
  );
}