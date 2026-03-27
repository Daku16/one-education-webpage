'use client';  // ← Client Component por Link

import Link from "next/link"
import { ResourceCard } from "@/src/components/resources/ResourceCard"

interface ResourceGridProps {
  resources: any[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {resources.map((resource) => (
        <Link 
          key={resource.id || resource.slug} 
          href={`/rea/${resource.slug}`}  // ← slug consistente
          className="w-full block"  // ← Fix: ocupa todo el ancho del grid
        >
          <ResourceCard 
            title={resource.title} 
            description={resource.description || resource.content || 'Sin descripción'} 
            cover={resource.cover?.url || resource.cover}
          />
        </Link>
      ))}
    </div>
  );
};
