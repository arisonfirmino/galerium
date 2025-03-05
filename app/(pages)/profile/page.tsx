import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

import UserProfile from "@/app/components/profile/user-profile";
import { getUser } from "@/app/helpers/getUser";
import { redirect } from "next/navigation";
import CommentList from "@/app/components/comment/comment-list";
import { Separator } from "@/app/components/ui/separator";
import Settings from "./components/settings";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser({ username: session?.user.username });

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-5 px-5 md:justify-center">
      <div className="w-full max-w-md space-y-5">
        <UserProfile user={user} />
        {user.commentsReceived.length > 0 ? (
          <CommentList comments={user.commentsReceived} />
        ) : (
          <div className="flex h-10 items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Você ainda não recebeu nenhum comentário.
            </p>
          </div>
        )}
      </div>

      <Separator className="max-w-[698px]" />

      <Settings user={user} />
    </div>
  );
};

export default ProfilePage;
