import React, { useState } from 'react';
import { Upload, X, Camera, Sparkles, Tag, Package, Ruler, Star, Save, Send } from 'lucide-react';
import type { Item, User } from '../types';

interface AddItemProps {
  onPageChange: (page: string) => void;
  onAddItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  currentUser: User | null;
}

export default function AddItem({ onPageChange, onAddItem, currentUser }: AddItemProps) {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    color: '',
    brand: '',
    tags: '',
    pointValue: 100
  });
  const [isDraft, setIsDraft] = useState(false);

  const categories = [
    'Tops & Shirts', 'Dresses', 'Bottoms', 'Outerwear', 
    'Footwear', 'Accessories', 'Activewear', 'Formal'
  ];

  const conditions = [
    { value: 'new', label: 'Brand New', points: 150 },
    { value: 'excellent', label: 'Excellent', points: 120 },
    { value: 'good', label: 'Good', points: 100 },
    { value: 'fair', label: 'Fair', points: 80 }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && images.length < 5) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-update point value based on condition
    if (name === 'condition') {
      const condition = conditions.find(c => c.value === value);
      if (condition) {
        setFormData(prev => ({ ...prev, pointValue: condition.points }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || images.length === 0) return;
    
    const newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title,
      description: formData.description,
      images: images,
      category: formData.category,
      size: formData.size,
      condition: formData.condition,
      color: formData.color,
      brand: formData.brand,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      points: formData.pointValue,
      userId: currentUser.id,
      userName: currentUser.username,
      userAvatar: currentUser.avatar || '',
      location: currentUser.location || 'Unknown',
      rating: 5.0,
      isAIRecommended: false,
      status: 'available',
      views: 0,
      likes: 0
    };
    
    onAddItem(newItem);
  };

  const saveDraft = () => {
    setIsDraft(true);
    // Simulate saving draft
    console.log('Draft saved');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            List Your Style ✨
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share your fashion finds with the ReWear community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-purple-500" />
              Photos (Up to 5)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                      Main
                    </div>
                  )}
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors group">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mb-2" />
                  <span className="text-sm text-gray-500 group-hover:text-purple-600">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="flex items-start">
                <Sparkles className="w-5 h-5 text-purple-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Pro Tip!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Good lighting and multiple angles help your item get more swaps!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Package className="w-6 h-6 mr-2 text-purple-500" />
              Item Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Vintage Band Tee, Designer Jeans..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Nike, Zara, Vintage..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label} ({condition.points} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Black, Blue, Multicolor..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your item... styling tips, fit details, why you loved it!"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="vintage, streetwear, summer, casual..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Point Value */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-purple-500" />
              Swap Value
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Estimated Points</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Based on condition and category</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {formData.pointValue}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={saveDraft}
              className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              <Save className="w-5 h-5 mr-2" />
              Save as Draft
            </button>
            
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Send className="w-5 h-5 mr-2" />
              List Item for Swap
            </button>
          </div>

          {isDraft && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <p className="text-green-700 dark:text-green-400 font-medium">
                ✅ Draft saved! You can continue editing anytime from your dashboard.
              </p>
            </div>
          )}
        </form>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Make Your Item Stand Out! 🌟</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">📸 Great Photos</h4>
              <p className="text-purple-100 text-sm">Natural lighting, clean background, show details and any flaws honestly</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✍️ Detailed Description</h4>
              <p className="text-purple-100 text-sm">Include styling tips, measurements, and why you're parting with it</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🏷️ Smart Tags</h4>
              <p className="text-purple-100 text-sm">Use trending keywords and style descriptors to help others find your item</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}