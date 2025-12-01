import React from 'react';
import { MessageCircle, Home, User, ShoppingBag, PlusSquare } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  // Helper to determine active state handling objects
  const getViewKey = (v: ViewState): string => {
    if (typeof v === 'string') return v;
    // If we are in a detail view, we might want to highlight a parent tab
    if (v.type === 'product-detail') return 'shop'; 
    return '';
  };

  const currentKey = getViewKey(currentView);
  
  const isActive = (key: string) => {
    if (currentKey === key) return true;
    if (key === 'home' && ['list-recent', 'list-rent-buy', 'list-donation', 'charity-detail'].includes(currentKey as string)) return true;
    if (key === 'home' && (currentView as any).type === 'charity-detail') return true;
    return false;
  };

  const navItemClass = (key: string) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-200 ${
      isActive(key) ? 'text-ecoBlack' : 'text-gray-300 hover:text-gray-500'
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[88px] bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 px-6 pb-6 flex justify-between items-center max-w-[375px] mx-auto lg:rounded-b-[32px]">
        
        {/* 1. Home */}
        <button onClick={() => setView('home')} className={navItemClass('home')}>
          <Home size={24} strokeWidth={isActive('home') ? 2.5 : 2} />
          {/* Removed text labels for ultra-minimal look, or keep them very small */}
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </button>

        {/* 2. Shop */}
        <button onClick={() => setView('shop')} className={navItemClass('shop')}>
          <ShoppingBag size={24} strokeWidth={isActive('shop') ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">Shop</span>
        </button>
        
        {/* 3. Upload (Center - Integrated) */}
        <button onClick={() => setView('upload')} className={navItemClass('upload')}>
            <PlusSquare size={26} strokeWidth={isActive('upload') ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">Sell</span>
        </button>

        {/* 4. Messages */}
        <button onClick={() => setView('messages')} className={navItemClass('messages')}>
          <MessageCircle size={24} strokeWidth={isActive('messages') ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">Chat</span>
        </button>
        
        {/* 5. Profile */}
        <button onClick={() => setView('profile')} className={navItemClass('profile')}>
          <User size={24} strokeWidth={isActive('profile') ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">Profile</span>
        </button>

    </div>
  );
};

export default Navigation;