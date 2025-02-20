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
import CommentsList from "@/app/components/comments/comments-list";

const Timeline = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const resolvedParams = await params;

  const user = await db.user.findUnique({
    where: { username: resolvedParams.username },
    include: {
      followers: true,
      likers: true,
      receivedComments: { include: { author: true } },
    },
  });

  if (!user) redirect("/");

  const session = await getServerSession(authOptions);

  return (
    <Container>
      <section className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <div className="w-full max-w-md space-y-5">
          <UserProfile user={user} />
          {session &&
            (session.user.id === user.id ? (
              <ProfileControls />
            ) : (
              <ProfileActions
                authorId={session.user.id}
                recipientId={user.id}
                recipientUsername={user.username}
              />
            ))}
        </div>

        {user.receivedComments.length > 0 && (
          <div className="bottom-10 right-10 flex w-full md:fixed md:max-w-sm md:justify-end">
            <CommentsList comments={user.receivedComments} />
          </div>
        )}

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
