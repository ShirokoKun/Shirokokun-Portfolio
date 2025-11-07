'use client';

import { useEffect, useState } from 'react';
import type { SubstackPost } from '@/types/substack';

export default function SubstackBlog() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/substack');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-gray-400">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center p-4">Error loading posts: {error}</div>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Latest Thoughts</h1>
          <p className="text-gray-400 mt-2">From Substack — auto-updating via RSS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.guid}
              className="glass-card p-6 hover:translate-y-[-2px] transition-transform"
            >
              {post.enclosure?.url && (
                <img
                  src={post.enclosure.url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.src = '/images/placeholder.jpg';
                  }}
                />
              )}

              <h2 className="text-xl font-bold mb-2 text-white">{post.title}</h2>
              <div className="text-xs text-gray-400 mb-3">
                <span>
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {post.author && <span> • {post.author}</span>}
              </div>
              <p className="text-gray-300 line-clamp-3 mb-4">{post.contentSnippet}</p>

              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block glass-surface px-4 py-2 rounded-lg text-white border border-white/10"
              >
                Read More →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


