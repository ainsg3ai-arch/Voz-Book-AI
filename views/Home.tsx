import React from 'react';
import { Upload, Camera, Mic, Cloud, Languages, BookOpenCheck, Music, Sparkles } from 'lucide-react';
import { Book, ViewState } from '../types';

interface HomeProps {
  books: Book[];
  onNavigate: (view: ViewState) => void;
  onPlayBook: (book: Book) => void;
}

export const Home: React.FC<HomeProps> = ({ books, onNavigate, onPlayBook }) => {
  const recentBooks = books.slice(0, 3);

  const features = [
    { id: 'doc', label: 'Documento', icon: Upload, color: 'bg-blue-500', action: () => onNavigate(ViewState.UPLOAD) },
    { id: 'ocr', label: 'Foto/OCR', icon: Camera, color: 'bg-purple-500', action: () => onNavigate(ViewState.UPLOAD) },
    { id: 'podcast', label: 'Podcast', icon: Mic, color: 'bg-rose-500', action: () => onNavigate(ViewState.PODCAST_CREATOR) },
    { id: 'web', label: 'Web Link', icon: Cloud, color: 'bg-cyan-500', action: () => onNavigate(ViewState.UPLOAD) },
  ];

  const secondaryFeatures = [
    { label: 'Traduzir', icon: Languages },
    { label: 'Estudo', icon: BookOpenCheck },
    { label: 'Relax', icon: Music },
    { label: 'Bíblia', icon: Sparkles },
  ];

  return (
    <div className="px-6 py-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Criar Novo</h2>
        <div className="grid grid-cols-4 gap-3">
          {features.map((f) => (
            <button 
              key={f.id} 
              onClick={f.action}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform`}>
                <f.icon className="text-white" size={24} />
              </div>
              <span className="text-xs text-gray-300 font-medium">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Carousel */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Ferramentas AI</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
           {secondaryFeatures.map((feat, i) => (
             <div key={i} className="flex-shrink-0 w-28 h-24 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                <feat.icon className="text-neon" size={24} />
                <span className="text-xs text-white font-medium">{feat.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Recent List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Continuar Ouvindo</h3>
          <button 
            onClick={() => onNavigate(ViewState.LIBRARY)}
            className="text-xs text-neon font-bold uppercase tracking-wide hover:text-white transition-colors"
          >
            Ver tudo
          </button>
        </div>

        <div className="space-y-3 pb-20">
          {recentBooks.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-white/5 rounded-2xl border border-white/5">
              <p>Nenhum audiolivro ainda.</p>
              <p className="text-xs mt-1">Faça sua primeira conversão!</p>
            </div>
          ) : (
            recentBooks.map((book) => (
              <div 
                key={book.id} 
                className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer active:scale-[0.99]"
                onClick={() => onPlayBook(book)}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[8px] text-white font-mono">
                    {book.category === 'bible' ? 'BÍBLIA' : 'AUDIO'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{book.title}</h4>
                  <p className="text-xs text-gray-400 truncate">{book.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-neon rounded-full" style={{ width: `${book.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{book.progress}%</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
