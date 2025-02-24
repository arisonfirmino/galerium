import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import Identity from "@/app/components/identity";
import LikeButton from "@/app/components/like-button";

import { ChevronRightIcon, HeartIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface LikedProfilesProps {
  likedUsers: Prisma.LikeGetPayload<{
    include: { liked: true };
  }>[];
}

const LikedProfiles = ({ likedUsers }: LikedProfilesProps) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-full justify-between",
        )}
      >
        <div className="flex items-center gap-2">
          <HeartIcon size={16} />
          Curtidas
        </div>
        <ChevronRightIcon size={16} />
      </SheetTrigger>
      <SheetContent className={cn("space-y-5")}>
        <SheetHeader>
          <SheetTitle>Perfis curtidos</SheetTitle>
          <SheetDescription>
            Aqui estão todos os perfis que você curtiu.
          </SheetDescription>
        </SheetHeader>

        {likedUsers.length > 0 ? (
          <ul className="space-y-3">
            {likedUsers.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <Identity user={user.liked} />
                <LikeButton likerId={user.likerId} likedId={user.likedId} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Você ainda não curtiu nenhum perfil.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default LikedProfiles;
