import { User } from "@prisma/client";

import { ImageIcon } from "lucide-react";

interface GalleryPlaceholderProps {
  user: Pick<User, "firstName">;
}

const GalleryPlaceholder = ({ user }: GalleryPlaceholderProps) => {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-10 rounded-2xl border bg-primary md:max-w-[230px] md:gap-5">
      <ImageIcon />
      <p className="text-center text-sm text-muted-foreground">
        A galeria de{" "}
        <span className="font-medium text-foreground">{user.firstName}</span>{" "}
        está vazia.
      </p>
    </div>
  );
};

export default GalleryPlaceholder;
