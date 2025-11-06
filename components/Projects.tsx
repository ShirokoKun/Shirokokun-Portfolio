'use client';

import { useRef, useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from './Animations';
import { PROJECT_CATEGORIES } from '@/constants/personal';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Share2,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Icon mapping for project categories
const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'cover-art': ImageIcon,
  'posters': FileText,
  'projects-contributions': Palette,
  'social-media-post': Share2,
  'video-editing-projects': Video,
};

const categoryColors: Record<string, string> = {
  'cover-art': 'from-purple-500 via-pink-500 to-red-500',
  'posters': 'from-blue-500 via-cyan-500 to-teal-500',
  'projects-contributions': 'from-green-500 via-emerald-500 to-teal-500',
  'social-media-post': 'from-orange-500 via-yellow-500 to-pink-500',
  'video-editing-projects': 'from-indigo-500 via-purple-500 to-pink-500',
};

export default function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="py-12 md:py-24"
    >
      <FadeIn>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">My Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Explore my creative work across different disciplines
            </p>
            <Link 
              href="/projects"
              className="inline-block glass-surface px-6 py-3 rounded-full text-white font-medium hover:scale-105 transition-transform"
            >
              View All Projects →
            </Link>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_CATEGORIES.map((category, index) => {
              const IconComponent = categoryIcons[category.id] || ImageIcon;
              const gradientColor = categoryColors[category.id] || 'from-gray-500 to-gray-700';
              
              return (
                <StaggerItem key={category.id} index={index}>
                  <Link href="/projects">
                    <motion.div
                      className="glass-card p-6 h-full flex flex-col cursor-pointer"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center mb-4`}>
                        <IconComponent className="text-white" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                        {category.description}
                      </p>
                      <div className="flex items-center text-blue-400 text-sm font-medium">
                        <span>View Collection</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </FadeIn>
    </section>
  );
}

