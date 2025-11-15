import React, { useState } from 'react';
import TimeCapsuleForm from './components/TimeCapsuleForm';
import SuccessScreen from './components/SuccessScreen';
import EmbedModal from './components/EmbedModal';
import { TimeCapsuleData } from './types';

const App: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<TimeCapsuleData | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const handleFormSubmit = (data: TimeCapsuleData) => {
    setSubmittedData(data);
  };

  const handleCreateNew = () => {
    setSubmittedData(null);
  }

  return (
    <>
      <div className="stars-bg"></div>
      <div className="twinkling-bg"></div>
      <div className="twinkling-bg-fast"></div>
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-indigo-950/90 via-slate-900/90 to-purple-950/90 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500">
        <header className="w-full max-w-4xl mx-auto text-center mb-8">
              <h1 className="font-pacifico text-6xl sm:text-7xl text-indigo-200 text-glow-main">Capsule</h1>
              <p className="mt-6 text-lg text-indigo-400 text-glow-sub">A message to your future self awaits.</p>
          </header>
        <main className="w-full">
          {submittedData ? (
            <SuccessScreen data={submittedData} onCreateNew={handleCreateNew} />
          ) : (
            <TimeCapsuleForm onFormSubmit={handleFormSubmit} />
          )}
        </main>
        <footer className="w-full max-w-4xl mx-auto text-center mt-12">
          <p className="text-sm text-indigo-500 text-glow">&copy; {new Date().getFullYear()} Capsule Project. All Rights Reserved.</p>
          <button 
              onClick={() => setShowEmbedModal(true)} 
              className="mt-2 text-sm text-indigo-400 hover:text-indigo-200 underline transition-colors text-glow"
            >
              Embed on your site
            </button>
        </footer>
        {showEmbedModal && <EmbedModal onClose={() => setShowEmbedModal(false)} />}
      </div>
    </>
  );
};

export default App;