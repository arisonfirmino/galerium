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

import { ChevronRightIcon, UserIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface FolllowingListProps {
  following: Prisma.FollowGetPayload<{
    include: { following: true };
  }>[];
}

const FolllowingList = ({ following }: FolllowingListProps) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-full justify-between",
        )}
      >
        <div className="flex items-center gap-2">
          <UserIcon size={16} />
          Seguindo
        </div>
        <ChevronRightIcon size={16} />
      </SheetTrigger>
      <SheetContent className={cn("space-y-5")}>
        <SheetHeader>
          <SheetTitle>Pessoas que você segue</SheetTitle>
          <SheetDescription>
            Aqui estão as pessoas que você está seguindo.
          </SheetDescription>
        </SheetHeader>

        {following.length > 0 ? (
          <ul className="space-y-3">
            {following.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <Identity user={user.following} />
                <FollowButton
                  followerId={user.followerId}
                  followingId={user.followingId}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Você ainda não está seguindo ninguém.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FolllowingList;
