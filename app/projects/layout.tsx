import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Swastik Gupta',
  description: 'Explore my portfolio of creative work including web development, graphic design, video editing, and more.',
  openGraph: {
    title: 'Projects | Swastik Gupta',
    description: 'Explore my portfolio of creative work including web development, graphic design, video editing, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Swastik Gupta',
    description: 'Explore my portfolio of creative work including web development, graphic design, video editing, and more.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

