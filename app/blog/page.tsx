import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Swastik Gupta',
  description: 'Thoughts, musings, and insights on design, development, and creative technology.',
  openGraph: {
    title: 'Blog | Swastik Gupta',
    description: 'Thoughts, musings, and insights on design, development, and creative technology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Swastik Gupta',
    description: 'Thoughts, musings, and insights on design, development, and creative technology.',
  },
};

const blogPosts = [
  {
    date: "JULY 26, 2025",
    readTime: "5 MIN READ",
    title: "My Top 5 Principles for Clean UI Design",
    excerpt: "A brief paragraph expanding on the blog post. This is where you'd put the first few sentences of your article to entice the reader to click through and read the whole thing once you have individual post pages set up.",
  },
  {
    date: "JULY 20, 2025",
    readTime: "7 MIN READ",
    title: "Why Manual Mode is a Game Changer in Photography",
    excerpt: "Exploring how taking control of your camera settings unleashes creative potential. It's not just about technical perfection, but about artistic intention and telling the story you want to tell.",
  },
  {
    date: "JULY 15, 2025",
    readTime: "4 MIN READ",
    title: "A Look at Modern CSS: Beyond Flexbox & Grid",
    excerpt: "The world of CSS is constantly evolving. In this post, we look at some of the newer features like container queries and the :has() selector that are changing the way we build responsive layouts.",
  },
];

export default function Blog() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-8">
            <h1 className="text-6xl md:text-7xl font-black text-center mb-16">
              Thoughts & Musings
            </h1>
            <div className="space-y-12">
              {blogPosts.map((post, index) => (
                <article key={index} className="border-b border-gray-800 pb-12 last:border-b-0">
                  <p className="text-gray-400 text-sm font-medium tracking-wider mb-2">
                    {post.date} • {post.readTime}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <a 
                    href="#" 
                    className="text-white font-bold hover:text-gray-300 transition-colors duration-300"
                  >
                    Read More →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
