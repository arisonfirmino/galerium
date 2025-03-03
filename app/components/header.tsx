import ThemeSwitch from "@/app/components/theme-switch";

import { UserIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 md:hidden">
      <h1 className="dancing-script text-2xl font-bold">Galerium</h1>

      <div className="flex items-center gap-5">
        <ThemeSwitch />
        <UserIcon size={20} />
      </div>
    </header>
  );
};

export default Header;
