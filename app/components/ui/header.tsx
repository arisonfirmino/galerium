import ProfileSwitcher from "../header/profile-switcher";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 md:hidden">
      <h1 className="dancing-script text-2xl font-bold">Galerium</h1>
      <ProfileSwitcher />
    </header>
  );
};

export default Header;
