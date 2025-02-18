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

interface UpdateUserDataProps {
  userId: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
}

export const updateUserData = async ({
  userId,
  firstName,
  lastName,
  bio,
  location,
}: UpdateUserDataProps) => {
  if (!userId) return { error: "O ID do usuário é obrigatório." };

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return { error: "Usuário não encontrado." };

  const data = { firstName, lastName, bio, location };

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(filteredData).length === 0) {
    return { error: "Nenhum dado válido foi fornecido para atualização." };
  }

  await db.user.update({
    where: { id: userId },
    data: filteredData,
  });

  revalidatePath("/");
};
