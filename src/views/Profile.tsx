import React from 'react';
import { Settings, Clock, Book, ChevronRight, Moon, LogOut, Shield } from 'lucide-react';
import { ViewState } from '../types';

interface ProfileProps {
  onNavigate: (view: ViewState) => void;
}

export const ProfileView: React.FC<ProfileProps> = () => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      
      {/* Header Profile */}
      <div className="bg-gradient-to-b from-petrol-light to-petrol p-8 pb-12 rounded-b-[3rem] shadow-2xl relative z-10">
          <div className="flex justify-between items-start mb-6">
              <h2 className="text-white font-bold text-2xl tracking-tight">Meu Perfil</h2>
              <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <Settings className="text-white" size={20} />
              </button>
          </div>
          
          <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon to-blue-600 p-[3px] shadow-xl">
                  <div className="w-full h-full rounded-full bg-petrol flex items-center justify-center text-2xl font-bold text-white border-2 border-white/10">
                      VB
                  </div>
              </div>
              <div>
                  <h3 className="text-white font-bold text-xl leading-tight">Usuário Premium</h3>
                  <p className="text-blue-200 text-sm mb-2">Membro desde 2024</p>
                  <span className="inline-block bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 tracking-wider">PRO PLAN</span>
              </div>
          </div>
      </div>

      {/* Stats - Overlapping */}
      <div className="px-6 -mt-8 mb-8 relative z-20">
          <div className="glass-panel rounded-2xl p-4 flex justify-around items-center">
              <div className="text-center flex-1">
                  <div className="text-neon font-bold text-2xl mb-1 flex items-center justify-center gap-1.5 font-mono"><Clock size={18}/> 24h</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tempo Ouvido</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="text-center flex-1">
                  <div className="text-white font-bold text-2xl mb-1 flex items-center justify-center gap-1.5 font-mono"><Book size={18}/> 12</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Livros</div>
              </div>
          </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 overflow-y-auto px-6 space-y-3 pb-28 custom-scrollbar">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 ml-2">Geral</h3>
          
          <button className="w-full glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors group active:scale-[0.99]">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20"><Moon size={20} /></div>
                  <span className="text-white font-bold text-sm">Aparência</span>
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Escuro</span>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
          </button>

          <button className="w-full glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors group active:scale-[0.99]">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20"><Shield size={20} /></div>
                  <span className="text-white font-bold text-sm">Privacidade & Dados</span>
              </div>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
          </button>

          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 ml-2 mt-6">Conta</h3>

          <button className="w-full glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-red-500/10 hover:border-red-500/20 transition-colors group active:scale-[0.99]">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20"><LogOut size={20} /></div>
                  <span className="text-red-400 font-bold text-sm">Sair da Conta</span>
              </div>
          </button>
      </div>
    </div>
  );
};