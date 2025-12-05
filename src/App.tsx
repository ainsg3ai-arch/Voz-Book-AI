import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { UploadView } from './views/Upload';
import { VoiceSettingsView } from './views/VoiceSettings';
import { ConversionView } from './views/Conversion';
import { PlayerView } from './views/Player';
import { LibraryView } from './views/Library';
import { BibleModeView } from './views/BibleMode';
import { PodcastCreatorView } from './views/PodcastCreator';
import { ProfileView } from './views/Profile';
import { BottomPlayer } from './components/BottomPlayer';
import { ViewState, Book, VoiceConfig } from './types';

// Mock Initial Data 2.0
const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    coverUrl: 'https://picsum.photos/id/24/400/400',
    duration: '1:45:00',
    totalSeconds: 6300,
    progress: 45,
    fileType: 'pdf',
    category: 'audiobook',
    dateAdded: new Date(),
    textContent: "Quando eu tinha seis anos, vi uma vez uma imagem magnífica num livro sobre a Floresta Virgem que se chamava \"Histórias Vividas\".\nRepresentava uma jiboia a engolir uma fera.\nEis a cópia do desenho.\nNo livro dizia: \"As jiboias engolem a sua presa inteira, sem a mastigar. Depois não se podem mexer e dormem durante os seis meses da digestão.\"\nRefleti muito então sobre as aventuras da selva e, por minha vez, consegui, com um lápis de cor, traçar o meu primeiro desenho."
  },
  {
    id: '2',
    title: 'Salmos 23 - Devocional',
    author: 'VozBook Bíblia',
    coverUrl: 'https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=600&auto=format&fit=crop',
    duration: '03:15',
    totalSeconds: 195,
    progress: 0,
    fileType: 'text',
    category: 'bible',
    dateAdded: new Date(),
    textContent: "O Senhor é o meu pastor; nada me faltará.\nDeitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.\nRefrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome."
  },
  {
    id: '3',
    title: 'Resumo: História do Brasil',
    author: 'Estudo ENEM',
    coverUrl: 'https://picsum.photos/id/40/400/400',
    duration: '22:10',
    totalSeconds: 1330,
    progress: 80,
    fileType: 'docx',
    category: 'study',
    dateAdded: new Date()
  }
];

export type ViewStateExtended = ViewState | 'PROFILE';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState | 'PROFILE'>(ViewState.HOME);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [currentBook, setCurrentBook] = useState<Book | null>(INITIAL_BOOKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempFiles, setTempFiles] = useState<File[]>([]);

  // Navigation Handlers
  const handleNavigate = (view: ViewState | 'PROFILE') => {
    setCurrentView(view);
  };

  // Flow Handlers
  const handleFileSelected = (files: File[], isOCR: boolean) => {
    setTempFiles(files);
    setCurrentView(ViewState.VOICE_SETTINGS);
  };

  const handleVoiceSelected = (config: VoiceConfig) => {
    setCurrentView(ViewState.CONVERSION);
  };

  const handleConversionComplete = (newBook: Book) => {
    setBooks([newBook, ...books]);
    setCurrentBook(newBook);
    setIsPlaying(true);
    setCurrentView(ViewState.PLAYER);
  };

  const handlePodcastCreated = (newBook: Book) => {
    setBooks([newBook, ...books]);
    setCurrentBook(newBook);
    setIsPlaying(true);
    setCurrentView(ViewState.PLAYER);
  }

  const handlePlayBook = (book: Book) => {
    if (currentBook?.id === book.id) {
        setIsPlaying(!isPlaying);
    } else {
        setCurrentBook(book);
        setIsPlaying(true);
    }
  };

  // Render Logic
  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home books={books} onNavigate={handleNavigate} onPlayBook={handlePlayBook} />;
      case ViewState.UPLOAD:
        return <UploadView onBack={() => setCurrentView(ViewState.HOME)} onNext={handleFileSelected} />;
      case ViewState.VOICE_SETTINGS:
        return <VoiceSettingsView onBack={() => setCurrentView(ViewState.UPLOAD)} onNext={handleVoiceSelected} />;
      case ViewState.CONVERSION:
        return <ConversionView fileName={tempFiles.length > 0 ? (tempFiles.length > 1 ? `Batch (${tempFiles.length})` : tempFiles[0].name) : 'Novo Projeto'} onComplete={handleConversionComplete} />;
      case ViewState.PLAYER:
        return currentBook ? (
            <PlayerView 
                book={currentBook} 
                isPlaying={isPlaying} 
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onClose={() => setCurrentView(ViewState.HOME)} 
            />
        ) : null;
      case ViewState.LIBRARY:
        return <LibraryView books={books} onPlayBook={(book) => { handlePlayBook(book); setCurrentView(ViewState.PLAYER); }} />;
      case ViewState.BIBLE_MODE:
        return <BibleModeView onBack={() => setCurrentView(ViewState.HOME)} onPlayBook={(book) => { handlePlayBook(book); setCurrentView(ViewState.PLAYER); }} />;
      case ViewState.PODCAST_CREATOR:
         return <PodcastCreatorView onBack={() => setCurrentView(ViewState.HOME)} onComplete={handlePodcastCreated} />;
      case 'PROFILE':
         return <ProfileView onNavigate={handleNavigate} />;
      default:
        return <Home books={books} onNavigate={handleNavigate} onPlayBook={handlePlayBook} />;
    }
  };

  return (
    <Layout currentView={currentView as ViewState} onNavigate={handleNavigate}>
      {renderView()}
      
      {/* Persistent Mini Player */}
      {(currentView !== ViewState.PLAYER && currentView !== ViewState.CONVERSION && currentView !== ViewState.UPLOAD && currentView !== ViewState.VOICE_SETTINGS) && currentBook && (
        <BottomPlayer 
            book={currentBook} 
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onExpand={() => setCurrentView(ViewState.PLAYER)}
        />
      )}
    </Layout>
  );
}