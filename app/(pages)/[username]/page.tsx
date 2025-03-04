import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

import { getUser, getUsers } from "@/app/helpers/getUser";

import Search from "@/app/(pages)/[username]/components/search";
import UsersList from "@/app/(pages)/[username]/components/users-list";
import UserProfile from "@/app/components/profile/user-profile";
import ProfileActions from "@/app/(pages)/[username]/components/actions/profile-actions";
import ProfileControls from "@/app/(pages)/[username]/components/actions/profile-controls";

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

      <div className="w-full max-w-md space-y-5">
        <UsersList users={users} />
        <div className="space-y-5 px-5 md:px-0">
          <UserProfile user={user} />
          {session &&
            (session.user.id === user.id ? (
              <ProfileControls />
            ) : (
              <ProfileActions />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
