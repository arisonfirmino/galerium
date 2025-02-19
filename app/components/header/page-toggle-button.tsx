"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { HomeIcon, UserIcon } from "lucide-react";

import { User } from "@prisma/client";

interface PageToggleButtonProps {
  page: "timeline" | "profile";
  user: Pick<User, "username" | "image">;
}

const PageToggleButton = ({ page, user }: PageToggleButtonProps) => {
  const pathname = usePathname();

  const active =
    (page === "profile" && pathname === "/profile") ||
    (page === "timeline" && pathname !== "/profile");

  return (
    <Button
      asChild
      className={cn(
        active ? "border-foreground" : "max-w-10 text-muted-foreground",
      )}
    >
      <Link href={page === "profile" ? "/profile" : `/${user?.username}`}>
        {page === "timeline" ? (
          <HomeIcon />
        ) : user.image ? (
          <Image
            src={user.image}
            alt={user.username}
            height={500}
            width={500}
            className="aspect-square min-w-4 max-w-4 rounded-full"
          />
        ) : (
          <UserIcon />
        )}
        {active && <span>{page === "profile" ? "Perfil" : "Timeline"}</span>}
      </Link>
    </Button>
  );
};

export default PageToggleButton;
