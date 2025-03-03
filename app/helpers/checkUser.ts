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

export const isUserRegistered = async ({
  identifier,
}: {
  identifier: string;
}) => {
  if (!identifier) return false;

  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  return !!user;
};

export const isPasswordCorrect = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  if (!identifier || !password) return false;

  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) return false;

  const isPasswordValid = user.password === password;

  return isPasswordValid;
};
