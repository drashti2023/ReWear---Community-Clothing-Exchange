import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Search, Bell, User, LogOut, Zap, Sparkles, Brain } from 'lucide-react';
import type { User as UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  currentUser?: UserType | null;
  notifications?: any[];
}

export default function Layout({ children, currentPage, onPageChange, isAuthenticated, onLogout, currentUser, notifications = [] }: LayoutProps) {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'browse', label: 'Browse', icon: '👀' },
    ...(isAuthenticated ? [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'add-item', label: 'List Item', icon: '➕' },
      { id: 'ai-styler', label: 'AI Styler', icon: '🤖' },
      { id: 'swap-requests', label: 'Swaps', icon: '🔄' }
    ] : [])
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-black' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => onPageChange('home')}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="relative">
                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                  ReWear
                </span>
                {/* Glitch Effect on Hover */}
                <span className="absolute inset-0 text-3xl font-black text-red-500 opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-all duration-300">
                  ReWear
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`relative px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
                  }`}
                >
                  <span className="mr-2 text-lg">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                  
                  {/* Hover Glow */}
                  {currentPage !== item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-xl hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 group">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              </button>
              
              {isAuthenticated && (
                <button className="relative p-3 rounded-xl hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 group">
                  <Bell className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {notifications.length}
                    </span>
                  )}
                </button>
              )}
              
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 group"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                )}
              </button>
              
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative">
                      <span className="text-white text-sm font-bold">
                        {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                      {/* Online Indicator */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                    </div>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 py-2 transform transition-all duration-300 scale-100">
                      <div className="px-4 py-3 border-b border-purple-500/20">
                        <p className="text-white font-semibold">{currentUser?.username || 'User'}</p>
                        <p className="text-purple-400 text-sm">Level {currentUser?.level || 1} Swapper</p>
                        <p className="text-gray-400 text-xs">{currentUser?.points || 0} points</p>
                      </div>
                      
                      <button 
                        onClick={() => onPageChange('dashboard')}
                        className="w-full px-4 py-3 text-left hover:bg-purple-500/20 text-gray-300 hover:text-white transition-all duration-300 flex items-center"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile & Stats
                      </button>
                      
                      <button 
                        onClick={() => onPageChange('ai-styler')}
                        className="w-full px-4 py-3 text-left hover:bg-purple-500/20 text-gray-300 hover:text-white transition-all duration-300 flex items-center"
                      >
                        <Brain className="w-4 h-4 mr-3" />
                        AI Styler
                      </button>
                      
                      <button 
                        onClick={() => onPageChange('swap-requests')}
                        className="w-full px-4 py-3 text-left hover:bg-purple-500/20 text-gray-300 hover:text-white transition-all duration-300 flex items-center"
                      >
                        <Sparkles className="w-4 h-4 mr-3" />
                        Swap Requests
                      </button>
                      
                      <button 
                        onClick={onLogout}
                        className="w-full px-4 py-3 text-left hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => onPageChange('login')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Join Now
                </button>
              )}
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-xl hover:bg-purple-500/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-500/20 bg-black/50 backdrop-blur-xl rounded-b-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 flex items-center ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
                  }`}
                >
                  <span className="mr-4 text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}