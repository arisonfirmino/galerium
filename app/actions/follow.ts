"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface ToggleFollowProps {
  followerId: string;
  followingId: string;
}

export const toggleFollow = async ({
  followerId,
  followingId,
}: ToggleFollowProps) => {
  if (!followerId || !followingId)
    throw new Error("IDs de usuário são obrigatórios.");

  const [follower, followed] = await Promise.all([
    db.user.findUnique({ where: { id: followerId } }),
    db.user.findUnique({ where: { id: followingId } }),
  ]);

  if (!follower) throw new Error("Usuário que está seguindo não encontrado.");
  if (!followed)
    throw new Error("Usuário que está sendo seguido não encontrado.");

  if (followerId === followingId)
    throw new Error("Você não pode seguir a si mesmo");

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
