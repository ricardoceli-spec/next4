"use client";

import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { SearchBar } from "@/components/SearchBar";
import { ImageCard } from "@/components/ImageCard";
import { GalleryModal } from "@/components/GalleryModal";
import { DeleteModal } from "@/components/DeleteModal";
import { EmptyState } from "@/components/EmptyState";
import { ImageSkeleton, LoadingSpinner } from "@/components/LoadingSpinner";
import type { GalleryImage } from "@/lib/types";

interface ModalFormData {
  title: string;
  description: string;
  file?: File | null;
}

export default function Home() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  // Create modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);

  const fetchImages = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      const params = search ? `?search=${encodeURIComponent(search)}` : "";
      const response = await fetch(`/api/images${params}`);
      if (!response.ok) throw new Error("Error al cargar imágenes");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Error al cargar las imágenes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      fetchImages(query);
    },
    [fetchImages]
  );

  const handleCreate = async (formData: ModalFormData) => {
    try {
      setModalLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.file) {
        data.append("file", formData.file);
      }

      const response = await fetch("/api/images", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        let errorMsg = "Error al crear la imagen";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      toast.success("Imagen creada exitosamente");
      setCreateModalOpen(false);
      fetchImages(searchQuery);
    } catch (error) {
      console.error("Error creating image:", error);
      toast.error(error instanceof Error ? error.message : "Error al crear la imagen");
    } finally {
      setModalLoading(false);
    }
  };

  const handleEdit = async (formData: ModalFormData) => {
    if (!editingImage) return;
    try {
      setModalLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.file) {
        data.append("file", formData.file);
      }

      const response = await fetch(`/api/images/${editingImage.id}`, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) {
        let errorMsg = "Error al actualizar la imagen";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      toast.success("Imagen actualizada exitosamente");
      setEditModalOpen(false);
      setEditingImage(null);
      fetchImages(searchQuery);
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error(error instanceof Error ? error.message : "Error al actualizar la imagen");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingImage) return;
    try {
      setModalLoading(true);
      const response = await fetch(
        `/api/images?id=${deletingImage.id}&imageUrl=${encodeURIComponent(deletingImage.image_url)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        let errorMsg = "Error al eliminar la imagen";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      toast.success("Imagen eliminada exitosamente");
      setDeleteModalOpen(false);
      setDeletingImage(null);
      fetchImages(searchQuery);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error instanceof Error ? error.message : "Error al eliminar la imagen");
    } finally {
      setModalLoading(false);
    }
  };

  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setEditModalOpen(true);
  };

  const openDeleteModal = (image: GalleryImage) => {
    setDeletingImage(image);
    setDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Galería de Imágenes</h1>
                <p className="text-xs text-gray-500">CRUD con Next.js, Supabase y Vercel Blob</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <SearchBar onSearch={handleSearch} />
              <button
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Nueva imagen</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <EmptyState
              hasSearch={searchQuery !== ""}
              onAddClick={() => setCreateModalOpen(true)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      <GalleryModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreate}
        loading={modalLoading}
      />

      {/* Edit Modal */}
      <GalleryModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingImage(null);
        }}
        onSave={handleEdit}
        image={editingImage}
        loading={modalLoading}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingImage(null);
        }}
        onConfirm={handleDelete}
        image={deletingImage}
        loading={modalLoading}
      />
    </div>
  );
}