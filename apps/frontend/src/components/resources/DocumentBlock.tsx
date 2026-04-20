"use client";

import Image from "next/image";
import { FileText, Download, ExternalLink } from "lucide-react";
import { BlocksContentRenderer } from "@/src/components/resources/BlocksContent";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { ResourceFile } from "@/src/types/resource";

interface DocumentBlockProps {
  title?: string | null;
  description?: BlocksContent | null;
  file?: ResourceFile | null;
  caption?: string | null;
}

function formatFileSize(size?: number | null) {
  if (!size || Number.isNaN(size)) return null;
  if (size < 1024) return `${size.toFixed(0)} KB`;
  return `${(size / 1024).toFixed(2)} MB`;
}

function getCloudinaryPdfPreview(url?: string | null) {
  if (!url) return null;

  const match = url.match(
    /^https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/v\d+\/(.+)\.pdf$/i
  );

  if (!match) return null;

  const cloudName = match[1];
  const publicId = match[2];

  return `https://res.cloudinary.com/${cloudName}/image/upload/pg_1,f_jpg,q_auto,w_1200/${publicId}.pdf`;
}

export function DocumentBlock({
  title,
  description,
  file,
  caption,
}: DocumentBlockProps) {
  const previewUrl = getCloudinaryPdfPreview(file?.url);

  return (
    <section className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]">
      {title && (
        <h2 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
          {title}
        </h2>
      )}

      {description && description.length > 0 && (
        <div className="mb-5">
          <BlocksContentRenderer content={description ?? []} />
        </div>
      )}

      {file?.url ? (
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/60 sm:p-5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-red-100 p-3 text-red-700">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  {file.alternativeText || file.name || "Documento"}
                </p>

                <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-500">
                  {file.ext && <span>{file.ext.replace(".", "").toUpperCase()}</span>}
                  {formatFileSize(file.size) && <span>• {formatFileSize(file.size)}</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Ver documento
              </a>

              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200"
              >
                <Download className="h-4 w-4" />
                Descargar
              </a>
            </div>
          </div>

          {previewUrl ? (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <Image
                src={previewUrl}
                alt={`Vista previa de ${file.name || "PDF"}`}
                width={1200}
                height={1600}
                className="h-auto w-full object-contain"
              />
            </a>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Vista previa no disponible para este documento.
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-dashed ring-slate-200">
          <div className="text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <p className="text-sm font-medium text-slate-500">
              No hay documento para mostrar
            </p>
          </div>
        </div>
      )}

      {caption && <p className="mt-3 text-sm text-slate-500">{caption}</p>}
    </section>
  );
}