import UserAvatar from "@/app/components/user-avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";
import RemoveProfileImageButton from "@/app/(pages)/profile/components/remove-profile-image-button";
import AddProfileImageButton from "@/app/(pages)/profile/components/add-profile-image-button";

import { User } from "@prisma/client";

interface ProfileImageManagerProps {
  user: Pick<User, "id" | "username" | "image">;
}

const ProfileImageManager = ({ user }: ProfileImageManagerProps) => {
  return (
    <div className="flex items-center gap-3">
      {user.image ? (
        <UserAvatar src={user.image} alt={user.username} />
      ) : (
        <FallbackAvatar />
      )}

      {user.image ? (
        <RemoveProfileImageButton userId={user.id} />
      ) : (
        <AddProfileImageButton user={user} />
      )}
    </div>
  );
};

export default ProfileImageManager;
