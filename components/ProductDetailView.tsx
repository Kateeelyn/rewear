
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Heart, Share2, MessageCircle } from 'lucide-react';
import { Product, ViewState } from '../types';
import CheckoutModal from './CheckoutModal';
import ShareModal from './ShareModal';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  setView: (view: ViewState) => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onShareToChat: (product: Product, targetUserId: string) => void;
  recentChats: { userId: string, userName: string, avatar: string }[];
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onBack, setView, isLiked, onToggleLike, onShareToChat, recentChats }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];
  
  // Modal States
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'rent' | 'buy'>('rent');
  const [showShare, setShowShare] = useState(false);

  const handleChatClick = () => {
      if (product.seller) {
          setView({ type: 'chat-detail', userId: product.seller.id, userName: product.seller.name });
      }
  };

  const startCheckout = (type: 'rent' | 'buy') => {
      setCheckoutType(type);
      setShowCheckout(true);
  };

  return (
    <div className="bg-white min-h-screen pb-6 relative z-50 flex flex-col font-sans">
      
      {/* Sticky Header Buttons */}
      <div className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 pointer-events-none">
         <button 
            onClick={onBack} 
            className="pointer-events-auto w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 shadow-sm text-gray-900 hover:bg-gray-50 transition-colors"
        >
            <ArrowLeft size={20} />
        </button>
        <div className="flex space-x-2 pointer-events-auto">
             <button 
                onClick={() => onToggleLike(product.id)}
                className={`w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 shadow-sm transition-all active:scale-90 ${isLiked ? 'text-red-500 fill-red-500 bg-red-50 border-red-100' : 'text-gray-900 hover:text-red-500'}`}
             >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            </button>
            <button 
                onClick={() => setShowShare(true)}
                className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 shadow-sm text-gray-900 hover:bg-gray-50 transition-colors"
            >
                <Share2 size={20} />
            </button>
        </div>
      </div>

      {/* Image Carousel (Full Width) */}
      <div className="relative h-[450px] bg-gray-100 -mt-[72px]">
        <img src={images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
        
        {/* Minimal Dots */}
        {images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
                {images.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${activeImage === idx ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-8 relative bg-white -mt-4 rounded-t-3xl flex-1 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.brand}</h2>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>
            </div>
            <div className="flex flex-col items-end pt-1">
                 {(product.rentPrice > 0) && <span className="text-lg font-bold text-ecoOlive">${product.rentPrice}<span className="text-xs text-gray-400 font-normal">/day</span></span>}
                 {(product.buyPrice > 0) && <span className="text-sm font-medium text-gray-900">Buy: ${product.buyPrice}</span>}
            </div>
        </div>

        {/* Specs */}
        <div className="flex items-center space-x-6 text-sm text-gray-900 mb-8 border-y border-gray-100 py-4">
            {product.size && <span className="font-medium">Size: <span className="text-gray-500">{product.size}</span></span>}
            {product.condition && <span className="font-medium">Condition: <span className="text-gray-500">{product.condition}</span></span>}
            {product.location && (
                <div className="flex items-center text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span className="truncate max-w-[100px]">{product.location}</span>
                </div>
            )}
        </div>

        {/* Description */}
        <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-900 mb-2">About this item</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
                {product.description || "No description provided."}
            </p>
        </div>

        {/* Minimal Seller Profile */}
        {product.seller && (
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-3">
                    <img src={product.seller.avatar} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{product.seller.name}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                             <span>★ {product.seller.rating}</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleChatClick}
                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors"
                >
                    <MessageCircle size={18} />
                </button>
            </div>
        )}

        {/* Action Buttons - High Contrast with Green Theme - Increased bottom padding */}
        <div className="flex space-x-3 mt-auto pb-12">
          {product.rentPrice > 0 && (
              <button 
                onClick={() => startCheckout('rent')}
                className="flex-1 bg-ecoGreen text-white py-4 rounded-full font-bold text-sm hover:bg-ecoOlive transition-colors shadow-lg shadow-ecoGreen/20"
              >
                Rent Now
              </button>
          )}
          {product.buyPrice > 0 && (
              <button 
                onClick={() => startCheckout('buy')}
                className={`flex-1 py-4 rounded-full font-bold text-sm border transition-colors ${product.rentPrice === 0 ? 'bg-ecoGreen text-white border-transparent' : 'bg-white text-ecoGreen border-ecoGreen hover:bg-gray-50'}`}
              >
                Buy Now
              </button>
          )}
        </div>

      </div>

      {/* Checkout Modal */}
      {showCheckout && (
          <CheckoutModal 
            product={product} 
            type={checkoutType} 
            onClose={() => setShowCheckout(false)} 
            onConfirm={() => {
                setShowCheckout(false);
                onBack();
            }}
          />
      )}

      {/* Share Modal */}
      {showShare && (
          <ShareModal 
            product={product}
            recentChats={recentChats}
            onClose={() => setShowShare(false)}
            onShareToChat={(targetUserId) => {
                onShareToChat(product, targetUserId);
                setShowShare(false);
            }}
          />
      )}

    </div>
  );
};

export default ProductDetailView;
