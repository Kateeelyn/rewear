
import React, { useState } from 'react';
import { X, MessageCircle, Mail, Smartphone, Instagram, Link, Check, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ShareModalProps {
  product: Product;
  onClose: () => void;
  onShareToChat: (targetUserId: string) => void;
  recentChats: { userId: string, userName: string, avatar: string }[];
}

const ShareModal: React.FC<ShareModalProps> = ({ product, onClose, onShareToChat, recentChats }) => {
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'options' | 'select-user'>('options');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://rewear.app/product/${product.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      label: 'ReWear Chat', 
      icon: <MessageCircle size={24} />, 
      color: 'bg-ecoGreen text-white', 
      action: () => setStep('select-user')
    },
    { 
      label: 'Messages', 
      icon: <Smartphone size={24} />, 
      color: 'bg-green-100 text-green-600',
      action: () => window.open(`sms:?body=Check out this ${product.title} on ReWear!`)
    },
    { 
      label: 'Email', 
      icon: <Mail size={24} />, 
      color: 'bg-blue-100 text-blue-600',
      action: () => window.open(`mailto:?subject=Check out this item&body=I found this ${product.title} on ReWear and thought you might like it.`)
    },
    { 
      label: 'Instagram', 
      icon: <Instagram size={24} />, 
      color: 'bg-pink-100 text-pink-600',
      action: () => alert("Opening Instagram Stories...")
    },
  ];

  return (
    <div className="absolute inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end animate-in fade-in duration-200">
      {/* Increased bottom padding to pb-14 */}
      <div className="w-full bg-white rounded-t-3xl p-6 pb-14 animate-in slide-in-from-bottom duration-300 shadow-2xl overflow-hidden h-auto max-h-[80vh]">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {step === 'select-user' && (
                <button onClick={() => setStep('options')} className="p-1 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
            )}
            <h3 className="text-lg font-bold text-ecoBlack">{step === 'options' ? 'Share to' : 'Send to...'}</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Product Preview Snippet */}
        <div className="flex items-center gap-3 mb-8 bg-gray-50 p-3 rounded-2xl border border-gray-100">
             <img src={product.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="product" />
             <div>
                 <p className="text-sm font-bold text-gray-900">{product.title}</p>
                 <p className="text-xs text-gray-500">@{product.brand}</p>
             </div>
        </div>

        {step === 'options' ? (
             <>
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {shareOptions.map((opt, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={opt.action}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-active:scale-95 ${opt.color}`}>
                                {opt.icon}
                            </div>
                            <span className="text-[10px] font-medium text-gray-600 text-center">{opt.label}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleCopyLink}
                    className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-2xl transition-colors font-medium text-sm text-gray-700"
                >
                    <span className="flex items-center gap-2">
                        <Link size={18} /> Copy Link
                    </span>
                    {copied ? <span className="text-ecoGreen text-xs font-bold flex items-center gap-1"><Check size={14}/> Copied</span> : null}
                </button>
             </>
        ) : (
            <div className="space-y-3 pb-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Contacts</h4>
                {recentChats.map(chat => (
                    <div 
                        key={chat.userId} 
                        onClick={() => onShareToChat(chat.userId)}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <img src={chat.avatar} className="w-10 h-10 rounded-full bg-gray-100" />
                            <span className="text-sm font-bold text-gray-800">{chat.userName}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-ecoGreen/10 flex items-center justify-center text-ecoGreen">
                            <MessageCircle size={16} />
                        </div>
                    </div>
                ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default ShareModal;
