import { ImageIcon } from "lucide-react";

const GalleryFallback = () => {
  return (
    <div className="bg-card flex aspect-square w-full min-w-[230px] items-center justify-center rounded-2xl border lg:max-w-[230px]">
      <ImageIcon size={32} />
    </div>
  );
};

export default GalleryFallback;
