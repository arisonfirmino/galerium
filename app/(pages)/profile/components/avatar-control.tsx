import UserAvatar from "@/app/components/user-avatar";
import UpdateUserAvatar from "@/app/(pages)/profile/components/update-user-avatar";
import RemoveUserAvatar from "@/app/(pages)/profile/components/remove-user-avatar";

import { User } from "@prisma/client";

interface AvatarControlProps {
  user: User;
}

const AvatarControl = ({ user }: AvatarControlProps) => {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar user={user} />
      {user.image ? (
        <RemoveUserAvatar user={user} />
      ) : (
        <UpdateUserAvatar user={user} />
      )}
    </div>
  );
};

export default AvatarControl;
