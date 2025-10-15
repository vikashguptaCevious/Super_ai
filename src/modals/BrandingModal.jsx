import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Download, Share2, Sparkles, Image, Type } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useGlobalStore } from '../store/globalStore';
import { generateBrandingAssets } from '../utils/aiMockFunctions';

const BrandingModal = () => {
  const { modals, closeModal, addNotification } = useGlobalStore();
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [generatedAssets, setGeneratedAssets] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateAssets = async () => {
    if (!brandName.trim()) {
      addNotification({
        type: 'error',
        title: 'Brand Name Required',
        message: 'Please enter a brand name to generate assets'
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const assets = generateBrandingAssets(brandName);
      setGeneratedAssets(assets);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = (assetType) => {
    addNotification({
      type: 'success',
      title: 'Download Started',
      message: `${assetType} download has started`
    });
  };

  const handleShare = () => {
    addNotification({
      type: 'success',
      title: 'Shared!',
      message: 'Your branding assets have been shared'
    });
  };

  return (
    <Modal
      isOpen={modals.brandingModal}
      onClose={() => closeModal('brandingModal')}
      title="AI Branding Toolkit"
      size="xl"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Brand Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Brand Name *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., TechAcademy, CreativeStudio, etc."
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Brand Description
            </label>
            <textarea
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              placeholder="Describe your brand, values, and target audience..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleGenerateAssets}
              loading={loading}
              disabled={!brandName.trim()}
              className="flex items-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Generate Branding Assets</span>
            </Button>
          </div>
        </div>

        {/* Generated Assets */}
        {generatedAssets && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Assets
            </h3>

            {/* Color Palette */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Palette size={20} />
                <span>Color Palette</span>
              </h4>
              <div className="flex space-x-4">
                {generatedAssets.colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-16 h-16 rounded-xl shadow-lg mb-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Type size={20} />
                <span>Typography</span>
              </h4>
              <div className="space-y-3">
                {generatedAssets.fonts.map((font, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Type size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: font }}>
                        {font}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Primary Font
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Variations */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Image size={20} />
                <span>Logo Variations</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedAssets.logoVariations.map((logo, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {brandName.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {logo.split('-').pop().split('.')[0]}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(logo)}
                      className="mt-2"
                    >
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Templates */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Share2 size={20} />
                <span>Social Media Templates</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(generatedAssets.socialMediaTemplates).map(([platform, template]) => (
                  <div key={platform} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="w-full h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-primary font-semibold capitalize">
                        {platform}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {template}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(template)}
                      className="w-full"
                    >
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Brand Tagline
              </h4>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "{generatedAssets.tagline}"
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={() => closeModal('brandingModal')}
          >
            Close
          </Button>
          {generatedAssets && (
            <div className="flex items-center space-x-3">
              <Button
                variant="secondary"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 size={16} />
                <span>Share Assets</span>
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDownload('All Assets')}
                className="flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download All</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BrandingModal;
