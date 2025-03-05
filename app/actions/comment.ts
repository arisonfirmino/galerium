"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddCommentProps {
  writerId: string;
  receiverId: string;
  text: string;
}

export const createComment = async ({
  writerId,
  receiverId,
  text,
}: AddCommentProps) => {
  if (!writerId || !receiverId || !text)
    throw new Error("Todos os campos são obrigatórios.");

  const [writer, receiver] = await Promise.all([
    db.user.findUnique({ where: { id: writerId } }),
    db.user.findUnique({ where: { id: receiverId } }),
  ]);

  if (!writer) throw new Error("Usuário remetente não encontrado.");
  if (!receiver) throw new Error("Usuário destinatário não encontrado.");

  if (writerId === receiverId)
    throw new Error("Você não pode enviar um comentário para si mesmo.");

  await db.comment.create({
    data: { writerId, receiverId, text },
  });

  revalidatePath("/");
};
