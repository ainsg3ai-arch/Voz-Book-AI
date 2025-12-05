import React from 'react';
import { Home, Library, PlusCircle, BookOpen, User } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState | 'PROFILE';
  onNavigate: (view: ViewState | 'PROFILE') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const isFullScreen = currentView === ViewState.PLAYER || currentView === ViewState.CONVERSION;

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-petrol shadow-2xl overflow-hidden relative">
      {/* Header */}
      {!isFullScreen && (
        <header className="px-6 py-5 flex justify-between items-center bg-petrol z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-neon to-blue-500 flex items-center justify-center shadow-lg shadow-neon/20">
              <span className="font-bold text-white text-xl">V</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">VozBook AI</h1>
              <span className="text-[10px] text-neon font-medium tracking-widest uppercase">Version 2.0</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('PROFILE')}
            className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors ${currentView === 'PROFILE' ? 'bg-neon border-neon' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <User size={20} className="text-white" />
          </button>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto relative bg-gradient-to-b from-petrol to-graphite ${!isFullScreen ? 'pb-24' : ''}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {!isFullScreen && (
        <nav className="absolute bottom-0 left-0 right-0 bg-graphite/90 backdrop-blur-xl border-t border-white/5 px-6 py-2 pb-6 flex justify-between items-center z-20">
          <button 
            onClick={() => onNavigate(ViewState.HOME)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${currentView === ViewState.HOME ? 'text-neon bg-white/5' : 'text-gray-400 hover:text-white'}`}
          >
            <Home size={22} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          
          <button 
             onClick={() => onNavigate(ViewState.BIBLE_MODE)}
             className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${currentView === ViewState.BIBLE_MODE ? 'text-amber-500 bg-amber-500/10' : 'text-gray-400 hover:text-white'}`}
          >
            <BookOpen size={22} />
            <span className="text-[10px] font-medium">Bíblia</span>
          </button>

          <button 
            onClick={() => onNavigate(ViewState.UPLOAD)}
            className="flex flex-col items-center justify-center -mt-8"
          >
            <div className="w-14 h-14 bg-neon hover:bg-neon-hover rounded-full flex items-center justify-center shadow-lg shadow-neon/40 border-4 border-graphite transition-transform active:scale-95">
              <PlusCircle size={28} className="text-white" />
            </div>
            <span className="text-[10px] font-medium text-white mt-1">Criar</span>
          </button>

          <button 
            onClick={() => onNavigate(ViewState.LIBRARY)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${currentView === ViewState.LIBRARY ? 'text-neon bg-white/5' : 'text-gray-400 hover:text-white'}`}
          >
            <Library size={22} />
            <span className="text-[10px] font-medium">Biblioteca</span>
          </button>

          <button 
             onClick={() => onNavigate('PROFILE')}
             className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${currentView === 'PROFILE' ? 'text-neon bg-white/5' : 'text-gray-400 hover:text-white'}`}
          >
            <User size={22} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </nav>
      )}
    </div>
  );
};