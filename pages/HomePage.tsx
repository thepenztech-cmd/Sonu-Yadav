
import React from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';

const HomePage: React.FC = () => {
    const categories = Object.values(ToolCategory);

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                    AI Studio Hub
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    All Your AI Image Tools in One Free Place.
                </p>
            </div>

            {categories.map(category => (
                <div key={category} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-brand-primary/20 pb-2">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TOOLS.filter(tool => tool.category === category).map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
