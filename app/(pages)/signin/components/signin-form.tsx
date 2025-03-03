import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

const SignInForm = () => {
  return (
    <form className="mt-10 w-full space-y-3">
      <Input placeholder="Nome de usuário ou email" />

      <Input type="password" placeholder="Senha" />

      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
