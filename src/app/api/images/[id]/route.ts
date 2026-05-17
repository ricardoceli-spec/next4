import { NextRequest, NextResponse } from "next/server";
import { updateImage } from "@/lib/db";
import { uploadImage } from "@/lib/blob";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    let updateData: { title: string; description: string; image_url?: string } = {
      title,
      description,
    };

    // If a new file was uploaded, upload to Vercel Blob
    if (file && file.size > 0) {
      const imageUrl = await uploadImage(file);
      updateData.image_url = imageUrl;
    }

    const image = await updateImage(id, updateData);
    return NextResponse.json(image);
  } catch (error) {
    console.error("PUT /api/images/[id] error:", error);
    return NextResponse.json(
      { error: "Error al actualizar la imagen" },
      { status: 500 }
    );
  }
}