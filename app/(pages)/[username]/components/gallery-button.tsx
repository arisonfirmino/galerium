"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, PlusIcon } from "lucide-react";

import { addImageToGallery } from "@/app/actions/gallery";

import { toast } from "sonner";

const GalleryButton = ({ username }: { username: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset="galerium"
      options={{
        sources: ["local"],
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        multiple: false,
        publicId: `gallery/${username}/${Date.now()}`,
      }}
      onSuccess={async (results: any) => {
        setIsLoading(true);

        await addImageToGallery({ username, image: results?.info?.url });

        setIsLoading(false);
        toast("Sua imagem foi enviada e já está na galeria.");
      }}
    >
      {({ open }) => {
        return (
          <Button
            onClick={() => open()}
            disabled={isLoading}
            className="fixed right-10 bottom-10 z-10 max-w-10 md:right-auto md:left-10 md:max-w-fit"
          >
            {isLoading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <PlusIcon />
            )}

            <span className="hidden md:flex">
              {isLoading ? "Carregando" : "Nova imagem"}
            </span>
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default GalleryButton;
