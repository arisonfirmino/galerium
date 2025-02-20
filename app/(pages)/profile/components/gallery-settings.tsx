import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import GalleryImageItem from "@/app/(pages)/profile/components/gallery-image-item";

import { ImageIcon } from "lucide-react";

import { User } from "@prisma/client";

interface GallerySettingsProps {
  user: User;
}

const GallerySettings = ({ user }: GallerySettingsProps) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="gallery-settings">
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            <ImageIcon size={16} />
            Sua galeria
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {user.gallery.length > 0 ? (
            <ul className="space-y-3">
              {[...user.gallery].reverse().map((image) => (
                <li key={image}>
                  <GalleryImageItem userId={user.id} image={image} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              Sua galeria está vazia.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GallerySettings;
