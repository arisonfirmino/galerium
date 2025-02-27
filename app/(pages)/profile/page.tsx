import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/prisma";

import { cn } from "@/app/lib/utils";

import Container from "@/app/components/container";
import UserProfile from "@/app/components/profile/user-profile";
import CommentsList from "@/app/components/comments/comments-list";
import { Separator } from "@/app/components/ui/separator";
import Settings from "@/app/(pages)/profile/components/settings";
import Gallery from "@/app/components/gallery";
import GalleryPlaceholder from "@/app/components/gallery-placeholder";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      followers: { include: { follower: true } },
      following: { include: { following: true } },
      likers: true,
      likedUsers: { include: { liked: true } },
      receivedComments: { include: { author: true } },
      comments: {
        include: { author: true, recipient: true },
        orderBy: { created_at: "desc" },
      },
    },
  });

  if (!user) redirect("/");

  return (
    <Container>
      <div className="order-2 flex w-full flex-col justify-center gap-5 md:flex-row">
        <div className="w-full max-w-md space-y-5">
          <UserProfile user={user} />
          {user.receivedComments.length > 0 ? (
            <CommentsList comments={user.receivedComments} />
          ) : (
            <div className="flex h-10 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Nenhum comentário recebido ainda.
              </p>
            </div>
          )}
        </div>

        {user.gallery.length > 0 ? (
          <Gallery gallery={user.gallery} />
        ) : (
          <GalleryPlaceholder user={user} />
        )}
      </div>

      <Separator className={cn("order-3 max-w-[698px]")} />

      <Settings user={user} />
    </Container>
  );
};

export default ProfilePage;
