import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Sora } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://swastikgupta.dev'),
  title: 'Swastik Gupta | Creative Developer & Designer',
  description: 'Creative developer and designer specializing in UI/UX development, graphic design, video editing, and web development.',
  keywords: ['portfolio', 'web developer', 'UI/UX designer', 'video editor', 'graphic designer'],
  authors: [{ name: 'Swastik Gupta' }],
  creator: 'Swastik Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://swastikgupta.dev',
    title: 'Swastik Gupta | Creative Developer & Designer',
    description: 'Creative developer and designer specializing in UI/UX development, graphic design, video editing, and web development.',
    siteName: 'Swastik Gupta Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swastik Gupta | Creative Developer & Designer',
    description: 'Creative developer and designer specializing in UI/UX development, graphic design, video editing, and web development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} ${sora.variable} font-sans`}>
        <ErrorBoundaryWrapper>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}