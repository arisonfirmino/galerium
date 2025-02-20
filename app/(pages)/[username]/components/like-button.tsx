"use client";

import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";

import { HeartIcon, LoaderCircleIcon } from "lucide-react";

import { isUserLiked } from "@/app/helpers/isUserLiked";

import { toggleLike } from "@/app/actions/like";

const LikeButton = ({
  likerId,
  likedId,
}: {
  likerId: string;
  likedId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      const isLiked = await isUserLiked({ likerId, likedId });
      setIsLiked(isLiked);
    };

    checkFollowing();
  }, [likerId, likedId]);

  const handleLikeClick = async () => {
    setIsLoading(true);

    await toggleLike({ likerId, likedId });

    setIsLoading(false);
    setIsLiked(!isLiked);
  };

  return (
    <Button onClick={handleLikeClick} disabled={isLoading} size="action">
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <HeartIcon className={isLiked ? "fill-pink-400 text-pink-400" : ""} />
      )}
    </Button>
  );
};

export default LikeButton;
