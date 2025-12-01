import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ListViewProps {
  type: 'recent' | 'rent-buy' | 'donation' | 'my-listings' | 'my-orders';
  onBack: () => void;
  onItemClick: (product: Product) => void;
  products: Product[];
}

const ListView: React.FC<ListViewProps> = ({ type, onBack, onItemClick, products }) => {
  let title = '';
  let displayProducts: Product[] = [];

  switch (type) {
    case 'recent':
      title = 'Recently Viewed';
      displayProducts = products.slice(0, 6); 
      break;
    case 'rent-buy':
      title = 'Marketplace';
      displayProducts = products.filter(p => p.type !== 'donation');
      break;
    case 'donation':
      title = 'Donation Centers';
      displayProducts = products.filter(p => p.type === 'donation');
      break;
    case 'my-listings':
      title = 'My Listings';
      // Filter for current user (u1)
      displayProducts = products.filter(p => p.seller?.id === 'u1');
      break;
    case 'my-orders':
      title = 'My Orders';
      displayProducts = products.slice(3, 6);
      break;
  }

  return (
    <div className="pb-28 bg-ecoPaleGreen min-h-screen animate-in slide-in-from-right duration-300 font-sans">
      {/* Minimal Header */}
      <div className="bg-ecoPaleGreen/95 backdrop-blur-sm pt-14 pb-4 px-4 sticky top-0 z-30 flex items-center border-b border-ecoGreen/10">
        <button 
            onClick={onBack} 
            className="p-2 hover:bg-white/50 rounded-full transition-colors mr-2 text-gray-900"
        >
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {displayProducts.map(p => (
                <ProductCard key={p.id} product={p} onClick={() => onItemClick(p)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListView;