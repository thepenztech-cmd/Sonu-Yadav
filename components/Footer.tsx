
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto py-6 px-4 text-center text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} AI Studio Hub. All Rights Reserved.</p>
                <p className="mt-2 text-sm">Powered by <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">Google AI Studio</a></p>
            </div>
        </footer>
    );
};

export default Footer;
