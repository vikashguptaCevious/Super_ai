import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Lightbulb, 
  BookOpen, 
  Users, 
  Store, 
  BarChart3, 
  Settings, 
  Zap,
  DollarSign,
  Bell,
  X,
  ChevronLeft,
  TrendingUp,
  User,
  MessageSquare,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useGlobalStore } from '../store/globalStore';

const Sidebar = ({ isOpen, onClose }) => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useGlobalStore();
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [communityExpanded, setCommunityExpanded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // Auto-expand on mobile
      if (!desktop) {
        setSidebarCollapsed(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setSidebarCollapsed]);

  // Auto-expand community menu when on community routes
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/community')) {
      setCommunityExpanded(true);
    }
  }, [location.pathname]);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Lightbulb, label: 'Ideas', path: '/dashboard/ideas' },
    { icon: BookOpen, label: 'AI Builder', path: '/dashboard/ai-builder' },
    { 
      icon: Users, 
      label: 'Community', 
      path: '/dashboard/community/feed',
      hasSubmenu: true,
      subItems: [
        { icon: TrendingUp, label: 'Feed', path: '/dashboard/community/feed' },
        { icon: User, label: 'Members', path: '/dashboard/community/members' },
        { icon: MessageSquare, label: 'Messages', path: '/dashboard/community/messages' }
      ]
    },
    { icon: Store, label: 'Marketplace', path: '/dashboard/marketplace' },
    { icon: Zap, label: 'Automation', path: '/dashboard/automation' },
    { icon: DollarSign, label: 'Monetization', path: '/dashboard/monetization' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ];

  const quickActions = [
    { label: 'Submit Idea', color: 'bg-blue-500' },
    { label: 'Create Course', color: 'bg-green-500' },
    { label: 'Launch Webinar', color: 'bg-purple-500' }
  ];

  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-64';
  const sidebarTransform = isDesktop 
    ? 0  // Always visible on desktop
    : (isOpen ? 0 : -256);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && !isDesktop && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300`}
        initial={{ x: -256 }}
        animate={{ x: sidebarTransform }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Creator
                </span>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              {isDesktop && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <ChevronLeft size={16} className={`transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                (item.hasSubmenu && item.subItems?.some(subItem => location.pathname === subItem.path));
              const isCommunityActive = item.label === 'Community' && 
                (location.pathname.startsWith('/dashboard/community'));
              
              return (
                <div key={item.label}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.hasSubmenu ? (
                      <button
                        onClick={() => {
                          if (!sidebarCollapsed) {
                            setCommunityExpanded(!communityExpanded);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 ${
                          isCommunityActive
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        title={sidebarCollapsed ? item.label : ''}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon size={18} />
                          {!sidebarCollapsed && (
                            <span className="font-medium text-sm truncate">{item.label}</span>
                          )}
                        </div>
                        {!sidebarCollapsed && (
                          <div className="flex items-center">
                            {communityExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </div>
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => {
                          // Close mobile menu when navigating
                          if (window.innerWidth < 1024) {
                            onClose();
                          }
                        }}
                        title={sidebarCollapsed ? item.label : ''}
                      >
                        <item.icon size={18} />
                        {!sidebarCollapsed && (
                          <span className="font-medium text-sm truncate">{item.label}</span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                  
                  {/* Submenu */}
                  {item.hasSubmenu && communityExpanded && !sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 space-y-1 mt-1"
                    >
                      {item.subItems?.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                              isSubActive
                                ? 'bg-primary/20 text-primary font-medium'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                onClose();
                              }
                            }}
                          >
                            <subItem.icon size={16} />
                            <span className="truncate">{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick Actions - Only show when not collapsed */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-white text-xs font-medium ${action.color} hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="truncate">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* User Info - Only show when not collapsed */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">JD</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Premium Creator
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed User Info */}
          {sidebarCollapsed && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xs">JD</span>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
