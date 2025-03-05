import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

import { ImageIcon } from "lucide-react";

const GallerySettings = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="gallery">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <ImageIcon size={16} />
            Sua Galeria
          </div>
        </AccordionTrigger>
        <AccordionContent>Configurações da galeria</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GallerySettings;
