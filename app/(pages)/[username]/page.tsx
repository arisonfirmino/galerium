import UserProfile from "@/app/components/profile/user-profile";
import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

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
    <main className="flex min-h-screen w-full items-center justify-center">
      <UserProfile user={user} />
    </main>
  );
};

export default Timeline;
