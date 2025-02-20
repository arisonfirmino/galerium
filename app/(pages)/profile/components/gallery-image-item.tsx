import Image from "next/image";

import DeleteImageButton from "@/app/(pages)/profile/components/delete-image-button";

const GalleryImageItem = ({
  userId,
  image,
}: {
  userId: string;
  image: string;
}) => {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={image}
        alt={image}
        height={500}
        width={500}
        className="aspect-square max-w-10 rounded-2xl"
      />
      <DeleteImageButton userId={userId} image={image} />
    </div>
  );
};

export default GalleryImageItem;
