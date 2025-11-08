
import React from 'react';

export enum ToolCategory {
    IMAGE_EDIT = 'Image Editing',
    IMAGE_GENERATE = 'Image Generation',
    VIDEO_GENERATE = 'Video Generation',
    TEXT_ANALYSIS = 'Content Analysis',
    UTILITY = 'Utility',
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    category: ToolCategory;
    icon: React.ReactNode;
    isPlaceholder?: boolean;
}

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:3" | "3:4";