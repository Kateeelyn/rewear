
export interface Product {
  id: string;
  title: string;
  brand: string;
  rentPrice: number; // 0 if only for buy/donate
  buyPrice: number; // 0 if only for rent/donate
  imageUrl: string;
  gallery?: string[]; // Multiple images
  type: 'rent' | 'buy' | 'rent-buy' | 'donation';
  category: string;
  location?: string;
  description?: string;
  size?: string;
  condition?: string;
  seller?: {
    name: string;
    rating: number;
    avatar: string;
    id: string;
  };
  charityId?: string; // If it's a donation type
}

export interface Charity {
  id: string;
  name: string;
  mission: string;
  address: string;
  imageUrl: string;
  description: string;
  accepts: string[];
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  content?: string;
  replies: number;
  date: string;
  color: string; // Hex code for the circle icon
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface UserProfile {
  username: string;
  points: number;
  level: string;
  avatarUrl: string;
}

export interface ShopFilters {
  maxPrice: number;
  brand: string;
  distance: number; // in miles
}

// Expanded ViewState to handle sub-pages and new tabs
export type ViewState = 
  | 'loading'
  | 'login'
  | 'onboarding'
  | 'home' 
  | 'shop' 
  | 'upload' 
  | 'messages' 
  | 'profile'
  | 'settings'
  | 'list-recent'  
  | 'list-rent-buy' 
  | 'list-donation'
  | 'list-my-listings'
  | 'list-my-orders'
  | { type: 'product-detail', productId: string }
  | { type: 'charity-detail', charityId: string }
  | { type: 'donation', charityId: string }
  | { type: 'forum-detail', topicId: string }
  | { type: 'chat-detail', userId: string, userName?: string };

export type MessageTab = 'forum' | 'chats' | 'help';
