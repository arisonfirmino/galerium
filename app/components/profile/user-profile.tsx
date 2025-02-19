"use client";

import { useSession } from "next-auth/react";

import { cn } from "@/app/lib/utils";

import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import Identity from "@/app/components/profile/identity";
import FollowButton from "@/app/components/profile/follow-button";
import Bio from "@/app/components/profile/bio";
import Location from "@/app/components/profile/location";
import Count from "@/app/components/profile/count";

import { User } from "@prisma/client";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { data: session } = useSession();

  return (
    <Card className={cn("flex h-[170px] flex-col justify-between p-2.5")}>
      <CardHeader className={cn("flex items-center justify-between")}>
        <Identity user={user} />
        {session?.user.id !== user.id && <FollowButton />}
      </CardHeader>

      <Bio bio={user.bio} />

      <CardFooter className={cn("flex items-center justify-between")}>
        <Location location={user.location} />

        <div className="flex items-center gap-5">
          <Count field="gallery" count={user.gallery.length} />
          <Count field="likes" count={350} />
          <Count field="followers" count={250} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
