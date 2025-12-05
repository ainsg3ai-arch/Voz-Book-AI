import React, { useState } from 'react';
import { ChevronDown, SkipBack, SkipForward, Play, Pause, Moon, List, Type, Sliders, Timer, Share2, MoreVertical, Heart } from 'lucide-react';
import { Book } from '../types';

interface PlayerProps {
  book: Book;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

type PlayerTab = 'cover' | 'text' | 'chapters';

export const PlayerView: React.FC<PlayerProps> = ({ book, isPlaying, onPlayPause, onClose }) => {
  const [activeTab, setActiveTab] = useState<PlayerTab>('cover');
  const [speed, setSpeed] = useState(1.0);
  const [currentTime] = useState(345);
  const totalTime = book.totalSeconds || 870;

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const progressPercent = (currentTime / totalTime) * 100;

  const TabButton = ({ tab, icon: Icon }: { tab: PlayerTab, icon: any }) => (
    <button 
        onClick={() => setActiveTab(tab)} 
        className={`p-2.5 rounded-xl transition-all ${activeTab === tab ? 'bg-white/20 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
    >
        <Icon size={20} />
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0a1e24] to-[#051014] relative animate-in slide-in-from-bottom duration-500 z-50">
      
      {/* Dynamic Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <img src={book.coverUrl} className="w-full h-full object-cover blur-3xl scale-150" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1e24]/80 to-[#051014]" />
      </div>

      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex justify-between items-center text-white z-10">
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronDown size={28} />
        </button>
        <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/5">
             <TabButton tab="cover" icon={List} />
             <TabButton tab="text" icon={Type} />
             <TabButton tab="chapters" icon={Sliders} />
        </div>
        <button className="w-10 h-10 flex items-center justify-center -mr-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative z-10">
          
          {/* Cover View */}
          {activeTab === 'cover' && (
             <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in duration-500 zoom-in-95">
                <div className="w-full aspect-square max-w-[320px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 relative group mx-auto">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="mt-8 flex items-center gap-4">
                     <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-rose-500 transition-colors">
                        <Heart size={24} />
                     </button>
                     {book.category === 'bible' && (
                        <div className="bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-500/20 uppercase tracking-wide">
                            Devocional
                        </div>
                    )}
                </div>
             </div>
          )}

          {/* Interactive Text View */}
          {activeTab === 'text' && (
              <div className="h-full px-8 pt-4 overflow-y-auto custom-scrollbar animate-in fade-in duration-300 mask-image-gradient">
                  <div className="max-w-prose mx-auto">
                      <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{book.title}</h2>
                      <p className="text-lg leading-[1.8] text-gray-300 font-serif">
                          {book.textContent ? book.textContent.split('\n').map((para, i) => (
                              <span key={i} className={`block mb-6 hover:text-white cursor-pointer transition-colors duration-300 ${i === 2 ? 'text-neon font-medium pl-4 border-l-2 border-neon' : ''}`}>
                                 {para}
                              </span>
                          )) : (
                              <span className="text-gray-500 italic">Texto não disponível para sincronização.</span>
                          )}
                      </p>
                  </div>
              </div>
          )}

          {/* Chapters/Settings View */}
          {activeTab === 'chapters' && (
              <div className="h-full px-6 py-4 overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Capítulos</h3>
                  <div className="space-y-2 mb-10">
                      {[1,2,3,4,5].map((c) => (
                          <div key={c} className={`p-4 rounded-2xl border flex justify-between items-center cursor-pointer transition-all ${c === 1 ? 'bg-neon/10 border-neon text-white shadow-lg shadow-neon/10' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}>
                              <span className="font-medium">Capítulo {c}</span>
                              <span className="text-xs font-mono opacity-60">0{c}:00</span>
                          </div>
                      ))}
                  </div>
                  
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Áudio & EQ</h3>
                  <div className="glass-panel p-6 rounded-3xl">
                      <div className="flex gap-2 justify-between items-end h-24 px-2">
                          {[40, 60, 80, 50, 70, 40, 60, 30].map((h, i) => (
                              <div key={i} className="w-6 bg-neon/30 rounded-full transition-all duration-300 hover:bg-neon" style={{height: `${h}%`}}></div>
                          ))}
                      </div>
                  </div>
              </div>
          )}
      </div>

      {/* Controls Container */}
      <div className="bg-[#0F2830]/90 backdrop-blur-xl rounded-t-[2.5rem] border-t border-white/10 px-8 pb-12 pt-10 space-y-8 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Meta */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white line-clamp-1 tracking-tight">{book.title}</h2>
          <p className="text-neon font-medium text-sm tracking-wide">{book.author}</p>
        </div>

        {/* Scrubber */}
        <div className="space-y-3">
          <div className="relative h-2 bg-white/10 rounded-full group cursor-pointer overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon to-blue-500 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-bold tracking-widest uppercase font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1.5 w-12 group">
                <Moon size={22} strokeWidth={1.5} className="group-hover:text-neon" />
                <span className="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">SLEEP</span>
            </button>
            
            <div className="flex items-center gap-6">
                <button className="text-gray-300 hover:text-neon transition-colors p-3 hover:bg-white/5 rounded-full active:scale-95">
                    <SkipBack size={32} strokeWidth={1.5} fill="currentColor" className="text-white/10" />
                </button>
                
                <button 
                    onClick={onPlayPause}
                    className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-neon to-blue-600 hover:from-neon-hover hover:to-blue-500 text-white flex items-center justify-center shadow-lg shadow-neon/30 transition-all active:scale-90 ring-4 ring-[#0F2830]"
                >
                    {isPlaying ? (
                        <Pause size={32} fill="currentColor" />
                    ) : (
                        <Play size={32} fill="currentColor" className="ml-1" />
                    )}
                </button>
                
                <button className="text-gray-300 hover:text-neon transition-colors p-3 hover:bg-white/5 rounded-full active:scale-95">
                    <SkipForward size={32} strokeWidth={1.5} fill="currentColor" className="text-white/10" />
                </button>
            </div>

            <button 
                onClick={() => setSpeed(s => s >= 2 ? 0.5 : s + 0.25)}
                className="text-neon font-bold text-xs hover:text-white transition-colors flex flex-col items-center gap-1 w-12"
            >
                <span className="text-lg leading-none">{speed.toFixed(1)}x</span>
                <span className="text-[9px] opacity-70">SPEED</span>
            </button>
        </div>
        
        {/* Bottom Actions */}
        <div className="flex justify-center gap-8 pt-2 opacity-60">
            <button className="hover:text-white hover:opacity-100 transition-all flex items-center gap-2 text-xs font-medium">
                <Share2 size={16} /> Compartilhar
            </button>
            <button className="hover:text-white hover:opacity-100 transition-all flex items-center gap-2 text-xs font-medium">
                <Timer size={16} /> Timer
            </button>
        </div>

      </div>
    </div>
  );
};