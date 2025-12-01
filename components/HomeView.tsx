import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product, ViewState } from '../types';
import { getRecycleTip } from '../services/geminiService';

interface HomeViewProps {
  setView: (view: ViewState) => void;
  products: Product[];
}

const HomeView: React.FC<HomeViewProps> = ({ setView, products }) => {
  const [tip, setTip] = useState<string>("Loading sustainability tip...");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTip = async () => {
      const newTip = await getRecycleTip();
      setTip(newTip);
    };
    fetchTip();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = products.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, products]);

  // Filter products for sections
  const recentProducts = products.slice(0, 4);
  const rentBuyProducts = products.filter(p => p.type === 'rent-buy' || p.type === 'rent' || p.type === 'buy');
  const donationProducts = products.filter(p => p.type === 'donation');

  const handleProductClick = (p: Product) => {
      if (p.type === 'donation' && p.charityId) {
          setView({ type: 'charity-detail', charityId: p.charityId });
      } else {
          setView({ type: 'product-detail', productId: p.id });
      }
  };

  return (
    <div className="pb-28 bg-ecoPaleGreen min-h-screen animate-in fade-in duration-500">
      
      {/* Minimal Header */}
      <div className="pt-14 pb-4 px-6 sticky top-0 z-30 flex justify-between items-center bg-ecoPaleGreen/95 backdrop-blur-sm">
        <h1 className="text-xl font-bold tracking-tight text-ecoBlack">ReWear.</h1>
        <div 
          onClick={() => setView('profile')}
          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer border border-transparent hover:border-ecoGreen transition-colors"
        >
            <span className="text-xs font-bold text-ecoGreen">EW</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search clothes, brands..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder:text-gray-400 rounded-2xl py-3 px-10 text-sm focus:outline-none focus:ring-1 focus:ring-ecoGreen transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="px-6 space-y-10">
        
        {/* Search Results View */}
        {searchQuery ? (
          <div className="min-h-[60vh]">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Results for "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-8">
                {searchResults.map(p => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        onClick={() => handleProductClick(p)}
                    />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p>No items found.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* AI Tip - Minimal Toast */}
            <div className="flex items-start space-x-3 p-4 bg-white/60 rounded-2xl border border-white shadow-sm backdrop-blur-sm">
               <Sparkles size={16} className="text-ecoOlive shrink-0 mt-0.5" />
               <p className="text-xs text-gray-600 leading-relaxed font-medium">
                 {tip}
               </p>
            </div>

            {/* Recently Viewed */}
            <div>
              <div 
                className="flex justify-between items-end mb-5 cursor-pointer group"
                onClick={() => setView('list-recent')}
              >
                <h2 className="text-lg font-bold text-gray-900">Recently viewed</h2>
                <span className="text-xs font-medium text-gray-500 flex items-center group-hover:text-ecoBlack transition-colors">
                  View all <ArrowRight size={12} className="ml-1" />
                </span>
              </div>
              <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar -mx-6 px-6">
                {recentProducts.map(p => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        compact={true} 
                        onClick={() => handleProductClick(p)}
                    />
                ))}
              </div>
            </div>

            {/* Renting/Buying */}
            <div>
              <div 
                className="flex justify-between items-end mb-5 cursor-pointer group"
                onClick={() => setView('list-rent-buy')}
              >
                <h2 className="text-lg font-bold text-gray-900">Curated For You</h2>
                <span className="text-xs font-medium text-gray-500 flex items-center group-hover:text-ecoBlack transition-colors">
                  Explore <ArrowRight size={12} className="ml-1" />
                </span>
              </div>
              <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar -mx-6 px-6">
                 {rentBuyProducts.map(p => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        onClick={() => handleProductClick(p)}
                    />
                ))}
              </div>
            </div>

             {/* Donation */}
             <div className="pb-8">
              <div 
                className="flex justify-between items-end mb-5 cursor-pointer group"
                onClick={() => setView('list-donation')}
              >
                <h2 className="text-lg font-bold text-gray-900">Give Back</h2>
                 <span className="text-xs font-medium text-gray-500 flex items-center group-hover:text-ecoBlack transition-colors">
                  Charities <ArrowRight size={12} className="ml-1" />
                </span>
              </div>
              <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar -mx-6 px-6">
                {donationProducts.map(p => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        onClick={() => handleProductClick(p)}
                    />
                ))}
              </div>
            </div>

            {/* Minimal Footer Links */}
            <div className="border-t border-ecoGreen/10 pt-8 space-y-4">
                <button className="w-full text-left text-xs font-medium text-gray-500 hover:text-ecoBlack transition-colors">
                    Help & Support
                </button>
                <button className="w-full text-left text-xs font-medium text-gray-500 hover:text-ecoBlack transition-colors">
                    Community Guidelines
                </button>
                <button className="w-full text-left text-xs font-medium text-gray-500 hover:text-ecoBlack transition-colors">
                    Terms of Service
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeView;