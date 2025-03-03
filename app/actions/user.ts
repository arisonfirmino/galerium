"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAccountProps {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const createAccount = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: CreateAccountProps) => {
  if (!firstName || !lastName || !email || !username || !password)
    throw new Error("Todos os campos são obrigatórios.");

  const [emailExists, usernameExists] = await Promise.all([
    db.user.findUnique({ where: { username } }),
    db.user.findUnique({ where: { email } }),
  ]);

  if (emailExists) throw new Error("Este e-mail já está em uso. Tente outro.");
  if (usernameExists)
    throw new Error("Este nome de usuário já está em uso. Tente outro.");

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      username,
      password,
    },
  });

  revalidatePath("/");
};
