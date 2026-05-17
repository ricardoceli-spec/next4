import { put, del, list } from "@vercel/blob";

export async function uploadImage(file: File): Promise<string> {
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}