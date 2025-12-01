
import React, { useState } from 'react';
import { Shirt, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Cornell Email Validation
    const cornellRegex = /^[a-zA-Z0-9._%+-]+@cornell\.edu$/;
    
    if (!cornellRegex.test(email)) {
      setError("Please use a valid @cornell.edu email address.");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Mock OTP Check
    if (otp !== '123456') {
      setError("Invalid verification code. Try '123456'.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ecoPaleGreen flex flex-col items-center justify-center p-6 font-sans animate-in fade-in duration-500">
      
      {/* Brand Header */}
      <div className="mb-12 text-center">
        <div className="relative inline-block mb-4">
          <Shirt size={64} strokeWidth={1.5} className="text-ecoGreen" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-ecoGreen rounded-full border-2 border-ecoPaleGreen"></div>
        </div>
        <h1 className="text-3xl font-bold text-ecoBlack tracking-tight">ReWear.</h1>
        <p className="text-sm text-gray-500 mt-2">Campus Sustainable Fashion</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl shadow-ecoGreen/5">
        
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6 animate-in slide-in-from-right">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Student Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="netid@cornell.edu"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-ecoGreen/20 transition-all"
                autoFocus
              />
            </div>
            
            {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ecoGreen text-white font-bold py-4 rounded-xl hover:bg-ecoOlive transition-colors shadow-lg shadow-ecoGreen/20 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center">Send Verification Code <ArrowRight size={16} className="ml-2" /></span>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in slide-in-from-right">
            <div className="text-center mb-2">
              <p className="text-sm text-gray-500">Code sent to <span className="font-bold text-ecoBlack">{email}</span></p>
              <button type="button" onClick={() => setStep('email')} className="text-xs text-ecoGreen font-bold mt-1 hover:underline">Change email</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Verification Code</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 text-center text-2xl tracking-widest font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-ecoGreen/20 transition-all"
                maxLength={6}
                autoFocus
              />
            </div>

            {error && <p className="text-xs text-red-500 font-medium ml-1 text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ecoBlack text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/10 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center">Verify & Login <CheckCircle size={16} className="ml-2" /></span>}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 text-center">
         <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto">By logging in, you agree to our Terms of Service and Campus Guidelines.</p>
      </div>

    </div>
  );
};

export default LoginView;
