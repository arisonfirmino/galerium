import GallerySettings from "@/app/(pages)/profile/components/gallery-settings";
import ProfileSettings from "@/app/(pages)/profile/components/profile-settings";
import ActivitySettings from "@/app/(pages)/profile/components/activity-settings";

import { User } from "@prisma/client";

interface SettingsProps {
  user: User;
}

const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="flex w-full max-w-[698px] flex-col gap-5 md:flex-row">
      <GallerySettings />
      <ProfileSettings />
      <ActivitySettings />
    </div>
  );
};

export default Settings;
