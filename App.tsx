
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import LoginView from './components/LoginView';
import OnboardingView from './components/OnboardingView';
import HomeView from './components/HomeView';
import ProfileView from './components/ProfileView';
import MessagesView from './components/MessagesView';
import ShopView from './components/ShopView';
import UploadView from './components/UploadView';
import ListView from './components/ListView';
import ProductDetailView from './components/ProductDetailView';
import CharityDetailView from './components/CharityDetailView';
import DonationView from './components/DonationView';
import SettingsView from './components/SettingsView';
import { ViewState, Product, ChatMessage, UserProfile } from './types';
import { MOCK_PRODUCTS, CHARITIES, FORUM_THREADS, CHAT_HISTORY, MOCK_CHATS } from './data/mockData';
import { ArrowLeft, Send, ShieldCheck } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // App State - Lifted from static mock data to allow updates
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(CHAT_HISTORY);
  const [chatInput, setChatInput] = useState('');
  
  // Likes (Favorites) State
  const [likedProductIds, setLikedProductIds] = useState<string[]>([]);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
      username: 'Student',
      points: 0,
      level: 'Bronze',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix' // Cartoon Default
  });

  useEffect(() => {
    // Simulate app loading time
    const timer = setTimeout(() => {
        setCurrentView('login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
      // Go to onboarding after login
      setIsLoggedIn(true);
      setCurrentView('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
      setUserProfile(profile);
      setCurrentView('home');
  };

  const handleToggleLike = (productId: string) => {
      setLikedProductIds(prev => {
          if (prev.includes(productId)) {
              return prev.filter(id => id !== productId);
          } else {
              return [...prev, productId];
          }
      });
  };

  const handleShareToChat = (product: Product, targetUserId: string) => {
      const shareMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: 'me',
          text: `Check out this item: ${product.title} (@${product.brand}) \nhttps://rewear.app/product/${product.id}`,
          timestamp: 'Just now',
          isMe: true
      };
      
      setChats(prev => ({
          ...prev,
          [targetUserId]: [...(prev[targetUserId] || []), shareMessage]
      }));

      // Navigate to that chat
      const chatUser = MOCK_CHATS.find(c => c.userId === targetUserId);
      setCurrentView({ type: 'chat-detail', userId: targetUserId, userName: chatUser?.userName || 'User' });
  };

  // Handlers
  const handleBackToHome = () => setCurrentView('home');
  const handleBackToProfile = () => setCurrentView('profile');
  const handleBackToMessages = () => setCurrentView('messages');
  
  const handleItemClick = (p: Product) => {
      if (p.type === 'donation' && p.charityId) {
          setCurrentView({ type: 'charity-detail', charityId: p.charityId });
      } else {
          setCurrentView({ type: 'product-detail', productId: p.id });
      }
  };

  const handleAddProduct = (newProduct: Product) => {
      setProducts(prev => [newProduct, ...prev]);
      setCurrentView('profile');
  };

  const handleSendMessage = (userId: string) => {
      if (!chatInput.trim()) return;
      
      const newMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: 'me',
          text: chatInput,
          timestamp: 'Just now',
          isMe: true
      };

      setChats(prev => ({
          ...prev,
          [userId]: [...(prev[userId] || []), newMessage]
      }));
      setChatInput('');
  };

  const renderView = () => {
    if (currentView === 'loading') return <LoadingScreen />;
    
    // Auth Check
    if (currentView === 'login' || !isLoggedIn) {
        return <LoginView onLoginSuccess={handleLoginSuccess} />;
    }

    // Onboarding
    if (currentView === 'onboarding') {
        return <OnboardingView onComplete={handleOnboardingComplete} />;
    }

    if (currentView === 'settings') {
        return <SettingsView onBack={handleBackToProfile} />;
    }

    // Handle Object-based views (Details)
    if (typeof currentView === 'object') {
        // Product Detail
        if (currentView.type === 'product-detail') {
            const product = products.find(p => p.id === currentView.productId);
            if (!product) return <HomeView setView={setCurrentView} products={products} />;
            return (
                <ProductDetailView 
                    product={product} 
                    onBack={handleBackToHome} 
                    setView={setCurrentView} 
                    isLiked={likedProductIds.includes(product.id)}
                    onToggleLike={handleToggleLike}
                    onShareToChat={handleShareToChat}
                    recentChats={MOCK_CHATS}
                />
            );
        }
        // Charity Detail
        if (currentView.type === 'charity-detail') {
            const charity = CHARITIES.find(c => c.id === currentView.charityId);
            if (!charity) return <HomeView setView={setCurrentView} products={products} />;
            return <CharityDetailView charity={charity} onBack={handleBackToHome} setView={setCurrentView} />;
        }
        // Donation Flow
        if (currentView.type === 'donation') {
            return <DonationView charityId={currentView.charityId} onBack={handleBackToHome} onComplete={handleBackToHome} />;
        }
        // Forum Detail View
        if (currentView.type === 'forum-detail') {
            const topic = FORUM_THREADS.find(t => t.id === currentView.topicId);
            if (!topic) return <MessagesView setView={setCurrentView} />;
            
            return (
                <div className="bg-ecoPaleGreen min-h-screen pb-24 animate-in slide-in-from-right">
                     <div className="sticky top-0 bg-ecoPaleGreen z-40 flex items-center px-4 py-4 shadow-sm border-b border-ecoGreen/10">
                        <button onClick={handleBackToMessages} className="p-2 hover:bg-white/50 rounded-full mr-2">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="font-bold text-gray-800 truncate">Forum Thread</h2>
                     </div>
                     <div className="p-6">
                         <div className="flex items-center mb-4">
                             <div className="w-10 h-10 rounded-full bg-white mr-3 overflow-hidden shadow-sm">
                                 {topic.authorAvatar && <img src={topic.authorAvatar} className="w-full h-full object-cover" />}
                             </div>
                             <div>
                                 <p className="font-bold text-sm">{topic.author}</p>
                                 <p className="text-xs text-gray-500">{topic.date}</p>
                             </div>
                         </div>
                         <h1 className="text-xl font-bold mb-4">{topic.title}</h1>
                         <p className="text-gray-700 leading-relaxed mb-6">{topic.content || "No content available."}</p>
                         <div className="bg-white p-4 rounded-xl text-sm text-gray-500 text-center shadow-sm">
                             End of thread. <span className="text-ecoGreen font-bold">Sign in to reply.</span>
                         </div>
                     </div>
                </div>
            );
        }
        // Chat Detail View (Now Functional)
        if (currentView.type === 'chat-detail') {
            const messages = chats[currentView.userId] || [];
            return (
                <div className="bg-ecoPaleGreen min-h-screen pb-32 flex flex-col animate-in slide-in-from-right relative">
                    {/* Chat Header */}
                    <div className="bg-ecoPaleGreen/95 backdrop-blur px-4 py-4 shadow-sm flex items-center sticky top-0 z-40 border-b border-ecoGreen/10">
                        <button onClick={handleBackToMessages} className="p-2 hover:bg-white/50 rounded-full mr-2">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white mr-2 overflow-hidden border border-white">
                                 <img src={products.find(p => p.seller?.id === currentView.userId)?.seller?.avatar || MOCK_CHATS.find(c => c.userId === currentView.userId)?.avatar || "https://api.dicebear.com/9.x/avataaars/svg?seed=Seller"} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="font-bold text-gray-800 text-sm">{currentView.userName || 'User'}</h2>
                        </div>
                    </div>
                    
                    {/* Chat Area */}
                    <div className="flex-1 p-4 space-y-4">
                        {messages.length > 0 ? messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${msg.isMe ? 'bg-ecoGreen text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-gray-400 text-xs mt-10">Start a conversation!</div>
                        )}
                    </div>
                    
                    {/* Disclaimer Footer */}
                    <div className="px-4 py-2 flex justify-center sticky bottom-[80px]">
                        <div className="flex items-center text-[10px] text-gray-400 bg-gray-100/50 px-3 py-1 rounded-full border border-gray-200 backdrop-blur-sm">
                            <ShieldCheck size={10} className="mr-1 text-ecoGreen" />
                            AI Bot monitoring active. Please keep conversation civil.
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="bg-white p-3 border-t border-gray-100 flex items-center gap-2 sticky bottom-0 z-50">
                        <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(currentView.userId)}
                            placeholder="Type a message..." 
                            className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none" 
                        />
                        <button 
                            onClick={() => handleSendMessage(currentView.userId)}
                            className="p-2 bg-ecoGreen text-white rounded-full shadow-sm hover:bg-ecoOlive transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            );
        }
    }

    // Handle String-based views
    switch (currentView) {
      case 'home':
        return <HomeView setView={setCurrentView} products={products} />;
      case 'shop':
        return <ShopView setView={setCurrentView} products={products} />;
      case 'upload':
        return <UploadView onPublish={handleAddProduct} />;
      case 'messages':
        return <MessagesView setView={setCurrentView} chats={chats} />;
      case 'profile':
        return <ProfileView setView={setCurrentView} products={products} userProfile={userProfile} likedProductIds={likedProductIds} />;
      // Sub-pages
      case 'list-recent':
        return <ListView type="recent" onBack={handleBackToHome} onItemClick={handleItemClick} products={products} />;
      case 'list-rent-buy':
        return <ListView type="rent-buy" onBack={handleBackToHome} onItemClick={handleItemClick} products={products} />;
      case 'list-donation':
        return <ListView type="donation" onBack={handleBackToHome} onItemClick={handleItemClick} products={products} />;
      case 'list-my-listings':
        return <ListView type="my-listings" onBack={handleBackToProfile} onItemClick={handleItemClick} products={products} />;
      case 'list-my-orders':
        return <ListView type="my-orders" onBack={handleBackToProfile} onItemClick={handleItemClick} products={products} />;
      default:
        return <HomeView setView={setCurrentView} products={products} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;
