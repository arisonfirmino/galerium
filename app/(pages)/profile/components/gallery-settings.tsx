import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

import { ImageIcon } from "lucide-react";

const GallerySettings = () => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="gallery-settings">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <ImageIcon size={16} />
            Sua galeria
          </div>
        </AccordionTrigger>
        <AccordionContent>gallery settings</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GallerySettings;
