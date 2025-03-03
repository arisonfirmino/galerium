"use server";

import { db } from "@/app/lib/prisma";

export const isEmailRegistered = async ({ email }: { email: string }) => {
  if (!email) return false;

  const user = await db.user.findUnique({
    where: { email },
  });

  return !!user;
};

export const isUsernameRegistered = async ({
  username,
}: {
  username: string;
}) => {
  if (!username) return false;

  const user = await db.user.findUnique({
    where: { username },
  });

  return !!user;
};
