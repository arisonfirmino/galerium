"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

const schema = yup.object({
  identify: yup
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

  const onSubmit = async (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-3">
      <Input
        placeholder="Nome de usuário ou email"
        {...register("identify")}
        error={errors.identify}
      />

      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      {errors && (
        <p className="text-xs text-red-600">
          {errors.identify?.message || errors.password?.message}
        </p>
      )}

      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
