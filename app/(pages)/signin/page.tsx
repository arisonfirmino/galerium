"use client";

import { useState } from "react";

import ThemeSwitch from "@/app/components/theme-switch";
import AuthHeader from "@/app/(pages)/signin/components/auth-header";
import SignInForm from "@/app/(pages)/signin/components/signin-form";
import SignUpForm from "@/app/(pages)/signin/components/signup-form";

const SignInPage = () => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-5">
      <div className="flex w-full max-w-md flex-col items-center gap-5">
        <div className="flex items-center gap-5">
          <AuthHeader formType={formType} setFormType={setFormType} />
          <ThemeSwitch />
        </div>

        {formType === "login" ? <SignInForm /> : <SignUpForm />}

        <p className="text-xs font-light text-muted-foreground">
          © 2025 Arison. All Rights Reserved
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
