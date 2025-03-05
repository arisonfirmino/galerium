"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { HeartIcon, LoaderCircleIcon } from "lucide-react";

import { isUserLiked } from "@/app/helpers/isUserLiked";

import { toggleLike } from "@/app/actions/like";

const LikeButton = ({ likedUserId }: { likedUserId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const checkFollowing = async () => {
      if (!session) return;

      const isLiked = await isUserLiked({
        likingUserId: session.user.id,
        likedUserId,
      });
      setIsLiked(isLiked);
    };

    checkFollowing();
  }, [session, likedUserId]);

  const handleLikeClick = async () => {
    if (!session) return;

    setIsLoading(true);

    await toggleLike({ likingUserId: session.user.id, likedUserId });

    setIsLoading(false);
    setIsLiked(!isLiked);
  };

  return (
    <Button
      onClick={handleLikeClick}
      disabled={isLoading}
      size="action"
      variant="outline"
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <HeartIcon className={isLiked ? "fill-pink-400 text-pink-400" : ""} />
      )}
    </Button>
  );
};

export default LikeButton;
