import React, { useState } from 'react';
import { Download, Play, MoreVertical, Search, Filter } from 'lucide-react';
import { Book, BookCategory } from '../types';

interface LibraryProps {
  books: Book[];
  onPlayBook: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryProps> = ({ books, onPlayBook }) => {
  const [filter, setFilter] = useState<BookCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(b => {
    const matchesFilter = filter === 'all' || b.category === filter;
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories: {id: BookCategory | 'all', label: string}[] = [
      {id: 'all', label: 'Tudo'},
      {id: 'audiobook', label: 'Livros'},
      {id: 'bible', label: 'Bíblia'},
      {id: 'podcast', label: 'Podcasts'},
      {id: 'study', label: 'Estudo'},
  ];

  return (
    <div className="px-6 py-8 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-end mb-6">
         <h2 className="text-2xl font-bold text-white">Minha Biblioteca</h2>
         <button className="text-neon text-[10px] font-bold uppercase hover:text-white bg-neon/10 px-2 py-1 rounded-md transition-colors">
            Cloud Sync <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block ml-1"></span>
         </button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6 group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar título, autor..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 glass-input rounded-2xl pl-12 pr-4 text-sm font-medium"
          />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide mb-2">
          {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${filter === cat.id ? 'bg-neon text-white border-neon shadow-lg shadow-neon/20' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}`}
              >
                  {cat.label}
              </button>
          ))}
      </div>
      
      {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-10 text-gray-500 glass-panel rounded-3xl mx-auto w-full max-w-xs text-center border-dashed">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Filter size={24} className="opacity-50" />
              </div>
              <p className="font-medium text-white mb-1">Nenhum item encontrado</p>
              <p className="text-xs text-gray-500 mb-4">Tente buscar outro termo ou limpar os filtros.</p>
              <button 
                onClick={() => {setFilter('all'); setSearch('')}}
                className="text-neon text-xs font-bold uppercase hover:text-white transition-colors"
              >
                Limpar Filtros
              </button>
          </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-24">
            {filteredBooks.map((book) => (
                <div key={book.id} className="glass-panel p-2 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer" onClick={() => onPlayBook(book)}>
                    <div className="aspect-square relative overflow-hidden rounded-xl mb-3 shadow-lg">
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                             <button className="w-10 h-10 bg-neon rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                                <Play size={18} fill="currentColor" className="ml-1" />
                             </button>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] text-white font-mono font-bold">
                            {book.duration}
                        </span>
                    </div>
                    <div className="px-1">
                        <h4 className="font-bold text-white text-sm truncate leading-tight mb-0.5">{book.title}</h4>
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] text-gray-400 truncate max-w-[80px] font-medium">{book.author}</p>
                            <button className="text-gray-500 hover:text-white transition-colors p-1 -mr-1">
                                <MoreVertical size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};