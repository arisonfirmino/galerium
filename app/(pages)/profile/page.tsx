import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/prisma";

import { cn } from "@/app/lib/utils";

import Container from "@/app/components/container";
import UserProfile from "@/app/components/profile/user-profile";
import { Separator } from "@/app/components/ui/separator";
import Settings from "@/app/(pages)/profile/components/settings";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/");

  return (
    <Container>
      <div className="w-full max-w-md">
        <UserProfile user={user} />
      </div>

      <Separator className={cn("max-w-[698px]")} />

      <Settings />
    </Container>
  );
};

export default ProfilePage;
