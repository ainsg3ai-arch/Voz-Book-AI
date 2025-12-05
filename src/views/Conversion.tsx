import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, Wand2 } from 'lucide-react';
import { Book } from '../types';

interface ConversionProps {
  fileName: string;
  onComplete: (book: Book) => void;
}

export const ConversionView: React.FC<ConversionProps> = ({ fileName, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'upload' | 'ocr' | 'tts'>('upload');

  useEffect(() => {
    // Simulate complex conversion process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Logic to switch status text
        if (prev > 20 && prev < 50) setStage('ocr');
        if (prev >= 50) setStage('tts');

        // Non-linear progress simulation
        const increment = Math.random() * 2 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        // Create mockup book
        const newBook: Book = {
          id: Date.now().toString(),
          title: fileName.split('.')[0] || "Novo Audiolivro",
          author: "VozBook AI",
          coverUrl: `https://picsum.photos/seed/${Date.now()}/400/400`,
          duration: "14:30",
          totalSeconds: 870,
          progress: 0,
          fileType: "audio/mp3",
          category: 'audiobook',
          dateAdded: new Date()
        };
        onComplete(newBook);
      }, 1000); // Wait a sec at 100%
    }
  }, [progress, fileName, onComplete]);

  return (
    <div className="flex flex-col h-full bg-petrol items-center justify-center p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm text-center">
        <div className="mb-12 relative inline-block">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              className="text-white/5"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <circle
              className="text-neon transition-all duration-300 ease-out"
              strokeWidth="8"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * progress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Convertendo...</h2>
        
        <div className="h-8 mb-8">
           <p className="text-blue-200 animate-pulse flex items-center justify-center gap-2">
             {stage === 'upload' && 'Enviando arquivo seguro...'}
             {stage === 'ocr' && 'Extraindo texto (OCR)...'}
             {stage === 'tts' && 'Gerando áudio neural...'}
           </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/5 text-left space-y-4">
          <div className={`flex items-center gap-3 ${progress > 20 ? 'text-neon' : 'text-gray-500'}`}>
            {progress > 20 ? <CheckCircle size={20} /> : <Loader2 size={20} className={stage === 'upload' ? "animate-spin" : ""} />}
            <span className={progress > 20 ? "text-white" : ""}>Upload do arquivo</span>
          </div>
          <div className={`flex items-center gap-3 ${progress > 50 ? 'text-neon' : 'text-gray-500'}`}>
            {progress > 50 ? <CheckCircle size={20} /> : <Loader2 size={20} className={stage === 'ocr' ? "animate-spin" : ""} />}
            <span className={progress > 50 ? "text-white" : ""}>Processamento de Texto</span>
          </div>
          <div className={`flex items-center gap-3 ${progress === 100 ? 'text-neon' : 'text-gray-500'}`}>
            {progress === 100 ? <CheckCircle size={20} /> : <Wand2 size={20} className={stage === 'tts' ? "animate-bounce" : ""} />}
            <span className={progress === 100 ? "text-white" : ""}>Síntese de Voz IA</span>
          </div>
        </div>
      </div>
    </div>
  );
};