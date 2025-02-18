import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

import Container from "@/app/components/container";
import UserProfile from "@/app/components/profile/user-profile";
import ProfileActions from "@/app/(pages)/[username]/components/profile-actions";

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

  return (
    <Container>
      <div className="w-full max-w-md space-y-5">
        <UserProfile user={user} />
        <ProfileActions />
      </div>
    </Container>
  );
};

export default Timeline;
