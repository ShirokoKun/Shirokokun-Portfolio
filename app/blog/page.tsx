import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import SubstackBlog from '@/components/SubstackBlog';

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

export default function Blog() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="pt-24">
        <SubstackBlog />
      </main>
      <Footer />
    </div>
  );
}
