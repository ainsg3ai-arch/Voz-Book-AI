import React from 'react';
import { Play, Pause, X } from 'lucide-react';
import { Book } from '../types';

interface BottomPlayerProps {
  book: Book;
  isPlaying: boolean;
  onPlayPause: () => void;
  onExpand: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({ book, isPlaying, onPlayPause, onExpand }) => {
  return (
    <div 
        className="absolute bottom-[72px] left-4 right-4 bg-petrol-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 pr-4 flex items-center gap-3 shadow-2xl z-20 cursor-pointer animate-in slide-in-from-bottom-2 duration-300"
        onClick={onExpand}
    >
        <img src={book.coverUrl} alt="cover" className="w-10 h-10 rounded-lg object-cover" />
        
        <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{book.title}</p>
            <p className="text-neon text-xs truncate">{book.author}</p>
        </div>

        <button 
            onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-petrol hover:bg-gray-200 transition-colors"
        >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>
    </div>
  );
};