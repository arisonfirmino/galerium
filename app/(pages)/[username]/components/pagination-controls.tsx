import Link from "next/link";

import { cn } from "@/app/lib/utils";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/components/ui/carousel";
import UserAvatar from "@/app/components/user-avatar";
import FallbackAvatar from "@/app/components/fallback-avatar";

const PaginationControls = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.username) return null;

  const users = await db.user.findMany({
    orderBy: { created_at: "desc" },
  });

  const loggedInUser = users.find(
    (user) => user.username === session.user.username,
  );

  if (!loggedInUser) return null;

  const creator = users.find((user) => user.username === "arisonfirmino");

  if (!creator) return null;

  const otherUsers = users.filter(
    (user) =>
      user.username !== session.user.username &&
      user.username !== "arisonfirmino",
  );

  const sortedUsers =
    loggedInUser.username === "arisonfirmino"
      ? [loggedInUser, ...otherUsers]
      : [loggedInUser, creator, ...otherUsers];

  return (
    <Carousel className={cn("max-w-full")}>
      <CarouselContent className={cn("w-full space-x-2.5 md:max-w-60")}>
        {sortedUsers.map((user) => (
          <Link key={user.id} href={`/${user.username}`}>
            <CarouselItem className={cn("w-full max-w-10")}>
              {user.image ? (
                <UserAvatar src={user.image} alt={user.username} />
              ) : (
                <FallbackAvatar />
              )}
            </CarouselItem>
          </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious className={cn("hidden md:flex")} />
      <CarouselNext className={cn("hidden md:flex")} />
    </Carousel>
  );
};

export default PaginationControls;
