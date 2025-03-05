"use server";

import { db } from "@/app/lib/prisma";

export const isUserLiked = async ({
  likingUserId,
  likedUserId,
}: {
  likingUserId: string;
  likedUserId: string;
}) => {
  if (!likingUserId || !likedUserId) return false;

  const existingLike = await db.like.findFirst({
    where: {
      likingUserId,
      likedUserId,
    },
  });

  if (existingLike) {
    return true;
  } else {
    return false;
  }
};
