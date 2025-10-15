import React, { useState } from 'react'
import { Zap, Plus, Play, Pause, Edit, Trash2, Settings, Clock, CheckCircle, AlertCircle, Users, Mail, Calendar, MessageSquare, TrendingUp, Bell, FileText, Database } from 'lucide-react'

const Automation = () => {
  const [activeTab, setActiveTab] = useState('workflows')

  const workflows = [
    {
      id: 1,
      name: 'Welcome Email Sequence',
      description: 'Automatically send welcome emails to new subscribers',
      status: 'active',
      triggers: 3,
      actions: 5,
      lastRun: '2 hours ago',
      icon: Mail,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Course Completion Follow-up',
      description: 'Send follow-up content when students complete courses',
      status: 'active',
      triggers: 1,
      actions: 3,
      lastRun: '1 day ago',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Inactive User Re-engagement',
      description: 'Re-engage users who haven\'t been active for 30 days',
      status: 'paused',
      triggers: 1,
      actions: 4,
      lastRun: '1 week ago',
      icon: Users,
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      name: 'Payment Reminder',
      description: 'Send payment reminders for pending invoices',
      status: 'active',
      triggers: 2,
      actions: 2,
      lastRun: '3 hours ago',
      icon: AlertCircle,
      color: 'bg-red-500'
    }
  ]

  const templates = [
    {
      name: 'Email Marketing',
      description: 'Automated email campaigns and sequences',
      icon: Mail,
      workflows: 12
    },
    {
      name: 'User Onboarding',
      description: 'Welcome and onboarding automation',
      icon: Users,
      workflows: 8
    },
    {
      name: 'Course Management',
      description: 'Course-related automation workflows',
      icon: FileText,
      workflows: 15
    },
    {
      name: 'Social Media',
      description: 'Social media posting and engagement',
      icon: TrendingUp,
      workflows: 6
    }
  ]

  const tabs = [
    { id: 'workflows', label: 'Workflows', icon: Zap },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderWorkflowsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Automation Workflows</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => {
          const Icon = workflow.icon
          return (
            <div key={workflow.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${workflow.color} mr-3`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{workflow.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{workflow.triggers} triggers</span>
                  <span>•</span>
                  <span>{workflow.actions} actions</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                }`}>
                  {workflow.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last run: {workflow.lastRun}</span>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-md ${
                    workflow.status === 'active' 
                      ? 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' 
                      : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}>
                    {workflow.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Automation Templates</h3>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Browse All Templates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template, index) => {
          const Icon = template.icon
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{template.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{template.workflows} workflows</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Use Template
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'workflows': return renderWorkflowsTab()
      case 'templates': return renderTemplatesTab()
      default: return renderWorkflowsTab()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Zap className="mr-3 text-yellow-600" size={32} />
                Automation
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Automate your workflows and save time with intelligent automation
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Import Workflow
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <Plus size={16} className="mr-2" />
                Create Workflow
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Automation