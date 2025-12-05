import React, { useState } from 'react';
import { Play, Calendar, Search, ChevronRight } from 'lucide-react';
import { Book } from '../types';

interface BibleModeProps {
  onBack: () => void;
  onPlayBook: (book: Book) => void;
}

export const BibleModeView: React.FC<BibleModeProps> = ({ onBack, onPlayBook }) => {
  const [activeTab, setActiveTab] = useState<'devotional' | 'bible'>('devotional');

  // Mock Bible Books
  const bibleBooks = [
    { name: 'Gênesis', ch: 50 }, { name: 'Salmos', ch: 150 }, { name: 'Provérbios', ch: 31 },
    { name: 'Mateus', ch: 28 }, { name: 'João', ch: 21 }, { name: 'Romanos', ch: 16 }
  ];

  const dailyVerse = {
    text: "O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
    ref: "Salmos 23:1-2",
    image: "https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=600&auto=format&fit=crop"
  };

  const handlePlayDevotional = () => {
      onPlayBook({
          id: 'devotional-daily',
          title: 'Devocional Diário: Paz Interior',
          author: 'Salmos 23',
          coverUrl: dailyVerse.image,
          duration: '05:00',
          totalSeconds: 300,
          progress: 0,
          fileType: 'bible',
          category: 'bible',
          dateAdded: new Date(),
          textContent: dailyVerse.text
      });
  };

  return (
    <div className="flex flex-col h-full bg-graphite animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 py-6 bg-gradient-to-b from-amber-900/40 to-graphite border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-amber-500 tracking-tight">Bíblia Falada</h2>
            <button onClick={onBack} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg transition-colors">Voltar</button>
        </div>

        {/* Tabs */}
        <div className="flex bg-black/20 p-1.5 rounded-2xl border border-white/5">
            <button 
                onClick={() => setActiveTab('devotional')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'devotional' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                Devocional
            </button>
            <button 
                onClick={() => setActiveTab('bible')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'bible' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                Navegar
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-28 custom-scrollbar">
        {activeTab === 'devotional' ? (
            <div className="space-y-8">
                {/* Verse Card */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl group cursor-pointer border border-white/10" onClick={handlePlayDevotional}>
                    <img src={dailyVerse.image} alt="Daily Verse" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="mb-6">
                            <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block shadow-lg">Versículo do Dia</span>
                            <h3 className="text-white font-serif text-2xl leading-relaxed italic mb-2 drop-shadow-lg">"{dailyVerse.text}"</h3>
                            <p className="text-amber-400 font-bold uppercase tracking-widest text-sm">{dailyVerse.ref}</p>
                        </div>
                        <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-xl active:scale-[0.98]">
                            <Play size={18} fill="currentColor" /> Ouvir Reflexão
                        </button>
                    </div>
                </div>

                {/* Plans */}
                <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Calendar size={18} className="text-amber-500" /> Planos de Leitura
                    </h3>
                    <div className="space-y-3">
                        {['Bíblia em 1 Ano', 'Salmos para Ansiedade', 'Sabedoria em Provérbios'].map((plan, i) => (
                            <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-900/30 text-amber-500 flex items-center justify-center font-bold text-xs border border-amber-500/20">{i + 1}</div>
                                    <span className="text-gray-200 font-bold text-sm">{plan}</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div className="space-y-8">
                {/* Search */}
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar livro ou passagem..." 
                        className="w-full h-12 glass-input px-12 text-sm font-medium focus:border-amber-500" 
                    />
                </div>

                {/* Grid */}
                <div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Antigo Testamento</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {bibleBooks.slice(0, 3).map(b => (
                            <button key={b.name} className="glass-panel hover:bg-amber-500/10 hover:border-amber-500/30 p-4 rounded-xl text-left transition-all group">
                                <h4 className="text-white font-serif font-bold text-lg group-hover:text-amber-400">{b.name}</h4>
                                <span className="text-xs text-gray-500 group-hover:text-gray-400">{b.ch} Capítulos</span>
                            </button>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Novo Testamento</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {bibleBooks.slice(3).map(b => (
                            <button key={b.name} className="glass-panel hover:bg-amber-500/10 hover:border-amber-500/30 p-4 rounded-xl text-left transition-all group">
                                <h4 className="text-white font-serif font-bold text-lg group-hover:text-amber-400">{b.name}</h4>
                                <span className="text-xs text-gray-500 group-hover:text-gray-400">{b.ch} Capítulos</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};