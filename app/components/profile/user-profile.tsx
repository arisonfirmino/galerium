"use client";

import { useSession } from "next-auth/react";

import { cn } from "@/app/lib/utils";

import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import Identity from "@/app/components/identity";
import FollowButton from "@/app/components/follow-button";
import Bio from "@/app/components/profile/bio";
import Location from "@/app/components/profile/location";
import Count from "@/app/components/profile/count";

import { Prisma } from "@prisma/client";

interface UserProfileProps {
  user: Prisma.UserGetPayload<{
    include: { likers: true; followers: true };
  }>;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { data: session } = useSession();

  return (
    <Card className={cn("flex h-[170px] flex-col justify-between p-2.5")}>
      <CardHeader className={cn("flex items-center justify-between")}>
        <Identity user={user} />
        {session && session.user.id !== user.id && (
          <FollowButton followerId={session.user.id} followingId={user.id} />
        )}
      </CardHeader>

      <Bio bio={user.bio} />

      <CardFooter className={cn("flex items-center justify-between")}>
        <Location location={user.location} />

        <div className="flex items-center gap-5">
          <Count field="gallery" count={user.gallery.length} />
          <Count field="likes" count={user.likers.length} />
          <Count field="followers" count={user.followers.length} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
