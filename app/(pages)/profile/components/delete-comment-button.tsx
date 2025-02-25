"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { deleteComment } from "@/app/actions/comment";
import { toast } from "sonner";

const DeleteCommentButton = ({
  authorId,
  commentId,
}: {
  authorId: string;
  commentId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteComment({ authorId, commentId });

    setIsLoading(false);
    toast("Comentário deletado com sucesso.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "h-8 w-full justify-center bg-red-600 dark:text-white",
        )}
      >
        {isLoading ? "Deletando" : "Deletar comentário"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir comentário</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir este comentário? Esta ação não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCommentButton;
