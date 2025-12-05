import React, { useState } from 'react';
import { ArrowLeft, Play, Mic2, Activity, Gauge, Globe, Music, Crown } from 'lucide-react';
import { VoiceConfig } from '../types';

interface VoiceSettingsProps {
  onBack: () => void;
  onNext: (config: VoiceConfig) => void;
}

export const VoiceSettingsView: React.FC<VoiceSettingsProps> = ({ onBack, onNext }) => {
  const [config, setConfig] = useState<VoiceConfig>({
    voiceId: 'male-deep',
    speed: 1.0,
    pitch: 1.0,
    emphasis: 50,
    backgroundMusic: 'none',
    musicVolume: 20,
    translationLanguage: 'none'
  });

  const voices = [
    { id: 'male-deep', label: 'Marcus', desc: 'Grave e Autoritário', type: 'premium' },
    { id: 'female-soft', label: 'Sofia', desc: 'Suave e Emocional', type: 'premium' },
    { id: 'doc-narrator', label: 'David', desc: 'Documentário', type: 'premium' },
    { id: 'female-news', label: 'Alice', desc: 'Clara e Jornalística', type: 'standard' },
    { id: 'bible-read', label: 'Gabriel', desc: 'Leitura Bíblica', type: 'premium' },
  ];

  const musicTracks = [
    { id: 'none', label: 'Sem Música' },
    { id: 'lofi', label: 'Lofi Study' },
    { id: 'ambient', label: 'Ambient Flow' },
    { id: 'piano', label: 'Soft Piano' },
  ];

  return (
    <div className="flex flex-col h-full bg-petrol animate-in slide-in-from-right duration-300">
      <div className="px-6 py-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h2 className="text-lg font-bold text-white">Estúdio de Voz AI</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
        
        {/* Voice Selection */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Ultra Voice AI</h3>
             <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">PREMIUM ATIVO</span>
          </div>
          
          <div className="grid gap-3">
            {voices.map((voice) => (
              <div 
                key={voice.id}
                onClick={() => setConfig({ ...config, voiceId: voice.id })}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${config.voiceId === voice.id ? 'bg-neon/10 border-neon' : 'bg-graphite border-white/5 hover:border-white/20'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${config.voiceId === voice.id ? 'bg-neon text-white' : 'bg-white/10 text-gray-400'}`}>
                  <Mic2 size={20} />
                  {voice.type === 'premium' && (
                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full border border-graphite">
                        <Crown size={10} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold ${config.voiceId === voice.id ? 'text-white' : 'text-gray-300'}`}>{voice.label}</p>
                    {voice.type === 'premium' && <span className="text-[9px] text-amber-400 font-bold border border-amber-500/50 px-1 rounded">PRO</span>}
                  </div>
                  <p className="text-xs text-gray-500">{voice.desc}</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                  <Play size={14} className="text-white fill-white ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Translation */}
        <section className="bg-white/5 p-4 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 mb-3">
                 <Globe size={18} className="text-blue-400" />
                 <h3 className="text-sm font-bold text-white">Tradução com Voz</h3>
             </div>
             <select 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-neon"
                value={config.translationLanguage}
                onChange={(e) => setConfig({...config, translationLanguage: e.target.value})}
             >
                 <option value="none">Manter idioma original</option>
                 <option value="en">Inglês (English)</option>
                 <option value="es">Espanhol (Español)</option>
                 <option value="fr">Francês (Français)</option>
             </select>
        </section>

        {/* Background Music */}
        <section className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <Music size={18} className="text-pink-400" />
                    <h3 className="text-sm font-bold text-white">Música de Fundo</h3>
                 </div>
                 <span className="text-xs text-gray-400">Auto-ducking</span>
            </div>
            
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {musicTracks.map(track => (
                    <button
                        key={track.id}
                        onClick={() => setConfig({...config, backgroundMusic: track.id})}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${config.backgroundMusic === track.id ? 'bg-pink-500 border-pink-500 text-white' : 'bg-black/20 border-white/10 text-gray-400'}`}
                    >
                        {track.label}
                    </button>
                ))}
            </div>
            
            {config.backgroundMusic !== 'none' && (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Volume</span>
                        <span>{config.musicVolume}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={config.musicVolume}
                      onChange={(e) => setConfig({ ...config, musicVolume: parseInt(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                </div>
            )}
        </section>

        {/* Speed & Pitch */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-graphite p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-white mb-2">
              <Gauge size={16} className="text-neon" />
              <span className="text-sm font-medium">Velocidade</span>
            </div>
            <input 
              type="range" min="0.5" max="3.0" step="0.1" 
              value={config.speed}
              onChange={(e) => setConfig({ ...config, speed: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon mb-2"
            />
            <div className="text-right text-xs font-mono text-neon">{config.speed.toFixed(1)}x</div>
          </div>

          <div className="bg-graphite p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-white mb-2">
              <Activity size={16} className="text-neon" />
              <span className="text-sm font-medium">Tom</span>
            </div>
            <input 
              type="range" min="0.5" max="1.5" step="0.1" 
              value={config.pitch}
              onChange={(e) => setConfig({ ...config, pitch: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon mb-2"
            />
            <div className="text-right text-xs font-mono text-neon">{config.pitch.toFixed(1)}</div>
          </div>
        </section>
      </div>

      <div className="p-6 pt-4 bg-petrol absolute bottom-0 left-0 right-0 border-t border-white/10">
        <button 
          onClick={() => onNext(config)}
          className="w-full bg-gradient-to-r from-neon to-blue-500 hover:from-neon-hover hover:to-blue-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-neon/20 active:scale-[0.98]"
        >
          Iniciar Conversão Avançada
        </button>
      </div>
    </div>
  );
};
