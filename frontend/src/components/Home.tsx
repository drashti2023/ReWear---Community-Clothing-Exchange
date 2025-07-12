import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles, Recycle, Users, Zap, ArrowRight, Star, Heart, TrendingUp, Play, Volume2, VolumeX } from 'lucide-react';

interface HomeProps {
  onPageChange: (page: string) => void;
}

export default function Home({ onPageChange }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const featuredItems = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Cyber Denim Jacket',
      category: 'Outerwear',
      user: 'Sarah M.',
      points: 120,
      trend: '+25%',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1798507/pexels-photo-1798507.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Neon Dreams Dress',
      category: 'Dresses',
      user: 'Emma K.',
      points: 85,
      trend: '+40%',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1464621/pexels-photo-1464621.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Future Sneakers',
      category: 'Footwear',
      user: 'Alex R.',
      points: 200,
      trend: '+60%',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const playHoverSound = () => {
    if (soundEnabled) {
      // Simulate sound effect
      console.log('🔊 Hover sound effect');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse transform rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-lg animate-bounce transform -rotate-12"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse transform rotate-12"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-purple-500/20 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* 3D Parallax Background */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl animate-reverse-spin"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-110"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Animated Logo */}
            <div className="relative">
              <div className="inline-flex items-center px-6 py-3 bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium animate-pulse">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Welcome to the Future of Fashion
              </div>
            </div>

            {/* 3D Title */}
            <div className="relative">
              <h1 
                className="text-8xl lg:text-9xl font-black leading-tight transform transition-all duration-500"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
                }}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                  ReWear
                </span>
              </h1>
              
              {/* Glitch Effect */}
              <div className="absolute inset-0 text-8xl lg:text-9xl font-black leading-tight opacity-20 animate-glitch">
                <span className="text-red-500">ReWear</span>
              </div>
              <div className="absolute inset-0 text-8xl lg:text-9xl font-black leading-tight opacity-20 animate-glitch-2">
                <span className="text-blue-500">ReWear</span>
              </div>
            </div>

            {/* Subtitle with Typewriter Effect */}
            <div className="text-2xl lg:text-4xl font-bold text-gray-300 max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Style, Reimagined
              </span>
              <br />
              <span className="text-lg lg:text-xl text-gray-400 animate-typewriter">
                AI-Powered • Sustainable • Gen-Z Native
              </span>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button
                onClick={() => {
                  playHoverSound();
                  onPageChange('browse');
                }}
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
                onMouseEnter={playHoverSound}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <Zap className="w-6 h-6 mr-3 animate-pulse" />
                  Start Swapping 🚀
                  <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </div>
                
                {/* Particle Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </button>

              <button
                onClick={() => {
                  playHoverSound();
                  onPageChange('add-item');
                }}
                className="group px-12 py-6 bg-black/50 backdrop-blur-sm border-2 border-purple-500/50 text-purple-400 rounded-2xl font-bold text-xl hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30"
                onMouseEnter={playHoverSound}
              >
                <div className="flex items-center">
                  <Heart className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  List an Item 🛍️
                </div>
              </button>
            </div>

            {/* Stats with 3D Cards */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              {[
                { value: '50K+', label: 'Items Swapped', icon: '🔄' },
                { value: '25K+', label: 'Gen-Z Users', icon: '👥' },
                { value: '98%', label: 'Satisfaction', icon: '⭐' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl transform transition-all duration-500 hover:scale-110 hover:bg-purple-500/20 hover:border-purple-400"
                  style={{
                    transform: `perspective(1000px) rotateX(${isHovering ? 15 : 0}deg) rotateY(${isHovering ? index * 5 - 5 : 0}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Gen-Z Chooses ReWear
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're not just another marketplace – we're your AI-powered style revolution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'AI Style Magic',
                description: 'Upload any outfit and our AI finds perfect matches. Get personalized recommendations that understand your vibe.',
                color: 'from-purple-500 to-purple-600',
                bgColor: 'from-purple-900/20 to-purple-800/20',
                action: 'Try Visual Search',
              },
              {
                icon: Users,
                title: 'Social Swapping',
                description: 'Connect with style twins, build your fashion network, and earn badges for every sustainable choice.',
                color: 'from-pink-500 to-pink-600',
                bgColor: 'from-pink-900/20 to-pink-800/20',
                action: 'Join Community',
              },
              {
                icon: Recycle,
                title: 'Planet Positive',
                description: 'Track your environmental impact with our eco-score. Every swap saves resources and reduces waste.',
                color: 'from-green-500 to-green-600',
                bgColor: 'from-green-900/20 to-green-800/20',
                action: 'Calculate Impact',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br ${feature.bgColor} border border-purple-500/20 rounded-3xl hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/20`}
                style={{
                  transform: `perspective(1000px) rotateX(${isHovering ? 10 : 0}deg)`,
                }}
              >
                {/* 3D Icon */}
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                <button className={`flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-all duration-300`}>
                  {feature.action}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Featured Items Carousel */}
      <section className="relative z-10 py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Today's Viral Drops
              </span>
            </h2>
            <p className="text-xl text-gray-400">Fresh finds from our style community</p>
          </div>

          <div className="relative perspective-1000">
            <div className="grid md:grid-cols-3 gap-8">
              {featuredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 shadow-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-8 hover:rotate-3 hover:shadow-purple-500/50 ${
                    index === currentSlide ? 'scale-105 ring-4 ring-purple-500/50 shadow-purple-500/30' : ''
                  }`}
                  style={{
                    transform: `perspective(1000px) rotateX(${isHovering ? 15 : 0}deg) rotateY(${isHovering ? index * 10 - 10 : 0}deg)`,
                  }}
                >
                  {/* Trending Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full animate-pulse">
                      🔥 {item.trend}
                    </div>
                  </div>

                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    
                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Interactive Elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full border border-purple-500/30 hover:bg-purple-500/20 transition-all duration-300">
                        <Heart className="w-5 h-5 text-purple-400" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-yellow-400 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                          {item.points} pts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-400 font-medium">{item.category}</span>
                      <div className="flex items-center text-cyan-400">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">Trending</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4">by {item.user}</p>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                      Request Swap
                    </button>
                  </div>

                  {/* 3D Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* 3D Carousel Controls */}
            <div className="flex justify-center mt-12 space-x-4">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-12 shadow-lg shadow-purple-500/50' 
                      : 'bg-gray-600 hover:bg-purple-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with 3D Effects */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-purple-900 via-black to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Join the Revolution?
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Join thousands of Gen-Z fashion rebels making sustainable choices that actually look fire.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => onPageChange('browse')}
                className="group px-12 py-6 bg-white text-black rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-white/20"
              >
                <div className="flex items-center justify-center">
                  Browse Items 👀
                  <TrendingUp className="w-6 h-6 ml-3 group-hover:animate-pulse" />
                </div>
              </button>
              
              <button 
                onClick={() => onPageChange('add-item')}
                className="px-12 py-6 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-white/20"
              >
                List Your First Item
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}