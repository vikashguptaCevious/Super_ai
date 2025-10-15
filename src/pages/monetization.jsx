import React, { useState } from 'react'
import { DollarSign, TrendingUp, Users, BookOpen, BarChart3, CreditCard, PieChart, Download, Plus } from 'lucide-react'

const Monetization = () => {
    const [activeTab, setActiveTab] = useState('overview')

    const earningsData = {
        total: 12450.75,
        thisMonth: 2840.50,
        growth: 32.1
    }

    const revenueSources = [
        { name: 'Course Sales', amount: 8450.25, percentage: 68, color: 'bg-blue-500' },
        { name: 'Webinar Tickets', amount: 2100.50, percentage: 17, color: 'bg-green-500' },
        { name: 'Consulting', amount: 1200.00, percentage: 10, color: 'bg-purple-500' },
        { name: 'Affiliate Commissions', amount: 700.00, percentage: 5, color: 'bg-yellow-500' }
    ]

    const recentTransactions = [
        {
            id: 1,
            title: 'Advanced AI Techniques Course',
            student: 'Sarah Johnson',
            amount: 149.99,
            date: '2024-12-15',
            status: 'completed'
        },
        {
            id: 2,
            title: 'AI Automation Webinar',
            student: 'Mike Chen',
            amount: 49.99,
            date: '2024-12-14',
            status: 'completed'
        },
        {
            id: 3,
            title: '1-on-1 AI Consultation',
            student: 'Alex Rodriguez',
            amount: 200.00,
            date: '2024-12-13',
            status: 'pending'
        }
    ]

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'payouts', label: 'Payouts', icon: Download }
    ]

    const renderOverviewTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Earnings</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${earningsData.total.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 dark:text-green-400 font-medium">+{earningsData.growth}%</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${earningsData.thisMonth.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Users className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">12.4%</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <BarChart3 className="text-yellow-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-6 dark:text-white">Revenue Sources</h3>
                <div className="space-y-4">
                    {revenueSources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full ${source.color} mr-3`}></div>
                                <span className="font-medium text-gray-900 dark:text-white">{source.name}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${source.color}`}
                                        style={{ width: `${source.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white w-20 text-right">
                                    ${source.amount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderTransactionsTab = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold dark:text-white">Recent Transactions</h3>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <BookOpen size={20} className="text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">{transaction.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.student}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">{transaction.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        ${transaction.amount}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.status === 'completed'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                        }`}>
                                        {transaction.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return renderOverviewTab()
            case 'transactions': return renderTransactionsTab()
            default: return renderOverviewTab()
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                                <DollarSign className="mr-3 text-green-600" size={32} />
                                Monetization
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Track your earnings and manage your revenue streams
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                                <Download size={16} className="mr-2" />
                                Export Report
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                                <Plus size={16} className="mr-2" />
                                Add Revenue Stream
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
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
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

export default Monetization