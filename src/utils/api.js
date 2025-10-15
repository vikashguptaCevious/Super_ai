// Mock API functions for the Creator Platform

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  await delay(500); // Simulate network delay
  
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // For MVP, we'll return mock data
  return mockApiResponse(endpoint, options);
};

// Mock API responses
const mockApiResponse = (endpoint, options) => {
  const method = options.method || 'GET';
  
  switch (endpoint) {
    case '/auth/login':
      return {
        success: true,
        data: {
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://via.placeholder.com/150',
            role: 'creator',
            subscription: 'premium'
          },
          token: 'mock-jwt-token'
        }
      };
    
    case '/auth/register':
      return {
        success: true,
        data: {
          user: {
            id: Date.now(),
            name: options.body?.name || 'New User',
            email: options.body?.email,
            avatar: 'https://via.placeholder.com/150',
            role: 'creator',
            subscription: 'free'
          },
          token: 'mock-jwt-token'
        }
      };
    
    case '/ideas':
      if (method === 'GET') {
        return {
          success: true,
          data: [
            {
              id: 1,
              title: 'AI-Powered Content Creation',
              description: 'Learn how to use AI tools for creating engaging content',
              category: 'AI',
              votes: 45,
              comments: 12,
              author: 'Jane Smith',
              createdAt: '2024-01-15T10:30:00Z'
            },
            {
              id: 2,
              title: 'Advanced Machine Learning',
              description: 'Deep dive into ML algorithms and applications',
              category: 'Machine Learning',
              votes: 38,
              comments: 8,
              author: 'Mike Johnson',
              createdAt: '2024-01-14T15:20:00Z'
            }
          ]
        };
      } else if (method === 'POST') {
        return {
          success: true,
          data: {
            id: Date.now(),
            ...options.body,
            votes: 0,
            comments: [],
            createdAt: new Date().toISOString()
          }
        };
      }
      break;
    
    case '/courses':
      if (method === 'GET') {
        return {
          success: true,
          data: [
            {
              id: 1,
              title: 'Complete AI Course',
              description: 'Master AI from basics to advanced',
              price: 99.99,
              students: 156,
              rating: 4.8,
              instructor: 'Dr. Sarah Wilson',
              thumbnail: 'https://via.placeholder.com/300x200'
            }
          ]
        };
      } else if (method === 'POST') {
        return {
          success: true,
          data: {
            id: Date.now(),
            ...options.body,
            students: 0,
            revenue: 0,
            createdAt: new Date().toISOString()
          }
        };
      }
      break;
    
    case '/webinars':
      if (method === 'GET') {
        return {
          success: true,
          data: [
            {
              id: 1,
              title: 'AI Trends 2024',
              date: '2024-02-15T18:00:00Z',
              duration: 60,
              attendees: 89,
              price: 49.99,
              instructor: 'AI Expert'
            }
          ]
        };
      } else if (method === 'POST') {
        return {
          success: true,
          data: {
            id: Date.now(),
            ...options.body,
            attendees: 0,
            createdAt: new Date().toISOString()
          }
        };
      }
      break;
    
    case '/community/posts':
      if (method === 'GET') {
        return {
          success: true,
          data: [
            {
              id: 1,
              content: 'Just finished my first AI course! Excited to apply what I learned.',
              author: 'Alex Chen',
              likes: 23,
              comments: 5,
              createdAt: '2024-01-15T09:15:00Z'
            }
          ]
        };
      } else if (method === 'POST') {
        return {
          success: true,
          data: {
            id: Date.now(),
            ...options.body,
            likes: 0,
            comments: [],
            createdAt: new Date().toISOString()
          }
        };
      }
      break;
    
    case '/analytics':
      return {
        success: true,
        data: {
          totalRevenue: 15420,
          totalStudents: 1247,
          totalIdeas: 89,
          totalEngagement: 89.2,
          monthlyGrowth: 15.3
        }
      };
    
    case '/marketplace':
      return {
        success: true,
        data: [
          {
            id: 1,
            title: 'AI Logo Generator',
            type: 'tool',
            price: 29.99,
            rating: 4.7,
            downloads: 234,
            category: 'Design'
          },
          {
            id: 2,
            title: 'Content Templates Pack',
            type: 'template',
            price: 19.99,
            rating: 4.5,
            downloads: 156,
            category: 'Content'
          }
        ]
      };
    
    default:
      return {
        success: false,
        error: 'Endpoint not found'
      };
  }
};

// Authentication API
export const authAPI = {
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
  
  getProfile: () => apiCall('/auth/profile')
};

// Ideas API
export const ideasAPI = {
  getAll: () => apiCall('/ideas'),
  
  create: (idea) => apiCall('/ideas', {
    method: 'POST',
    body: JSON.stringify(idea)
  }),
  
  vote: (id, vote) => apiCall(`/ideas/${id}/vote`, {
    method: 'POST',
    body: JSON.stringify({ vote })
  }),
  
  comment: (id, comment) => apiCall(`/ideas/${id}/comment`, {
    method: 'POST',
    body: JSON.stringify({ comment })
  })
};

// Courses API
export const coursesAPI = {
  getAll: () => apiCall('/courses'),
  
  create: (course) => apiCall('/courses', {
    method: 'POST',
    body: JSON.stringify(course)
  }),
  
  update: (id, course) => apiCall(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(course)
  }),
  
  delete: (id) => apiCall(`/courses/${id}`, { method: 'DELETE' })
};

// Webinars API
export const webinarsAPI = {
  getAll: () => apiCall('/webinars'),
  
  create: (webinar) => apiCall('/webinars', {
    method: 'POST',
    body: JSON.stringify(webinar)
  }),
  
  register: (id) => apiCall(`/webinars/${id}/register`, { method: 'POST' })
};

// Community API
export const communityAPI = {
  getPosts: () => apiCall('/community/posts'),
  
  createPost: (post) => apiCall('/community/posts', {
    method: 'POST',
    body: JSON.stringify(post)
  }),
  
  likePost: (id) => apiCall(`/community/posts/${id}/like`, { method: 'POST' }),
  
  commentPost: (id, comment) => apiCall(`/community/posts/${id}/comment`, {
    method: 'POST',
    body: JSON.stringify({ comment })
  })
};

// Analytics API
export const analyticsAPI = {
  getOverview: () => apiCall('/analytics'),
  
  getRevenue: (period) => apiCall(`/analytics/revenue?period=${period}`),
  
  getEngagement: (period) => apiCall(`/analytics/engagement?period=${period}`)
};

// Marketplace API
export const marketplaceAPI = {
  getProducts: (category) => apiCall(`/marketplace?category=${category || ''}`),
  
  purchase: (id) => apiCall(`/marketplace/${id}/purchase`, { method: 'POST' }),
  
  upload: (product) => apiCall('/marketplace/upload', {
    method: 'POST',
    body: JSON.stringify(product)
  })
};

export default {
  auth: authAPI,
  ideas: ideasAPI,
  courses: coursesAPI,
  webinars: webinarsAPI,
  community: communityAPI,
  analytics: analyticsAPI,
  marketplace: marketplaceAPI
};
