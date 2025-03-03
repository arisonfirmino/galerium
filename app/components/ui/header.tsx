import Title from "@/app/components/ui/title";
import ProfileSwitcher from "@/app/components/header/profile-switcher";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 md:hidden">
      <Title />
      <ProfileSwitcher />
    </header>
  );
};

export default Header;
