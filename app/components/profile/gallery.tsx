"use client";

import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";

const Gallery = ({ gallery }: { gallery: string[] }) => {
  return (
    <Carousel plugins={[Autoplay({ delay: 2500 })]}>
      <CarouselContent className="w-full md:max-w-md lg:max-w-[230px]">
        {[...gallery].reverse().map((image) => (
          <CarouselItem
            key={image}
            className="aspect-square w-full overflow-hidden rounded-2xl md:max-w-md lg:max-w-[230px]"
          >
            <Image
              src={image}
              alt={image}
              height={500}
              width={500}
              className="w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Gallery;
