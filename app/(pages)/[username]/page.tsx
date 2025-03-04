import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

import { getUser, getUsers } from "@/app/helpers/getUser";

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
    <div className="flex min-h-screen w-full justify-center px-5 md:items-center md:px-0">
      <div className="w-full max-w-md space-y-5">
        <UsersList users={users} />
        <UserProfile user={user} />
        {session &&
          (session.user.id === user.id ? (
            <ProfileControls />
          ) : (
            <ProfileActions />
          ))}
      </div>
    </div>
  );
};

export default Timeline;
