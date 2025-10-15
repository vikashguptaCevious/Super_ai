import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalStore } from '../store/globalStore';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Toast from './Toast';

// Modals
import IdeaModal from '../modals/IdeaModal';
import CourseModal from '../modals/CourseModal';
import WebinarModal from '../modals/WebinarModal';
import BrandingModal from '../modals/BrandingModal';

const DashboardLayout = ({ children }) => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, notifications, removeNotification } = useGlobalStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleDesktopSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex relative">
        {/* Sidebar */}
        <Sidebar 
          isOpen={mobileMenuOpen} 
          onClose={handleCloseMobileMenu} 
        />
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
      
      {/* Modals */}
      <IdeaModal />
      <CourseModal />
      <WebinarModal />
      <BrandingModal />
      
      {/* Toast Notifications */}
      <Toast 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
};

export default DashboardLayout;
