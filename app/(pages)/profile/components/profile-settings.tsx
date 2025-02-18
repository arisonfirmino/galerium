import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import ProfileEditForm from "@/app/(pages)/profile/components/profile-edit-form";

import { UserPenIcon } from "lucide-react";

import { User } from "@prisma/client";

interface ProfileSettingsProps {
  user: User;
}

const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="profile-settings">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <UserPenIcon size={16} />
            Editar perfil
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ProfileEditForm user={user} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProfileSettings;
