import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

import Container from "@/app/components/container";
import UserProfile from "@/app/components/profile/user-profile";

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
      <UserProfile user={user} />
    </Container>
  );
};

export default Timeline;
