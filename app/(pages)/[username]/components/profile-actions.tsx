import LikeButton from "@/app/(pages)/[username]/components/like-button";
import ShareButton from "@/app/components/share-button";
import CommentForm from "@/app/(pages)/[username]/components/comment-form";

interface ProfileActionsProps {
  authorId: string;
  recipientId: string;
  recipientUsername: string;
}

const ProfileActions = ({
  authorId,
  recipientId,
  recipientUsername,
}: ProfileActionsProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex gap-2.5">
        <LikeButton />
        <ShareButton />
      </div>

      <CommentForm
        authorId={authorId}
        recipientId={recipientId}
        recipientUsername={recipientUsername}
      />
    </div>
  );
};

export default ProfileActions;
