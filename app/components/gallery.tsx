"use client";

import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";

import { cn } from "@/app/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";

const Gallery = ({ gallery }: { gallery: string[] }) => {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 2500 })]}
      className={cn("w-full md:max-w-[230px]")}
    >
      <CarouselContent>
        {gallery.map((image) => (
          <CarouselItem
            key={image}
            className={cn(
              "relative aspect-square w-full overflow-hidden rounded-2xl border md:max-w-[230px]",
            )}
          >
            <Image
              src={image}
              alt={image}
              fill
              sizes="100vh"
              className="object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Gallery;
