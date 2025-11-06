'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    date: "JULY 26, 2025",
    title: "My Top 5 Principles for Clean UI Design",
    excerpt: "A brief 1-2 sentence preview of the blog post, talking about simplicity and user focus..."
  },
  {
    date: "JULY 20, 2025",
    title: "Why Manual Mode is a Game Changer in Photography",
    excerpt: "Exploring how taking control of your camera settings unleashes creative potential..."
  }
];

export default function BlogTeaser() {
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
      id="blog-teaser"
      ref={sectionRef}
      className={`py-24 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Latest Thoughts</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and reflections on design, development, and creativity
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="glass-card p-6 text-left">
              <p className="text-gray-400 text-sm font-medium tracking-wider mb-3">
                {post.date}
              </p>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {post.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <Link 
                href="/blog"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm inline-flex items-center gap-2"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link 
            href="/blog"
            className="inline-block glass-surface px-8 py-4 rounded-full text-white font-medium hover:scale-105 transition-transform"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}