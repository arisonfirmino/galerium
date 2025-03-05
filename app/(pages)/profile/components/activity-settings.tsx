import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

import { ChartNoAxesCombinedIcon } from "lucide-react";

const ActivitySettings = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="gallery">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <ChartNoAxesCombinedIcon size={16} />
            Sua atividade
          </div>
        </AccordionTrigger>
        <AccordionContent>Atividades do usuário</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ActivitySettings;
