import Image from "next/image";

import FormToggleButton from "@/app/(pages)/signin/components/form-toggle-button";

interface HeaderProps {
  formType: "login" | "register";
  setFormType: (value: "login" | "register") => void;
}

const Header = ({ formType, setFormType }: HeaderProps) => {
  return (
    <header className="flex items-center gap-5 rounded-2xl border bg-card p-1.5">
      <FormToggleButton
        type="login"
        formType={formType}
        setFormType={setFormType}
      />

      <Image
        src="/galerium-logo.png"
        alt="Galerium Logo"
        height={500}
        width={500}
        className="h-5 w-5"
      />

      <FormToggleButton
        type="register"
        formType={formType}
        setFormType={setFormType}
      />
    </header>
  );
};

export default Header;
