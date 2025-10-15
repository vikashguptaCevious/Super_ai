import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Filter,
  Search,
  TrendingUp,
  Calendar,
  UserPlus,
  Crown
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';

const CommunityPage = () => {
  const { communityPosts, addCommunityPost } = useGlobalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newPost, setNewPost] = useState('');

  const filters = [
    { id: 'all', label: 'All Posts', count: communityPosts.length },
    { id: 'trending', label: 'Trending', count: communityPosts.filter(p => p.likes > 10).length },
    { id: 'recent', label: 'Recent', count: communityPosts.length },
    { id: 'questions', label: 'Questions', count: communityPosts.filter(p => p.type === 'question').length }
  ];

  const communities = [
    {
      id: 1,
      name: 'AI Creators',
      members: 1247,
      type: 'free',
      description: 'Share your AI-powered creations and get feedback',
      image: 'https://via.placeholder.com/300x200',
      trending: true
    },
    {
      id: 2,
      name: 'Premium Creators',
      members: 456,
      type: 'premium',
      description: 'Exclusive community for premium creators',
      image: 'https://via.placeholder.com/300x200',
      trending: false
    },
    {
      id: 3,
      name: 'Course Builders',
      members: 892,
      type: 'free',
      description: 'Learn and share course creation strategies',
      image: 'https://via.placeholder.com/300x200',
      trending: true
    }
  ];

  const samplePosts = [
    {
      id: 1,
      content: 'Just finished my first AI course! The community feedback was incredible. Thank you all for the support! 🚀',
      author: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40',
      time: '2 hours ago',
      likes: 23,
      comments: 8,
      shares: 3,
      type: 'post',
      trending: true
    },
    {
      id: 2,
      content: 'What are your favorite AI tools for content creation? Looking for recommendations for my next project.',
      author: 'Mike Johnson',
      avatar: 'https://via.placeholder.com/40',
      time: '4 hours ago',
      likes: 15,
      comments: 12,
      shares: 2,
      type: 'question',
      trending: false
    },
    {
      id: 3,
      content: 'Sharing my latest webinar results: 89% completion rate and 4.8/5 rating! The key was focusing on practical examples.',
      author: 'Alex Chen',
      avatar: 'https://via.placeholder.com/40',
      time: '6 hours ago',
      likes: 31,
      comments: 15,
      shares: 7,
      type: 'post',
      trending: true
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      content: newPost,
      author: 'Current User',
      avatar: 'https://via.placeholder.com/40',
      time: 'Just now',
      likes: 0,
      comments: [],
      shares: 0,
      type: 'post',
      trending: false
    };
    
    addCommunityPost(post);
    setNewPost('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <Users className="text-blue-500" size={32} />
            <span>Community</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Connect with creators, share ideas, and grow together
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setNewPost('')}
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create Post</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Communities */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Communities
            </h3>
            <div className="space-y-3">
              {communities.map((community) => (
                <div key={community.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {community.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {community.name}
                      </h4>
                      {community.type === 'premium' && (
                        <Crown className="text-yellow-500" size={16} />
                      )}
                      {community.trending && (
                        <TrendingUp className="text-green-500" size={16} />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {community.members.toLocaleString()} members
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <UserPlus size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Posts</span>
                <span className="font-semibold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Likes Received</span>
                <span className="font-semibold text-gray-900 dark:text-white">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Comments</span>
                <span className="font-semibold text-gray-900 dark:text-white">89</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CU</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Share your ideas, ask questions, or celebrate your wins!"
                  className="w-full h-24 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      <Calendar size={16} />
                      <span className="text-sm">Schedule</span>
                    </button>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    size="sm"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Filters */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
              </div>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </Card>

          {/* Posts */}
          <div className="space-y-4">
            {samplePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {post.author}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {post.time}
                          </p>
                        </div>
                      </div>
                      {post.trending && (
                        <div className="flex items-center space-x-1 text-green-500">
                          <TrendingUp size={16} />
                          <span className="text-sm font-medium">Trending</span>
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    <div>
                      <p className="text-gray-900 dark:text-white">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart size={18} />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle size={18} />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 size={18} />
                          <span className="text-sm font-medium">{post.shares}</span>
                        </button>
                      </div>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
