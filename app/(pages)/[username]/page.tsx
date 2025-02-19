import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

import Container from "@/app/components/container";
import UserProfile from "@/app/components/profile/user-profile";
import ProfileActions from "@/app/(pages)/[username]/components/profile-actions";
import ProfileControls from "@/app/(pages)/[username]/components/profile-controls";
import Gallery from "@/app/components/gallery";
import GalleryPlaceholder from "@/app/components/gallery-placeholder";
import PaginationControls from "@/app/(pages)/[username]/components/pagination-controls";

const Timeline = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const resolvedParams = await params;

  const user = await db.user.findUnique({
    where: { username: resolvedParams.username },
  });

  if (!user) redirect("/");

  const session = await getServerSession(authOptions);

  return (
    <Container>
      <section className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <div className="w-full max-w-md space-y-5">
          <UserProfile user={user} />
          {session?.user.id === user.id ? (
            <ProfileControls />
          ) : (
            <ProfileActions />
          )}
        </div>

        {user.gallery.length > 0 ? (
          <Gallery gallery={user.gallery} />
        ) : (
          <GalleryPlaceholder user={user} />
        )}
      </section>

      <PaginationControls />
    </Container>
  );
};

export default Timeline;
