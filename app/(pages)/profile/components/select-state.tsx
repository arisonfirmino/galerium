import states from "@/states.json";

import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

import { UseFormRegisterReturn } from "react-hook-form";

interface SelectStateProps {
  location: string | null;
  register: UseFormRegisterReturn;
  onChange: (value: string) => void;
}

const SelectState = ({ location, register, onChange }: SelectStateProps) => {
  return (
    <div className="space-y-1.5">
      <Label>Localização</Label>

      <Select {...register} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={location ? location : "Sem localização"} />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectState;
