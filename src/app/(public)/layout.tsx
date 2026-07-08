import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import FloatingCTA from '@/components/public/FloatingCTA';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default PublicLayout;
