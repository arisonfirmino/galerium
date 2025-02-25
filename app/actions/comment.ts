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

export const deleteComment = async ({
  authorId,
  commentId,
}: {
  authorId: string;
  commentId: string;
}) => {
  if (!authorId) return { error: "ID do autor é obrigatório." };
  if (!commentId) return { error: "ID do comentário é obrigatório." };

  const [author, comment] = await Promise.all([
    db.user.findUnique({ where: { id: authorId } }),
    db.comment.findUnique({ where: { id: commentId } }),
  ]);

  if (!author) return { error: "Autor não encontrado." };
  if (!comment) return { error: "Comentário não encontrado." };
  if (authorId !== comment.authorId)
    return { error: "Você só pode excluir seus próprios comentários." };

  await db.comment.delete({
    where: { id: comment.id },
  });

  revalidatePath("/");
};
