import { cn } from "@/app/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import CommentAvatar from "@/app/(pages)/profile/components/comment-avatar";
import { Separator } from "@/app/components/ui/separator";
import DeleteCommentButton from "@/app/(pages)/profile/components/delete-comment-button";

import { ArrowRightLeftIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface UserCommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: { author: true; recipient: true };
  }>;
  userId: string;
}

const UserCommentItem = ({ comment, userId }: UserCommentItemProps) => {
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

      <Separator />

      <CardFooter>
        <DeleteCommentButton authorId={userId} commentId={comment.id} />
      </CardFooter>
    </Card>
  );
};

export default UserCommentItem;
