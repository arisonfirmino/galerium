import Link from "next/link";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";
import ShareButton from "@/app/components/share-button";

const ProfileControls = () => {
  return (
    <div className="flex items-center gap-5">
      <Button asChild variant="secondary" className={cn("w-full")}>
        <Link href="/profile">Editar perfil</Link>
      </Button>

      <ShareButton />
    </div>
  );
};

export default ProfileControls;
