import { cn } from "@/app/lib/utils";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";

const CommentAvatar = ({
  avatar,
  username,
}: {
  avatar: string | null;
  username: string;
}) => {
  return avatar ? (
    <Avatar className={cn("max-h-5 min-h-5 min-w-5 max-w-5 rounded-full")}>
      <AvatarImage src={avatar} />
      <AvatarFallback>{username}</AvatarFallback>
    </Avatar>
  ) : (
    <FallbackAvatar size="min-w-5 max-w-5" />
  );
};

export default CommentAvatar;
