import Link from "next/link";

import UserAvatar from "@/app/components/user-avatar";

import { DotIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface CommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: { writer: true };
  }>;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-2.5">
      <Link href={`/${comment.writer.username}`}>
        <UserAvatar user={comment.writer} />
      </Link>
      <div>
        <div className="flex items-center">
          <p className="text-sm font-medium">{comment.writer.username}</p>
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
