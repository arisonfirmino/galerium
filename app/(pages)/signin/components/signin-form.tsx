import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";

const SignInForm = () => {
  return (
    <form className="w-full space-y-3 rounded-2xl border bg-card p-2.5">
      <InputForm
        label="E-mail ou nome de usuário"
        placeholder="Digite seu e-mail ou nome de usuário"
      />

      <InputForm type="password" label="Senha" placeholder="Digite sua senha" />

      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
