import React from "react";

interface ResourceCardProps {
  title: string;
  icon?: React.ReactNode;
  cover?: string;
  onClick?: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  icon,
  cover,
  onClick,
}) => {
  return (
    <article
      onClick={onClick}
      className="flex h-full w-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 md:p-6"
    >
      {icon && <div className="mb-3 text-xl sm:text-2xl">{icon}</div>}

      <h3 className="mb-2 break-words text-base font-semibold text-slate-900 sm:text-lg">
        {title}
      </h3>

      {cover && (
        <div className="mt-4 overflow-hidden rounded-xl">
          <img
            src={cover}
            alt={`Portada de ${title}`}
            className="h-40 w-full object-cover sm:h-44 md:h-48"
          />
        </div>
      )}
    </article>
  );
};