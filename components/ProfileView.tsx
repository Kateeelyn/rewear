
import React from 'react';
import { Settings, Plus, Hexagon, ChevronRight, Heart } from 'lucide-react';
import { Product, ViewState, UserProfile } from '../types';

interface ProfileViewProps {
    setView: (view: ViewState) => void;
    products: Product[];
    userProfile: UserProfile;
    likedProductIds: string[];
}

const BadgeIcon: React.FC<{ color: string }> = ({ color }) => (
  <div className="relative w-10 h-10 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
    <Hexagon className={`text-${color}-500 fill-${color}-500/20`} size={40} strokeWidth={1.5} />
  </div>
);

const ProfileView: React.FC<ProfileViewProps> = ({ setView, products, userProfile, likedProductIds }) => {
  
  // Filter products for the current user (Mock ID: u1)
  const myListings = products.filter(p => p.seller?.id === 'u1');
  const myOrders = products.slice(2, 5); // Static mock for now
  
  // Dynamic My Likes
  const myLikes = products.filter(p => likedProductIds.includes(p.id));

  const handleItemClick = (p: Product) => {
    setView({ type: 'product-detail', productId: p.id });
  };

  return (
    <div className="pb-28 bg-ecoPaleGreen min-h-screen font-sans">
        
      {/* Clean Header */}
      <div className="pt-14 px-6 mb-6 flex justify-between items-start">
         <div className="w-20 h-20 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden relative">
             <img src={userProfile.avatarUrl} alt="User" className="w-full h-full object-cover" />
        </div>
        <button 
            onClick={() => setView('settings')}
            className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-sm"
        >
            <Settings size={20} className="text-gray-800" />
        </button>
      </div>

      <div className="px-6 mb-8">
         <h1 className="text-2xl font-bold text-ecoBlack mb-1">{userProfile.username}</h1>
         <p className="text-sm text-gray-500">@{userProfile.username.toLowerCase().replace(/\s/g, '')}</p>
         
         {/* Stats Row */}
         <div className="flex space-x-8 mt-6 pb-6 border-b border-ecoGreen/10">
             <div>
                 <span className="block text-lg font-bold text-ecoBlack">{userProfile.points}</span>
                 <span className="text-xs text-gray-500 font-medium">Points</span>
             </div>
             <div>
                 <span className="block text-lg font-bold text-ecoBlack">{userProfile.level}</span>
                 <span className="text-xs text-gray-500 font-medium">Status</span>
             </div>
             <div>
                 <span className="block text-lg font-bold text-ecoBlack">{myListings.length + 5}</span>
                 <span className="text-xs text-gray-500 font-medium">Impact</span>
             </div>
         </div>
      </div>

      <div className="px-6 space-y-10">
        
        {/* Badges - Minimal */}
        <div>
            <h2 className="text-sm font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="flex gap-4 opacity-80">
                <BadgeIcon color="green" />
                <BadgeIcon color="purple" />
                <BadgeIcon color="blue" />
            </div>
        </div>
        
        {/* Sections as Clean Lists */}
        
        {/* Likes */}
        <div>
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                     Saved Items <span className="text-gray-400 font-normal text-xs">({myLikes.length})</span>
                 </h2>
            </div>
            
            {myLikes.length > 0 ? (
                <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                    {myLikes.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => handleItemClick(p)}
                            className="w-20 h-20 rounded-2xl overflow-hidden bg-white cursor-pointer border border-white shadow-sm flex-shrink-0"
                        >
                            <img src={p.imageUrl} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full py-8 bg-white/40 rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                    <Heart size={20} className="mb-2 opacity-50" />
                    <p className="text-xs font-medium">No saved items yet.</p>
                </div>
            )}
        </div>

        {/* Listings - Dynamic */}
        <div>
            <div 
                className="flex justify-between items-center mb-4 cursor-pointer group"
                onClick={() => setView('list-my-listings')}
            >
                <h2 className="text-sm font-bold text-gray-900 group-hover:underline">Active Listings ({myListings.length})</h2>
                <ChevronRight size={14} className="text-gray-400" />
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                <button onClick={() => setView('upload')} className="w-24 h-32 rounded-2xl border-2 border-ecoGreen/20 border-dashed flex flex-col items-center justify-center text-ecoGreen flex-shrink-0 hover:bg-white/50 transition-colors">
                    <Plus size={20} />
                    <span className="text-[10px] font-medium mt-1">Add New</span>
                </button>
                {myListings.map(l => (
                    <div 
                        key={l.id} 
                        onClick={() => handleItemClick(l)}
                        className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative bg-white cursor-pointer shadow-sm"
                    >
                        <img src={l.imageUrl} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>

        {/* Orders */}
        <div>
            <div 
                className="flex justify-between items-center mb-4 cursor-pointer group"
                onClick={() => setView('list-my-orders')}
            >
                <h2 className="text-sm font-bold text-gray-900 group-hover:underline">Past Orders</h2>
                <ChevronRight size={14} className="text-gray-400" />
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                {myOrders.map(o => (
                     <div 
                        key={o.id} 
                        onClick={() => handleItemClick(o)}
                        className="w-20 h-20 rounded-2xl overflow-hidden bg-white cursor-pointer border border-white shadow-sm flex-shrink-0"
                    >
                        <img src={o.imageUrl} className="w-full h-full object-cover" />
                     </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileView;
