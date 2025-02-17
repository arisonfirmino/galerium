import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";

const SignUpForm = () => {
  return (
    <form className="w-full space-y-3 rounded-2xl border bg-card p-2.5">
      <div className="flex flex-col gap-3 md:flex-row">
        <InputForm label="Nome" placeholder="Digite seu nome" />

        <InputForm label="Sobrenome" placeholder="Digite seu sobrenome" />
      </div>

      <InputForm
        label="Nome de usuário"
        placeholder="Escolha um nome de usuário"
      />

      <InputForm label="E-mail" placeholder="Digite seu e-mail" />

      <InputForm label="Senha" placeholder="Digite sua senha" />

      <InputForm
        label="Confirme sua senha"
        placeholder="Digite sua senha novamente"
      />

      <SubmitButton>Enviar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
