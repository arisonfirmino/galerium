"use client";

import { cn } from "@/app/lib/utils";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/app/components/ui/button";

import { updateUserAvatar } from "@/app/actions/user";

import { toast } from "sonner";

import { User } from "@prisma/client";

interface AddProfileImageButtonProps {
  user: Pick<User, "id" | "username">;
}

const AddProfileImageButton = ({ user }: AddProfileImageButtonProps) => {
  return (
    <CldUploadWidget
      uploadPreset="galerium"
      options={{
        sources: ["local"],
        multiple: false,
        publicId: `profile-${user.username}`,
      }}
      onSuccess={async (results: any) => {
        await updateUserAvatar({ userId: user.id, image: results?.info?.url });
        toast("Sua foto de perfil foi atualizada com sucesso.");
      }}
    >
      {({ open }) => {
        return (
          <Button
            onClick={() => open()}
            variant="secondary"
            className={cn("w-full")}
          >
            Escolher foto
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default AddProfileImageButton;
