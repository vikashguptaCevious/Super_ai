import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image,
  FileText,
  Mic,
  PhoneCall,
  Star,
  Archive,
  Trash2,
  UserPlus,
  Settings
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const CommunityMessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Wilson',
      username: '@sarahw',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Thanks for the feedback on my course! Really helpful insights.',
      time: '2 min ago',
      unread: 2,
      isOnline: true,
      isPinned: true,
      type: 'direct'
    },
    {
      id: 2,
      name: 'AI Creators Group',
      username: '12 members',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Mike: Just launched my new AI course! Check it out...',
      time: '15 min ago',
      unread: 5,
      isOnline: true,
      isPinned: false,
      type: 'group'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      username: '@mikej',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Can you review my latest webinar script?',
      time: '1 hour ago',
      unread: 0,
      isOnline: false,
      isPinned: false,
      type: 'direct'
    },
    {
      id: 4,
      name: 'Course Builders',
      username: '45 members',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Alex: The new course analytics are amazing!',
      time: '2 hours ago',
      unread: 1,
      isOnline: true,
      isPinned: true,
      type: 'group'
    },
    {
      id: 5,
      name: 'Alex Chen',
      username: '@alexc',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Let\'s schedule a call to discuss the collaboration.',
      time: '3 hours ago',
      unread: 0,
      isOnline: true,
      isPinned: false,
      type: 'direct'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/32',
      content: 'Hey! Thanks for the feedback on my course. Really helpful insights!',
      time: '2:30 PM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 2,
      sender: 'You',
      avatar: 'https://via.placeholder.com/32',
      content: 'You\'re welcome! The course structure was really well thought out.',
      time: '2:32 PM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 3,
      sender: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/32',
      content: 'I\'m thinking of creating a follow-up course on advanced AI techniques. What do you think?',
      time: '2:35 PM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 4,
      sender: 'You',
      avatar: 'https://via.placeholder.com/32',
      content: 'That sounds like a great idea! The market is definitely ready for more advanced content.',
      time: '2:37 PM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 5,
      sender: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/32',
      content: 'Perfect! I\'ll start working on the outline. Thanks for the encouragement! 🚀',
      time: '2:40 PM',
      isOwn: false,
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const selectedConversation = conversations.find(chat => chat.id === selectedChat);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <MessageCircle className="text-blue-500" size={24} />
              <span>Messages</span>
            </h1>
            <Button variant="ghost" size="sm">
              <UserPlus size={16} />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
                selectedChat === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => setSelectedChat(conversation.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {conversation.isPinned && (
                        <Star className="text-yellow-500" size={14} />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conversation.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.username}
                    </span>
                    {conversation.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedConversation.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedConversation.isOnline ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <PhoneCall size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!message.isOwn && (
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    )}
                    <div className={`px-4 py-2 rounded-2xl ${
                      message.isOwn 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile size={16} />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Mic size={16} />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto text-gray-400" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                Select a conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityMessagesPage;
