"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { deleteProfileImage } from "@/app/helpers/deleteProfileImage";

import { toast } from "sonner";

const RemoveProfileImageButton = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteProfileImage({ userId });

    setIsLoading(false);
    toast("Sua foto de perfil foi removida com sucesso.");
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      variant="secondary"
      className={cn("w-full")}
    >
      {isLoading ? "Carregando" : "Remover foto"}
    </Button>
  );
};

export default RemoveProfileImageButton;
