"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/app/components/ui/button";

import { PlusIcon } from "lucide-react";

import { addImageToGallery } from "@/app/actions/gallery";

import { toast } from "sonner";

const UploadButton = ({ userId }: { userId: string }) => {
  return (
    <CldUploadWidget
      uploadPreset="galerium"
      options={{
        sources: ["local"],
        multiple: false,
        publicId: `gallery/${userId}/img-${Date.now()}`,
      }}
      onSuccess={async (results: any) => {
        await addImageToGallery({
          userId,
          image: results?.info?.url,
        });

        toast("Sua imagem foi enviada e já está na galeria.");
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()} size="icon" variant="secondary">
            <PlusIcon />
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadButton;
