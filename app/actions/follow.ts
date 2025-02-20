"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleFollow = async ({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) => {
  if (!followerId || !followingId)
    return { error: "Todos os campos são obrigatórios." };

  const [follower, followed] = await Promise.all([
    db.user.findUnique({ where: { id: followerId } }),
    db.user.findUnique({ where: { id: followingId } }),
  ]);

  if (!follower) return { error: "Usuário que está seguindo não encontrado." };
  if (!followed)
    return { error: "Usuário que está sendo seguido não encontrado." };
  if (followerId === followingId)
    return { error: "Você não pode seguir a si mesmo" };

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  if (existingFollow) {
    await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });
  } else {
    await db.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  revalidatePath("/");
};
