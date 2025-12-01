
import React, { useState, useRef } from 'react';
import { ArrowLeft, Plus, X, CheckCircle } from 'lucide-react';
import { CHARITIES } from '../data/mockData';

interface DonationViewProps {
  charityId: string;
  onBack: () => void;
  onComplete: () => void;
}

const DonationView: React.FC<DonationViewProps> = ({ charityId, onBack, onComplete }) => {
  const charity = CHARITIES.find(c => c.id === charityId);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [itemType, setItemType] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
          if (reader.result) {
            setImages(prev => [...prev, reader.result as string]);
          }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0 || !description) {
        alert("Please add a photo and description.");
        return;
    }
    // Simulate API submission
    setTimeout(() => {
        setStep('success');
    }, 1000);
  };

  if (!charity) return null;

  if (step === 'success') {
      return (
        <div className="min-h-screen bg-ecoPaleGreen flex flex-col items-center justify-center p-8 animate-in fade-in">
            <div className="w-20 h-20 bg-ecoGreen rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-ecoGreen/20">
                <CheckCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold text-center text-ecoBlack mb-2">Thank You!</h1>
            <p className="text-gray-600 text-center mb-8">
                Your donation request has been sent to <span className="font-bold">{charity.name}</span>. They will contact you shortly with drop-off instructions.
            </p>
            <button 
                onClick={onComplete}
                className="w-full bg-ecoBlack text-white font-bold py-4 rounded-full"
            >
                Back to Home
            </button>
        </div>
      );
  }

  return (
    <div className="bg-ecoPaleGreen min-h-screen pb-28 font-sans animate-in slide-in-from-right">
      <div className="pt-14 pb-4 px-6 flex items-center border-b border-ecoGreen/10 bg-ecoPaleGreen sticky top-0 z-30">
        <button onClick={onBack} className="p-2 hover:bg-white/50 rounded-full mr-2">
            <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Donate to {charity.name}</h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Image Upload */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Item Photos</label>
                <div className="flex overflow-x-auto space-x-3 pb-2 no-scrollbar">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 flex-shrink-0 border-2 border-dashed border-ecoGreen/30 rounded-2xl flex flex-col items-center justify-center bg-white/50 hover:bg-white/80 transition-colors cursor-pointer text-gray-500"
                    >
                        <input type="file" ref={fileInputRef} onChange={handleImageSelect} className="hidden" accept="image/*" />
                        <Plus size={20} className="text-ecoGreen mb-1" />
                        <span className="text-[10px] font-medium">Add</span>
                    </div>
                    {images.map((img, idx) => (
                        <div key={idx} className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-white">
                            <img src={img} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
                <input 
                    type="text" 
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    placeholder="What are you donating? (e.g. Winter Coat)" 
                    className="w-full bg-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ecoGreen"
                />
                
                <textarea 
                    rows={4} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe condition and quantity..." 
                    className="w-full bg-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ecoGreen resize-none"
                />
            </div>

            <div className="bg-ecoGreen/10 p-4 rounded-xl">
                <h3 className="text-xs font-bold text-ecoGreen mb-1">Impact Note</h3>
                <p className="text-[10px] text-gray-600">
                    By donating this item, you are diverting waste from landfills and supporting the "{charity.mission}" mission.
                </p>
            </div>

            <button 
                type="submit"
                className="w-full bg-ecoGreen text-white font-bold py-4 rounded-full shadow-lg shadow-ecoGreen/20 hover:bg-ecoOlive transition-colors"
            >
                Submit Donation
            </button>

        </form>
      </div>
    </div>
  );
};

export default DonationView;
