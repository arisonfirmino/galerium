"use server";

import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const getUser = async ({ username }: { username: string }) => {
  const user = await db.user.findUnique({
    where: { username },
    include: {
      commentsReceived: {
        include: { writer: true },
        orderBy: { created_at: "desc" },
      },
    },
  });

  return user;
};

export const getUsers = async () => {
  const session = await getServerSession(authOptions);

  const users = await db.user.findMany({
    orderBy: { created_at: "desc" },
  });

  return users.sort((a, b) => {
    if (a.username === session?.user.username) return -1;
    if (b.username === session?.user.username) return 1;
    if (a.username === "arisonfirmino") return -1;
    if (b.username === "arisonfirmino") return 1;
    return 0;
  });
};
