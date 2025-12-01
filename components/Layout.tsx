import React, { useRef, useEffect } from 'react';
import Navigation from './Navigation';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  // Don't show navigation on loading screen
  const showNav = currentView !== 'loading';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the view changes
  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentView]);

  return (
    <div className="w-full max-w-[375px] h-[812px] lg:h-[850px] bg-ecoPaleGreen relative shadow-2xl overflow-hidden lg:rounded-[40px] lg:border-[8px] lg:border-gray-800 my-auto flex flex-col font-sans transition-colors duration-500">
      {/* iPhone Notch Placeholder for desktop look */}
      <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-xl z-[60]"></div>

      {/* Main Scrollable Content Area - Updated Background */}
      <div ref={scrollContainerRef} className="flex-1 w-full overflow-y-auto no-scrollbar bg-ecoPaleGreen relative scroll-smooth">
        {children}
      </div>
      
      {showNav && <Navigation currentView={currentView} setView={setView} />}
    </div>
  );
};

export default Layout;