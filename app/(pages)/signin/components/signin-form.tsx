"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";

import { authenticateUser } from "@/app/helpers/authenticateUser";

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

    const authenticate = await authenticateUser({
      identifier: data.identifier,
      password: data.password,
    });

    if ("error" in authenticate) {
      if (authenticate.field === "identifier") {
        setError("identifier", {
          type: "manual",
          message: authenticate.error,
        });
      }

      if (authenticate.field === "password") {
        setError("password", {
          type: "manual",
          message: authenticate.error,
        });
      }

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
    router.replace("/");
    toast("Bem vindo(a) de volta");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-3 rounded-2xl border bg-card p-2.5"
    >
      <InputForm
        label="E-mail ou nome de usuário"
        placeholder="Digite seu e-mail ou nome de usuário"
        register={{ ...register("identifier") }}
        error={errors.identifier}
      />

      <InputForm
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        register={{ ...register("password") }}
        error={errors.password}
      />

      <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
