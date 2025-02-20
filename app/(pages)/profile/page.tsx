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
      followers: true,
      likers: true,
      receivedComments: { include: { author: true } },
    },
  });

  if (!user) redirect("/");

  return (
    <Container>
      <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
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

      <Separator className={cn("max-w-[698px]")} />

      <Settings user={user} />
    </Container>
  );
};

export default ProfilePage;
