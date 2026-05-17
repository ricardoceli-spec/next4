"use client";

import type { GalleryImage } from "@/lib/types";

interface ImageCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (image: GalleryImage) => void;
}

export function ImageCard({ image, onEdit, onDelete }: ImageCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        <img
          src={image.image_url}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <button
            onClick={() => onEdit(image)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white shadow-sm transition-all"
            title="Editar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(image)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:text-red-600 hover:bg-white shadow-sm transition-all"
            title="Eliminar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1.5 line-clamp-1">
          {image.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {image.description}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          {new Date(image.created_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}