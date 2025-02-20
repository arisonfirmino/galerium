"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

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
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

import { deleteImageFromGallery } from "@/app/actions/gallery";

import { toast } from "sonner";

const DeleteImageButton = ({
  userId,
  image,
}: {
  userId: string;
  image: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteImageFromGallery({ userId, image });

    setIsLoading(false);
    toast("A imagem foi excluída da sua galeria.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading}
          variant="secondary"
          className={cn("w-full justify-between bg-red-600 dark:text-white")}
        >
          {isLoading ? "Excluindo" : "Excluir"}
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir imagem</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir esta imagem da sua galeria? Esta
            ação não pode ser desfeita.
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

export default DeleteImageButton;
