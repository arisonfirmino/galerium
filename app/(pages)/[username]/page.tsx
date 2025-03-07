import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

import { getUser, getUsers } from "@/app/helpers/getUser";

import Search from "@/app/(pages)/[username]/components/search";
import UsersList from "@/app/(pages)/[username]/components/users-list";
import UserProfile from "@/app/components/profile/user-profile";
import ProfileActions from "@/app/(pages)/[username]/components/actions/profile-actions";
import ProfileControls from "@/app/(pages)/[username]/components/actions/profile-controls";
import CommentList from "@/app/components/comment/comment-list";
import GalleryButton from "@/app/(pages)/[username]/components/gallery-button";
import Gallery from "@/app/components/profile/gallery";
import GalleryFallback from "@/app/components/profile/gallery-fallback";

const Timeline = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const resolvedParams = await params;

  const session = await getServerSession(authOptions);

  const user = await getUser({ username: resolvedParams.username });
  const users = await getUsers();

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full justify-center md:items-center">
      <Search users={users} />

      <div className="w-full space-y-5 md:w-auto">
        <UsersList users={users} />
        <div className="flex flex-col gap-5 px-5 md:px-0">
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex w-full max-w-md flex-col gap-5 md:min-w-md">
              <UserProfile user={user} />
              {session &&
                (session.user.id === user.id ? (
                  <ProfileControls />
                ) : (
                  <ProfileActions user={user} />
                ))}
            </div>

            {user.gallery.length > 0 ? (
              <Gallery gallery={user.gallery} />
            ) : (
              <GalleryFallback />
            )}
          </div>

          <div className="right-10 bottom-10 w-full max-w-md xl:fixed xl:max-w-xs">
            <CommentList comments={user.commentsReceived} />
          </div>
        </div>
      </div>

      {session && <GalleryButton username={session.user.username} />}
    </div>
  );
};

export default Timeline;
