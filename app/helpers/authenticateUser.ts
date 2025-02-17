"use server";

import { db } from "@/app/lib/prisma";

export const authenticateUser = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  if (!identifier || !password)
    return {
      error: "Por favor, preencha todos os campos.",
      field: "credentials",
    };

  const user = await db.user.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
    },
  });

  if (!user)
    return {
      error: "Não encontramos um usuário com esse e-mail ou nome de usuário.",
      field: "identifier",
    };

  if (password !== user.password)
    return { error: "Senha incorreta. Tente novamente.", field: "password" };

  return user;
};
