import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";

interface InputFormProps {
  label: string;
  type?: string;
  placeholder: string;
}

const InputForm = ({ label, type = "text", placeholder }: InputFormProps) => {
  return (
    <div className="w-full space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputForm;
