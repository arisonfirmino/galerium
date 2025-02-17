import PageToggleButton from "@/app/components/header/page-toggle-button";
import UploadButton from "@/app/components/header/upload-button";

const Header = () => {
  return (
    <header className="flex items-center gap-5 rounded-2xl border bg-card p-1.5">
      <PageToggleButton page="timeline" />
      <UploadButton />
      <PageToggleButton page="profile" />
    </header>
  );
};

export default Header;
