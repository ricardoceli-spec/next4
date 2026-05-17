import { NextRequest, NextResponse } from "next/server";
import { getImages, createImage, deleteImageFromDb } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/blob";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;

    const images = await getImages(search);
    return NextResponse.json(images);
  } catch (error) {
    console.error("GET /api/images error:", error);
    return NextResponse.json(
      { error: "Error al obtener las imágenes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    if (!title || !description || !file) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Upload image to Vercel Blob
    const imageUrl = await uploadImage(file);

    // Save to database
    const image = await createImage({
      title,
      description,
      image_url: imageUrl,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("POST /api/images error:", error);
    return NextResponse.json(
      { error: "Error al crear la imagen" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const imageUrl = searchParams.get("imageUrl");

    if (!id || !imageUrl) {
      return NextResponse.json(
        { error: "ID y URL de imagen son obligatorios" },
        { status: 400 }
      );
    }

    // Delete from database
    await deleteImageFromDb(id);

    // Delete from Vercel Blob
    try {
      await deleteImage(imageUrl);
    } catch (blobError) {
      console.error("Error deleting from blob:", blobError);
      // Continue even if blob delete fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/images error:", error);
    return NextResponse.json(
      { error: "Error al eliminar la imagen" },
      { status: 500 }
    );
  }
}