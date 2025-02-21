"use client";

import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";

import { isUserFollowing } from "@/app/helpers/isUserFollowing";

import { toggleFollow } from "@/app/actions/follow";

const FollowButton = ({
  followingId,
  followerId,
}: {
  followingId: string;
  followerId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      const isFollowing = await isUserFollowing({ followerId, followingId });
      setIsFollowing(isFollowing);
    };

    checkFollowing();
  }, [followerId, followingId]);

  const handleFollowClick = async () => {
    setIsLoading(true);

    await toggleFollow({ followerId, followingId });

    setIsLoading(false);
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      onClick={handleFollowClick}
      disabled={isLoading}
      variant="secondary"
    >
      {isLoading ? "Carregando" : isFollowing ? "Deixar de seguir" : "Seguir"}
    </Button>
  );
};

export default FollowButton;
