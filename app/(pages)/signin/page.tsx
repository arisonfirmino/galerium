"use client";

import { useState } from "react";

import Title from "@/app/components/ui/title";
import SignInForm from "@/app/(pages)/signin/components/signin-form";
import SignUpForm from "@/app/(pages)/signin/components/signup-form";
import { Separator } from "@/app/components/ui/separator";

const SignInPage = () => {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full justify-center gap-5 p-5">
      <div className="flex h-fit w-full max-w-xs flex-col items-center rounded px-5 py-5 md:border md:px-10">
        <Title />

        {toggleForm ? <SignUpForm /> : <SignInForm />}

        <div className="relative mt-8 flex w-full items-center justify-center">
          <p className="bg-background text-muted-foreground absolute px-5 text-xs">
            OU
          </p>
          <Separator />
        </div>

        <button
          onClick={() => setToggleForm(!toggleForm)}
          className="hover:text-primary mt-5 cursor-pointer text-sm hover:underline"
        >
          {toggleForm ? "Conecte-se" : "Cadastre-se"}
        </button>
      </div>

      <p className="text-muted-foreground absolute bottom-5 text-center text-xs font-light">
        © 2025 Arison. All Rights Reserved
      </p>
    </section>
  );
};

export default SignInPage;
