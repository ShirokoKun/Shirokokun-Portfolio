'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import Metrics from '@/components/Metrics';
import Projects from '@/components/Projects';
import About from '@/components/About';
import ArtworkGallery from '@/components/ArtworkGallery';
import BlogTeaser from '@/components/BlogTeaser';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Bio />
        <Metrics />
        <Projects />
        <About />
        <ArtworkGallery />
        <BlogTeaser />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}