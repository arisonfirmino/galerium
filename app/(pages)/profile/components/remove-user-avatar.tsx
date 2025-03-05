"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";

import { removeUserAvatar } from "@/app/api/cloudinary";

import { toast } from "sonner";

import { User } from "@prisma/client";

interface RemoveUserAvatarProps {
  user: Pick<User, "id">;
}

const RemoveUserAvatar = ({ user }: RemoveUserAvatarProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);

    await removeUserAvatar({ userId: user.id });

    setIsLoading(false);
    toast("Sua foto de perfil foi removida com sucesso.");
  };

  return (
    <Button onClick={handleRemove} disabled={isLoading} className="flex-1">
      {isLoading ? "Removendo" : "Remover foto"}
    </Button>
  );
};

export default RemoveUserAvatar;
