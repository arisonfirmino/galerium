"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface ToggleLikeProps {
  likingUserId: string;
  likedUserId: string;
}

export const toggleLike = async ({
  likingUserId,
  likedUserId,
}: ToggleLikeProps) => {
  if (!likingUserId || !likedUserId)
    throw new Error("IDs de usuário são obrigatórios.");

  const [likingUser, likedUser] = await Promise.all([
    db.user.findUnique({ where: { id: likingUserId } }),
    db.user.findUnique({ where: { id: likedUserId } }),
  ]);

  if (!likingUser) throw new Error("Usuário que está curtindo não encontrado.");
  if (!likedUser)
    throw new Error("Usuário que está sendo curtido não encontrado.");

  if (likingUserId === likedUserId)
    throw new Error("Você não pode curtir a si mesmo.");

  const existingLike = await db.like.findFirst({
    where: {
      likingUserId,
      likedUserId,
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
        likingUserId,
        likedUserId,
      },
    });
  }

  revalidatePath("/");
};
