'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { FadeIn } from './Animations';

// Artwork data - using actual local filenames with Google Drive as fallback
const artworkImages = [
  { 
    id: '1IB-3IjwWAutLcpqfIZeogbW_ZODWzOWq', 
    local: '/images/artwork/Advaita Idea Design.png', 
    title: 'Advaita Idea Design' 
  },
  { 
    id: '12hFYNkGHDzkGEgRiIz__AyiwKWjLhL5e', 
    local: '/images/artwork/am I even alive_.png', 
    title: 'Am I Even Alive' 
  },
  { 
    id: '1ONelSnHXVGGs0NUzFyFuTrrqjSMuoK4K', 
    local: '/images/artwork/barneyySku.png', 
    title: 'Barney Sku' 
  },
  { 
    id: '1MjuKgxaBe9wopoAiAsbwHvmFIRAT10RF', 
    local: '/images/artwork/C_est-la-vie.png', 
    title: "C'est La Vie" 
  },
  { 
    id: '130FDNt0hFpq1vAzIlqZHPeHePNxS3EzS', 
    local: '/images/artwork/Crosshair+.png', 
    title: 'Crosshair+' 
  },
  { 
    id: '1PnXRZrFVoV53pDQ0H8vHlk8NGtnBmff2', 
    local: '/images/artwork/FXXXX CLUB Grunge_.png', 
    title: 'FXXXX CLUB Grunge' 
  },
  { 
    id: '1AQdV8D0-5vzjyoseKh1qlhdk_8OA-54-', 
    local: '/images/artwork/Gojo Poster.png', 
    title: 'Gojo Poster' 
  },
  { 
    id: '1rngwMKr1AYLvBeYNM6HcgtqfOO0B-R_P', 
    local: '/images/artwork/Harmony.jpg', 
    title: 'Harmony' 
  },
  { 
    id: '1ohVFPPBeNqpt5gjhjRignOijOvK73fqT', 
    local: '/images/artwork/Jaiyash-FadedxFalak.png', 
    title: 'Jaiyash Faded x Falak' 
  },
  { 
    id: '1ZmGcwfK9eRZDI0pj8KMJ4NfVbznln4Eh', 
    local: '/images/artwork/New Project 49 [6070DF3].png', 
    title: 'New Project 49' 
  },
  { 
    id: '1OpUv1UL6RKxGMAdkytNe2CcNQq0tKSkD', 
    local: '/images/artwork/Pink Floyd.png', 
    title: 'Pink Floyd' 
  },
  { 
    id: '1S8TC2HTb9y4VY2RBIQCvuGYAd57uduGG', 
    local: '/images/artwork/Shiroko.png', 
    title: 'Shiroko' 
  },
  { 
    id: '1ICPWL3PydjvJUzImwc0vy77ZhH0fGN64', 
    local: '/images/artwork/Untitled-rdrg1.png', 
    title: 'Untitled' 
  },
  { 
    id: '1u4s-I12tvRWd79tm8diugnPXursRW4qS', 
    local: '/images/artwork/Urban-Decay.png', 
    title: 'Urban Decay' 
  },
  { 
    id: '12vclSFHS4vXm5Zt2WG-l61WXZlRVT6dO', 
    local: '/images/artwork/Utopia Poster Ideation.jpg', 
    title: 'Utopia Poster Ideation' 
  },
  { 
    id: '1IB-3IjwWAutLcpqfIZeogbW_ZODWzOWq', 
    local: '/images/artwork/W.png', 
    title: 'W' 
  },
  { 
    id: '12hFYNkGHDzkGEgRiIz__AyiwKWjLhL5e', 
    local: '/images/artwork/YePoster.png', 
    title: 'Ye Poster' 
  },
];

// Function to get image URL - prioritize local, fallback to Google Drive
const getImageUrl = (image: typeof artworkImages[0], useLocal: boolean = true) => {
  // Always try local first for better performance
  if (useLocal) {
    return image.local;
  }
  return `https://drive.google.com/uc?export=view&id=${image.id}`;
};

export default function ArtworkGallery() {
  const [displayedImages, setDisplayedImages] = useState<typeof artworkImages>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with random selection of 6 images
  useEffect(() => {
    const shuffled = [...artworkImages].sort(() => Math.random() - 0.5);
    setDisplayedImages(shuffled.slice(0, 6));
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (isAutoRotating && displayedImages.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayedImages.length);
      }, 5000); // Change image every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, displayedImages.length]);

  const handleRefresh = () => {
    const shuffled = [...artworkImages].sort(() => Math.random() - 0.5);
    setDisplayedImages(shuffled.slice(0, 6));
    setCurrentIndex(0);
    setImageErrors(new Set());
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedImages.length) % displayedImages.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedImages.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set([...prev, index]));
  };

  if (displayedImages.length === 0) return null;

  const currentImage = displayedImages[currentIndex];
  // Use local images first, fallback to Google Drive if local fails
  const currentImageUrl = imageErrors.has(currentIndex)
    ? getImageUrl(currentImage, false) // Fallback to Google Drive
    : getImageUrl(currentImage, true); // Use local first

  return (
    <section id="artwork-gallery" className="py-8 md:py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">Through The Lens</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
              A curated showcase of my creative work
            </p>
          </div>
        </FadeIn>

        {/* Compact Main Image Display */}
        <div className="relative mb-4 md:mb-6">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[16/10] max-w-3xl mx-auto glass-card overflow-hidden rounded-xl"
          >
            <Image
              src={currentImageUrl}
              alt={currentImage.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
              loading="lazy"
              unoptimized
              onError={() => handleImageError(currentIndex)}
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Compact image counter */}
            <div className="absolute top-3 right-3 glass-surface px-3 py-1 rounded-full">
              <span className="text-xs text-white font-medium">
                {currentIndex + 1} / {displayedImages.length}
              </span>
            </div>
          </motion.div>

          {/* Compact Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass-surface p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass-surface px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
              <span className="text-xs font-medium">Refresh</span>
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass-surface p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Compact Thumbnail Grid */}
        <div className="grid grid-cols-6 gap-2 md:gap-3 max-w-2xl mx-auto">
          {displayedImages.map((image, index) => {
            const thumbnailUrl = imageErrors.has(index)
              ? getImageUrl(image, false) // Fallback to Google Drive
              : getImageUrl(image, true); // Use local first
            
            return (
              <motion.button
                key={`${image.id}-${index}`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoRotating(false);
                  setTimeout(() => setIsAutoRotating(true), 10000);
                }}
                className={`relative aspect-square glass-card overflow-hidden rounded-lg ${
                  index === currentIndex ? 'ring-2 ring-purple-500 ring-offset-1 ring-offset-black' : ''
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={thumbnailUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 16.66vw, 150px"
                  loading="lazy"
                  unoptimized
                  onError={() => handleImageError(index)}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-purple-500/20" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Compact Progress Indicator */}
        <div className="mt-4 flex justify-center">
          <div className="flex gap-1.5">
            {displayedImages.map((_, index) => (
              <motion.div
                key={index}
                className={`h-0.5 rounded-full ${
                  index === currentIndex ? 'bg-purple-500 w-6' : 'bg-gray-700 w-1'
                }`}
                initial={false}
                animate={{
                  width: index === currentIndex ? 24 : 4,
                  opacity: index === currentIndex ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
