import Link from "next/link";

import { HomeIcon } from "lucide-react";

const HomeLink = () => {
  return (
    <Link
      href="/"
      className="order-2 flex items-center justify-center rounded-2xl md:order-1 md:h-10 md:w-10"
    >
      <HomeIcon size={20} />
    </Link>
  );
};

export default HomeLink;
