"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

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
