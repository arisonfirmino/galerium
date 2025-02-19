"use client";

import { signOut } from "next-auth/react";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  const handleSignOutClick = async () => await signOut();

  return (
    <Button
      onClick={handleSignOutClick}
      variant="secondary"
      className={cn("h-8 w-full justify-between")}
    >
      Sair
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
