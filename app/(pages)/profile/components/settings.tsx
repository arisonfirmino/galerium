import GallerySettings from "@/app/(pages)/profile/components/gallery-settings";
import ProfileSettings from "@/app/(pages)/profile/components/profile-settings";
import UserActivity from "@/app/(pages)/profile/components/user-activity";

import { User } from "@prisma/client";

interface SettingsProps {
  user: User;
}

const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="flex w-full max-w-[698px] flex-col gap-5 md:flex-row">
      <GallerySettings user={user} />
      <ProfileSettings user={user} />
      <UserActivity />
    </div>
  );
};

export default Settings;
