import React, { useState } from 'react';
import { Clock, Check, X, MessageCircle, User, Calendar, ArrowRight } from 'lucide-react';
import type { SwapRequest, User as UserType } from '../types/index'

interface SwapRequestsProps {
  requests: SwapRequest[];
  onPageChange: (page: string) => void;
  currentUser: UserType | null;
}

export default function SwapRequests({ requests, onPageChange, currentUser }: SwapRequestsProps) {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const receivedRequests = requests.filter(req => req.toUserId === currentUser?.id);
  const sentRequests = requests.filter(req => req.fromUserId === currentUser?.id);

  const filteredRequests = (activeTab === 'received' ? receivedRequests : sentRequests)
    .filter(req => filter === 'all' || req.status === filter);

  const handleAcceptRequest = (requestId: string) => {
    // In a real app, this would update the backend
    console.log('Accepting request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    // In a real app, this would update the backend
    console.log('Rejecting request:', requestId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'accepted': return 'text-green-400 bg-green-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'completed': return <Check className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Swap Requests
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Manage your incoming and outgoing swap requests
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800/50 p-1 rounded-2xl border border-gray-700">
            <button
              onClick={() => setActiveTab('received')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'received'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Received ({receivedRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'sent'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Sent ({sentRequests.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-gray-800/30 p-1 rounded-xl">
            {['all', 'pending', 'accepted', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                  filter === status
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No requests found</h3>
              <p className="text-gray-400 mb-8">
                {activeTab === 'received' 
                  ? "You haven't received any swap requests yet" 
                  : "You haven't sent any swap requests yet"
                }
              </p>
              <button
                onClick={() => onPageChange('browse')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Browse Items
              </button>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {activeTab === 'received' ? 'From: User' : 'To: User'}
                      </h3>
                      <p className="text-gray-400 text-sm">Level 5 Swapper</p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {request.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{request.message}</p>
                    
                    <div className="text-sm text-gray-400">
                      Item ID: {request.itemId}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {activeTab === 'received' && request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </>
                    )}
                    
                    <button className="px-6 py-3 border border-purple-500 text-purple-400 rounded-xl font-semibold hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </button>
                    
                    <button className="px-6 py-3 border border-gray-600 text-gray-400 rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center">
                      View Item
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('browse')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Browse More Items
            </button>
            <button
              onClick={() => onPageChange('add-item')}
              className="px-8 py-4 border border-purple-500 text-purple-400 rounded-xl font-semibold hover:bg-purple-500/20 transition-all duration-300"
            >
              List New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}