export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  points: number;
  level: number;
  badges: Badge[];
  swapCount: number;
  ecoScore: number;
  location?: string;
  joinedAt: Date;
  preferences?: {
    sizes: string[];
    categories: string[];
    styles: string[];
  };
}

export interface Item {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  size: string;
  condition: string;
  color: string;
  brand?: string;
  tags: string[];
  points: number;
  userId: string;
  userName: string;
  userAvatar: string;
  location: string;
  rating: number;
  views: number;
  likes: number;
  isAIRecommended: boolean;
  status: 'available' | 'pending' | 'swapped' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  itemId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  respondedAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface AIRecommendation {
  itemId: string;
  score: number;
  reason: string;
  styleMatch: number;
  colorMatch: number;
  occasionMatch: number;
}

export interface Notification {
  id: string;
  type: 'swap_request' | 'swap_accepted' | 'swap_completed' | 'new_match' | 'badge_earned';
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}