import UserAvatar from "@/app/components/user-avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";
import VerifiedBadge from "@/app/components/verified-badge";

import { verifiedUsers } from "@/app/helpers/verifiedUsers";

import { User } from "@prisma/client";

interface IdentityProps {
  user: Pick<User, "firstName" | "lastName" | "username" | "image">;
}

const Identity = ({ user }: IdentityProps) => {
  const isVerified = verifiedUsers.includes(user.username);

  return (
    <div className="flex items-center gap-2.5">
      {user.image ? (
        <UserAvatar src={user.image} alt={user.username} />
      ) : (
        <FallbackAvatar />
      )}
      <div>
        <div className="flex items-center gap-2">
          <p className="text-base font-medium capitalize">
            {user.firstName} {user.lastName}
          </p>
          {isVerified && <VerifiedBadge />}
        </div>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identity;
