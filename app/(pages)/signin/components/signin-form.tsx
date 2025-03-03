"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

import { isPasswordCorrect, isUserRegistered } from "@/app/helpers/checkUser";

import { signIn } from "next-auth/react";

import { toast } from "sonner";

const schema = yup.object({
  identifier: yup
    .string()
    .required(
      "O e-mail ou nome de usuário é obrigatório. Por favor, informe um dos dois.",
    ),
  password: yup
    .string()
    .required(
      "A senha é obrigatória. Por favor, insira sua senha para continuar.",
    ),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const userExists = await isUserRegistered({ identifier: data.identifier });
    const checkPassword = await isPasswordCorrect({
      identifier: data.identifier,
      password: data.password,
    });

    if (!userExists) {
      setError("identifier", {
        type: "manual",
        message:
          "Não encontramos um usuário com esse e-mail ou nome de usuário.",
      });

      setIsLoading(false);
      return;
    }

    if (!checkPassword) {
      setError("password", {
        type: "manual",
        message: "Senha incorreta. Tente novamente.",
      });

      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    reset();
    setIsLoading(false);
    toast("Bem vindo(a) de volta.");
    router.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-3">
      <Input
        placeholder="Nome de usuário ou email"
        {...register("identifier")}
        error={errors.identifier}
      />

      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      {errors && (
        <p className="text-center text-xs text-red-600">
          {errors.identifier?.message || errors.password?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
