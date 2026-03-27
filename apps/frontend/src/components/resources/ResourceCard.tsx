import React from 'react';

interface ResourceCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    cover?: string;
    onClick?: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
    title,
    description,
    icon,
    cover,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
        >
            {icon && <div className="mb-4 text-2xl">{icon}</div>}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            <img src={cover} alt={`${title} cover`} className="w-full h-full object-cover mt-4" />
        </div>
    );
};