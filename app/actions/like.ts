"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleLike = async ({
  likerId,
  likedId,
}: {
  likerId: string;
  likedId: string;
}) => {
  if (!likerId || !likedId)
    return { error: "Todos os campos são obrigatórios." };

  const [liker, liked] = await Promise.all([
    db.user.findUnique({ where: { id: likerId } }),
    db.user.findUnique({ where: { id: likedId } }),
  ]);

  if (!liker) return { error: "Usuário que está curtindo não encontrado." };
  if (!liked)
    return { error: "Usuário que está sendo curtido não encontrado." };
  if (likerId === likedId) return { error: "Você não pode curtir a si mesmo." };

  const existingLike = await db.like.findFirst({
    where: {
      likerId,
      likedId,
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        likerId,
        likedId,
      },
    });
  }

  revalidatePath("/");
};
