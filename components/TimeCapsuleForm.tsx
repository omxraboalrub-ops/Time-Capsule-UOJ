import React, { useState, useCallback } from 'react';
import { TimeCapsuleData } from '../types';

interface TimeCapsuleFormProps {
  onFormSubmit: (data: TimeCapsuleData) => void;
}

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TimeCapsuleForm: React.FC<TimeCapsuleFormProps> = ({ onFormSubmit }) => {
  const [email, setEmail] = useState('');
  const [letter, setLetter] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum date is tomorrow
    return today.toISOString().split('T')[0];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);

    selectedFiles.forEach(rawFile => {
      // FIX: Explicitly cast to `File` to work around a type inference issue
      // where items from `event.target.files` are incorrectly typed as `unknown`.
      const file = rawFile as File;
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        // Use a placeholder for non-image files
        setPreviews(prev => [...prev, 'non-image']);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };
  
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !letter || !deliveryDate) {
      setError('Please fill in your email, letter, and a delivery date.');
      return;
    }
    if (new Date(deliveryDate) <= new Date()) {
      setError('The delivery date must be in the future.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate an async operation like uploading files and saving data
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    onFormSubmit({ email, letter, deliveryDate, files });
  }, [email, letter, deliveryDate, files, onFormSubmit]);

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-2xl shadow-indigo-900/50 border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-indigo-200 text-glow">
            Your Future Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full px-4 py-3 bg-slate-900/70 border border-slate-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="future.you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="letter" className="block text-lg font-medium text-indigo-200 text-glow">
            Letter to Your Future Self
          </label>
          <textarea
            id="letter"
            rows={12}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="mt-2 block w-full px-4 py-3 font-lora text-base bg-slate-900/70 border border-slate-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Dear Future Me..."
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="attachments" className="block text-lg font-medium text-indigo-200 mb-2 text-glow">
                Attach Memories
              </label>
              <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-900/70 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-indigo-500 border-2 border-dashed border-slate-600 flex justify-center items-center h-24 px-6 transition-all hover:border-indigo-500">
                <div className="flex items-center space-x-3 text-glow">
                  <UploadIcon />
                  <span>Upload images or videos</span>
                </div>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
              </label>
            </div>

            <div>
              <label htmlFor="deliveryDate" className="block text-lg font-medium text-indigo-200 text-glow">
                Delivery Date
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="text-slate-400" />
                </div>
                <input
                    type="date"
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={getMinDate()}
                    className="block w-full pl-10 px-4 py-3 bg-slate-900/70 border border-slate-600 rounded-lg shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    style={{colorScheme: 'dark'}}
                    required
                />
              </div>
            </div>
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-indigo-200 text-glow">Your Memories:</h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  {preview === 'non-image' ? (
                    <div className="w-full h-32 bg-slate-700 rounded-lg flex items-center justify-center">
                        <DocumentIcon />
                    </div>
                  ) : (
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                  )}
                   <div className="absolute top-1 right-1">
                    <button type="button" onClick={() => removeFile(index)} className="p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs w-6 h-6 flex items-center justify-center hover:bg-red-700">
                      X
                    </button>
                  </div>
                  <p className="text-xs text-center mt-1 truncate text-slate-300 text-glow">{files[index].name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-red-400 text-sm text-center text-glow">{error}</p>}

        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center items-center py-3 px-12 border border-transparent shadow-lg text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 text-glow"
          >
            {isLoading ? (
              <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sealing...
              </>
            ) : (
              'Seal the Capsule'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeCapsuleForm;