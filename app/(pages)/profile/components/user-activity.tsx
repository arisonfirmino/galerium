import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import FollowersList from "@/app/(pages)/profile/components/followers-list";
import FolllowingList from "@/app/(pages)/profile/components/following-list";
import LikedProfiles from "@/app/(pages)/profile/components/liked-profiles";
import UserComments from "@/app/(pages)/profile/components/user-comments";
import SignOutButton from "@/app/(pages)/profile/components/signout-button";

import { ChartNoAxesCombinedIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface UserActivityProps {
  user: Prisma.UserGetPayload<{
    include: {
      likedUsers: { include: { liked: true } };
      followers: { include: { follower: true } };
      following: { include: { following: true } };
      comments: { include: { author: true; recipient: true } };
    };
  }>;
}

const UserActivity = ({ user }: UserActivityProps) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="user-activity">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <ChartNoAxesCombinedIcon size={16} />
            Sua atividade
          </div>
        </AccordionTrigger>
        <AccordionContent className={cn("space-y-3")}>
          <FollowersList followers={user.followers} />
          <FolllowingList following={user.following} />
          <LikedProfiles likedUsers={user.likedUsers} />
          <UserComments comments={user.comments} />
          <SignOutButton />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UserActivity;
