"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/components/input-form";
import BioTextarea from "@/app/(pages)/profile/components/bio-textarea";
import SelectState from "@/app/(pages)/profile/components/select-state";
import SubmitButton from "@/app/components/submit-button";

import { updateUserData } from "@/app/actions/user";

import { User } from "@prisma/client";

const schema = yup.object({
  firstName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras."),
  lastName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .min(3, "O sobrenome deve ter pelo menos 3 caracteres.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "O sobrenome deve conter apenas letras.",
    ),
  bio: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .min(3, "A bio deve ter pelo menos 3 caracteres."),
  location: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

interface ProfileEditFormProps {
  user: Pick<User, "id" | "firstName" | "lastName" | "location">;
}

const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchedFields = watch(["firstName", "lastName", "bio", "location"]);
  const isDisabled = !watchedFields.some(
    (value) => value && value.trim() !== "",
  );

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    await updateUserData({
      userId: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      location: data.location,
    });

    reset();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 px-1">
      <InputForm
        label="Nome"
        placeholder={user.firstName}
        register={{ ...register("firstName") }}
        error={errors.firstName}
      />

      <InputForm
        label="Sobrenome"
        placeholder={user.lastName}
        register={{ ...register("lastName") }}
        error={errors.lastName}
      />

      <BioTextarea register={{ ...register("bio") }} error={errors.bio} />

      <SelectState
        location={user.location}
        register={{ ...register("location") }}
        onChange={(value: string) => setValue("location", value)}
      />

      <SubmitButton isLoading={isLoading} disabled={isDisabled}>
        Atualizar
      </SubmitButton>
    </form>
  );
};

export default ProfileEditForm;
