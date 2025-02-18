import { cn } from "@/app/lib/utils";

import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface BioTextareaProps {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

const BioTextarea = ({ register, error }: BioTextareaProps) => {
  return (
    <div className="space-y-1.5">
      <Label>Bio</Label>
      <Textarea
        placeholder="Escreva algo sobre você"
        {...register}
        className={cn(error && "border-red-600 focus-visible:ring-red-600")}
      />
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default BioTextarea;
