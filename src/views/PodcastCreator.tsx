import React, { useState } from 'react';
import { Mic, Users, Plus, Edit3, PlayCircle, Loader2 } from 'lucide-react';
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
      <div className="px-6 py-6 border-b border-white/5 flex justify-between items-center bg-petrol z-10">
        <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mic className="text-rose-500" /> Podcast Studio
            </h2>
            <p className="text-xs text-gray-400">Crie episódios com múltiplos hosts</p>
        </div>
        <button onClick={onBack} className="text-sm text-neon font-medium" disabled={isGenerating}>Sair</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-8 relative">
        {isGenerating && (
             <div className="absolute inset-0 bg-petrol/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                 <Loader2 size={48} className="text-rose-500 animate-spin mb-4" />
                 <h3 className="text-xl font-bold text-white mb-2">Gerando Podcast...</h3>
                 <p className="text-gray-300 text-sm">A inteligência artificial está roteirizando, narrando com múltiplas vozes e mixando a trilha sonora.</p>
             </div>
        )}

        {/* Project Name */}
        <section>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome do Episódio</label>
            <input 
                type="text" 
                value={episodeTitle}
                onChange={(e) => setEpisodeTitle(e.target.value)}
                className="w-full bg-graphite border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 focus:outline-none" 
            />
        </section>

        {/* Host Configuration */}
        <section>
             <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hosts & Vozes</label>
                <button className="text-xs text-rose-500 font-bold flex items-center gap-1"><Plus size={12}/> Adicionar</button>
             </div>
             
             <div className="space-y-3">
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">H1</div>
                     <div className="flex-1">
                         <p className="text-white text-sm font-bold">Host Principal</p>
                         <p className="text-xs text-gray-400">Voz: Marcus (Grave)</p>
                     </div>
                     <Edit3 size={16} className="text-gray-500" />
                 </div>
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold">H2</div>
                     <div className="flex-1">
                         <p className="text-white text-sm font-bold">Convidado</p>
                         <p className="text-xs text-gray-400">Voz: Sofia (Suave)</p>
                     </div>
                     <Edit3 size={16} className="text-gray-500" />
                 </div>
             </div>
        </section>

        {/* Script Editor Simulation */}
        <section className="flex-1">
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Roteiro Inteligente</label>
             <div className="bg-graphite rounded-xl border border-white/10 p-4 space-y-4 min-h-[200px]">
                 <div className="flex gap-3">
                     <span className="text-blue-400 font-bold text-xs mt-1">H1:</span>
                     <p className="text-gray-300 text-sm">Bem-vindos a mais um episódio do VozBook Cast. Hoje vamos falar sobre tecnologia.</p>
                 </div>
                 <div className="flex gap-3">
                     <span className="text-rose-400 font-bold text-xs mt-1">H2:</span>
                     <p className="text-gray-300 text-sm">É um prazer estar aqui, Marcus. A revolução da IA está apenas começando.</p>
                 </div>
                 <div className="flex gap-3 opacity-50 border-l-2 border-rose-500 pl-3">
                     <p className="text-gray-500 text-sm italic">Música de transição: Lofi Chill (5s)</p>
                 </div>
                  <div className="flex gap-3">
                     <span className="text-blue-400 font-bold text-xs mt-1">H1:</span>
                     <textarea className="bg-transparent text-white text-sm w-full outline-none resize-none h-20" placeholder="Digite a próxima fala aqui..."></textarea>
                 </div>
             </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
            <button className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                <PlayCircle size={20} /> Preview
            </button>
            <button 
                onClick={handleGenerate}
                className="flex-1 bg-rose-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-500/20"
            >
                <Mic size={20} /> Gerar Episódio
            </button>
        </div>
      </div>
    </div>
  );
};