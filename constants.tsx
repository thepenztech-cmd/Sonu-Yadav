
import React from 'react';
import { Tool, ToolCategory } from './types';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-4">
        {children}
    </div>
);

export const TOOLS: Tool[] = [
    {
        id: 'image-analyzer',
        name: 'AI Image Analyzer',
        description: 'Upload a photo and get a detailed analysis of its content from Gemini.',
        category: ToolCategory.TEXT_ANALYSIS,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></IconWrapper>,
    },
    {
        id: 'bg-remover',
        name: 'AI Background Remover',
        description: 'Remove the background from any image with a single click.',
        category: ToolCategory.IMAGE_EDIT,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.789-2.756 9.348A8.003 8.003 0 0012 21a8.003 8.003 0 002.756-1.652C13.009 17.789 12 14.517 12 11z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.517 1.009-6.789 2.756-9.348A8.003 8.003 0 0112 3a8.003 8.003 0 01-2.756 1.652C10.991 7.211 12 10.483 12 13v-2z" /></svg></IconWrapper>,
    },
    {
        id: 'image-editor',
        name: 'AI Image Editor',
        description: 'Edit images using text prompts. Say "Add a retro filter" to apply changes.',
        category: ToolCategory.IMAGE_EDIT,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg></IconWrapper>,
    },
    {
        id: 'photo-to-video',
        name: 'Photo to Video Generator',
        description: 'Turn your static photos into dynamic videos with AI.',
        category: ToolCategory.VIDEO_GENERATE,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></IconWrapper>,
    },
    {
        id: 'thinking-mode',
        name: 'Complex Query Assistant',
        description: 'Handle your most complex queries with Gemini\'s advanced thinking mode.',
        category: ToolCategory.TEXT_ANALYSIS,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></IconWrapper>,
    },
    {
        id: 'character-generator',
        name: 'AI Character Generator',
        description: 'Generate realistic or anime-style characters from text prompts.',
        category: ToolCategory.IMAGE_GENERATE,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></IconWrapper>,
    },
    {
        id: 'image-upscaler',
        name: 'AI Image Upscaler (20x)',
        description: 'Enhance and upscale images up to 20x in HD quality.',
        category: ToolCategory.UTILITY,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg></IconWrapper>,
        isPlaceholder: true
    },
    {
        id: 'image-expander',
        name: 'AI Image Expander',
        description: 'Expand or extend image borders intelligently with generative fill.',
        category: ToolCategory.IMAGE_EDIT,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg></IconWrapper>,
    },
    {
        id: 'pfp-maker',
        name: 'Profile Picture Maker',
        description: 'Create HD, stylized profile images automatically.',
        category: ToolCategory.IMAGE_GENERATE,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>,
    },
     {
        id: 'image-compressor',
        name: 'AI Image Compressor',
        description: 'Reduce file size without losing significant quality.',
        category: ToolCategory.UTILITY,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l7.5-5.5L17 15z" /></svg></IconWrapper>,
        isPlaceholder: true,
    },
    {
        id: 'face-swap',
        name: 'AI Face Swap Tool',
        description: 'Swap faces between two uploaded photos.',
        category: ToolCategory.IMAGE_EDIT,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></IconWrapper>,
        isPlaceholder: true,
    },
    {
        id: 'auto-crop',
        name: 'AI Auto Crop Tool',
        description: 'Automatically detect the subject and crop the image smartly.',
        category: ToolCategory.UTILITY,
        icon: <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19M4.929 4.929L9.879 9.879m0 0L4.929 14.828m4.95-4.95l4.95 4.95M14.828 4.929l-4.95 4.95" /></svg></IconWrapper>,
        isPlaceholder: true,
    },
];

export const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export const ASPECT_RATIOS: { label: string, value: '16:9' | '9:16' }[] = [
    { label: "Landscape (16:9)", value: "16:9" },
    { label: "Portrait (9:16)", value: "9:16" },
];

export const IMG_GEN_ASPECT_RATIOS: { label: string, value: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' }[] = [
    { label: "Square (1:1)", value: "1:1" },
    { label: "Landscape (16:9)", value: "16:9" },
    { label: "Portrait (9:16)", value: "9:16" },
    { label: "Standard (4:3)", value: "4:3" },
    { label: "Tall (3:4)", value: "3:4" },
];
