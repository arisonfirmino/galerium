import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

import PageToggleButton from "@/app/components/header/page-toggle-button";
import UploadButton from "@/app/components/header/upload-button";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    session && (
      <header className="flex items-center gap-5 rounded-2xl border bg-card p-1.5">
        <PageToggleButton page="timeline" user={session.user} />
        <UploadButton userId={session.user.id} />
        <PageToggleButton page="profile" user={session.user} />
      </header>
    )
  );
};

export default Header;
