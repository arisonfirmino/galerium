"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddCommentProps {
  authorId: string;
  recipientId: string;
  text: string;
}

export const addComment = async ({
  authorId,
  recipientId,
  text,
}: AddCommentProps) => {
  if (!authorId || !recipientId || !text)
    return { error: "Todos os campos são obrigatórios." };

  const [author, recipient] = await Promise.all([
    db.user.findUnique({ where: { id: authorId } }),
    db.user.findUnique({ where: { id: recipientId } }),
  ]);

  if (!author) return { error: "Autor não encontrado." };
  if (!recipient) return { error: "Destinatário não encontrado." };
  if (authorId === recipientId)
    return { error: "Você não pode comentar em si mesmo." };

  await db.comment.create({
    data: { authorId, recipientId, text },
  });

  revalidatePath("/");
};
