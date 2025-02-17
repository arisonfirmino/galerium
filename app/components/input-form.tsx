"use client";

import { useState } from "react";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import Hint from "@/app/components/hint";

interface InputFormProps {
  label: string;
  type?: string;
  placeholder: string;
  hint?: string;
}

const InputForm = ({
  label,
  type = "text",
  placeholder,
  hint,
}: InputFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full space-y-1.5">
      <Label>{label}</Label>
      {hint ? (
        <Input
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <Input type={type} placeholder={placeholder} />
      )}
      {hint && isFocused && <Hint message={hint} />}
    </div>
  );
};

export default InputForm;
