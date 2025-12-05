import React, { useState, useRef } from 'react';
import { ArrowLeft, FileText, UploadCloud, X, CheckCircle2, Camera, Link as LinkIcon, Layers, ScanLine } from 'lucide-react';
import { ViewState, FileUploadState } from '../types';

interface UploadProps {
  onBack: () => void;
  onNext: (files: File[], isOCR: boolean) => void;
}

type Tab = 'file' | 'camera' | 'link';

export const UploadView: React.FC<UploadProps> = ({ onBack, onNext }) => {
  const [activeTab, setActiveTab] = useState<Tab>('file');
  const [dragActive, setDragActive] = useState(false);
  const [fileState, setFileState] = useState<FileUploadState>({ 
    files: [], 
    isBatch: false,
    isOCR: false,
    previewText: '' 
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const isOCR = activeTab === 'camera';
    setFileState(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles],
      isBatch: [...prev.files, ...newFiles].length > 1,
      isOCR: isOCR,
      previewText: `Detectado ${newFiles.length} arquivo(s). Preparando para extração inteligente... \n\nConteúdo será processado com OCR Avançado e normalização de áudio.`
    }));
  };

  const handleLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Simulate link fetch
      if(e.target.value.length > 10) {
           setFileState(prev => ({
              ...prev,
              files: [new File([""], "artigo-web.html")],
              previewText: `Extraindo conteúdo de: ${e.target.value}\n\nO VozBook AI removeu anúncios e menus, mantendo apenas o texto principal para leitura.`
           }));
      }
  }

  const removeFile = (index: number) => {
    const updated = fileState.files.filter((_, i) => i !== index);
    setFileState(prev => ({
      ...prev,
      files: updated,
      isBatch: updated.length > 1,
      previewText: updated.length === 0 ? '' : prev.previewText
    }));
  };

  return (
    <div className="flex flex-col h-full bg-petrol animate-in slide-in-from-right duration-300">
      <div className="px-6 py-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h2 className="text-lg font-bold text-white">Importar Conteúdo</h2>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 flex gap-2">
         <button onClick={() => setActiveTab('file')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === 'file' ? 'bg-neon text-white' : 'bg-white/5 text-gray-400'}`}>
            <FileText size={16} /> Arquivo
         </button>
         <button onClick={() => setActiveTab('camera')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === 'camera' ? 'bg-neon text-white' : 'bg-white/5 text-gray-400'}`}>
            <Camera size={16} /> OCR
         </button>
         <button onClick={() => setActiveTab('link')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === 'link' ? 'bg-neon text-white' : 'bg-white/5 text-gray-400'}`}>
            <LinkIcon size={16} /> Link
         </button>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        {fileState.files.length === 0 ? (
          <>
            {/* FILE UPLOAD MODE */}
            {activeTab === 'file' && (
                <div 
                    className={`flex-1 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-colors ${dragActive ? 'border-neon bg-neon/10' : 'border-white/20 bg-white/5'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="w-20 h-20 bg-petrol-light rounded-full flex items-center justify-center mb-2">
                         <UploadCloud size={40} className="text-neon" />
                    </div>
                    <div className="text-center px-8">
                        <p className="font-bold text-white text-lg mb-2">Arraste e solte</p>
                        <p className="text-gray-400 text-sm">PDF, DOCX, TXT, EPUB</p>
                    </div>
                    <input ref={inputRef} type="file" className="hidden" multiple onChange={handleChange} accept=".pdf,.docx,.txt,.epub" />
                    <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                        <button onClick={() => inputRef.current?.click()} className="w-full px-6 py-3 bg-neon hover:bg-neon-hover text-white font-semibold rounded-xl text-sm transition-colors">
                             Selecionar Arquivos
                        </button>
                        <button className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                             <UploadCloud size={16} /> Importar do Drive
                        </button>
                    </div>
                </div>
            )}

            {/* CAMERA MODE */}
            {activeTab === 'camera' && (
                <div className="flex-1 bg-black rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border border-white/20">
                     <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10"></div>
                     {/* Fake Viewfinder */}
                     <div className="absolute inset-4 border-2 border-white/30 rounded-2xl z-0">
                         <ScanLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 animate-pulse" size={64} />
                     </div>
                     <p className="relative z-20 text-white font-medium mb-8 bg-black/50 px-3 py-1 rounded-full">Posicione o texto aqui</p>
                     
                     <div className="relative z-20 flex gap-6 items-center">
                         <button className="p-3 bg-white/10 rounded-full text-white"><FileText size={24}/></button>
                         <button onClick={() => handleFiles([new File(["OCR Content"], "foto-scan.jpg")])} className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                             <div className="w-14 h-14 bg-white rounded-full border-2 border-black"></div>
                         </button>
                         <button className="p-3 bg-white/10 rounded-full text-white"><X size={24}/></button>
                     </div>
                </div>
            )}

            {/* LINK MODE */}
            {activeTab === 'link' && (
                <div className="flex-1 flex flex-col items-center pt-10">
                    <div className="w-full bg-white/5 p-6 rounded-3xl border border-white/10">
                         <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">Cole o link do artigo</label>
                         <div className="flex gap-2">
                             <input 
                                type="text" 
                                placeholder="https://..." 
                                onChange={handleLinkInput}
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-neon focus:outline-none"
                             />
                         </div>
                         <p className="text-xs text-gray-500 mt-4">O VozBook irá extrair automaticamente o texto principal e ignorar menus e propagandas.</p>
                    </div>
                </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* File List for Batch */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-white font-bold flex items-center gap-2">
                        <Layers size={16} className="text-neon" />
                        {fileState.files.length} Arquivo(s) selecionado(s)
                    </span>
                    <button onClick={() => inputRef.current?.click()} className="text-neon hover:text-white transition-colors">
                        + Adicionar
                    </button>
                </div>
                
                <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {fileState.files.map((f, i) => (
                        <div key={i} className="bg-graphite p-3 rounded-xl border border-white/10 flex items-center gap-3">
                            <div className="w-10 h-10 bg-petrol rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText size={20} className="text-neon" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-white text-sm truncate">{f.name}</p>
                                <p className="text-[10px] text-gray-400">{(f.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button onClick={() => removeFile(i)} className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-red-400">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-neon">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Pré-visualização Inteligente</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-serif">
                  {fileState.previewText}
                </p>
              </div>
            </div>

            <button 
              onClick={() => onNext(fileState.files, fileState.isOCR)}
              className="mt-6 w-full bg-neon hover:bg-neon-hover text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-neon/20"
            >
              Configurar Áudio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};