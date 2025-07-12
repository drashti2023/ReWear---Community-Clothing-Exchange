import React, { useState } from 'react';
import { Edit3, Camera, Star, Trophy, Leaf, Calendar, MapPin, Settings, Save, X } from 'lucide-react';
import type { User } from '../types';

interface ProfileProps {
  user: User | null;
  onPageChange: (page: string) => void;
}

export default function Profile({ user, onPageChange }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) return null;

  const handleSave = () => {
    // In a real app, this would update the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedUser?.username || ''}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, username: e.target.value } : null)}
                    className="text-3xl font-bold bg-transparent border-b-2 border-purple-500 text-white focus:outline-none"
                  />
                  <textarea
                    value={editedUser?.bio || ''}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, bio: e.target.value } : null)}
                    placeholder="Tell us about your style..."
                    className="w-full p-3 bg-black/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
                  <p className="text-purple-300 text-lg mb-4">Level {user.level} Style Maven</p>
                  <p className="text-gray-300 max-w-2xl">{user.bio || 'Fashion enthusiast spreading sustainable style vibes ✨'}</p>
                </>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {user.joinedAt.toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.location || 'Location not set'}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-3 bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{user.points}</div>
            <div className="text-purple-100 text-sm">Total Points</div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{user.swapCount}</div>
            <div className="text-pink-100 text-sm">Successful Swaps</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{user.ecoScore}%</div>
            <div className="text-green-100 text-sm">Eco Score</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{user.badges.length}</div>
            <div className="text-orange-100 text-sm">Badges Earned</div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
            Achievements & Badges
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {user.badges.map((badge) => (
              <div key={badge.id} className="text-center p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors">
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-bold text-white mb-1">{badge.name}</h3>
                <p className="text-gray-400 text-sm">{badge.description}</p>
                <p className="text-purple-400 text-xs mt-2">
                  Earned {badge.earnedAt.toLocaleDateString()}
                </p>
              </div>
            ))}
            
            {/* Placeholder badges */}
            {Array.from({ length: Math.max(0, 8 - user.badges.length) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="text-center p-4 bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-600">
                <div className="text-4xl mb-3 opacity-30">🏆</div>
                <h3 className="font-bold text-gray-500 mb-1">Locked</h3>
                <p className="text-gray-600 text-sm">Keep swapping to unlock!</p>
              </div>
            ))}
          </div>
        </div>

        {/* Style Preferences */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-purple-500" />
            Style Preferences
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Preferred Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {user.preferences?.sizes?.map((size) => (
                  <span key={size} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {size}
                  </span>
                )) || <span className="text-gray-400">Not set</span>}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Favorite Categories</h3>
              <div className="flex flex-wrap gap-2">
                {user.preferences?.categories?.map((category) => (
                  <span key={category} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                    {category}
                  </span>
                )) || <span className="text-gray-400">Not set</span>}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Style Vibes</h3>
              <div className="flex flex-wrap gap-2">
                {user.preferences?.styles?.map((style) => (
                  <span key={style} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    {style}
                  </span>
                )) || <span className="text-gray-400">Not set</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Leaf className="w-6 h-6 mr-3 text-green-400" />
            Environmental Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2.5kg</div>
              <div className="text-green-200 text-sm">CO₂ Saved</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">1,200L</div>
              <div className="text-green-200 text-sm">Water Saved</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{user.swapCount}</div>
              <div className="text-green-200 text-sm">Items Rescued</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-500/20 rounded-xl">
            <p className="text-green-200 text-center">
              🌱 You're making a real difference! Every swap helps reduce fashion waste and supports sustainable living.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}