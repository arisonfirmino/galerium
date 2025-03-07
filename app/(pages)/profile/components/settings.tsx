import GallerySettings from "@/app/(pages)/profile/components/gallery-settings";
import ProfileSettings from "@/app/(pages)/profile/components/profile-settings";
import ActivitySettings from "@/app/(pages)/profile/components/activity-settings";

import { User } from "@prisma/client";

interface SettingsProps {
  user: User;
}

const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="flex w-full flex-col gap-5 md:max-w-md lg:max-w-[698px] lg:flex-row">
      <GallerySettings />
      <ProfileSettings user={user} />
      <ActivitySettings />
    </div>
  );
};

export default Settings;
