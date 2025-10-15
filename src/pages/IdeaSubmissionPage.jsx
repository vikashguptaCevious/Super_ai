import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Tag, 
  Users, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Share2,
  Filter,
  Search
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';
import { generateIdeaSuggestions } from '../utils/aiMockFunctions';

const IdeaSubmissionPage = () => {
  const { ideas, addIdea, voteIdea } = useGlobalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', label: 'All Ideas', count: ideas.length },
    { id: 'ai', label: 'AI & Machine Learning', count: ideas.filter(i => i.category === 'AI').length },
    { id: 'tech', label: 'Technology', count: ideas.filter(i => i.category === 'Technology').length },
    { id: 'business', label: 'Business', count: ideas.filter(i => i.category === 'Business').length },
    { id: 'design', label: 'Design', count: ideas.filter(i => i.category === 'Design').length }
  ];

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || idea.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'comments':
        return b.comments.length - a.comments.length;
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleVote = (id, vote) => {
    voteIdea(id, vote);
  };

  const handleSubmitIdea = () => {
    const newIdea = {
      title: 'New AI Course Idea',
      description: 'This is a sample idea description that would be filled by the user.',
      category: 'AI',
      author: 'Current User',
      createdAt: new Date().toISOString()
    };
    addIdea(newIdea);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <Lightbulb className="text-yellow-500" size={32} />
            <span>Ideas Hub</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Share your creative ideas and discover what others are building
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleSubmitIdea}
          className="flex items-center space-x-2"
        >
          <Lightbulb size={20} />
          <span>Submit Idea</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="votes">Most Voted</option>
            <option value="comments">Most Discussed</option>
          </select>
        </div>
      </Card>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedIdeas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {idea.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {idea.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {idea.description}
                    </p>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {idea.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {idea.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Creator
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleVote(idea.id, 1)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart size={16} />
                      <span className="text-sm font-medium">{idea.votes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-sm font-medium">{idea.comments.length}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedIdeas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Lightbulb className="mx-auto text-gray-400" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
            No ideas found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Try adjusting your search or submit a new idea
          </p>
          <Button
            variant="primary"
            onClick={handleSubmitIdea}
            className="mt-4"
          >
            Submit Your First Idea
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default IdeaSubmissionPage;
