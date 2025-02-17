"use client";

import { useTheme } from "next-themes";

import Image from "next/image";

import FormToggleButton from "@/app/(pages)/signin/components/form-toggle-button";

interface AuthHeaderProps {
  formType: "login" | "register";
  setFormType: (value: "login" | "register") => void;
}

const AuthHeader = ({ formType, setFormType }: AuthHeaderProps) => {
  const { theme } = useTheme();

  const logo =
    theme === "dark" ? "/galerium-logo-white.png" : "/galerium-logo-black.png";

  return (
    <header className="flex items-center gap-5 rounded-2xl border bg-card p-1.5">
      <FormToggleButton
        type="login"
        formType={formType}
        setFormType={setFormType}
      />

      <Image
        src={logo}
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

export default AuthHeader;
