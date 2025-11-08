
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolCardProps {
    tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
    return (
        <Link 
            to={`/tool/${tool.id}`} 
            className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:hover:bg-gray-700/50 transition-all duration-300 border border-transparent hover:border-brand-primary/50"
        >
            {tool.icon}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-indigo-400">{tool.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
        </Link>
    );
};

export default ToolCard;
