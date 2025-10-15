import React from 'react';
import LandingNavbar from './LandingNavbar';
import Footer from './Footer';

const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <LandingNavbar />

      {/* Main Content */}
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
