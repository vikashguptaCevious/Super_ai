import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Users, Clock, DollarSign, Sparkles } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';
import { generateWebinarAgenda } from '../utils/aiMockFunctions';

const WebinarModal = () => {
  const { modals, closeModal, addWebinar, addNotification } = useGlobalStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    price: '',
    maxAttendees: '100'
  });
  const [generatedAgenda, setGeneratedAgenda] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateAgenda = async () => {
    if (!formData.title.trim()) {
      addNotification({
        type: 'error',
        title: 'Title Required',
        message: 'Please enter a webinar title to generate agenda'
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const agenda = generateWebinarAgenda(formData.title);
      setGeneratedAgenda(agenda);
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
      const newWebinar = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price) || 0,
        maxAttendees: parseInt(formData.maxAttendees),
        instructor: 'Current User',
        createdAt: new Date().toISOString()
      };
      
      addWebinar(newWebinar);
      addNotification({
        type: 'success',
        title: 'Webinar Created!',
        message: 'Your webinar has been scheduled successfully'
      });
      
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '60',
        price: '',
        maxAttendees: '100'
      });
      setGeneratedAgenda(null);
      setLoading(false);
      closeModal('webinarModal');
    }, 1000);
  };

  return (
    <Modal
      isOpen={modals.webinarModal}
      onClose={() => closeModal('webinarModal')}
      title="Create New Webinar"
      size="lg"
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Webinar Details
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Webinar Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., AI for Beginners: Getting Started"
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
              placeholder="Describe what attendees will learn..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (min)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>

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
                Max Attendees
              </label>
              <input
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* AI Agenda Generator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Agenda Generator
            </h3>
            <Button
              variant="secondary"
              onClick={handleGenerateAgenda}
              loading={loading}
              disabled={!formData.title.trim()}
              className="flex items-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Generate Agenda</span>
            </Button>
          </div>
          
          {generatedAgenda && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                {generatedAgenda.title}
              </h4>
              <div className="space-y-2">
                {generatedAgenda.agenda.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-primary">
                      {item.time}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={() => closeModal('webinarModal')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!formData.title.trim() || !formData.description.trim()}
          >
            Create Webinar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WebinarModal;