
import React from 'react';
import { ArrowLeft, MapPin, ExternalLink, Check } from 'lucide-react';
import { Charity, ViewState } from '../types';

interface CharityDetailViewProps {
  charity: Charity;
  onBack: () => void;
  setView: (view: ViewState) => void;
}

const CharityDetailView: React.FC<CharityDetailViewProps> = ({ charity, onBack, setView }) => {
  return (
    <div className="bg-white min-h-screen pb-28 animate-in slide-in-from-bottom duration-300 relative z-50 font-sans">
      
      {/* Header Image */}
      <div className="relative h-72">
        <div className="absolute inset-0 bg-black/20 z-10" />
         <button 
            onClick={onBack} 
            className="absolute top-12 left-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
            <ArrowLeft size={20} />
        </button>
        <img src={charity.imageUrl} alt={charity.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pt-32 z-20">
            <h1 className="text-3xl font-bold text-white mb-2">{charity.name}</h1>
            <p className="text-white/80 text-sm flex items-center font-medium">
                <MapPin size={14} className="mr-1.5" />
                {charity.address}
            </p>
        </div>
      </div>

      <div className="px-6 py-10">
        
        {/* Mission Quote */}
        <div className="mb-10 pl-4 border-l-2 border-ecoOlive">
            <p className="text-xl italic text-gray-900 leading-relaxed">"{charity.mission}"</p>
        </div>

        {/* Description */}
        <div className="mb-10">
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">About Us</h2>
             <p className="text-sm text-gray-600 leading-loose">
                 {charity.description}
             </p>
        </div>

        {/* Accepts */}
        <div className="mb-10">
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Accepting</h2>
             <div className="space-y-2">
                {charity.accepts.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-800">
                        <Check size={14} className="text-ecoOlive mr-3" />
                        {item}
                    </div>
                ))}
             </div>
        </div>

        {/* Action */}
        <button 
            onClick={() => setView({ type: 'donation', charityId: charity.id })}
            className="w-full bg-ecoBlack text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-colors mb-4"
        >
            Start Donation
        </button>
        
        <button className="w-full text-gray-500 text-xs font-medium flex items-center justify-center py-2 hover:text-gray-900 transition-colors">
            Visit Website <ExternalLink size={12} className="ml-1" />
        </button>

      </div>
    </div>
  );
};

export default CharityDetailView;
