import React from 'react';
import { User, Settings, Clock, Book, ChevronRight, Moon, LogOut, Shield } from 'lucide-react';
import { ViewState } from '../types';

interface ProfileProps {
  onNavigate: (view: ViewState) => void;
}

export const ProfileView: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      
      {/* Header Profile */}
      <div className="bg-gradient-to-b from-petrol-light to-petrol p-6 pb-10">
          <div className="flex justify-between items-start mb-6">
              <h2 className="text-white font-bold text-xl">Meu Perfil</h2>
              <Settings className="text-white/70" size={20} />
          </div>
          
          <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-neon border-4 border-petrol flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                  VB
              </div>
              <div>
                  <h3 className="text-white font-bold text-lg">Usuário Premium</h3>
                  <p className="text-blue-200 text-sm">Membro desde 2024</p>
                  <span className="inline-block mt-2 bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">PRO PLAN</span>
              </div>
          </div>
      </div>

      {/* Stats - Overlapping */}
      <div className="px-6 -mt-8 mb-6">
          <div className="bg-graphite rounded-2xl p-4 border border-white/10 shadow-xl flex justify-around">
              <div className="text-center">
                  <div className="text-neon font-bold text-xl mb-1 flex items-center justify-center gap-1"><Clock size={16}/> 24h</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Tempo Ouvido</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center">
                  <div className="text-white font-bold text-xl mb-1 flex items-center justify-center gap-1"><Book size={16}/> 12</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Livros</div>
              </div>
          </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 overflow-y-auto px-6 space-y-2 pb-24">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Geral</h3>
          
          <button className="w-full bg-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center"><Moon size={18} /></div>
                  <span className="text-white font-medium">Aparência</span>
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Escuro</span>
                  <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
              </div>
          </button>

          <button className="w-full bg-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center"><Shield size={18} /></div>
                  <span className="text-white font-medium">Privacidade & Dados</span>
              </div>
              <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
          </button>

          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1 mt-6">Conta</h3>

          <button className="w-full bg-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center"><LogOut size={18} /></div>
                  <span className="text-red-400 font-medium">Sair da Conta</span>
              </div>
          </button>
      </div>
    </div>
  );
};
