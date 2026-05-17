import { supabase } from "./supabase";
import type { GalleryImage, CreateImageInput, UpdateImageInput } from "./types";

export async function getImages(search?: string): Promise<GalleryImage[]> {
  try {
    let query = supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching images (connection failed):", error);
    return [];
  }
}

export async function getImageById(id: string): Promise<GalleryImage | null> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching image:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function createImage(input: CreateImageInput): Promise<GalleryImage> {
  const { data, error } = await supabase
    .from("gallery_images")
    .insert([
      {
        title: input.title,
        description: input.description,
        image_url: input.image_url,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating image:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateImage(
  id: string,
  input: UpdateImageInput & { image_url?: string }
): Promise<GalleryImage> {
  const updateData: Record<string, string> = {
    title: input.title,
    description: input.description,
    updated_at: new Date().toISOString(),
  };

  if (input.image_url) {
    updateData.image_url = input.image_url;
  }

  const { data, error } = await supabase
    .from("gallery_images")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating image:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteImageFromDb(id: string): Promise<void> {
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);

  if (error) {
    console.error("Error deleting image:", error);
    throw new Error(error.message);
  }
}