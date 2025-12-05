import React, { useState } from 'react';
import { Mic, Plus, Edit3, PlayCircle, Loader2 } from 'lucide-react';
import { Book } from '../types';

interface PodcastCreatorProps {
  onBack: () => void;
  onComplete: (book: Book) => void;
}

export const PodcastCreatorView: React.FC<PodcastCreatorProps> = ({ onBack, onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [episodeTitle, setEpisodeTitle] = useState("Episódio #01 - O Futuro da AI");

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
        const newPodcast: Book = {
            id: Date.now().toString(),
            title: episodeTitle,
            author: 'VozBook Cast',
            coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=400&auto=format&fit=crop',
            duration: '12:30',
            totalSeconds: 750,
            progress: 0,
            fileType: 'podcast',
            category: 'podcast',
            dateAdded: new Date(),
            textContent: "H1: Bem-vindos a mais um episódio...\nH2: É um prazer estar aqui..."
        };
        onComplete(newPodcast);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full bg-petrol animate-in slide-in-from-right duration-300">
      <div className="px-6 py-4 flex justify-between items-center bg-petrol/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-10">
        <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Mic className="text-rose-500" size={20} /> Podcast Studio
            </h2>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Multivoice Engine</p>
        </div>
        <button onClick={onBack} className="text-xs text-neon font-bold uppercase tracking-wide hover:text-white transition-colors" disabled={isGenerating}>Sair</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-8 relative custom-scrollbar">
        {isGenerating && (
             <div className="absolute inset-0 bg-petrol/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300 rounded-3xl">
                 <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 border-4 border-rose-500/20 rounded-full animate-ping"></div>
                    <Loader2 size={40} className="text-rose-500 animate-spin" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-3">Gerando Podcast...</h3>
                 <p className="text-gray-300 text-sm leading-relaxed max-w-xs">A inteligência artificial está roteirizando, narrando com múltiplas vozes e mixando a trilha sonora.</p>
             </div>
        )}

        {/* Project Name */}
        <section>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Nome do Episódio</label>
            <input 
                type="text" 
                value={episodeTitle}
                onChange={(e) => setEpisodeTitle(e.target.value)}
                className="w-full h-14 glass-input px-4 text-white font-bold text-lg focus:border-rose-500 transition-all" 
            />
        </section>

        {/* Host Configuration */}
        <section>
             <div className="flex justify-between items-center mb-4 pl-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hosts & Vozes</label>
                <button className="text-[10px] bg-rose-500/10 text-rose-500 px-2 py-1 rounded border border-rose-500/20 font-bold hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1"><Plus size={10}/> ADICIONAR</button>
             </div>
             
             <div className="space-y-3">
                 <div className="glass-panel p-4 rounded-xl flex items-center gap-4 group cursor-pointer hover:border-rose-500/30 transition-all">
                     <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-petrol">H1</div>
                     <div className="flex-1">
                         <p className="text-white text-sm font-bold">Host Principal</p>
                         <p className="text-xs text-gray-400">Voz: Marcus (Grave)</p>
                     </div>
                     <Edit3 size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                 </div>
                 <div className="glass-panel p-4 rounded-xl flex items-center gap-4 group cursor-pointer hover:border-rose-500/30 transition-all">
                     <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-petrol">H2</div>
                     <div className="flex-1">
                         <p className="text-white text-sm font-bold">Convidado</p>
                         <p className="text-xs text-gray-400">Voz: Sofia (Suave)</p>
                     </div>
                     <Edit3 size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                 </div>
             </div>
        </section>

        {/* Script Editor Simulation */}
        <section className="flex-1">
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Roteiro Inteligente</label>
             <div className="glass-panel rounded-2xl p-5 space-y-5 min-h-[240px]">
                 <div className="flex gap-4">
                     <span className="text-blue-400 font-bold text-xs mt-1 w-6">H1:</span>
                     <p className="text-gray-200 text-sm leading-relaxed">Bem-vindos a mais um episódio do VozBook Cast. Hoje vamos falar sobre tecnologia.</p>
                 </div>
                 <div className="flex gap-4">
                     <span className="text-rose-400 font-bold text-xs mt-1 w-6">H2:</span>
                     <p className="text-gray-200 text-sm leading-relaxed">É um prazer estar aqui, Marcus. A revolução da IA está apenas começando.</p>
                 </div>
                 <div className="flex gap-4 opacity-60 pl-2 border-l-2 border-rose-500/50 my-2 py-1">
                     <p className="text-gray-400 text-xs italic font-medium">🎵 Música de transição: Lofi Chill (5s)</p>
                 </div>
                  <div className="flex gap-4">
                     <span className="text-blue-400 font-bold text-xs mt-3 w-6">H1:</span>
                     <textarea className="bg-white/5 text-white text-sm w-full outline-none resize-none h-24 rounded-xl p-3 border border-white/5 focus:border-blue-400/50 transition-colors" placeholder="Digite a próxima fala aqui..."></textarea>
                 </div>
             </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-white/5 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors border border-white/5">
                <PlayCircle size={20} /> Preview
            </button>
            <button 
                onClick={handleGenerate}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/20 active:scale-[0.98]"
            >
                <Mic size={20} /> Gerar Episódio
            </button>
        </div>
      </div>
    </div>
  );
};