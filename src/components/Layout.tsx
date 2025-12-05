import React from 'react';
import { Home, Library, Plus, BookOpen, User } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState | 'PROFILE';
  onNavigate: (view: ViewState | 'PROFILE') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const isFullScreen = currentView === ViewState.PLAYER || currentView === ViewState.CONVERSION;

  const NavButton = ({ view, icon: Icon, label }: { view: ViewState | 'PROFILE', icon: any, label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => onNavigate(view)}
        className={`flex flex-col items-center justify-center gap-1 w-14 transition-all duration-300 group ${isActive ? 'text-neon -translate-y-1' : 'text-gray-400 hover:text-gray-200'}`}
      >
        <div className={`relative p-1.5 rounded-xl transition-all ${isActive ? 'bg-neon/10' : ''}`}>
           <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
           {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon shadow-[0_0_8px_currentColor]"></span>}
        </div>
        <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-8 lg:p-12 animate-in fade-in duration-700 bg-[#020607]">
      {/* Main Container (Mobile Frame on Desktop) */}
      <div className={`w-full h-[100dvh] md:h-[850px] md:max-w-[400px] bg-petrol md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-white/10 ${isFullScreen ? 'md:rounded-none md:max-w-full md:h-screen transition-all duration-500' : ''}`}>
        
        {/* Header (Hidden in FullScreen) */}
        {!isFullScreen && (
          <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-gradient-to-b from-petrol-dark to-petrol z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-neon to-blue-600 flex items-center justify-center shadow-lg shadow-neon/20 ring-1 ring-white/10">
                <span className="font-bold text-white text-xl">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white leading-tight tracking-tight">VozBook AI</h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('PROFILE')}
              className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all active:scale-95 hover:bg-white/10 ${currentView === 'PROFILE' ? 'bg-neon text-white border-transparent' : 'bg-white/5 text-gray-300'}`}
            >
              <User size={20} />
            </button>
          </header>
        )}

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto relative custom-scrollbar bg-petrol ${!isFullScreen ? 'pb-28' : ''}`}>
          {children}
        </main>

        {/* Floating Bottom Navigation */}
        {!isFullScreen && (
          <nav className="absolute bottom-6 left-4 right-4 h-[72px] bg-[#0F2830]/90 backdrop-blur-xl border border-white/10 rounded-3xl flex justify-between items-center px-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-30">
            <NavButton view={ViewState.HOME} icon={Home} label="Home" />
            <NavButton view={ViewState.BIBLE_MODE} icon={BookOpen} label="Bíblia" />
            
            <div className="relative -top-6">
              <button 
                onClick={() => onNavigate(ViewState.UPLOAD)}
                className="w-16 h-16 bg-gradient-to-tr from-neon to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-neon/40 border-[6px] border-petrol transition-transform active:scale-90 group"
              >
                <Plus size={32} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <NavButton view={ViewState.LIBRARY} icon={Library} label="Biblioteca" />
            <NavButton view={'PROFILE'} icon={User} label="Perfil" />
          </nav>
        )}
      </div>
    </div>
  );
};