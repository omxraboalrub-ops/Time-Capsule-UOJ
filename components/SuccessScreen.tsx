import React from 'react';
import { TimeCapsuleData } from '../types';

interface SuccessScreenProps {
  data: TimeCapsuleData;
  onCreateNew: () => void;
}

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onCreateNew }) => {
    const { email, deliveryDate } = data;

    const formattedDate = new Date(deliveryDate + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-2xl shadow-indigo-900/50 text-center border border-slate-700">
            <div className="flex justify-center mb-6">
                <CheckCircleIcon />
            </div>
            <h2 className="text-3xl font-bold font-lora text-indigo-100">Capsule Sealed!</h2>
            <p className="mt-4 text-lg text-slate-300">
                Your message to the future is now safely stored. We will send it to
                <strong className="text-indigo-300 font-semibold"> {email} </strong> 
                on 
                <strong className="text-indigo-300 font-semibold"> {formattedDate}</strong>.
            </p>
            <p className="mt-4 text-slate-400">
                See you in the future!
            </p>
            <div className="mt-8">
                <button
                    onClick={onCreateNew}
                    className="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-md font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                >
                    Create Another Capsule
                </button>
            </div>
        </div>
    );
};

export default SuccessScreen;