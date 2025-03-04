import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";

import { User } from "@prisma/client";

interface UserAvatarProps {
  user: Pick<User, "image" | "username">;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return user.image ? (
    <Avatar>
      <AvatarImage src={user.image} />
      <AvatarFallback>{user.username}</AvatarFallback>
    </Avatar>
  ) : (
    <FallbackAvatar />
  );
};

export default UserAvatar;
