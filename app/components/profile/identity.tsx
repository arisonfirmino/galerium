import UserAvatar from "@/app/components/user-avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";

import { User } from "@prisma/client";

interface IdentityProps {
  user: Pick<User, "firstName" | "lastName" | "username" | "image">;
}

const Identity = ({ user }: IdentityProps) => {
  return (
    <div className="flex items-center gap-2.5">
      {user.image ? (
        <UserAvatar src={user.image} alt={user.username} />
      ) : (
        <FallbackAvatar />
      )}
      <div>
        <p className="text-base font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identity;
