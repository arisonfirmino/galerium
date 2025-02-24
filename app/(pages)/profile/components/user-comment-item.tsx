import { cn } from "@/app/lib/utils";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import CommentAvatar from "@/app/(pages)/profile/components/comment-avatar";

import { ArrowRightLeftIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface UserCommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: { author: true; recipient: true };
  }>;
}

const UserCommentItem = ({ comment }: UserCommentItemProps) => {
  return (
    <Card className={cn("space-y-1 border-none bg-transparent shadow-none")}>
      <CardHeader className={cn("flex items-center justify-between")}>
        <div className="flex items-center gap-2">
          <CommentAvatar
            avatar={comment.author.image}
            username={comment.author.username}
          />

          <ArrowRightLeftIcon size={16} />

          <CommentAvatar
            avatar={comment.recipient.image}
            username={comment.recipient.username}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {formatDate(comment.created_at)}
        </p>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2">{comment.text}</p>
      </CardContent>
    </Card>
  );
};

export default UserCommentItem;
