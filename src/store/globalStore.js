import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGlobalStore = create(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Modals
      modals: {
        ideaModal: false,
        courseModal: false,
        webinarModal: false,
        brandingModal: false,
        checkoutModal: false,
        confirmationModal: false,
        eventModal: false,
        workflowModal: false,
      },
      openModal: (modalName) => 
        set((state) => ({
          modals: { ...state.modals, [modalName]: true }
        })),
      closeModal: (modalName) => 
        set((state) => ({
          modals: { ...state.modals, [modalName]: false }
        })),
      closeAllModals: () => 
        set({
          modals: {
            ideaModal: false,
            courseModal: false,
            webinarModal: false,
            brandingModal: false,
            checkoutModal: false,
            confirmationModal: false,
            eventModal: false,
            workflowModal: false,
          }
        }),

      // Notifications
      notifications: [],
      addNotification: (notification) => 
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id: Date.now() }]
        })),
      removeNotification: (id) => 
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Ideas
      ideas: [],
      addIdea: (idea) => 
        set((state) => ({
          ideas: [...state.ideas, { ...idea, id: Date.now(), votes: 0, comments: [] }]
        })),
      voteIdea: (id, vote) => 
        set((state) => ({
          ideas: state.ideas.map(idea => 
            idea.id === id ? { ...idea, votes: idea.votes + vote } : idea
          )
        })),

      // Courses
      courses: [],
      addCourse: (course) => 
        set((state) => ({
          courses: [...state.courses, { ...course, id: Date.now(), students: 0, revenue: 0 }]
        })),

      // Webinars
      webinars: [],
      addWebinar: (webinar) => 
        set((state) => ({
          webinars: [...state.webinars, { ...webinar, id: Date.now(), attendees: 0 }]
        })),

      // Community
      communityPosts: [],
      addCommunityPost: (post) => 
        set((state) => ({
          communityPosts: [...state.communityPosts, { ...post, id: Date.now(), likes: 0, comments: [] }]
        })),

      // Analytics
      analytics: {
        totalRevenue: 0,
        totalStudents: 0,
        totalIdeas: 0,
        engagement: 0,
      },
      updateAnalytics: (data) => 
        set((state) => ({
          analytics: { ...state.analytics, ...data }
        })),
    }),
    {
      name: 'ai-creator-platform-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        user: state.user,
        sidebarOpen: state.sidebarOpen,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
