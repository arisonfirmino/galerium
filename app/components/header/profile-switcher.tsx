"use client";

import { usePathname } from "next/navigation";

import ThemeSwitch from "@/app/components/theme-switch";

import HomeLink from "@/app/components/header/home-link";
import ProfileLink from "@/app/components/header/profile-link";

const ProfileSwitcher = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5">
      <ThemeSwitch />
      {pathname === "/profile" ? <HomeLink /> : <ProfileLink />}
    </div>
  );
};

export default ProfileSwitcher;
