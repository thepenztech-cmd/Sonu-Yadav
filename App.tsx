
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import { TOOLS } from './constants';

const AppContent: React.FC = () => {
    const { theme } = useTheme();

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {TOOLS.map(tool => (
                        <Route key={tool.id} path={`/tool/${tool.id}`} element={<ToolPage tool={tool} />} />
                    ))}
                    <Route path="/about" element={<StaticPage title="About Us" content="AI Studio Hub is a free-to-use platform offering a suite of powerful, AI-driven image and video editing tools." />} />
                     <Route path="/contact" element={<StaticPage title="Contact Us" content="For support or inquiries, please reach out to us at contact@aistudiohub.example." />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

const StaticPage: React.FC<{title: string, content: string}> = ({title, content}) => (
    <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{content}</p>
        <Link to="/" className="mt-8 inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Back to Tools
        </Link>
    </div>
);

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </ThemeProvider>
    );
};

export default App;
