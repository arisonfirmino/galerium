"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";

const schema = yup.object({
  emailOrUsername: yup
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-3 rounded-2xl border bg-card p-2.5"
    >
      <InputForm
        label="E-mail ou nome de usuário"
        placeholder="Digite seu e-mail ou nome de usuário"
        register={{ ...register("emailOrUsername") }}
        error={errors.emailOrUsername}
      />

      <InputForm
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        register={{ ...register("password") }}
        error={errors.password}
      />

      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
