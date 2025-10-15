import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Tag, Users, Sparkles } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';
import { generateIdeaSuggestions } from '../utils/aiMockFunctions';

const IdeaModal = () => {
  const { modals, closeModal, addIdea, addNotification } = useGlobalStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: []
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'AI & Machine Learning',
    'Technology',
    'Business',
    'Design',
    'Marketing',
    'Education',
    'Health & Wellness',
    'Finance',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'title' && value.length > 3) {
      const newSuggestions = generateIdeaSuggestions(value);
      setSuggestions(newSuggestions);
    }
  };

  const handleAddTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      addNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newIdea = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        author: 'Current User',
        createdAt: new Date().toISOString()
      };
      
      addIdea(newIdea);
      addNotification({
        type: 'success',
        title: 'Idea Submitted!',
        message: 'Your idea has been shared with the community'
      });
      
      setFormData({
        title: '',
        description: '',
        category: '',
        tags: []
      });
      setLoading(false);
      closeModal('ideaModal');
    }, 1000);
  };

  return (
    <Modal
      isOpen={modals.ideaModal}
      onClose={() => closeModal('ideaModal')}
      title="Submit New Idea"
      size="lg"
    >
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Idea Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., AI-Powered Content Creation Course"
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your idea in detail. What makes it unique? Who would benefit from it?"
            rows={4}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Sparkles className="inline mr-2" size={16} />
              AI Suggestions
            </label>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleAddTag(suggestion)}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-primary text-white text-sm rounded-full"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-gray-200 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tags to help others find your idea"
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                handleAddTag(e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
        </div>

        {/* Preview */}
        {formData.title && formData.description && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Preview
            </h4>
            <div className="space-y-2">
              <h5 className="font-medium text-gray-900 dark:text-white">
                {formData.title}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {formData.description}
              </p>
              {formData.category && (
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {formData.category}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={() => closeModal('ideaModal')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!formData.title.trim() || !formData.description.trim()}
          >
            Submit Idea
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IdeaModal;
