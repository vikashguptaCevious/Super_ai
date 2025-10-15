import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Plus,
  Bookmark,
  Flag
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';

const CommunityFeedPage = () => {
  const { communityPosts, addCommunityPost } = useGlobalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newPost, setNewPost] = useState('');

  console.log('CommunityFeedPage rendering...', { communityPosts });

  const filters = [
    { id: 'all', label: 'All Posts', count: communityPosts.length },
    { id: 'trending', label: 'Trending', count: communityPosts.filter(p => p.likes > 10).length },
    { id: 'recent', label: 'Recent', count: communityPosts.length },
    { id: 'questions', label: 'Questions', count: communityPosts.filter(p => p.type === 'question').length }
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
      trending: true,
      image: 'https://via.placeholder.com/600x300'
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
    },
    {
      id: 4,
      content: 'Just launched my first AI-powered course and it\'s already generating $2K/month! Here\'s what I learned...',
      author: 'Emma Rodriguez',
      avatar: 'https://via.placeholder.com/40',
      time: '8 hours ago',
      likes: 45,
      comments: 23,
      shares: 12,
      type: 'post',
      trending: true,
      image: 'https://via.placeholder.com/600x300'
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

  const filteredPosts = samplePosts.filter(post => {
    if (selectedFilter === 'trending') return post.trending;
    if (selectedFilter === 'questions') return post.type === 'question';
    if (selectedFilter === 'recent') return true; // All posts are recent in this mock
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Test Header */}
      <div className="bg-red-100 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-red-800">Community Feed Page is Working!</h1>
        <p className="text-red-600">If you can see this, the component is rendering correctly.</p>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <TrendingUp className="text-blue-500" size={32} />
            <span>Community Feed</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Stay updated with the latest posts from your community
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

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
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
      </div>

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

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
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
                  <div className="flex items-center space-x-2">
                    {post.trending && (
                      <div className="flex items-center space-x-1 text-green-500">
                        <TrendingUp size={16} />
                        <span className="text-sm font-medium">Trending</span>
                      </div>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <Flag size={16} />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div>
                  <p className="text-gray-900 dark:text-white">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className="mt-4">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
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
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-colors">
                      <Bookmark size={18} />
                      <span className="text-sm font-medium">Save</span>
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
  );
};

export default CommunityFeedPage;
