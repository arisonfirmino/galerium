"use client";

import { useSession } from "next-auth/react";

import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import Identify from "@/app/components/identify";
import FollowButton from "@/app/components/follow-button";
import Bio from "@/app/components/profile/bio";
import Location from "@/app/components/profile/location";
import Count from "@/app/components/profile/count";

import { Prisma } from "@prisma/client";

interface UserProfileProps {
  user: Prisma.UserGetPayload<{
    include: {
      followers: true;
      likedBy: true;
    };
  }>;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { data: session } = useSession();

  return (
    <Card className="h-[170px] w-full justify-between">
      <CardHeader className="flex items-center justify-between">
        <Identify user={user} />
        {session && session.user.id !== user.id && (
          <FollowButton followingId={user.id} />
        )}
      </CardHeader>

      <Bio bio={user.bio} />

      <CardFooter className="flex items-center justify-between">
        <Location location={user.location} />

        <div className="flex items-center gap-5">
          <Count field="gallery" count={10} />
          <Count field="likes" count={user.likedBy.length} />
          <Count field="followers" count={user.followers.length} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
