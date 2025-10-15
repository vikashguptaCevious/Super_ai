import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, DollarSign, Users, Clock, Upload, Sparkles } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';
import { generateCourseOutline } from '../utils/aiMockFunctions';

const CourseModal = () => {
  const { modals, closeModal, addCourse, addNotification } = useGlobalStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    difficulty: 'beginner',
    duration: '',
    thumbnail: null
  });
  const [generatedOutline, setGeneratedOutline] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'AI & Machine Learning',
    'Web Development',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music',
    'Other'
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateOutline = async () => {
    if (!formData.title.trim()) {
      addNotification({
        type: 'error',
        title: 'Title Required',
        message: 'Please enter a course title to generate outline'
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const outline = generateCourseOutline(formData.title);
      setGeneratedOutline(outline);
      setLoading(false);
    }, 2000);
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
      const newCourse = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        category: formData.category,
        difficulty: formData.difficulty,
        duration: formData.duration,
        thumbnail: formData.thumbnail,
        instructor: 'Current User',
        createdAt: new Date().toISOString()
      };
      
      addCourse(newCourse);
      addNotification({
        type: 'success',
        title: 'Course Created!',
        message: 'Your course has been created successfully'
      });
      
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        difficulty: 'beginner',
        duration: '',
        thumbnail: null
      });
      setGeneratedOutline(null);
      setLoading(false);
      closeModal('courseModal');
    }, 1000);
  };

  return (
    <Modal
      isOpen={modals.courseModal}
      onClose={() => closeModal('courseModal')}
      title="Create New Course"
      size="xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Basic Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Complete AI Course for Beginners"
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what students will learn in this course..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 4 hours"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* AI Course Outline Generator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Course Outline
              </h3>
              <Button
                variant="secondary"
                onClick={handleGenerateOutline}
                loading={loading}
                disabled={!formData.title.trim()}
                className="flex items-center space-x-2"
              >
                <Sparkles size={16} />
                <span>Generate</span>
              </Button>
            </div>
            
            {generatedOutline && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {generatedOutline.title}
                </h4>
                <div className="space-y-2">
                  {generatedOutline.modules.map((module, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        {module.title}
                      </h5>
                      <ul className="space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Course Preview
          </h3>
          
          {formData.title ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {formData.thumbnail ? (
                <img
                  src={formData.thumbnail}
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <BookOpen className="text-white" size={48} />
                </div>
              )}
              
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {formData.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {formData.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{formData.duration || 'TBD'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{formData.difficulty}</span>
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ${formData.price || '0.00'}
                  </div>
                </div>
                
                <Button variant="primary" className="w-full">
                  Enroll Now
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
              <BookOpen className="mx-auto text-gray-400" size={48} />
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                Fill in the course details to see a preview
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
        <Button
          variant="ghost"
          onClick={() => closeModal('courseModal')}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={!formData.title.trim() || !formData.description.trim()}
        >
          Create Course
        </Button>
      </div>
    </Modal>
  );
};

export default CourseModal;
