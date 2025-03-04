import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import ShareButton from "@/app/(pages)/[username]/components/actions/share-button";

const ProfileControls = () => {
  return (
    <div className="flex items-center gap-5">
      <Link
        href="/profile"
        className={cn("flex-1", buttonVariants({ variant: "default" }))}
      >
        Editar perfil
      </Link>

      <ShareButton />
    </div>
  );
};

export default ProfileControls;
