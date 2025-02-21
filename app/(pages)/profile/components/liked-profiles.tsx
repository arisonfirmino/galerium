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
import Identity from "@/app/components/profile/identity";
import LikeButton from "@/app/components/like-button";

import { ChevronRightIcon } from "lucide-react";

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
        Curtidas
        <ChevronRightIcon size={16} />
      </SheetTrigger>
      <SheetContent className={cn("space-y-5")}>
        <SheetHeader>
          <SheetTitle>Perfis curtidos</SheetTitle>
          <SheetDescription>
            Aqui estão todos os perfis que você curtiu.
          </SheetDescription>
        </SheetHeader>

        <ul>
          {likedUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <Identity user={user.liked} />
              <LikeButton likerId={user.likerId} likedId={user.likedId} />
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default LikedProfiles;
