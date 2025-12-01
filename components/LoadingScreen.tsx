import React from 'react';
import { Shirt } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-ecoCream z-[100] flex flex-col items-center justify-center animate-out fade-out duration-700 fill-mode-forwards delay-[2000ms]">
      <div className="relative mb-6">
        <Shirt size={80} strokeWidth={1.5} className="text-ecoGreen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ecoOrange rounded-full shadow-lg"></div>
      </div>
      <h1 className="text-4xl font-bold text-ecoOrange font-sans mb-2 tracking-tight">ReWear</h1>
      <p className="text-ecoGreen font-medium text-sm tracking-wider uppercase">Rent, Sell, Donate</p>
      <p className="text-gray-400 text-xs mt-1">Keep fashion in the LOOP</p>
    </div>
  );
};

export default LoadingScreen;