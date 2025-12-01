
import React, { useState, useRef } from 'react';
import { ChevronDown, X, Loader2, Sparkles, Plus } from 'lucide-react';
import { Product } from '../types';
import { verifyBrandImage } from '../services/geminiService';

interface UploadViewProps {
    onPublish: (product: Product) => void;
}

const UploadView: React.FC<UploadViewProps> = ({ onPublish }) => {
  const [listingType, setListingType] = useState<'rent' | 'sell'>('rent');
  
  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  // Image State
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation State
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

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

  const removeImage = (index: number) => {
      setImages(prev => prev.filter((_, i) => i !== index));
  };

  const countWords = (str: string) => {
      return str.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  const handlePublish = async () => {
    setVerificationError(null);

    // 1. Basic Validation
    if (!title || images.length === 0) {
        alert("Please provide at least a title and one photo.");
        return;
    }

    // 2. Word Count Validation
    const wordCount = countWords(description);
    if (wordCount < 40) {
        alert(`Description is too short (${wordCount}/40 words). Please describe the item in more detail.`);
        return;
    }

    // 3. AI Brand Verification (Only for Sell/Rent if Brand is specified)
    if (brand) {
        setIsVerifying(true);
        let brandFound = false;
        
        // Check all images until we find the brand
        for (const img of images) {
            const isMatch = await verifyBrandImage(img, brand);
            if (isMatch) {
                brandFound = true;
                break;
            }
        }

        setIsVerifying(false);

        if (!brandFound) {
            setVerificationError(`AI Verification Failed: We couldn't detect the brand "${brand}" in your photos. Please upload a photo clearly showing the brand tag or logo.`);
            return;
        }
    }

    // 4. Publish
    const newProduct: Product = {
        id: Date.now().toString(),
        title: title,
        brand: brand || 'Unknown',
        rentPrice: listingType === 'rent' ? Number(price) : 0,
        buyPrice: listingType === 'sell' ? Number(price) : 0,
        imageUrl: images[0],
        gallery: images,
        type: listingType === 'rent' ? 'rent' : 'buy',
        category: category || 'Other',
        location: 'My Location',
        description: description,
        condition: 'Good',
        size: 'M',
        seller: {
            id: 'u1', // Current User ID
            name: 'Sarah Jenkins',
            rating: 5.0,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
        }
    };

    onPublish(newProduct);
  };

  const wordCount = countWords(description);

  return (
    <div className="pb-32 bg-ecoPaleGreen min-h-screen animate-in fade-in duration-300 font-sans">
      <div className="pt-14 pb-4 px-6 mb-4">
        <h1 className="text-xl font-bold text-ecoBlack">List Item</h1>
      </div>

      <div className="px-6 space-y-8">
        
        {/* Type Selector */}
        <div className="flex border-b border-ecoGreen/20">
            {['rent', 'sell'].map((type) => (
                <button 
                    key={type}
                    onClick={() => setListingType(type as any)}
                    className={`flex-1 pb-3 text-sm font-medium capitalize transition-all relative ${
                        listingType === type 
                        ? 'text-ecoBlack' 
                        : 'text-gray-400'
                    }`}
                >
                    {type}
                    {listingType === type && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ecoGreen" />}
                </button>
            ))}
        </div>

        {/* Photo Upload Grid */}
        <div>
            <div className="flex overflow-x-auto space-x-3 pb-4 no-scrollbar">
                {/* Add Button */}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 flex-shrink-0 border-2 border-dashed border-ecoGreen/30 rounded-2xl flex flex-col items-center justify-center bg-white/50 hover:bg-white/80 transition-colors cursor-pointer text-gray-500"
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageSelect} 
                        className="hidden" 
                        accept="image/*"
                    />
                    <div className="w-8 h-8 bg-ecoGreen/10 rounded-full flex items-center justify-center mb-2 text-ecoGreen">
                        <Plus size={18} />
                    </div>
                    <span className="text-xs font-medium">Add Photo</span>
                </div>

                {/* Images */}
                {images.map((img, idx) => (
                    <div key={idx} className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-white">
                        <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                        <button 
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            
            <p className="text-[10px] text-gray-500 mt-2 flex items-start gap-1">
                <Sparkles size={10} className="mt-0.5 text-ecoOlive" />
                <span>AI Check: Please ensure at least one photo clearly shows the brand label/tag for verification.</span>
            </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
            <div className="space-y-1">
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Item Title" 
                    className="w-full border-b border-ecoGreen/20 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-ecoGreen transition-colors bg-transparent" 
                />
            </div>

            <div className="flex gap-6">
                <div className="flex-1">
                    <div className="relative">
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border-b border-ecoGreen/20 py-3 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-ecoGreen appearance-none rounded-none"
                        >
                            <option value="">Category</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Bags">Bags</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-0 top-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                 <div className="flex-1">
                    <input 
                        type="text" 
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Brand (e.g. Zara)" 
                        className="w-full border-b border-ecoGreen/20 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-ecoGreen transition-colors bg-transparent" 
                    />
                </div>
            </div>

            <div className="relative animate-in fade-in flex items-end gap-2">
                <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price" 
                    className="flex-1 border-b border-ecoGreen/20 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-ecoGreen transition-colors bg-transparent" 
                />
                {listingType === 'rent' && (
                    <span className="text-sm text-gray-500 pb-3 font-medium">/ day</span>
                )}
            </div>

            <div>
                <textarea 
                    rows={5} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (Describe condition, material, fit, story...)" 
                    className="w-full border-b border-ecoGreen/20 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-ecoGreen transition-colors bg-transparent resize-none" 
                />
                <div className="flex justify-between mt-1">
                    <span className={`text-[10px] ${wordCount < 40 ? 'text-red-400' : 'text-green-500'}`}>
                        {wordCount} / 40 words min
                    </span>
                    {wordCount < 40 && <span className="text-[10px] text-gray-400">Keep writing!</span>}
                </div>
            </div>
        </div>

        {verificationError && (
             <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-xs text-red-600">
                 {verificationError}
             </div>
        )}

        <button 
            onClick={handlePublish}
            disabled={isVerifying}
            className={`w-full bg-ecoGreen text-white font-bold py-4 rounded-full hover:bg-ecoOlive transition-colors mt-4 shadow-lg shadow-ecoGreen/20 flex items-center justify-center gap-2 ${isVerifying ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {isVerifying && <Loader2 size={18} className="animate-spin" />}
            {isVerifying ? 'Verifying Brand...' : 'Publish Listing'}
        </button>

      </div>
    </div>
  );
};

export default UploadView;
