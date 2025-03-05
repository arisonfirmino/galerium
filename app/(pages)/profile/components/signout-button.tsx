"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  return (
    <Button
      onClick={async () => await signOut()}
      size="action"
      variant="secondary"
      className="w-full justify-between hover:bg-red-600 hover:text-white"
    >
      Sair
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
