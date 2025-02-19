import UserAvatar from "@/app/components/user-avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";

import { Prisma } from "@prisma/client";

interface CommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: { author: true };
  }>;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex w-full items-center gap-2.5">
      {comment.author.image ? (
        <UserAvatar src={comment.author.image} alt={comment.author.username} />
      ) : (
        <FallbackAvatar />
      )}
      <p className="line-clamp-2 text-sm">{comment.text}</p>
    </div>
  );
};

export default CommentItem;
