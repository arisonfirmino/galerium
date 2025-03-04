import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";

import { User } from "@prisma/client";

interface UserIconProps {
  user: Pick<User, "username" | "image">;
}

const UserIcon = ({ user }: UserIconProps) => {
  return (
    <Avatar className="h-5 w-5">
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback>{user.username}</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
