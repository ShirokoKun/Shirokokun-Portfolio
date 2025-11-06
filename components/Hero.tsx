'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, Camera, Palette, ExternalLink, Mail, Eye, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from './ui/AnimatedBackground';
import { PERSONAL_INFO, RESUME_LINK } from '@/constants/personal';

export default function Hero() {
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
            <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-sora text-white mb-4 whitespace-nowrap">
              Hello, I&apos;m <span className="font-thin">{PERSONAL_INFO.name}</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <motion.div 
              className="px-3 py-1.5 bg-black/40 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Code size={14} className="text-white/70" />
              <span className="text-sm font-jakarta font-medium text-white/90">Frontend Developer</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/40 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Palette size={14} className="text-white/70" />
              <span className="text-sm font-jakarta font-medium text-white/90">UI/UX Designer</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/40 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Camera size={14} className="text-white/70" />
              <span className="text-sm font-jakarta font-medium text-white/90">Video Editor</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-lg font-jakarta text-gray-400 max-w-xl mb-6">
              {PERSONAL_INFO.tagline}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">Frontend Dev</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">Video Editing</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">UI/UX Design</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">Music Production</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">Creative Coding</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">Content Writing</span>
            </motion.div>
            
            <motion.div 
              className="px-3 py-1.5 bg-black/30 rounded-full border border-white/10 flex items-center gap-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-jakarta font-medium text-white/80">Marketing Ops</span>
            </motion.div>
          </div>
          
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
        className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#A1A1A1] hover:text-white/80 transition-colors font-jakarta"
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