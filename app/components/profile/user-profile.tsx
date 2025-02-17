import { cn } from "@/app/lib/utils";

import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import Identity from "@/app/components/profile/identity";
import Bio from "@/app/components/profile/bio";
import Location from "@/app/components/profile/location";
import Count from "@/app/components/profile/count";

import { User } from "@prisma/client";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card
      className={cn("flex h-[170px] max-w-md flex-col justify-between p-2.5")}
    >
      <CardHeader>
        <Identity user={user} />
      </CardHeader>

      <Bio bio={user.bio} />

      <CardFooter className={cn("flex items-center justify-between")}>
        <Location location={user.location} />

        <div className="flex items-center gap-5">
          <Count field="gallery" count={10} />
          <Count field="likes" count={350} />
          <Count field="followers" count={250} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
