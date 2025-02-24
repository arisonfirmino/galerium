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
import FollowButton from "@/app/components/follow-button";

import { ChevronRightIcon, UsersIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface FollowersListProps {
  followers: Prisma.FollowGetPayload<{
    include: { follower: true };
  }>[];
}

const FollowersList = ({ followers }: FollowersListProps) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-full justify-between",
        )}
      >
        <div className="flex items-center gap-2">
          <UsersIcon size={16} />
          Seguidores
        </div>
        <ChevronRightIcon size={16} />
      </SheetTrigger>
      <SheetContent className={cn("space-y-5")}>
        <SheetHeader>
          <SheetTitle>Meus Seguidores</SheetTitle>
          <SheetDescription>
            Aqui estão as pessoas que estão te seguindo.
          </SheetDescription>
        </SheetHeader>

        {followers.length > 0 ? (
          <ul className="space-y-3">
            {followers.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <Identity user={user.follower} />
                <FollowButton
                  followerId={user.followingId}
                  followingId={user.followerId}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Você ainda não tem seguidores.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FollowersList;
