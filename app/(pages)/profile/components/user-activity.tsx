import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import SignOutButton from "@/app/(pages)/profile/components/signout-button";

import { ChartNoAxesCombinedIcon } from "lucide-react";

const UserActivity = () => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="user-activity">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <ChartNoAxesCombinedIcon size={16} />
            Sua atividade
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SignOutButton />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UserActivity;
