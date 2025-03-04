import LikeButton from "@/app/components/like-button";
import ShareButton from "@/app/(pages)/[username]/components/actions/share-button";
import CommentForm from "@/app/(pages)/[username]/components/actions/comment-form";

const ProfileActions = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex gap-2.5">
        <LikeButton />
        <ShareButton />
      </div>

      <CommentForm />
    </div>
  );
};

export default ProfileActions;
