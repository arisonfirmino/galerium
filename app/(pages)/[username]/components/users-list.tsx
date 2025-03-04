"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { cn } from "@/app/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/components/ui/carousel";
import UserAvatar from "@/app/components/user-avatar";

import { User } from "@prisma/client";

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps) => {
  const pathname = usePathname();

  return (
    <Carousel>
      <CarouselContent className="w-full space-x-2.5 px-5 md:px-0">
        {users.map((user) => (
          <CarouselItem
            key={user.id}
            className={cn(
              "max-w-10",
              pathname === `/${user.username}` ? "opacity-100" : "opacity-70",
            )}
          >
            <Link href={`/${user.username}`}>
              <UserAvatar user={user} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default UsersList;
