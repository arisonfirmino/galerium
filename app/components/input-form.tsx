"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import Hint from "@/app/components/hint";

import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface InputFormProps {
  label: string;
  type?: string;
  placeholder: string;
  hint?: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

const InputForm = ({
  label,
  type = "text",
  placeholder,
  hint,
  register,
  error,
}: InputFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full space-y-1.5">
      <Label>{label}</Label>
      {hint ? (
        <Input
          type={type}
          placeholder={placeholder}
          {...register}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(error && "border-red-600 focus-visible:ring-red-600")}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          {...register}
          className={cn(error && "border-red-600 focus-visible:ring-red-600")}
        />
      )}
      {hint && !error && isFocused && <Hint message={hint} />}
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default InputForm;
