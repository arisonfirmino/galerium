"use client";

import { usePathname } from "next/navigation";

import ThemeSwitch from "@/app/components/theme-switch";

import HomeLink from "@/app/components/header/home-link";
import ProfileLink from "@/app/components/header/profile-link";

import Title from "@/app/components/ui/title";

const Header = () => {
  const pathname = usePathname();

  return (
    pathname !== "/signin" && (
      <header className="flex items-center justify-between p-5 md:fixed md:top-5 md:left-5 md:p-0 xl:top-10 xl:left-10">
        <div className="md:hidden">
          <Title />
        </div>
        <div className="flex items-center gap-5 md:gap-2.5">
          <ThemeSwitch />
          {pathname === "/profile" ? <HomeLink /> : <ProfileLink />}
        </div>
      </header>
    )
  );
};

export default Header;
