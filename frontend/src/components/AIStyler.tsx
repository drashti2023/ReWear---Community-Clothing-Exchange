import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, Zap, Search, Wand2, Eye, Heart, Star, ArrowRight } from 'lucide-react';
import type { Item, User, AIRecommendation } from '../types';

interface AIStylerProps {
  items: Item[];
  onPageChange: (page: string, data?: any) => void;
  currentUser: User | null;
}

export default function AIStyler({ items, onPageChange, currentUser }: AIStylerProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'style' | 'outfit'>('upload');
  const [stylePreferences, setStylePreferences] = useState({
    occasion: '',
    style: '',
    colors: [] as string[],
    budget: 100
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock recommendations
    const mockRecommendations: AIRecommendation[] = items.slice(0, 6).map((item, index) => ({
      itemId: item.id,
      score: 95 - (index * 5),
      reason: [
        'Perfect color match for your uploaded style',
        'Similar aesthetic and vibe',
        'Trending in your area',
        'Matches your size preferences',
        'Great for the same occasions',
        'Complements your existing wardrobe'
      ][index],
      styleMatch: Math.floor(Math.random() * 20) + 80,
      colorMatch: Math.floor(Math.random() * 20) + 80,
      occasionMatch: Math.floor(Math.random() * 20) + 80
    }));
    
    setRecommendations(mockRecommendations);
    setIsAnalyzing(false);
  };

  const generateOutfit = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Generate outfit recommendations based on preferences
      const outfitItems = items.slice(0, 3);
      setRecommendations(outfitItems.map((item, index) => ({
        itemId: item.id,
        score: 90 + index * 2,
        reason: `Perfect ${['top', 'bottom', 'accessory'][index]} for your ${stylePreferences.occasion} look`,
        styleMatch: 90,
        colorMatch: 85,
        occasionMatch: 95
      })));
      setIsAnalyzing(false);
    }, 2000);
  };

  const occasions = ['Casual', 'Work', 'Date Night', 'Party', 'Festival', 'Formal'];
  const styles = ['Minimalist', 'Boho', 'Streetwear', 'Vintage', 'Preppy', 'Edgy'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Pink', 'Purple', 'Yellow'];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            AI-Powered Style Assistant
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Personal AI Stylist
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Upload any outfit photo or describe your style, and our AI will find perfect matches from our community
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-800/50 p-1 rounded-2xl border border-gray-700">
            {[
              { id: 'upload', label: 'Visual Search', icon: Camera },
              { id: 'style', label: 'Style Preferences', icon: Wand2 },
              { id: 'outfit', label: 'Outfit Generator', icon: Sparkles }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'upload' && (
            <div className="space-y-8">
              {/* Upload Section */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Upload Your Style Inspiration</h3>
                
                {!uploadedImage ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Drop your style photo here</h4>
                    <p className="text-gray-400 mb-4">Or click to browse from your device</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, WebP up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded style"
                      className="w-full max-w-md mx-auto rounded-2xl"
                    />
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setRecommendations([]);
                      }}
                      className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Analysis Loading */}
              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Zap className="w-10 h-10 text-white animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI is analyzing your style...</h3>
                  <p className="text-gray-400">Finding perfect matches from our community</p>
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'style' && (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Tell Us Your Style</h3>
              
              <div className="space-y-8">
                {/* Occasion */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">What's the occasion?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion}
                        onClick={() => setStylePreferences(prev => ({ ...prev, occasion }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          stylePreferences.occasion === occasion
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">Your style vibe?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setStylePreferences(prev => ({ ...prev, style }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          stylePreferences.style === style
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">Favorite colors?</label>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setStylePreferences(prev => ({
                            ...prev,
                            colors: prev.colors.includes(color)
                              ? prev.colors.filter(c => c !== color)
                              : [...prev.colors, color]
                          }));
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          stylePreferences.colors.includes(color)
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    Point budget: {stylePreferences.budget} pts
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={stylePreferences.budget}
                    onChange={(e) => setStylePreferences(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <button
                  onClick={generateOutfit}
                  disabled={!stylePreferences.occasion || !stylePreferences.style}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find My Style Matches
                </button>
              </div>
            </div>
          )}

          {activeTab === 'outfit' && (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Complete Outfit Generator</h3>
              
              <div className="text-center mb-8">
                <p className="text-gray-400 mb-6">Let our AI create a complete outfit for you based on trending styles</p>
                <button
                  onClick={generateOutfit}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center mx-auto"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Outfit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && !isAnalyzing && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              AI Recommendations for You ✨
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((rec) => {
                const item = items.find(i => i.id === rec.itemId);
                if (!item) return null;
                
                return (
                  <div
                    key={rec.itemId}
                    className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  >
                    <div className="relative">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full">
                          {rec.score}% Match
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                          {item.points} pts
                        </span>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors">
                          <Heart className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-purple-400 font-medium">{item.category}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4">{rec.reason}</p>
                      
                      {/* Match Scores */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <div className="text-sm font-bold text-white">{rec.styleMatch}%</div>
                          <div className="text-xs text-gray-400">Style</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-white">{rec.colorMatch}%</div>
                          <div className="text-xs text-gray-400">Color</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-white">{rec.occasionMatch}%</div>
                          <div className="text-xs text-gray-400">Occasion</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => onPageChange('item-detail', item)}
                          className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Item
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}