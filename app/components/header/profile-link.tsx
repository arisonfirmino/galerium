import Link from "next/link";

import { UserIcon } from "lucide-react";

const ProfileLink = () => {
  return (
    <Link
      href="/profile"
      className="flex items-center justify-center rounded-2xl md:h-10 md:w-10"
    >
      <UserIcon size={20} />
    </Link>
  );
};

export default ProfileLink;
