import React, { useState } from 'react'
import { 
  Bell, 
  Check, 
  X, 
  Filter, 
  Search, 
  Settings,
  MessageCircle,
  Heart,
  Share,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Clock
} from 'lucide-react'

const Notifications = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const notifications = [
    {
      id: 1,
      type: 'like',
      title: 'New Like on Your Post',
      message: 'Sarah Johnson liked your post "AI Trends 2024"',
      time: '2 minutes ago',
      unread: true,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment',
      message: 'Mike Chen commented on your course "Machine Learning Basics"',
      time: '15 minutes ago',
      unread: true,
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'follow',
      title: 'New Follower',
      message: 'Alex Rodriguez started following you',
      time: '1 hour ago',
      unread: true,
      icon: Users,
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'earnings',
      title: 'Earnings Update',
      message: 'You earned $45.20 from course sales this week',
      time: '2 hours ago',
      unread: false,
      icon: DollarSign,
      color: 'text-yellow-500'
    },
    {
      id: 5,
      type: 'trending',
      title: 'Content Trending',
      message: 'Your post "AI Automation Tips" is trending in the community',
      time: '3 hours ago',
      unread: false,
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Upcoming Webinar',
      message: 'Your webinar "Advanced AI Techniques" starts in 2 hours',
      time: '4 hours ago',
      unread: false,
      icon: Calendar,
      color: 'text-indigo-500'
    },
    {
      id: 7,
      type: 'share',
      title: 'Content Shared',
      message: 'Emma Wilson shared your course with 50 people',
      time: '6 hours ago',
      unread: false,
      icon: Share,
      color: 'text-pink-500'
    },
    {
      id: 8,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM EST',
      time: '1 day ago',
      unread: false,
      icon: Settings,
      color: 'text-gray-500'
    }
  ]

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => n.unread).length },
    { id: 'likes', label: 'Likes', count: notifications.filter(n => n.type === 'like').length },
    { id: 'comments', label: 'Comments', count: notifications.filter(n => n.type === 'comment').length },
    { id: 'earnings', label: 'Earnings', count: notifications.filter(n => n.type === 'earnings').length }
  ]

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && notification.unread) ||
      notification.type === filter
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const markAsRead = (id) => {
    // In a real app, this would update the backend
    console.log(`Marking notification ${id} as read`)
  }

  const markAllAsRead = () => {
    // In a real app, this would update all notifications in the backend
    console.log('Marking all notifications as read')
  }

  const deleteNotification = (id) => {
    // In a real app, this would delete from the backend
    console.log(`Deleting notification ${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Bell className="mr-3 text-blue-600" size={32} />
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Stay updated with your latest activity and community interactions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={markAllAsRead}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Mark All Read
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filters.map(filterOption => (
                  <option key={filterOption.id} value={filterOption.id}>
                    {filterOption.label} ({filterOption.count})
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-12 text-center">
              <Bell className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 transition-all hover:shadow-md ${
                    notification.unread ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${notification.color}`}>
                      <Icon size={20} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-medium ${notification.unread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {notification.time}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {notification.unread && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 dark:text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            title="Delete notification"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications