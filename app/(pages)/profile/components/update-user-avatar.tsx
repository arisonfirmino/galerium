"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/app/components/ui/button";

import { updateUserAvatar } from "@/app/actions/user";

import { toast } from "sonner";

import { User } from "@prisma/client";

interface UpdateUserAvatarProps {
  user: Pick<User, "id" | "username" | "image">;
}

const UpdateUserAvatar = ({ user }: UpdateUserAvatarProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset="galerium"
      options={{
        sources: ["local"],
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        multiple: false,
        publicId: `avatar-${user.username}`,
      }}
      onSuccess={async (results: any) => {
        setIsLoading(true);

        await updateUserAvatar({ userId: user.id, avatar: results?.info?.url });

        setIsLoading(false);
        toast("Sua foto de perfil foi atualizada com sucesso.");
      }}
    >
      {({ open }) => {
        return (
          <Button
            onClick={() => open()}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Atualizando" : "Escolher foto"}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UpdateUserAvatar;
