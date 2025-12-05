import React, { useState } from 'react';
import { ChevronDown, SkipBack, SkipForward, Play, Pause, Moon, List, Type, Sliders, Timer, Share2, MoreVertical } from 'lucide-react';
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
  const [currentTime, setCurrentTime] = useState(345);
  const [showSettings, setShowSettings] = useState(false);
  const totalTime = book.totalSeconds || 870;

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const progressPercent = (currentTime / totalTime) * 100;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-petrol-dark to-petrol relative animate-in slide-in-from-bottom duration-500">
      
      {/* Header */}
      <div className="px-6 py-6 flex justify-between items-center text-white z-10">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronDown size={28} />
        </button>
        <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
             <button onClick={() => setActiveTab('cover')} className={`p-1.5 rounded-md ${activeTab === 'cover' ? 'bg-white/20 text-white' : 'text-gray-400'}`}><List size={16}/></button>
             <button onClick={() => setActiveTab('text')} className={`p-1.5 rounded-md ${activeTab === 'text' ? 'bg-white/20 text-white' : 'text-gray-400'}`}><Type size={16}/></button>
             <button onClick={() => setActiveTab('chapters')} className={`p-1.5 rounded-md ${activeTab === 'chapters' ? 'bg-white/20 text-white' : 'text-gray-400'}`}><Sliders size={16}/></button>
        </div>
        <button className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors text-white/70">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
          
          {/* Cover View */}
          {activeTab === 'cover' && (
             <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                <div className="w-full aspect-square max-w-[300px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 relative group">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-110" />
                </div>
                {book.category === 'bible' && (
                    <div className="mt-6 bg-amber-500/10 text-amber-400 px-4 py-1 rounded-full text-xs font-medium border border-amber-500/20">
                        Modo Devocional Ativo
                    </div>
                )}
             </div>
          )}

          {/* Interactive Text View */}
          {activeTab === 'text' && (
              <div className="h-full px-6 overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
                  <p className="text-xl leading-relaxed text-gray-400 font-serif">
                      {book.textContent ? book.textContent.split('\n').map((para, i) => (
                          <span key={i} className={`block mb-4 hover:text-white cursor-pointer transition-colors ${i === 2 ? 'text-white' : ''}`}>
                             {para}
                          </span>
                      )) : (
                          <>
                           <span className="block mb-4">Esta é uma simulação do modo de Leitura Interativa.</span>
                           <span className="block mb-4 text-white font-medium bg-white/5 p-1 rounded -mx-1">O texto é sincronizado com o áudio, destacando o parágrafo atual.</span>
                           <span className="block mb-4">Você pode tocar em qualquer frase para pular o áudio diretamente para este ponto.</span>
                           <span className="block mb-4">Ideal para estudos, aprendizado de idiomas ou acompanhamento da leitura bíblica.</span>
                          </>
                      )}
                  </p>
              </div>
          )}

          {/* Chapters/Settings View */}
          {activeTab === 'chapters' && (
              <div className="h-full px-6 py-2 overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Capítulos</h3>
                  <div className="space-y-2 mb-8">
                      {[1,2,3,4,5].map((c) => (
                          <div key={c} className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer ${c === 1 ? 'bg-neon/10 border-neon text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}>
                              <span className="font-medium">Capítulo {c}</span>
                              <span className="text-xs opacity-50">0{c}:00</span>
                          </div>
                      ))}
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Equalizador</h3>
                  <div className="flex gap-2 justify-between items-end h-24 mb-6 px-4">
                      {[40, 60, 80, 50, 70, 40].map((h, i) => (
                          <div key={i} className="w-8 bg-neon/30 rounded-t-lg transition-all duration-300 hover:bg-neon" style={{height: `${h}%`}}></div>
                      ))}
                  </div>
              </div>
          )}
      </div>

      {/* Controls Container */}
      <div className="bg-petrol-dark/50 backdrop-blur-lg rounded-t-3xl border-t border-white/5 px-8 pb-10 pt-8 space-y-6">
        
        {/* Meta */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1 line-clamp-1">{book.title}</h2>
          <p className="text-neon font-medium">{book.author}</p>
        </div>

        {/* Scrubber */}
        <div className="space-y-2">
          <div className="relative h-1.5 bg-white/10 rounded-full group cursor-pointer">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon to-blue-400 rounded-full relative" 
              style={{ width: `${progressPercent}%` }}
            >
                <div className="absolute right-0 top-1/2 -mt-2 -mr-2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform scale-125"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1">
                <Moon size={20} />
                <span className="text-[9px] font-bold">SLEEP</span>
            </button>
            
            <div className="flex items-center gap-6">
                <button className="text-white hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full">
                    <SkipBack size={28} fill="currentColor" className="text-white/20" />
                </button>
                
                <button 
                    onClick={onPlayPause}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-neon to-blue-500 hover:from-neon-hover hover:to-blue-400 text-white flex items-center justify-center shadow-lg shadow-neon/30 transition-all active:scale-95 border-4 border-petrol-dark"
                >
                    {isPlaying ? (
                        <Pause size={32} fill="currentColor" />
                    ) : (
                        <Play size={32} fill="currentColor" className="ml-1" />
                    )}
                </button>
                
                <button className="text-white hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full">
                    <SkipForward size={28} fill="currentColor" className="text-white/20" />
                </button>
            </div>

            <button 
                onClick={() => setSpeed(s => s >= 2 ? 0.5 : s + 0.25)}
                className="text-neon font-bold text-xs hover:text-white transition-colors flex flex-col items-center gap-1 w-10"
            >
                <span className="text-lg leading-none">{speed.toFixed(1)}x</span>
                <span className="text-[9px] opacity-70">SPEED</span>
            </button>
        </div>
        
        {/* Bottom Actions */}
        <div className="flex justify-center gap-6 pt-2">
            <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1">
                <Share2 size={14} /> Compartilhar
            </button>
            <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1">
                <Timer size={14} /> Timer
            </button>
        </div>

      </div>
    </div>
  );
};
