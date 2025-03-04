import UserAvatar from "@/app/components/user-avatar";

import { User } from "@prisma/client";

interface IdentifyProps {
  user: Pick<User, "firstName" | "lastName" | "username" | "image">;
}

const Identify = ({ user }: IdentifyProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar user={user} />
      <div>
        <p className="text-base font-medium capitalize">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-muted-foreground text-xs">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identify;
