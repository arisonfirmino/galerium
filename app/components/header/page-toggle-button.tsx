"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { HomeIcon, UserIcon } from "lucide-react";

const PageToggleButton = ({ page }: { page: "timeline" | "profile" }) => {
  const { data: session } = useSession();
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
      <Link
        href={page === "profile" ? "/profile" : `/${session?.user.username}`}
      >
        {page === "timeline" ? (
          <HomeIcon />
        ) : session?.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.username}
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
