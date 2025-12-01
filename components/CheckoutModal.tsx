
import React, { useState } from 'react';
import { Product } from '../types';
import { X, CheckCircle, CreditCard, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  product: Product;
  type: 'rent' | 'buy';
  onClose: () => void;
  onConfirm: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, type, onClose, onConfirm }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [days, setDays] = useState(3);
  
  const total = type === 'rent' ? product.rentPrice * days : product.buyPrice;
  const serviceFee = total * 0.05;
  const grandTotal = total + serviceFee;

  const handlePay = () => {
      setStep('processing');
      setTimeout(() => {
          setStep('success');
      }, 2000);
  };

  // Success Step
  if (step === 'success') {
      return (
        <div className="absolute inset-0 z-[60] bg-white flex flex-col items-center justify-center p-6 animate-in fade-in">
             <div className="w-20 h-20 bg-ecoGreen rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-ecoGreen/20">
                <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-ecoBlack mb-2">Payment Successful!</h2>
            <p className="text-gray-500 text-center mb-8">
                You have successfully {type === 'rent' ? 'rented' : 'purchased'} <strong>{product.title}</strong>.
                <br/>The seller has been notified.
            </p>
            <button onClick={onConfirm} className="w-full bg-ecoBlack text-white font-bold py-4 rounded-xl">
                Done
            </button>
        </div>
      );
  }

  // Checkout Form
  return (
    <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in">
      {/* Added pb-12 for mobile safety area */}
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 pb-12 sm:pb-6 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-ecoBlack">Checkout</h2>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X size={18} />
            </button>
        </div>

        {/* Product Summary */}
        <div className="flex items-center space-x-4 mb-6 bg-gray-50 p-3 rounded-2xl">
            <img src={product.imageUrl} className="w-16 h-16 rounded-xl object-cover" />
            <div>
                <h3 className="text-sm font-bold text-gray-900">{product.title}</h3>
                <p className="text-xs text-gray-500">{product.brand}</p>
            </div>
        </div>

        {/* Rent Duration Input */}
        {type === 'rent' && (
            <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Rental Duration</label>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setDays(Math.max(1, days - 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center font-bold text-lg">-</button>
                    <span className="text-lg font-bold text-ecoBlack">{days} Days</span>
                    <button onClick={() => setDays(days + 1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center font-bold text-lg">+</button>
                </div>
            </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 mb-8 border-t border-dashed border-gray-200 pt-4">
            <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
                <span>Service Fee (5%)</span>
                <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-ecoBlack pt-2">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </div>
        </div>

        {/* Payment Button */}
        <button 
            onClick={handlePay}
            disabled={step === 'processing'}
            className="w-full bg-ecoBlack text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-black/10"
        >
            {step === 'processing' ? (
                <div className="flex items-center">
                    <Loader2 className="animate-spin mr-2" size={20} /> Processing...
                </div>
            ) : (
                 <div className="flex items-center">
                    Pay Now <CreditCard className="ml-2" size={18} />
                </div>
            )}
        </button>

      </div>
    </div>
  );
};

export default CheckoutModal;
