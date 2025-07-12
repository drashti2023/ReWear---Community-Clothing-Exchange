import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import type { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onPageChange: (page: string) => void;
}

export default function Login({ onLogin, onPageChange }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create demo user
    const demoUser: User = {
      id: 'user1',
      username: isSignup ? formData.username : 'Alex Chen',
      email: formData.email,
      avatar: '',
      bio: 'Fashion enthusiast spreading sustainable style vibes ✨',
      points: 1250,
      level: 5,
      badges: [
        {
          id: '1',
          name: 'Eco Warrior',
          description: '10+ sustainable swaps',
          icon: '🌱',
          earnedAt: new Date('2024-01-01')
        },
        {
          id: '2',
          name: 'Style Star',
          description: 'Highly rated items',
          icon: '⭐',
          earnedAt: new Date('2024-01-15')
        }
      ],
      swapCount: 23,
      ecoScore: 85,
      location: 'New York, NY',
      joinedAt: new Date('2023-06-15'),
      preferences: {
        sizes: ['M', 'L'],
        categories: ['Tops', 'Dresses', 'Outerwear'],
        styles: ['Vintage', 'Streetwear', 'Minimalist']
      }
    };
    
    onLogin(demoUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated 3D Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse transform rotate-45"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-bounce transform -rotate-12"></div>
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse transform rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-2xl animate-bounce transform rotate-45"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-purple-500/20 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                <span className="text-white font-bold text-3xl">R</span>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to ReWear
            </span>
          </h1>
          
          <p className="text-purple-200 text-lg font-medium">
            Join the Gen-Z fashion revolution 🚀
          </p>
        </div>

        {/* Auth Form */}
        <div className="relative">
          {/* 3D Card Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex mb-8 bg-black/30 rounded-2xl p-1">
              <button
                onClick={() => setIsSignup(false)}
                className={`flex-1 py-4 text-center rounded-xl transition-all duration-300 font-semibold ${
                  !isSignup 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Zap className="w-5 h-5 inline mr-2" />
                Login
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className={`flex-1 py-4 text-center rounded-xl transition-all duration-300 font-semibold ${
                  isSignup 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Sparkles className="w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose your style name"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50"
                    required
                  />
                  {/* Input Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <Mail className="w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <Lock className="w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                  ) : (
                    <Eye className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                  )}
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {isSignup && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Shield className="w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  {isSignup ? 'Join ReWear Revolution' : 'Enter the Future'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <p className="text-gray-400 text-center mb-4">Or continue with</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 bg-black/30 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:border-purple-400/50">
                  🌟 Google
                </button>
                <button className="py-3 bg-black/30 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:border-purple-400/50">
                  📱 Phone
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <button
                onClick={() => onPageChange('home')}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center justify-center mx-auto group"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-4 gap-6 text-white/80">
            {[
              { icon: '🤖', label: 'AI Styling' },
              { icon: '🌍', label: 'Eco-Friendly' },
              { icon: '👥', label: 'Community' },
              { icon: '⚡', label: 'Instant Swap' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center transform transition-all duration-300 hover:scale-110"
              >
                <div className="text-3xl mb-2 group-hover:animate-bounce">{feature.icon}</div>
                <div className="text-sm group-hover:text-purple-400 transition-colors">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}