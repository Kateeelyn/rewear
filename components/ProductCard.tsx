import React from 'react';
import { Product } from '../types';
import { MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean; // For recently viewed
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false, onClick }) => {
  
  if (product.type === 'donation') {
    return (
      <div onClick={onClick} className="group min-w-[140px] w-[140px] cursor-pointer">
        <div className="h-32 overflow-hidden relative rounded-lg bg-gray-100">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div className="absolute top-2 left-2 z-20 bg-ecoBlack text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
            Give
          </div>
        </div>
        <div className="pt-2">
          <h3 className="text-xs font-bold text-gray-900 truncate">{product.title}</h3>
          <p className="text-[10px] text-gray-400 truncate mt-0.5">{product.brand}</p>
        </div>
      </div>
    );
  }

  // Rent/Buy or Standard Card
  return (
    <div onClick={onClick} className={`group cursor-pointer ${compact ? 'min-w-[120px] w-[120px]' : 'w-full'}`}>
      {/* Image */}
      <div className={`${compact ? 'h-36' : 'h-52'} overflow-hidden relative rounded-lg bg-gray-100`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Minimal Location Badge */}
        {!compact && product.location && (
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
               <div className="flex items-center gap-1 text-white/90 text-[10px] font-medium">
                  <MapPin size={10} />
                  <span className="truncate">{product.location}</span>
               </div>
           </div>
        )}
      </div>

      {/* Info - Clean Typography */}
      <div className="pt-3">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xs font-semibold text-gray-900 truncate pr-2">{product.title}</h3>
                <p className="text-[10px] text-gray-500 truncate">{product.brand}</p>
            </div>
        </div>
        
        <div className="flex items-center gap-3 mt-1.5">
            {(product.rentPrice > 0) && (
                <span className="text-xs font-bold text-ecoOlive">
                    ${product.rentPrice}<span className="text-[9px] font-normal text-gray-400">/day</span>
                </span>
            )}
            {(product.buyPrice > 0) && (
                <span className="text-xs font-medium text-gray-900">
                    ${product.buyPrice}
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;