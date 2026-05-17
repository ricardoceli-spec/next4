"use client";

interface EmptyStateProps {
  hasSearch?: boolean;
  onAddClick: () => void;
}

export function EmptyState({ hasSearch, onAddClick }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {hasSearch ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          )}
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {hasSearch ? "Sin resultados" : "Galería vacía"}
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        {hasSearch
          ? "No se encontraron imágenes con ese título. Intenta con otros términos."
          : "Comienza agregando tu primera imagen a la galería."}
      </p>
      {!hasSearch && (
        <button
          onClick={onAddClick}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
        >
          Agregar primera imagen
        </button>
      )}
    </div>
  );
}