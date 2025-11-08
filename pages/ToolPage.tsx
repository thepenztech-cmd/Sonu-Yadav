
import React, { useState, useCallback, useEffect } from 'react';
import { Tool, AspectRatio } from '../types';
import FileUpload from '../components/FileUpload';
import Spinner from '../components/Spinner';
import ApiKeySelector from '../components/ApiKeySelector';
import * as geminiService from '../services/geminiService';
import { ASPECT_RATIOS, IMG_GEN_ASPECT_RATIOS } from '../constants';

interface ToolPageProps {
    tool: Tool;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool }) => {
    const [file, setFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    
    // State specific for Video Generation
    const [isKeySelected, setIsKeySelected] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Generating, this may take a few minutes...');

    // Utility to convert file to base64
    const fileToGenerativePart = async (file: File) => {
        const base64EncodedDataPromise = new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    };

    const handleFileSelect = useCallback((selectedFile: File) => {
        setFile(selectedFile);
        setResult(null);
        setError(null);
    }, []);

    const resetState = () => {
        setFile(null);
        setPrompt('');
        setIsLoading(false);
        setError(null);
        setResult(null);
    }
    
    // Check for API key on mount for video tool
    useEffect(() => {
        if (tool.id === 'photo-to-video') {
            window.aistudio.hasSelectedApiKey().then(setIsKeySelected);
        }
    }, [tool.id]);

    const getInitialPrompt = () => {
        switch (tool.id) {
            case 'bg-remover': return "Remove the background from this image, making it transparent.";
            case 'image-expander': return "Expand the borders of this image, intelligently filling in the new space.";
            case 'pfp-maker': return "Turn this into a professional profile picture, with a clean, slightly blurred background.";
            default: return "";
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        
        try {
            let res: string | null = null;
            const finalPrompt = prompt || getInitialPrompt();

            if (tool.isPlaceholder) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                res = "https://picsum.photos/512/512";
            } else {
                switch (tool.id) {
                    case 'image-analyzer':
                        if (!file) throw new Error("Please upload an image.");
                        res = await geminiService.analyzeImage(file);
                        break;
                    case 'bg-remover':
                    case 'image-editor':
                    case 'image-expander':
                    case 'pfp-maker':
                        if (!file) throw new Error("Please upload an image.");
                        res = await geminiService.editImage(file, finalPrompt);
                        break;
                    case 'character-generator':
                        if (!prompt) throw new Error("Please enter a prompt.");
                        res = await geminiService.generateImage(prompt, aspectRatio);
                        break;
                    case 'thinking-mode':
                        if (!prompt) throw new Error("Please enter a complex query.");
                        res = await geminiService.runComplexQuery(prompt);
                        break;
                    case 'photo-to-video':
                        if (!file) throw new Error("Please upload an image.");
                        if (!isKeySelected) throw new Error("API Key not selected.");
                        const videoMessages = [
                          'Warming up the AI director...',
                          'Storyboarding your scene...',
                          'Setting up the virtual cameras...',
                          'Rendering frame by frame...',
                          'Adding final touches and sound...',
                          'Almost there, polishing the final cut!'
                        ];
                        let messageIndex = 0;
                        const intervalId = setInterval(() => {
                           setLoadingMessage(videoMessages[messageIndex % videoMessages.length]);
                           messageIndex++;
                        }, 5000);

                        try {
                            res = await geminiService.generateVideo(file, prompt, aspectRatio as '16:9' | '9:16');
                        } finally {
                            clearInterval(intervalId);
                            setLoadingMessage('Generating, this may take a few minutes...');
                        }
                        break;
                }
            }
            setResult(res);
        } catch (e: any) {
             console.error(e);
             let errorMessage = e.message || "An unknown error occurred.";
             if (tool.id === 'photo-to-video' && errorMessage.includes("Requested entity was not found")) {
                 errorMessage = "API Key error. The selected key may be invalid. Please select another key.";
                 setIsKeySelected(false); // Prompt user to re-select key
             }
             setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    const isImageTool = ['image-analyzer', 'bg-remover', 'image-editor', 'image-expander', 'pfp-maker', 'photo-to-video'].includes(tool.id) || tool.isPlaceholder;
    const isTextTool = ['thinking-mode'].includes(tool.id);
    const isImageGenTool = ['character-generator'].includes(tool.id);
    const isVideoTool = ['photo-to-video'].includes(tool.id);

    const renderResult = () => {
        if (!result) return null;

        if (isVideoTool) {
            return <video src={result} controls className="w-full max-w-lg rounded-lg shadow-lg" />;
        }
        if (isTextTool) {
            return <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg whitespace-pre-wrap text-left max-w-full overflow-x-auto"><p>{result}</p></div>;
        }
        return <img src={result} alt="Generated result" className="max-w-full max-h-[60vh] rounded-lg shadow-lg" />;
    };

    return (
        <div>
            <div className="text-center mb-8">
                <div className="inline-block">{tool.icon}</div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{tool.name}</h1>
                <p className="mt-2 max-w-2xl mx-auto text-md text-gray-500 dark:text-gray-400">{tool.description}</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Controls Column */}
                    <div className="space-y-6">
                        {isVideoTool && !isKeySelected && <ApiKeySelector onKeySelected={() => setIsKeySelected(true)} />}
                        
                        {isImageTool && <FileUpload onFileSelect={handleFileSelect} accept="image/*" />}

                        {isImageGenTool && (
                             <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary">
                                {IMG_GEN_ASPECT_RATIOS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                        )}
                        
                        {isVideoTool && (
                            <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary">
                                {ASPECT_RATIOS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                        )}

                        {!isImageAnalyzerTool && (
                             <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={tool.id === 'thinking-mode' ? "Enter your complex query here..." : "Enter your prompt here (optional for some tools)..."}
                                className="w-full p-3 h-32 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary resize-none"
                            />
                        )}
                        
                        <div className="flex space-x-4">
                           <button
                                onClick={handleSubmit}
                                disabled={isLoading || (isVideoTool && !isKeySelected)}
                                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                            >
                                {isLoading ? <><Spinner /> <span className="ml-2">{isVideoTool ? loadingMessage : 'Processing...'}</span></> : 'Generate'}
                            </button>
                             <button
                                onClick={resetState}
                                disabled={isLoading}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    
                    {/* Result Column */}
                    <div className="flex flex-col items-center justify-center p-4 min-h-[300px] bg-gray-100 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        {isLoading && !result && (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <Spinner size="h-8 w-8" />
                                <p className="mt-2">{isVideoTool ? loadingMessage : 'Generating result...'}</p>
                            </div>
                        )}
                        {error && <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">{error}</div>}
                        {!isLoading && result && renderResult()}
                        {!isLoading && !result && !error && file && (
                            <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-full max-h-72 rounded-lg"/>
                        )}
                        {!isLoading && !result && !error && !file && (
                            <div className="text-center text-gray-400 dark:text-gray-500">
                                <p>Your result will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple check to avoid duplicating logic
const isImageAnalyzerTool = (toolId: string) => toolId === 'image-analyzer';


export default ToolPage;
