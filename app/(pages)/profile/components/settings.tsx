import GallerySettings from "@/app/(pages)/profile/components/gallery-settings";
import ProfileSettings from "@/app/(pages)/profile/components/profile-settings";
import UserActivity from "@/app/(pages)/profile/components/user-activity";

import { Prisma } from "@prisma/client";

interface SettingsProps {
  user: Prisma.UserGetPayload<{
    include: { likedUsers: { include: { liked: true } } };
  }>;
}

const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="flex w-full max-w-[698px] flex-col gap-5 md:flex-row">
      <GallerySettings user={user} />
      <ProfileSettings user={user} />
      <UserActivity user={user} />
    </div>
  );
};

export default Settings;
