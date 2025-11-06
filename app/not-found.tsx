import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-24">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-9xl font-black mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 bg-transparent text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

