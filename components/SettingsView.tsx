import React from 'react';
import { ArrowLeft, User, Bell, Moon, LogOut, Shield } from 'lucide-react';
import { ViewState } from '../types';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const settingsItemClass = "flex items-center justify-between p-4 bg-white rounded-2xl mb-3 shadow-sm active:scale-[0.98] transition-transform cursor-pointer";

  return (
    <div className="bg-ecoPaleGreen min-h-screen pb-24 animate-in slide-in-from-right duration-300 font-sans">
      <div className="pt-14 pb-6 px-6 flex items-center">
        <button onClick={onBack} className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors mr-4">
          <ArrowLeft size={20} className="text-ecoBlack" />
        </button>
        <h1 className="text-xl font-bold text-ecoBlack">Settings</h1>
      </div>

      <div className="px-6">
        
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Account</h2>
        
        <div className={settingsItemClass}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ecoGreen/10 flex items-center justify-center text-ecoGreen">
                    <User size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900">Edit Profile</span>
            </div>
        </div>

        <div className={settingsItemClass}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ecoGreen/10 flex items-center justify-center text-ecoGreen">
                    <Bell size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900">Notifications</span>
            </div>
            <div className="w-10 h-6 bg-ecoGreen rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
        </div>

        <div className={settingsItemClass}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ecoGreen/10 flex items-center justify-center text-ecoGreen">
                    <Shield size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900">Privacy & Security</span>
            </div>
        </div>

        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 mt-6 ml-1">App</h2>

        <div className={settingsItemClass}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ecoGreen/10 flex items-center justify-center text-ecoGreen">
                    <Moon size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900">Dark Mode</span>
            </div>
            <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
        </div>

        <div className="mt-8">
            <button className="w-full py-4 rounded-2xl border border-red-200 text-red-500 font-medium bg-white hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                <LogOut size={18} />
                Log Out
            </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;