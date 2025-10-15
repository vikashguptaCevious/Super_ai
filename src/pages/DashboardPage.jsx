import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  BookOpen, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';
import { generateAnalyticsData } from '../utils/aiMockFunctions';

const DashboardPage = () => {
  const { openModal } = useGlobalStore();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics(generateAnalyticsData());
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      title: 'Total Ideas',
      value: analytics?.overview?.totalIdeas || 0,
      change: '+12%',
      icon: Lightbulb,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Courses',
      value: analytics?.overview?.totalStudents || 0,
      change: '+8%',
      icon: BookOpen,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Revenue',
      value: `$${analytics?.overview?.totalRevenue?.toLocaleString() || 0}`,
      change: '+23%',
      icon: DollarSign,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Community Members',
      value: '2.4K',
      change: '+15%',
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const recentIdeas = [
    {
      id: 1,
      title: 'AI-Powered Content Creation',
      description: 'Learn how to use AI tools for creating engaging content',
      votes: 45,
      comments: 12,
      author: 'Jane Smith',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Advanced Machine Learning',
      description: 'Deep dive into ML algorithms and applications',
      votes: 38,
      comments: 8,
      author: 'Mike Johnson',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'Blockchain for Beginners',
      description: 'Understanding the fundamentals of blockchain technology',
      votes: 29,
      comments: 15,
      author: 'Sarah Wilson',
      time: '6 hours ago'
    }
  ];

  const quickActions = [
    {
      title: 'Submit New Idea',
      description: 'Share your creative ideas with the community',
      icon: Lightbulb,
      color: 'from-blue-500 to-blue-600',
      onClick: () => openModal('ideaModal')
    },
    {
      title: 'Create Course',
      description: 'Build and launch your AI-powered course',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      onClick: () => openModal('courseModal')
    },
    {
      title: 'Launch Webinar',
      description: 'Host interactive webinars for your audience',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      onClick: () => openModal('webinarModal')
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Here's what's happening with your creator journey
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => openModal('ideaModal')}
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Idea</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`${stat.color}`} size={24} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card 
                className="p-6 cursor-pointer group"
                onClick={action.onClick}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {action.description}
                    </p>
                  </div>
                  <ArrowUpRight className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" size={20} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Ideas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Ideas
          </h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {idea.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {idea.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>by {idea.author}</span>
                      <span>•</span>
                      <span>{idea.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="flex items-center space-x-1">
                      <Heart size={16} className="text-red-500" />
                      <span className="text-sm font-medium">{idea.votes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={16} className="text-blue-500" />
                      <span className="text-sm font-medium">{idea.comments}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
