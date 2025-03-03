import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

const SignUpForm = () => {
  return (
    <form className="mt-10 w-full space-y-5">
      <Input placeholder="Nome" />

      <Input placeholder="Sobrenome" />

      <Input placeholder="E-mail" />

      <Input placeholder="Nome de usuário" />

      <Input type="password" placeholder="Senha" />

      <Input type="password" placeholder="Confirmação de senha" />

      <SubmitButton>Cadastrar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
