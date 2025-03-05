import LikeButton from "@/app/components/like-button";
import ShareButton from "@/app/(pages)/[username]/components/actions/share-button";
import CommentForm from "@/app/(pages)/[username]/components/actions/comment-form";

import { User } from "@prisma/client";

interface ProfileActionsProps {
  user: Pick<User, "id" | "firstName">;
}

const ProfileActions = ({ user }: ProfileActionsProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex gap-2.5">
        <LikeButton />
        <ShareButton />
      </div>

      <CommentForm receiverId={user.id} receiverName={user.firstName} />
    </div>
  );
};

export default ProfileActions;
