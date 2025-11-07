'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import type { SubstackPost } from '@/types/substack';

const CACHE_KEY = 'substack_posts_cache';
const CACHE_TIMESTAMP_KEY = 'substack_posts_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Multiple CORS proxy fallbacks for reliability
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

// Parse RSS XML to extract posts
const parseRSSFeed = (xmlText: string): SubstackPost[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');
  
  return Array.from(items).map((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const author = item.querySelector('creator')?.textContent || item.querySelector('author')?.textContent || '';
    const content = item.querySelector('content\\:encoded')?.textContent || item.querySelector('description')?.textContent || '';
    const contentSnippet = item.querySelector('description')?.textContent || content.substring(0, 200) || '';
    const guid = item.querySelector('guid')?.textContent || link;
    const isoDate = item.querySelector('pubDate')?.textContent || '';
    const enclosure = item.querySelector('enclosure');
    
    return {
      title,
      link,
      pubDate,
      author,
      content,
      contentSnippet: contentSnippet.replace(/<[^>]*>/g, '').substring(0, 200), // Strip HTML and limit length
      guid,
      isoDate,
      categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent || ''),
      enclosure: enclosure ? {
        url: enclosure.getAttribute('url') || '',
        type: enclosure.getAttribute('type') || '',
      } : undefined,
    };
  });
};

// Load cached posts from localStorage
const loadCachedPosts = (): SubstackPost[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp, 10);
      if (age < CACHE_DURATION) {
        return JSON.parse(cached);
      }
    }
  } catch (e) {
    console.error('Error loading cache:', e);
  }
  return null;
};

// Save posts to localStorage
const saveCachedPosts = (posts: SubstackPost[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (e) {
    console.error('Error saving cache:', e);
  }
};

// Fetch with retry logic and multiple proxy fallbacks
const fetchWithRetry = async (
  feedUrl: string,
  retries = 3,
  delay = 1000
): Promise<string> => {
  for (let attempt = 0; attempt < CORS_PROXIES.length; attempt++) {
    const proxy = CORS_PROXIES[attempt];
    for (let retry = 0; retry < retries; retry++) {
      try {
        const url = `${proxy}${encodeURIComponent(feedUrl)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(url, {
          cache: 'no-store',
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const text = await response.text();
        if (text && text.trim().length > 0) {
          return text;
        }
        throw new Error('Empty response');
      } catch (err) {
        if (retry === retries - 1 && attempt === CORS_PROXIES.length - 1) {
          throw err;
        }
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, retry)));
      }
    }
  }
  throw new Error('All proxies failed');
};

export default function SubstackBlog() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const postsRef = useRef<SubstackPost[]>([]);
  
  // Keep ref in sync with state
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  const fetchPosts = useCallback(async (showRefreshing = false, forceRefresh = false) => {
    const currentPosts = postsRef.current.length;
    if (showRefreshing) setRefreshing(true);
    
    // Load cached posts first (unless forcing refresh)
    if (!forceRefresh) {
      const cached = loadCachedPosts();
      if (cached && cached.length > 0) {
        setPosts(cached);
        setLoading(false);
        // Continue fetching in background
      }
    }
    
    try {
      setIsRetrying(false);
      const timestamp = Date.now();
      const feedUrl = `https://shirokokun.substack.com/feed?t=${timestamp}`;
      
      const xmlText = await fetchWithRetry(feedUrl);
      const parsedPosts = parseRSSFeed(xmlText);
      
      if (parsedPosts.length > 0) {
        setPosts(parsedPosts);
        saveCachedPosts(parsedPosts);
        setError(null);
      } else {
        throw new Error('No posts found in feed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      setError(errorMessage);
      console.error('Error fetching Substack feed:', err);
      
      // If we have no posts, try to load from cache
      if (currentPosts === 0) {
        const cached = loadCachedPosts();
        if (cached && cached.length > 0) {
          setPosts(cached);
          setError('Using cached posts. ' + errorMessage);
        } else {
          // Auto-retry after 5 seconds if no posts are shown
          setIsRetrying(true);
          setTimeout(() => {
            fetchPosts(false, true);
          }, 5000);
        }
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    // Load cached posts immediately
    const cached = loadCachedPosts();
    if (cached && cached.length > 0) {
      setPosts(cached);
      setLoading(false);
    }
    
    // Then fetch fresh posts
    fetchPosts();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Latest Thoughts</h1>
            <button
              onClick={() => fetchPosts(true, true)}
              disabled={refreshing}
              className="glass-surface p-2 rounded-lg hover:scale-110 transition-transform disabled:opacity-50"
              aria-label="Refresh posts"
            >
              <RefreshCw 
                size={20} 
                className={`text-white ${refreshing ? 'animate-spin' : ''}`} 
              />
            </button>
          </div>
          <p className="text-gray-400 mt-2">From Substack — auto-updating via RSS</p>
          
          {/* Error banner - non-blocking */}
          {error && (
            <div className="mt-4 glass-surface border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-3 flex items-center justify-center gap-2 text-yellow-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
              {isRetrying && <span className="text-xs">(Retrying...)</span>}
            </div>
          )}
        </div>

        {loading && posts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-gray-400">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No posts available at the moment.</p>
            <button
              onClick={() => fetchPosts(true, true)}
              className="glass-surface px-4 py-2 rounded-lg text-white hover:scale-105 transition-transform"
            >
              Try Again
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}


