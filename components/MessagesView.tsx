import React, { useState } from 'react';
import { Search, Bot, X, Mail, ChevronRight, MessageCircle, User } from 'lucide-react';
import { MessageTab, ViewState, ChatMessage } from '../types';
import { getRepairAdvice } from '../services/geminiService';
import { FORUM_THREADS, MOCK_CHATS } from '../data/mockData';

interface MessagesViewProps {
  setView: (view: ViewState) => void;
  chats?: Record<string, ChatMessage[]>;
}

const MessagesView: React.FC<MessagesViewProps> = ({ setView, chats }) => {
  const [activeTab, setActiveTab] = useState<MessageTab>('forum');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    if (activeTab === 'help') {
        performAiSearch(searchQuery);
        return;
    }

    if (searchQuery.toLowerCase().includes('how to') || searchQuery.toLowerCase().includes('repair')) {
        performAiSearch(searchQuery);
    }
  };

  const performAiSearch = async (query: string) => {
      setIsLoading(true);
      setAiResponse(null);
      const advice = await getRepairAdvice(query);
      setAiResponse(advice);
      setIsLoading(false);
  };

  const clearAi = () => {
    setAiResponse(null);
    setSearchQuery('');
  };

  // Helper to get last message for dynamic chat list
  const getDynamicChats = () => {
      if (!chats) return MOCK_CHATS;
      return MOCK_CHATS.map(mockChat => {
          const history = chats[mockChat.userId];
          if (history && history.length > 0) {
              const lastMsg = history[history.length - 1];
              return {
                  ...mockChat,
                  lastMessage: lastMsg.text,
                  time: lastMsg.timestamp === 'Just now' ? 'Now' : lastMsg.timestamp.split(' ')[0] // Simple hack for display
              };
          }
          return mockChat;
      });
  };

  const dynamicChatList = getDynamicChats();

  return (
    <div className="bg-ecoPaleGreen min-h-screen pb-28 flex flex-col font-sans">
      
      {/* Header */}
      <div className="pt-14 pb-4 px-6 sticky top-0 bg-ecoPaleGreen/95 backdrop-blur z-30 border-b border-ecoGreen/10">
         <h1 className="text-xl font-bold text-ecoBlack mb-6">Community</h1>
         
         <div className="flex space-x-6">
            {(['forum', 'chats', 'help'] as MessageTab[]).map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-all relative capitalize ${
                activeTab === tab 
                    ? 'text-ecoBlack' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ecoGreen rounded-full" />}
            </button>
            ))}
         </div>
      </div>

      <div className="flex-1 px-6 pt-6 overflow-hidden flex flex-col">
        
        {/* Search */}
        {activeTab !== 'chats' && (
            <form onSubmit={handleSearch} className="relative mb-6">
            <input 
                type="text" 
                placeholder={activeTab === 'help' ? "Ask EcoBot a question..." : "Search topics..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-2xl py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-ecoGreen shadow-sm"
            />
            <div className="absolute left-3 top-3 text-gray-400">
                 {isLoading ? <div className="w-4 h-4 border-2 border-ecoGreen border-t-transparent rounded-full animate-spin"></div> : <Search size={18} />}
            </div>
            </form>
        )}

        {/* AI Response */}
        {aiResponse && (
             <div className="mb-8 bg-white rounded-2xl p-5 border border-white shadow-sm relative">
                <button onClick={clearAi} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                </button>
                <div className="flex items-start space-x-3">
                    <Bot size={20} className="text-ecoOlive shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Bot Suggestion</h3>
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {aiResponse}
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* Forum List */}
        {activeTab === 'forum' && (
          <div className="space-y-6 pb-8 overflow-y-auto no-scrollbar flex-1">
             {FORUM_THREADS.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '').map((topic) => (
                 <div 
                    key={topic.id} 
                    onClick={() => setView({ type: 'forum-detail', topicId: topic.id })}
                    className="flex items-start cursor-pointer group"
                 >
                    <div 
                        className="w-10 h-10 rounded-full shrink-0 mr-4 bg-white flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm"
                    >
                        {topic.author.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 border-b border-ecoGreen/10 pb-6 group-last:border-0">
                        <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-ecoOlive transition-colors">{topic.title}</h3>
                        <div className="flex items-center text-xs text-gray-400 space-x-2">
                            <span>{topic.author}</span>
                            <span>•</span>
                            <span>{topic.date}</span>
                            <span>•</span>
                            <span>{topic.replies} replies</span>
                        </div>
                    </div>
                 </div>
             ))}
          </div>
        )}

        {/* Chat List */}
        {activeTab === 'chats' && (
            <div className="space-y-2 pb-8 overflow-y-auto no-scrollbar flex-1">
                {dynamicChatList.map(chat => (
                    <div 
                        key={chat.userId}
                        onClick={() => setView({ type: 'chat-detail', userId: chat.userId, userName: chat.userName })}
                        className="flex items-center p-3 -mx-3 rounded-2xl hover:bg-white/50 cursor-pointer transition-colors"
                    >
                        <img src={chat.avatar} className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-200 border border-white" />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h3 className="font-bold text-gray-900 text-sm">{chat.userName}</h3>
                                <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Help Tab */}
        {activeTab === 'help' && !aiResponse && (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
                 <Bot size={48} strokeWidth={1} className="text-ecoGreen/40 mb-4" />
                 <h3 className="font-bold text-gray-900 mb-2">EcoBot Support</h3>
                 <p className="text-xs text-gray-500 max-w-[200px]">Ask about recycling, repairs, or app features.</p>
             </div>
        )}

      </div>
    </div>
  );
};

export default MessagesView;