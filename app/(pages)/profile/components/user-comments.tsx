import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import UserCommentItem from "@/app/(pages)/profile/components/user-comment-item";

import { ChevronRightIcon, MessageCircleIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface UserCommentsProps {
  comments: Prisma.CommentGetPayload<{
    include: { author: true; recipient: true };
  }>[];
}

const UserComments = ({ comments }: UserCommentsProps) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-full justify-between",
        )}
      >
        <div className="flex items-center gap-2">
          <MessageCircleIcon size={16} />
          Comentários
        </div>
        <ChevronRightIcon size={16} />
      </SheetTrigger>
      <SheetContent className={cn("space-y-5")}>
        <SheetHeader>
          <SheetTitle>
            Seus Comentários{" "}
            <span className="font-normal text-muted-foreground">
              ({comments.length})
            </span>
          </SheetTitle>
          <SheetDescription>
            Esses são os comentários que você fez em outros perfis.
          </SheetDescription>
        </SheetHeader>

        {comments.length > 0 ? (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment.id}>
                <UserCommentItem comment={comment} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Você ainda não deixou comentários em nenhum perfil.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UserComments;
