"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { isUserFollowing } from "@/app/helpers/isUserFollowing";

import { toggleFollow } from "@/app/actions/follow";

const FollowButton = ({ followingId }: { followingId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const checkFollowing = async () => {
      if (!session) return;

      const isLiked = await isUserFollowing({
        followerId: session.user.id,
        followingId,
      });
      setIsFollowing(isLiked);
    };

    checkFollowing();
  }, [session, followingId]);

  const handleFollowClick = async () => {
    if (!session) return;

    setIsLoading(true);

    await toggleFollow({ followerId: session.user.id, followingId });

    setIsLoading(false);
    setIsFollowing(!isFollowing);
  };

  return (
    <Button onClick={handleFollowClick} disabled={isLoading}>
      {isLoading ? "Carregando" : isFollowing ? "Deixar de seguir" : "Seguir"}
    </Button>
  );
};

export default FollowButton;
