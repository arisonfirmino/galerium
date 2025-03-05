import UserAvatar from "@/app/components/user-avatar";

import { verifiedUsers } from "@/app/helpers/verifiedUsers";

import VerifiedBadge from "@/app/components/VerifiedBadge";

import { User } from "@prisma/client";

interface IdentifyProps {
  user: Pick<User, "firstName" | "lastName" | "username" | "image">;
}

const Identify = ({ user }: IdentifyProps) => {
  const isVerified = verifiedUsers.includes(user.username);

  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar user={user} />
      <div>
        <div className="flex items-center gap-1.5">
          <p className="text-base font-medium capitalize">
            {user.firstName} {user.lastName}
          </p>
          {isVerified && <VerifiedBadge />}
        </div>
        <p className="text-muted-foreground text-xs">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identify;
