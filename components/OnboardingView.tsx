
import React, { useState } from 'react';
import { ArrowRight, User, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingViewProps {
  onComplete: (profile: UserProfile) => void;
}

// Using DiceBear API for reliable cartoon avatars
const AVATARS = [
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Max',
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Zoe',
];

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
        alert("Username must be at least 3 characters.");
        return;
    }
    
    onComplete({
        username: username,
        avatarUrl: selectedAvatar,
        level: 'Newbie',
        points: 100
    });
  };

  return (
    <div className="h-full bg-ecoPaleGreen flex flex-col p-6 font-sans animate-in slide-in-from-right duration-500 overflow-hidden">
      <div className="pt-12 pb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-ecoBlack mb-2">Setup Profile</h1>
        <p className="text-gray-500 text-sm">Create your identity on ReWear.</p>
      </div>

      <div className="flex-1 flex flex-col justify-start pt-8 space-y-10 overflow-y-auto no-scrollbar">
        
        {/* Avatar Selection */}
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Choose Avatar</label>
            <div className="flex justify-between px-2 gap-4">
                {AVATARS.map((avatar, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`relative w-16 h-16 rounded-full bg-white shadow-sm cursor-pointer transition-all duration-200 ${selectedAvatar === avatar ? 'ring-4 ring-ecoGreen ring-offset-2 scale-110 z-10' : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0'}`}
                    >
                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover p-1" />
                        {selectedAvatar === avatar && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-ecoGreen rounded-full flex items-center justify-center border-2 border-white">
                                <Check className="text-white" size={12} strokeWidth={3} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Username Input */}
        <div>
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Username</label>
             <div className="relative">
                 <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    className="w-full bg-white border border-gray-100 rounded-xl py-4 px-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-ecoGreen/20 shadow-sm transition-all"
                 />
                 <User className="absolute left-3 top-4 text-gray-400" size={20} />
             </div>
        </div>

      </div>

      {/* Button fixed at the bottom of the container with increased safe padding */}
      <div className="pt-6 pb-20 flex-shrink-0">
        <button 
            onClick={handleSubmit}
            className="w-full bg-ecoBlack text-white font-bold py-4 rounded-xl shadow-lg shadow-black/10 flex items-center justify-center hover:bg-gray-800 transition-colors transform active:scale-[0.98]"
        >
            Get Started <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;
