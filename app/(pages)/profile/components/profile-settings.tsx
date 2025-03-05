import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

import { UserPenIcon } from "lucide-react";

const ProfileSettings = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="gallery">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <UserPenIcon size={16} />
            Editar perfil
          </div>
        </AccordionTrigger>
        <AccordionContent>Configurações do perfil</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProfileSettings;
