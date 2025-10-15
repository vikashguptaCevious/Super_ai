import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Play,
  Edit3,
  Save,
  Share2,
  Sparkles
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { generateCourseOutline, generateWebinarAgenda } from '../utils/aiMockFunctions';

const AIBuilderPage = () => {
  const [activeTab, setActiveTab] = useState('course');
  const [idea, setIdea] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'course', label: 'Course Builder', icon: BookOpen },
    { id: 'webinar', label: 'Webinar Creator', icon: Video },
    { id: 'content', label: 'Content Generator', icon: FileText }
  ];

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      if (activeTab === 'course') {
        setGeneratedContent(generateCourseOutline(idea));
      } else if (activeTab === 'webinar') {
        setGeneratedContent(generateWebinarAgenda(idea));
      }
      setLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    // Save generated content
    console.log('Saving content:', generatedContent);
  };

  const handleShare = () => {
    // Share generated content
    console.log('Sharing content:', generatedContent);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <Wand2 className="text-purple-500" size={32} />
            <span>AI Builder</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Transform your ideas into engaging courses and webinars with AI
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" onClick={handleSave}>
            <Save size={20} />
            Save Draft
          </Button>
          <Button variant="primary" onClick={handleShare}>
            <Share2 size={20} />
            Share
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {activeTab === 'course' ? 'Course Idea' : 
               activeTab === 'webinar' ? 'Webinar Topic' : 'Content Topic'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Describe your idea
                </label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., Learn how to build AI-powered applications from scratch..."
                  className="w-full h-32 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  onClick={handleGenerate}
                  loading={loading}
                  disabled={!idea.trim()}
                  className="flex items-center space-x-2"
                >
                  <Sparkles size={20} />
                  <span>Generate with AI</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* Additional Options */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Customization Options
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <select className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <select className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4+ hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  placeholder="e.g., Software developers, Students, Entrepreneurs"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Generated Content */}
        <div className="space-y-6">
          {generatedContent ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generated {activeTab === 'course' ? 'Course' : 'Webinar'}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit3 size={16} />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {generatedContent.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {generatedContent.description}
                  </p>
                </div>

                {activeTab === 'course' && generatedContent.modules && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Course Outline
                    </h4>
                    <div className="space-y-3">
                      {generatedContent.modules.map((module, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
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

                {activeTab === 'webinar' && generatedContent.agenda && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Webinar Agenda
                    </h4>
                    <div className="space-y-2">
                      {generatedContent.agenda.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Duration: {generatedContent.duration}</span>
                    <span>•</span>
                    <span>Difficulty: {generatedContent.difficulty}</span>
                  </div>
                  <Button variant="primary" size="sm">
                    <Play size={16} />
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="text-center py-12">
                <Wand2 className="mx-auto text-gray-400" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                  Ready to Generate?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Enter your idea and let AI create amazing content for you
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIBuilderPage;
