import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  Search, 
  Filter, 
  Star, 
  Download, 
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Products', count: 24 },
    { id: 'courses', label: 'Courses', count: 12 },
    { id: 'templates', label: 'Templates', count: 8 },
    { id: 'tools', label: 'AI Tools', count: 4 }
  ];

  const products = [
    {
      id: 1,
      title: 'AI Logo Generator Pro',
      type: 'tool',
      category: 'tools',
      price: 29.99,
      rating: 4.8,
      downloads: 234,
      image: 'https://via.placeholder.com/300x200',
      description: 'Generate professional logos with AI in seconds',
      trending: true
    },
    {
      id: 2,
      title: 'Content Templates Pack',
      type: 'template',
      category: 'templates',
      price: 19.99,
      rating: 4.5,
      downloads: 156,
      image: 'https://via.placeholder.com/300x200',
      description: '50+ ready-to-use content templates',
      trending: false
    },
    {
      id: 3,
      title: 'Complete AI Course Bundle',
      type: 'course',
      category: 'courses',
      price: 99.99,
      rating: 4.9,
      downloads: 89,
      image: 'https://via.placeholder.com/300x200',
      description: 'Master AI from basics to advanced concepts',
      trending: true
    },
    {
      id: 4,
      title: 'Social Media Scheduler',
      type: 'tool',
      category: 'tools',
      price: 39.99,
      rating: 4.7,
      downloads: 178,
      image: 'https://via.placeholder.com/300x200',
      description: 'Automate your social media posting',
      trending: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = (product) => {
    // Handle purchase logic
    console.log('Purchasing:', product);
  };

  const handleAddToCart = (product) => {
    // Handle add to cart logic
    console.log('Adding to cart:', product);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <Store className="text-green-500" size={32} />
            <span>Marketplace</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Discover and purchase AI tools, courses, and digital assets
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Sell Your Product</span>
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
              placeholder="Search products..."
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
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-0 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                {product.trending && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <TrendingUp size={12} />
                    <span>Trending</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Eye size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {product.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Download size={14} />
                    <span>{product.downloads} downloads</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <DollarSign size={14} />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="flex-1"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handlePurchase(product)}
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Store className="mx-auto text-gray-400" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MarketplacePage;
