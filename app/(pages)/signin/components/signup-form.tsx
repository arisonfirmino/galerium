"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";

import { createAccount } from "@/app/actions/user";

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

    const result = await createAccount({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      if (result.type === "username") {
        setError("username", {
          type: "manual",
          message: result.error,
        });
      }

      if (result.type === "email") {
        setError("email", {
          type: "manual",
          message: result.error,
        });
      }

      setIsLoading(false);
      return;
    }

    reset();
    setIsLoading(false);
    router.replace(`/${data.username}`);
    toast(`Bem vido(a), ${data.firstName} ${data.lastName}.`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-3 rounded-2xl border bg-card p-2.5"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <InputForm
          label="Nome"
          placeholder="Digite seu nome"
          register={{ ...register("firstName") }}
          error={errors.firstName}
        />

        <InputForm
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
          register={{ ...register("lastName") }}
          error={errors.lastName}
        />
      </div>

      <InputForm
        label="Nome de usuário"
        placeholder="Escolha um nome de usuário"
        hint="Pense bem! Este será seu nome fixo na plataforma."
        register={{ ...register("username") }}
        error={errors.username}
      />

      <InputForm
        label="E-mail"
        placeholder="Digite seu e-mail"
        hint="O e-mail informado será fixo e não poderá ser atualizado."
        register={{ ...register("email") }}
        error={errors.email}
      />

      <InputForm
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        hint="Defina uma senha segura. Ela não poderá ser alterada depois."
        register={{ ...register("password") }}
        error={errors.password}
      />

      <InputForm
        type="password"
        label="Confirme sua senha"
        placeholder="Digite sua senha novamente"
        register={{ ...register("passwordConfirmation") }}
        error={errors.passwordConfirmation}
      />

      <SubmitButton isLoading={isLoading}>Enviar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
