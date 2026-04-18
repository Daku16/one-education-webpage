"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface BlocksContentProps {
  content: BlocksContent;
}

export function BlocksContentRenderer({ content }: BlocksContentProps) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mb-4 text-sm leading-7 text-slate-700 sm:text-base">
              {children}
            </p>
          ),
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return (
                  <h1 className="mb-5 mt-8 text-3xl font-bold tracking-tight text-slate-900">
                    {children}
                  </h1>
                );
              case 2:
                return (
                  <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight text-slate-900">
                    {children}
                  </h2>
                );
              case 3:
                return (
                  <h3 className="mb-3 mt-6 text-xl font-semibold text-slate-900">
                    {children}
                  </h3>
                );
              case 4:
                return (
                  <h4 className="mb-3 mt-5 text-lg font-semibold text-slate-900">
                    {children}
                  </h4>
                );
              case 5:
                return (
                  <h5 className="mb-3 mt-5 text-base font-semibold text-slate-900">
                    {children}
                  </h5>
                );
              case 6:
              default:
                return (
                  <h6 className="mb-3 mt-5 text-sm font-semibold uppercase tracking-wide text-slate-900">
                    {children}
                  </h6>
                );
            }
          },
          list: ({ children, format }) => {
            if (format === "ordered") {
              return (
                <ol className="mb-5 list-decimal space-y-2 pl-6 text-slate-700 marker:font-semibold">
                  {children}
                </ol>
              );
            }

            return (
              <ul className="mb-5 list-disc space-y-2 pl-6 text-slate-700 marker:text-teal-600">
                {children}
              </ul>
            );
          },
          "list-item": ({ children }) => (
            <li className="leading-7 text-slate-700">{children}</li>
          ),
          quote: ({ children }) => (
            <blockquote className="my-6 rounded-r-2xl border-l-4 border-teal-500 bg-teal-50 px-4 py-3 text-sm italic leading-7 text-slate-700 sm:text-base">
              {children}
            </blockquote>
          ),
          code: ({ plainText }) => (
            <pre className="my-6 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
              <code>{plainText}</code>
            </pre>
          ),
          image: ({ image }) => (
            <figure className="my-6 overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt={image.alternativeText || image.name || ""}
                width={image.width}
                height={image.height}
                className="h-auto w-full rounded-2xl object-cover"
              />
              {image.caption && (
                <figcaption className="mt-2 text-sm text-slate-500">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ),
          link: ({ children, url }) => {
            const isExternal = url?.startsWith("http");

            if (isExternal) {
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 underline decoration-teal-500 underline-offset-4 transition hover:text-teal-800"
                >
                  {children}
                </a>
              );
            }

            return (
              <Link
                href={url || "#"}
                className="font-medium text-teal-700 underline decoration-teal-500 underline-offset-4 transition hover:text-teal-800"
              >
                {children}
              </Link>
            );
          },
        }}
        modifiers={{
          bold: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          italic: ({ children }) => (
            <em className="italic text-slate-700">{children}</em>
          ),
          underline: ({ children }) => (
            <span className="underline decoration-teal-500 underline-offset-4">
              {children}
            </span>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-900">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}