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
    <div className="px-6 py-6 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-end mb-6">
         <h2 className="text-2xl font-bold text-white">Biblioteca</h2>
         <button className="text-neon text-xs font-bold uppercase hover:text-white">Cloud Sync <span className="w-2 h-2 rounded-full bg-green-500 inline-block ml-1"></span></button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar título, autor ou anotação..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-neon focus:bg-white/10 transition-colors"
          />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide mb-2">
          {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${filter === cat.id ? 'bg-neon text-white border-neon shadow-lg shadow-neon/20' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
              >
                  {cat.label}
              </button>
          ))}
      </div>
      
      {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-10 text-gray-500">
              <Filter size={48} className="mb-4 opacity-20" />
              <p>Nenhum item encontrado.</p>
              <button className="mt-4 text-neon text-sm font-medium hover:text-white">Explorar catálogo</button>
          </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-20">
            {filteredBooks.map((book) => (
                <div key={book.id} className="bg-graphite rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all group">
                    <div className="aspect-square relative overflow-hidden">
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                             <button 
                                onClick={() => onPlayBook(book)}
                                className="w-12 h-12 bg-neon rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                            >
                                <Play size={24} fill="currentColor" className="ml-1" />
                             </button>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-mono">
                            {book.duration}
                        </span>
                        {book.category !== 'audiobook' && (
                             <span className="absolute top-2 left-2 bg-neon/80 backdrop-blur-md px-2 py-1 rounded-md text-[8px] text-white font-bold uppercase">
                                {book.category}
                            </span>
                        )}
                    </div>
                    <div className="p-3">
                        <h4 className="font-bold text-white text-sm truncate">{book.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-400 truncate max-w-[80px]">{book.author}</p>
                            <div className="flex gap-2 text-gray-500">
                                <Download size={14} className="hover:text-neon cursor-pointer" />
                                <MoreVertical size={14} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
