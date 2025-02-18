import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

import { UserPenIcon } from "lucide-react";

const ProfileSettings = () => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="profile-settings">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <UserPenIcon size={16} />
            Editar perfil
          </div>
        </AccordionTrigger>
        <AccordionContent>profile settings</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProfileSettings;
