import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Swastik Gupta',
  description: 'Get in touch for collaborations, opportunities, or just to say hello!',
  openGraph: {
    title: 'Contact | Swastik Gupta',
    description: 'Get in touch for collaborations, opportunities, or just to say hello!',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Swastik Gupta',
    description: 'Get in touch for collaborations, opportunities, or just to say hello!',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="pt-24">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}