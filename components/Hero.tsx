'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronDown, Code, Camera, Palette, Mail, Eye, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from './ui/AnimatedBackground';
import { PERSONAL_INFO, RESUME_LINK } from '@/constants/personal';

export default function Hero() {
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [hasTriggeredReveal, setHasTriggeredReveal] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  const specialties = useMemo(
    () => [
      'Video Editing',
      'Graphic Design',
      'Web Design',
      'No-code Development',
      'Music Production',
      'Creative Coding',
      'Content Writing',
      'Marketing Ops'
    ],
    []
  );
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScrollReveal = () => {
      if (!hasTriggeredReveal && window.scrollY > 60) {
        setShowSpecialties(true);
        setHasTriggeredReveal(true);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartRef.current === null) return;
      const delta = (event.changedTouches[0]?.clientY ?? 0) - touchStartRef.current;
      if (!hasTriggeredReveal && delta > 40) {
        setShowSpecialties(true);
        setHasTriggeredReveal(true);
      }
      touchStartRef.current = null;
    };

    window.addEventListener('scroll', handleScrollReveal, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollReveal);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mounted, hasTriggeredReveal]);

  const toggleSpecialties = () => {
    setShowSpecialties((prev) => {
      const next = !prev;
      if (next) {
        setHasTriggeredReveal(true);
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
      <AnimatedBackground />
      
      {/* Floating elements - keeping subtle background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Code className="text-white/20 w-12 h-12 md:w-16 md:h-16" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 z-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Camera className="text-white/20 w-12 h-12 md:w-16 md:h-16" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Palette className="text-white/20 w-12 h-12 md:w-16 md:h-16" />
      </motion.div>
      
      {/* Hero Container */}
      <motion.div 
        className="relative z-20 max-w-2xl w-full mx-auto glass-card px-6 md:px-8 py-10 md:py-12 mb-20 md:mb-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="flex flex-col gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora text-white mb-4 leading-tight text-center">
              Hello, I&apos;m <span className="font-thin">{PERSONAL_INFO.name}</span>
            </h1>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center gap-4 mb-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {mounted ? (
              <>
                <motion.button
                  type="button"
                  onClick={toggleSpecialties}
                  className="group glass-surface px-5 py-2 rounded-full flex items-center gap-2 border border-white/10 text-white font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles size={16} className="text-purple-300" />
                  <span>Creative Generalist</span>
                  <motion.span
                    animate={{ rotate: showSpecialties ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-purple-300 text-sm"
                  >
                    ▼
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {showSpecialties && (
                    <motion.div
                      key="specialties"
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="glass-card w-full px-6 py-6 rounded-2xl text-center"
                    >
                      <p className="text-sm sm:text-base text-gray-300 mb-4">
                        I&apos;m a multidisciplinary creative weaving together strategy, storytelling, and technology across diverse mediums.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {specialties.map((item, index) => (
                          <motion.span
                            key={item}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 * index }}
                            className="px-3 py-1 glass-surface border border-white/10 rounded-full text-xs sm:text-sm text-white"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1.5 bg-black/40 rounded-full border border-white/10 text-xs sm:text-sm text-white/90 flex items-center gap-2">
                  <Code size={14} className="text-white/60" />
                  Frontend Developer
                </span>
                <span className="px-3 py-1.5 bg-black/40 rounded-full border border-white/10 text-xs sm:text-sm text-white/90 flex items-center gap-2">
                  <Palette size={14} className="text-white/60" />
                  UI/UX Designer
                </span>
                <span className="px-3 py-1.5 bg-black/40 rounded-full border border-white/10 text-xs sm:text-sm text-white/90 flex items-center gap-2">
                  <Camera size={14} className="text-white/60" />
                  Video Editor
                </span>
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-lg font-jakarta text-gray-400 max-w-xl mb-8 text-center">
              {PERSONAL_INFO.tagline}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="#projects"
              className="glass-card px-6 py-3 text-white font-jakarta font-medium rounded-full flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Eye size={18} />
              <span>View My Work</span>
            </motion.a>
            
            <motion.a
              href="#contact"
              className="glass-surface px-6 py-3 text-white font-jakarta font-medium rounded-full flex items-center gap-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Mail size={18} />
              <span>Get In Touch</span>
            </motion.a>
            
            <motion.a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-surface px-6 py-3 text-white font-jakarta font-medium rounded-full flex items-center gap-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Download size={18} />
              <span>Resume</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.a 
        href="#bio" 
        className="absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-10 z-20 flex flex-col items-center gap-2 text-[#A1A1A1] hover:text-white/80 transition-colors font-jakarta"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <span className="text-xs md:text-sm">Scroll Down</span>
        <ChevronDown size={18} className="md:w-5 md:h-5" />
      </motion.a>
    </div>
  );
}