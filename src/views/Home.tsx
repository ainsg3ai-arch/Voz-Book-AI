import React from 'react';
import { Upload, Camera, Mic, Cloud, Languages, BookOpenCheck, Music, Sparkles, ChevronRight, Play } from 'lucide-react';
import { Book, ViewState } from '../types';

interface HomeProps {
  books: Book[];
  onNavigate: (view: ViewState) => void;
  onPlayBook: (book: Book) => void;
}

export const Home: React.FC<HomeProps> = ({ books, onNavigate, onPlayBook }) => {
  const recentBooks = books.slice(0, 3);

  const features = [
    { id: 'doc', label: 'Documento', icon: Upload, color: 'from-blue-500 to-blue-600', action: () => onNavigate(ViewState.UPLOAD) },
    { id: 'ocr', label: 'Foto/OCR', icon: Camera, color: 'from-purple-500 to-purple-600', action: () => onNavigate(ViewState.UPLOAD) },
    { id: 'podcast', label: 'Podcast', icon: Mic, color: 'from-rose-500 to-rose-600', action: () => onNavigate(ViewState.PODCAST_CREATOR) },
    { id: 'web', label: 'Web Link', icon: Cloud, color: 'from-cyan-500 to-cyan-600', action: () => onNavigate(ViewState.UPLOAD) },
  ];

  const secondaryFeatures = [
    { label: 'Traduzir', icon: Languages },
    { label: 'Estudo', icon: BookOpenCheck },
    { label: 'Relax', icon: Music },
    { label: 'Bíblia', icon: Sparkles },
  ];

  return (
    <div className="px-6 py-4 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Quick Actions Grid */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-white font-bold text-lg tracking-tight">Criar Novo</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {features.map((f) => (
            <button 
              key={f.id} 
              onClick={f.action}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-[4.5rem] h-[4.5rem] bg-gradient-to-br ${f.color} rounded-3xl flex items-center justify-center shadow-lg group-active:scale-95 transition-all duration-300 ring-1 ring-white/10 group-hover:shadow-xl group-hover:-translate-y-1`}>
                <f.icon className="text-white" size={26} strokeWidth={2.5} />
              </div>
              <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">{f.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tools Carousel */}
      <section>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Ferramentas AI</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
           {secondaryFeatures.map((feat, i) => (
             <button key={i} className="flex-shrink-0 w-32 h-28 glass-panel rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                  <feat.icon className="text-neon group-hover:scale-110 transition-transform" size={20} />
                </div>
                <span className="text-xs text-gray-300 font-medium group-hover:text-white">{feat.label}</span>
             </button>
           ))}
        </div>
      </section>

      {/* Recent List */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white tracking-tight">Continuar Ouvindo</h3>
          <button 
            onClick={() => onNavigate(ViewState.LIBRARY)}
            className="flex items-center gap-1 text-xs text-neon font-bold uppercase tracking-wide hover:text-white transition-colors py-2"
          >
            Ver tudo <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-4 pb-8">
          {recentBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 glass-panel rounded-3xl border-dashed">
              <Sparkles className="mb-3 opacity-50" />
              <p>Nenhum audiolivro ainda.</p>
              <p className="text-xs mt-1 text-gray-500">Toque em "Criar Novo" acima!</p>
            </div>
          ) : (
            recentBooks.map((book) => (
              <div 
                key={book.id} 
                className="flex items-center gap-4 glass-panel p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer active:scale-[0.98] group"
                onClick={() => onPlayBook(book)}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                     <Play size={20} className="text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-white truncate text-base pr-2">{book.title}</h4>
                    {book.category === 'bible' && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold uppercase">Bíblia</span>}
                  </div>
                  <p className="text-xs text-gray-400 truncate mb-3">{book.author}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon to-blue-500 rounded-full" style={{ width: `${book.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono w-8 text-right">{book.progress}%</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};