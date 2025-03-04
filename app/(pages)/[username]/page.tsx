import { getUser } from "@/app/helpers/getUser";

import UserProfile from "@/app/components/profile/user-profile";

const Timeline = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const resolvedParams = await params;

  const user = await getUser({ username: resolvedParams.username });

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full justify-center px-5 md:items-center md:px-0">
      <div className="w-full max-w-md">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Timeline;
