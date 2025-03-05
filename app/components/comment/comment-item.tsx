import Link from "next/link";

import UserAvatar from "@/app/components/user-avatar";

import { verifiedUsers } from "@/app/helpers/verifiedUsers";

import VerifiedBadge from "@/app/components/VerifiedBadge";
import { DotIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface CommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: { writer: true };
  }>;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const isVerified = verifiedUsers.includes(comment.writer.username);

  return (
    <div className="flex gap-2.5">
      <Link href={`/${comment.writer.username}`}>
        <UserAvatar user={comment.writer} />
      </Link>
      <div>
        <div className="flex items-center">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium">{comment.writer.username}</p>
            {isVerified && <VerifiedBadge />}
          </div>
          <DotIcon size={20} className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
