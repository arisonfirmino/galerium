import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import AvatarControl from "@/app/(pages)/profile/components/avatar-control";

import { UserPenIcon } from "lucide-react";

import { User } from "@prisma/client";

interface ProfileSettingsProps {
  user: User;
}

const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="gallery">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <UserPenIcon size={16} />
            Editar perfil
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <AvatarControl user={user} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProfileSettings;
