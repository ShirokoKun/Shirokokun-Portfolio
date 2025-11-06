'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextAnimationProps {
  text: string;
  className?: string;
  highlightColor?: string;
  textColor?: string;
  delay?: number;
  duration?: number;
}

export default function TextAnimation({
  text,
  className = '',
  highlightColor = '#8b5cf6',
  textColor = 'white',
  delay = 0,
  duration = 0.5
}: TextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text into characters for animation
  const characters = text.split('');

  // Character animation variants
  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.05,
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  // Container animation for the highlight effect
  const containerVariants = {
    hidden: { width: '0%' },
    visible: {
      width: '100%',
      transition: {
        delay: delay,
        duration: duration * 1.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Text with character animation */}
      <div className="relative z-10 flex">
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: delay + i * 0.05,
                  duration: duration,
                  ease: [0.2, 0.65, 0.3, 0.9] as const
                }
              })
            }}
            className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''}`}
            style={{ color: textColor }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      
      {/* Animated highlight underline */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { width: '0%' },
          visible: {
            width: '100%',
            transition: {
              delay: delay,
              duration: duration * 1.5,
              ease: [0.25, 0.46, 0.45, 0.94] as const
            }
          }
        }}
        className="absolute bottom-0 left-0 h-[6px] rounded-full z-0"
        style={{ backgroundColor: highlightColor }}
      />
    </div>
  );
}