import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, MapPin, User, MessageCircle, Zap, Camera, ShoppingBag, Flag } from 'lucide-react';
import type { Item, User as UserType } from '../types';

interface ItemDetailProps {
  item: Item | null;
  onPageChange: (page: string) => void;
  onSwapRequest: (itemId: string, message: string) => void;
  currentUser: UserType | null;
}

export default function ItemDetail({ item, onPageChange, onSwapRequest, currentUser }: ItemDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Item not found</h2>
          <button 
            onClick={() => onPageChange('browse')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleSwapRequest = () => {
    if (!currentUser) {
      onPageChange('login');
      return;
    }
    onSwapRequest(item.id, swapMessage);
    setShowSwapModal(false);
    setSwapMessage('');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would update the backend
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onPageChange('browse')}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Browse
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110">
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-96 lg:h-[600px] object-cover rounded-2xl cursor-pointer"
                onClick={() => setShowImageModal(true)}
              />
              
              {/* Image Navigation */}
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : item.images.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev < item.images.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                </>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                  {item.points} pts
                </span>
                {item.isAIRecommended && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium rounded-full flex items-center">
                    <Zap className="w-3 h-3 mr-1" />
                    AI Pick
                  </span>
                )}
              </div>
              
              {/* Zoom Icon */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowImageModal(true)}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex ? 'border-purple-500' : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <img src={image} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-400 font-medium">{item.category}</span>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{item.title}</h1>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center p-4 bg-gray-800/50 rounded-2xl">
              <img
                src={item.userAvatar}
                alt={item.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{item.userName}</h3>
                <p className="text-gray-400 text-sm">Level 5 Swapper • 23 successful swaps</p>
              </div>
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>

            {/* Item Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <p className="text-gray-400 text-sm">Size</p>
                <p className="font-semibold text-white">{item.size}</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <p className="text-gray-400 text-sm">Condition</p>
                <p className="font-semibold text-white">{item.condition}</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <p className="text-gray-400 text-sm">Color</p>
                <p className="font-semibold text-white">{item.color}</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <p className="text-gray-400 text-sm">Brand</p>
                <p className="font-semibold text-white">{item.brand || 'Unbranded'}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-purple-500/20 hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{item.views}</p>
                <p className="text-gray-400 text-sm">Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{item.likes}</p>
                <p className="text-gray-400 text-sm">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{item.points}</p>
                <p className="text-gray-400 text-sm">Points</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowSwapModal(true)}
                disabled={item.userId === currentUser?.id}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {item.userId === currentUser?.id ? 'Your Item' : 'Request Swap'}
              </button>
              
              <button className="w-full py-4 border-2 border-purple-500 text-purple-400 rounded-xl font-semibold hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message Owner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-4">Request Swap</h3>
            <p className="text-gray-400 mb-4">Send a message to {item.userName} about swapping this item.</p>
            
            <textarea
              value={swapMessage}
              onChange={(e) => setSwapMessage(e.target.value)}
              placeholder="Hi! I'm interested in swapping for this item. I have..."
              className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={!swapMessage.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 rotate-45" />
            </button>
            <img
              src={item.images[currentImageIndex]}
              alt={item.title}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}