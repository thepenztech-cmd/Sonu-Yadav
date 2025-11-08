
import React from 'react';

interface ApiKeySelectorProps {
    onKeySelected: () => void;
}

// FIX: Declare the AIStudio interface within the global scope and use it for window.aistudio.
// This ensures consistency with other potential declarations of `window.aistudio` and resolves
// the type mismatch error.
declare global {
    interface AIStudio {
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }
    interface Window {
        aistudio: AIStudio;
    }
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {

    const handleSelectKey = async () => {
        try {
            await window.aistudio.openSelectKey();
            // Assume selection is successful and let the parent component proceed.
            // This mitigates a potential race condition where hasSelectedApiKey is not immediately true.
            onKeySelected();
        } catch (error) {
            console.error("Error opening API key selection:", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">API Key Required for Video Generation</h3>
            <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                This feature requires a Google AI Studio API key. Please select a key to continue.
                For more information on billing, please visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-yellow-900 dark:hover:text-yellow-100">Google AI Studio Billing</a>.
            </p>
            <button
                onClick={handleSelectKey}
                className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-gray-900 transition-colors"
            >
                Select API Key
            </button>
        </div>
    );
};

export default ApiKeySelector;