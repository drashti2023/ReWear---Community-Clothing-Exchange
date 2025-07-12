import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Star, 
  Trophy, 
  Zap, 
  Heart, 
  ArrowUpRight, 
  TrendingUp, 
  ShoppingBag, 
  Users,
  Award,
  Leaf,
  Calendar,
  Edit3,
  Plus,
  Eye
} from 'lucide-react';
import type{ User as UserType, Item } from '../types';

interface DashboardProps {
  user: UserType | null;
  items: Item[];
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, items, onPageChange, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const userStats = {
    totalSwaps: user.swapCount,
    itemsListed: items.length,
    points: user.points,
    ecoScore: user.ecoScore,
    badges: user.badges.length,
    swapStreak: 5
  };

  const recentItems = items.slice(0, 3);

  const swapHistory = [
    { date: '2024-01-15', item: 'Vintage Sweater', partner: 'Sarah M.', points: 100, type: 'completed' as const },
    { date: '2024-01-12', item: 'Designer Bag', partner: 'Emma K.', points: 150, type: 'completed' as const },
    { date: '2024-01-10', item: 'Sneakers', partner: 'Alex R.', points: 0, type: 'pending' as const }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hey {user.username}! 👋</h1>
                <p className="text-gray-600 dark:text-gray-300">Style maven • Level {user.level} Swapper</p>
              </div>
            </div>
            <button 
              onClick={() => {}}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Points</p>
                  <p className="text-2xl font-bold">{userStats.points}</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Swaps Done</p>
                  <p className="text-2xl font-bold">{userStats.totalSwaps}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-pink-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Eco Score</p>
                  <p className="text-2xl font-bold">{userStats.ecoScore}%</p>
                </div>
                <Leaf className="w-8 h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Badges</p>
                  <p className="text-2xl font-bold">{userStats.badges}</p>
                </div>
                <Award className="w-8 h-8 text-orange-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Items Listed</p>
                  <p className="text-2xl font-bold">{userStats.itemsListed}</p>
                </div>
                <Plus className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Swap Streak</p>
                  <p className="text-2xl font-bold">{userStats.swapStreak}</p>
                </div>
                <Zap className="w-8 h-8 text-indigo-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-600">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'items', label: 'My Items', icon: ShoppingBag },
            { id: 'swaps', label: 'Swap History', icon: Users },
            { id: 'badges', label: 'Achievements', icon: Trophy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => onPageChange('add-item')}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center">
                      <Plus className="w-5 h-5 mr-3" />
                      List New Item
                    </div>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={() => onPageChange('browse')}
                    className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Eye className="w-5 h-5 mr-3" />
                      Browse Items
                    </div>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Users className="w-5 h-5 mr-3" />
                      Find Style Buddies
                    </div>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Achievements Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 mt-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Latest Badges</h3>
                <div className="grid grid-cols-2 gap-3">
                  {user.badges.slice(0, 4).map((badge, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">New badge earned!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">You've unlocked "Eco Warrior" 🌱</p>
                    </div>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>

                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Your vintage tee got 5 likes!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Emma K. and 4 others liked your item</p>
                    </div>
                    <span className="text-xs text-gray-500">5h ago</span>
                  </div>

                  <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Swap completed!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Designer jeans → Vintage jacket (+120 pts)</p>
                    </div>
                    <span className="text-xs text-gray-500">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Listed Items</h3>
              <button 
                onClick={() => onPageChange('add-item')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Add New Item
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === 'pending' ? 'bg-green-500 text-white' :
                        item.status === 'available' ? 'bg-green-500 text-white' :
                        item.status === 'swapped' ? 'bg-purple-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>👀 {item.views} views</span>
                      <span>❤️ {item.likes} likes</span>
                      <span>⭐ {item.points} pts</span>
                    </div>
                    <button className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'swaps' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Swap History</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Item</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Partner</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Points</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {swapHistory.map((swap, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {new Date(swap.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{swap.item}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{swap.partner}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {swap.points > 0 ? `+${swap.points}` : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            swap.type === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {swap.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Achievements & Badges</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {user.badges.map((badge, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="text-6xl mb-4">{badge.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{badge.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{badge.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                      Earned
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Add placeholder badges if user has fewer than 4 */}
              {Array.from({ length: Math.max(0, 4 - user.badges.length) }).map((_, index) => (
                <div key={`placeholder-${index}`} className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                  <div className="text-6xl mb-4 opacity-30">🏆</div>
                  <h4 className="text-xl font-bold text-gray-500 mb-2">Locked</h4>
                  <p className="text-gray-400 text-sm">Keep swapping to unlock!</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}