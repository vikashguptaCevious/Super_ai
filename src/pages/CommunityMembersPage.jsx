import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search,
  Filter,
  UserPlus,
  Crown,
  Star,
  MessageCircle,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  TrendingUp
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const CommunityMembersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filters = [
    { id: 'all', label: 'All Members', count: 1247 },
    { id: 'premium', label: 'Premium', count: 456 },
    { id: 'creators', label: 'Active Creators', count: 892 },
    { id: 'new', label: 'New Members', count: 89 }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Recently Joined' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'alphabetical', label: 'Alphabetical' }
  ];

  const members = [
    {
      id: 1,
      name: 'Sarah Wilson',
      username: '@sarahw',
      avatar: 'https://via.placeholder.com/60',
      role: 'Premium Creator',
      location: 'San Francisco, CA',
      company: 'AI Innovations Inc.',
      joinDate: '2 months ago',
      followers: 1247,
      courses: 12,
      rating: 4.9,
      badges: ['Top Creator', 'Course Expert'],
      isOnline: true,
      isPremium: true,
      bio: 'AI course creator and entrepreneur. Helping others build successful online businesses.',
      skills: ['AI/ML', 'Course Creation', 'Marketing', 'Business Strategy']
    },
    {
      id: 2,
      name: 'Mike Johnson',
      username: '@mikej',
      avatar: 'https://via.placeholder.com/60',
      role: 'Content Creator',
      location: 'New York, NY',
      company: 'Tech Solutions',
      joinDate: '1 month ago',
      followers: 892,
      courses: 8,
      rating: 4.7,
      badges: ['Rising Star'],
      isOnline: false,
      isPremium: false,
      bio: 'Passionate about teaching AI and helping creators succeed.',
      skills: ['Web Development', 'AI Tools', 'Content Creation']
    },
    {
      id: 3,
      name: 'Alex Chen',
      username: '@alexc',
      avatar: 'https://via.placeholder.com/60',
      role: 'Course Creator',
      location: 'Austin, TX',
      company: 'Digital Academy',
      joinDate: '3 months ago',
      followers: 2156,
      courses: 18,
      rating: 4.8,
      badges: ['Top Creator', 'Mentor', 'Course Expert'],
      isOnline: true,
      isPremium: true,
      bio: 'Serial entrepreneur and course creator. Specialized in AI and automation.',
      skills: ['AI/ML', 'Automation', 'Business', 'Mentoring']
    },
    {
      id: 4,
      name: 'Emma Rodriguez',
      username: '@emmar',
      avatar: 'https://via.placeholder.com/60',
      role: 'AI Specialist',
      location: 'Seattle, WA',
      company: 'Future Tech',
      joinDate: '1 week ago',
      followers: 234,
      courses: 3,
      rating: 4.6,
      badges: ['New Member'],
      isOnline: true,
      isPremium: false,
      bio: 'AI researcher and educator. Excited to share knowledge with the community.',
      skills: ['AI Research', 'Data Science', 'Python', 'Machine Learning']
    },
    {
      id: 5,
      name: 'David Kim',
      username: '@davidk',
      avatar: 'https://via.placeholder.com/60',
      role: 'Marketing Expert',
      location: 'Los Angeles, CA',
      company: 'Growth Marketing Co.',
      joinDate: '2 weeks ago',
      followers: 567,
      courses: 5,
      rating: 4.5,
      badges: ['Marketing Pro'],
      isOnline: false,
      isPremium: true,
      bio: 'Marketing strategist helping creators grow their audience and revenue.',
      skills: ['Marketing', 'Growth Hacking', 'Social Media', 'Analytics']
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === 'premium') return member.isPremium;
    if (selectedFilter === 'creators') return member.courses > 5;
    if (selectedFilter === 'new') return member.joinDate.includes('week') || member.joinDate.includes('month');
    
    return matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <Users className="text-blue-500" size={32} />
            <span>Community Members</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Connect with {members.length.toLocaleString()} creators and learners
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center space-x-2"
        >
          <UserPlus size={20} />
          <span>Invite Members</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search members by name, skills, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center space-x-4">
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">456</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Premium Members</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Award className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">892</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Creators</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">New This Week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                {/* Member Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {member.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {member.isPremium && (
                      <Crown className="text-yellow-500" size={16} />
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={14} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase size={14} />
                      <span>{member.company}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      {member.followers.toLocaleString()} followers
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {member.courses} courses
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Joined {member.joinDate}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {member.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Badges */}
                {member.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {member.badges.map((badge, badgeIndex) => (
                      <span
                        key={badgeIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <MessageCircle size={16} />
                    <span className="ml-1">Message</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <UserPlus size={16} />
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

export default CommunityMembersPage;
