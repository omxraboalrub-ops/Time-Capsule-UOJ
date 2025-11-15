import React, { useState } from 'react';

interface EmbedModalProps {
  onClose: () => void;
}

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const EmbedModal: React.FC<EmbedModalProps> = ({ onClose }) => {
    const [copied, setCopied] = useState(false);
    const embedCode = `<iframe src="${window.location.href.replace(/"/g, '&quot;')}" width="100%" height="900" style="border:none; border-radius: 12px;" title="FutureMe Time Capsule"></iframe>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-title"
        >
            <div 
                className="max-w-2xl w-full mx-auto bg-slate-800/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl shadow-indigo-900/50 border border-slate-700 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
                    <CloseIcon />
                </button>
                <div className="flex items-center space-x-3 mb-4">
                    <CodeIcon className="text-indigo-400"/>
                    <h2 id="embed-title" className="text-2xl font-bold font-lora text-indigo-100">Embed on Your Site</h2>
                </div>
                <p className="text-slate-300 mb-6">
                    Copy and paste this code into your website's HTML to embed the time capsule. For Google Sites, use the "Embed code" option.
                </p>
                <div className="relative">
                    <label htmlFor="embed-code" className="sr-only">Embed Code</label>
                    <textarea
                        id="embed-code"
                        readOnly
                        className="w-full h-40 p-4 font-mono text-sm bg-slate-900/80 border border-slate-600 rounded-lg text-slate-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={embedCode}
                    />
                </div>
                <div className="text-center mt-6">
                    <button
                        onClick={handleCopy}
                        className="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-md font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all transform hover:scale-105"
                    >
                        {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmbedModal;