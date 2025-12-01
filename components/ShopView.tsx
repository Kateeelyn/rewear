
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product, ViewState, ShopFilters } from '../types';
import { SlidersHorizontal, ChevronUp } from 'lucide-react';

interface ShopViewProps {
    setView: (view: ViewState) => void;
    products: Product[];
}

const ShopView: React.FC<ShopViewProps> = ({ setView, products }) => {
  const [activeTab, setActiveTab] = useState<'rent' | 'buy'>('rent');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ShopFilters>({
      maxPrice: 200,
      brand: '',
      distance: 10
  });

  const applyFilters = (p: Product) => {
      // 1. Price Filter
      const price = activeTab === 'rent' ? p.rentPrice : p.buyPrice;
      if (price > filters.maxPrice) return false;

      // 2. Brand Filter
      if (filters.brand && !p.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;

      // 3. Distance (Mocked - In real app calculate from p.location)
      if (filters.distance < 5 && p.location !== 'Campus') return true; 

      return true;
  };

  const filteredProducts = products.filter(p => {
      if (activeTab === 'rent' && (p.type === 'rent' || p.type === 'rent-buy')) return applyFilters(p);
      if (activeTab === 'buy' && (p.type === 'buy' || p.type === 'rent-buy')) return applyFilters(p);
      return false;
  });

  const handleItemClick = (p: Product) => {
      setView({ type: 'product-detail', productId: p.id });
  };

  return (
    <div className="pb-28 bg-ecoPaleGreen min-h-screen animate-in fade-in slide-in-from-right duration-300 relative font-sans">
      
      {/* Header with Text Tabs */}
      <div className="bg-ecoPaleGreen pt-14 pb-0 px-6 sticky top-0 z-30 border-b border-ecoGreen/10 shadow-sm relative">
        <div className="flex justify-between items-center mb-4">
             <h1 className="text-xl font-bold text-ecoBlack">Marketplace</h1>
             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`text-xs font-bold flex items-center gap-1 transition-colors px-3 py-1.5 rounded-full ${showFilters ? 'bg-ecoGreen text-white' : 'text-ecoBlack hover:bg-white/50'}`}
            >
                <SlidersHorizontal size={14} /> Filter
            </button>
        </div>
        
        <div className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('rent')}
            className={`pb-3 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'rent' ? 'text-ecoBlack' : 'text-gray-400'
            }`}
          >
            Rent
            {activeTab === 'rent' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ecoGreen rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('buy')}
            className={`pb-3 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'buy' ? 'text-ecoBlack' : 'text-gray-400'
            }`}
          >
            Buy
            {activeTab === 'buy' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ecoGreen rounded-full" />}
          </button>
        </div>
      </div>

      {/* Top-Down Filter Dropdown */}
      {showFilters && (
          <div className="sticky top-[105px] z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg rounded-b-3xl px-6 py-6 animate-in slide-in-from-top duration-300 origin-top">
               <div className="space-y-6">
                    {/* Price */}
                    <div>
                        <label className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                            <span>Max Price</span>
                            <span className="text-ecoGreen">${filters.maxPrice}</span>
                        </label>
                        <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                        className="w-full accent-ecoGreen h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2">Brand</label>
                        <input 
                        type="text" 
                        placeholder="e.g. Nike, Zara"
                        value={filters.brand}
                        onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-ecoGreen"
                        />
                    </div>

                    {/* Distance */}
                    <div>
                        <label className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                            <span>Distance</span>
                            <span className="text-ecoGreen">{filters.distance} miles</span>
                        </label>
                        <input 
                        type="range" 
                        min="1" 
                        max="50" 
                        value={filters.distance}
                        onChange={(e) => setFilters(prev => ({ ...prev, distance: Number(e.target.value) }))}
                        className="w-full accent-ecoGreen h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                     <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                         <ChevronUp size={20} />
                     </button>
                </div>
          </div>
      )}

      <div className="px-6 pt-6">
        <div className="mb-4 flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {filteredProducts.length} Results
            </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-8">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} onClick={() => handleItemClick(p)} />)}
        </div>
      </div>
    </div>
  );
};

export default ShopView;
