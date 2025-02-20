"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteImageFromCloudinary } from "@/app/helpers/cloudinary";

export const addImageToGallery = async ({
  userId,
  image,
}: {
  userId: string;
  image: string;
}) => {
  if (!userId) return { error: "O ID do usuário é obrigatório." };

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return { error: "Usuário não encontrado." };

  if (!image) return { error: "A imagem é obrigatória." };

  if (user.gallery.includes(image))
    return { error: "A imagem já está na galeria do usuário." };

  await db.user.update({
    where: { id: userId },
    data: { gallery: { push: image } },
  });

  revalidatePath("/");
};

export const deleteImageFromGallery = async ({
  userId,
  image,
}: {
  userId: string;
  image: string;
}) => {
  if (!userId) return { error: "O ID do usuário é obrigatório." };

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return { error: "Usuário não encontrado." };

  if (!image) return { error: "A imagem é obrigatória." };

  if (!user.gallery.includes(image))
    return { error: "Imagem não encontrada na galeria do usuário." };

  await deleteImageFromCloudinary({ image });

  await db.user.update({
    where: { id: userId },
    data: { gallery: { set: user.gallery.filter((img) => img !== image) } },
  });

  revalidatePath("/");
};
