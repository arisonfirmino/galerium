"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAccountProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const checkIfExists = async (username: string, email: string) => {
  const [usernameExists, emailExists] = await Promise.all([
    db.user.findUnique({ where: { username } }),
    db.user.findUnique({ where: { email } }),
  ]);

  return { usernameExists, emailExists };
};

export const createAccount = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}: CreateAccountProps) => {
  if (!firstName || !lastName || !username || !email || !password)
    return { error: "Campos não preenchidos." };

  const { usernameExists, emailExists } = await checkIfExists(username, email);

  if (usernameExists)
    return {
      error: "Este nome de usuário já está em uso. Tente outro.",
      type: "username",
    };

  if (emailExists)
    return {
      error: "Este e-mail já está em uso. Tente outro.",
      type: "email",
    };

  await db.user.create({
    data: { firstName, lastName, username, email, password },
  });

  revalidatePath("/");
};
