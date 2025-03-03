"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Hint from "@/app/(pages)/signin/components/hint";
import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

import {
  isEmailRegistered,
  isUsernameRegistered,
} from "@/app/helpers/checkUser";

import { createAccount } from "@/app/actions/user";

import { signIn } from "next-auth/react";

import { toast } from "sonner";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Por favor, informe seu nome.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras."),
  lastName: yup
    .string()
    .required("Por favor, informe seu sobrenome.")
    .min(3, "O sobrenome deve ter pelo menos 3 caracteres.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "O sobrenome deve conter apenas letras.",
    ),
  username: yup
    .string()
    .required("O nome de usuário é obrigatório.")
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
    .matches(/^[a-z0-9._]+$/, "Nome de usuário inválido."),
  email: yup
    .string()
    .required("O email é obrigatório.")
    .email("Por favor, insira um e-mail válido."),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  passwordConfirmation: yup
    .string()
    .required("A senha deve ter pelo menos 6 caracteres.")
    .required("A confirmação de senha é obrigatória.")
    .oneOf(
      [yup.ref("password")],
      "As senhas não coincidem. Por favor, verifique.",
    ),
});

type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hintMessage, setHintMessage] = useState("");

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

  const handleFocus = (field: string) => {
    switch (field) {
      case "username":
        setHintMessage(
          "Pense bem! Este será seu nome fixo e não poderá ser alterado depois.",
        );
        break;
      case "email":
        setHintMessage(
          "O e-mail informado será fixo e não poderá ser atualizado.",
        );
        break;
      case "password":
        setHintMessage(
          "Defina uma senha segura. Ela não poderá ser alterada depois.",
        );
        break;
      default:
        setHintMessage("");
    }
  };

  const handleBlur = () => {
    setHintMessage("");
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const emailExists = await isEmailRegistered({ email: data.email });
    const usernameExists = await isUsernameRegistered({
      username: data.username,
    });

    if (emailExists) {
      setError("email", {
        type: "manual",
        message: "Este e-mail já está em uso. Tente outro.",
      });

      setIsLoading(false);
      return;
    }

    if (usernameExists) {
      setError("username", {
        type: "manual",
        message: "Este nome de usuário já está em uso. Tente outro.",
      });

      setIsLoading(false);
      return;
    }

    await createAccount({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
    });

    reset();
    setIsLoading(false);

    await signIn("credentials", {
      redirect: false,
      identifier: data.email,
      password: data.password,
    });

    toast(`Bem vindo(a), ${data.firstName}.`);
    router.replace(`/${data.username}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-5">
      {hintMessage && <Hint message={hintMessage} />}

      <Input
        placeholder="Nome"
        {...register("firstName")}
        error={errors.firstName}
      />

      <Input
        placeholder="Sobrenome"
        {...register("lastName")}
        error={errors.lastName}
      />

      <Input
        placeholder="E-mail"
        {...register("email")}
        error={errors.email}
        onFocus={() => handleFocus("email")}
        onBlur={handleBlur}
      />

      <Input
        placeholder="Nome de usuário"
        {...register("username")}
        error={errors.username}
        onFocus={() => handleFocus("username")}
        onBlur={handleBlur}
      />

      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
        onFocus={() => handleFocus("password")}
        onBlur={handleBlur}
      />

      <Input
        type="password"
        placeholder="Confirmação de senha"
        {...register("passwordConfirmation")}
        error={errors.passwordConfirmation}
      />

      {errors && (
        <p className="text-center text-xs text-red-600">
          {errors.firstName?.message ||
            errors.lastName?.message ||
            errors.email?.message ||
            errors.username?.message ||
            errors.password?.message ||
            errors.passwordConfirmation?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading}>Cadastrar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
