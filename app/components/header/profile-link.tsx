"use client";

import { useSession } from "next-auth/react";

import Link from "next/link";

import UserIcon from "@/app/components/header/user-icon";

import { UserIcon as Icon } from "lucide-react";

const ProfileLink = () => {
  const { data: session } = useSession();

  return (
    <Link
      href="/profile"
      className="flex items-center justify-center rounded-2xl md:h-10 md:w-10"
    >
      {session &&
        (session.user.image ? (
          <UserIcon user={session.user} />
        ) : (
          <Icon size={20} />
        ))}
    </Link>
  );
};

export default ProfileLink;
