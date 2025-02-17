import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { LogInIcon, UserPlusIcon } from "lucide-react";

interface FormToggleButtonProps {
  type: "login" | "register";
  formType: "login" | "register";
  setFormType: (value: "login" | "register") => void;
}

const FormToggleButton = ({
  type,
  formType,
  setFormType,
}: FormToggleButtonProps) => {
  return (
    <Button
      onClick={() => setFormType(type)}
      className={cn(
        formType === type
          ? "border-foreground"
          : "max-w-10 text-muted-foreground hover:bg-gray-100 dark:hover:bg-black",
      )}
    >
      {type === "login" ? <LogInIcon /> : <UserPlusIcon />}
      {formType === type && (type === "login" ? "Login" : "Cadastrar")}
    </Button>
  );
};

export default FormToggleButton;
