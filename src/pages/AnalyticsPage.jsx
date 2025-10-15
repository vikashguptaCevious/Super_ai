import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Download
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { generateAnalyticsData } from '../utils/aiMockFunctions';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics(generateAnalyticsData());
      setLoading(false);
    }, 1000);
  }, []);

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${analytics?.overview?.totalRevenue?.toLocaleString() || 0}`,
      change: '+23%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Students',
      value: analytics?.overview?.totalStudents?.toLocaleString() || 0,
      change: '+15%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Ideas',
      value: analytics?.overview?.totalIdeas || 0,
      change: '+8%',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Engagement Rate',
      value: `${analytics?.overview?.totalEngagement || 0}%`,
      change: '+12%',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  const engagementMetrics = [
    { label: 'Likes', value: 1247, icon: Heart, color: 'text-red-500' },
    { label: 'Comments', value: 389, icon: MessageCircle, color: 'text-blue-500' },
    { label: 'Shares', value: 156, icon: Share2, color: 'text-green-500' },
    { label: 'Views', value: 8934, icon: Eye, color: 'text-purple-500' }
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <BarChart3 className="text-blue-500" size={32} />
            <span>Analytics Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your performance and growth metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <Button variant="secondary" className="flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {metric.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {metric.change} from last period
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`${metric.color}`} size={24} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={16} />
              <span>{selectedPeriod}</span>
            </div>
          </div>
          
          {/* Simple chart representation */}
          <div className="space-y-4">
            {analytics?.dailyData?.slice(-7).map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    style={{ width: `${(day.revenue / Math.max(...analytics.dailyData.map(d => d.revenue))) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20 text-sm font-medium text-gray-900 dark:text-white text-right">
                  ${day.revenue}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Engagement Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Engagement Metrics
          </h3>
          
          <div className="space-y-4">
            {engagementMetrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                    <metric.icon className={`${metric.color}`} size={20} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {metric.label}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {metric.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Courses */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Top Performing Courses
        </h3>
        
        <div className="space-y-4">
          {analytics?.topCourses?.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.students} students
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ${course.revenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Age Distribution
          </h3>
          
          <div className="space-y-3">
            {analytics?.demographics?.ageGroups?.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {group.range}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                    {group.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Geographic Distribution
          </h3>
          
          <div className="space-y-3">
            {analytics?.demographics?.locations?.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {location.country}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                    {location.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
