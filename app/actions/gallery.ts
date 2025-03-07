"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddImageToGalleryProps {
  username: string;
  image: string;
}

export const addImageToGallery = async ({
  username,
  image,
}: AddImageToGalleryProps) => {
  if (!username) throw new Error("O ID do usuário é obrigatório.");

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  if (!image) throw new Error("A imagem é obrigatória.");

  if (user.gallery.includes(image))
    throw new Error("A imagem já está na galeria do usuário.");

  await db.user.update({
    where: { username },
    data: { gallery: { push: image } },
  });

  revalidatePath("/");
};
