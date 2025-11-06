'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { PROJECT_CATEGORIES } from '@/constants/personal';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Share2,
  Palette
} from 'lucide-react';

// Note: Metadata moved to layout or using dynamic metadata

// Icon mapping for project categories
const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'cover-art': ImageIcon,
  'posters': FileText,
  'projects-contributions': Palette,
  'social-media-post': Share2,
  'video-editing-projects': Video,
};

const categoryColors: Record<string, string> = {
  'cover-art': 'from-purple-500 via-pink-500 to-red-500',
  'posters': 'from-blue-500 via-cyan-500 to-teal-500',
  'projects-contributions': 'from-green-500 via-emerald-500 to-teal-500',
  'social-media-post': 'from-orange-500 via-yellow-500 to-pink-500',
  'video-editing-projects': 'from-indigo-500 via-purple-500 to-pink-500',
};

export default function ProjectsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-32">
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-6xl md:text-7xl font-black text-center mb-16">
              My Projects
            </h1>
            <p className="text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto">
              Explore my portfolio of work across different categories. Click on any project to view the complete collection in Google Drive.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECT_CATEGORIES.map((category) => {
                const IconComponent = categoryIcons[category.id] || ImageIcon;
                const gradientColor = categoryColors[category.id] || 'from-gray-500 to-gray-700';
                
                return (
                  <a 
                    key={category.id}
                    href={category.folderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-8 group block"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={40} />
                    </div>
                    <h4 className="text-2xl font-bold mb-3">{category.title}</h4>
                    <p className="text-gray-400 mb-6">{category.description}</p>
                    <div className="flex items-center text-blue-400 font-medium">
                      <span>View Collection</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
