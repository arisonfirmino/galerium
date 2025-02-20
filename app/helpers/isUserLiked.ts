"use server";

import { db } from "@/app/lib/prisma";

export const isUserLiked = async ({
  likerId,
  likedId,
}: {
  likerId: string;
  likedId: string;
}) => {
  if (!likerId || !likedId) return false;

  const existingLike = await db.like.findFirst({
    where: {
      likerId,
      likedId,
    },
  });

  if (existingLike) {
    return true;
  } else {
    return false;
  }
};
