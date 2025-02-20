"use server";

import { db } from "@/app/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteProfileImage = async ({ userId }: { userId: string }) => {
  if (!userId) return { error: "O ID do usuário é obrigatório." };

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return { error: "Usuário não encontrado." };

  await cloudinary.uploader.destroy(`profile-${user.username}`);

  await db.user.update({
    where: { id: userId },
    data: { image: null },
  });

  revalidatePath("/");
};

export const deleteImageFromCloudinary = async ({
  image,
}: {
  image: string;
}) => {
  const publicId = image
    .replace(
      /^https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/v\d+\//,
      "",
    )
    .replace(/\.\w+$/, "");

  await cloudinary.uploader.destroy(publicId);
};
