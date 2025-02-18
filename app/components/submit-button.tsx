import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  disabled?: boolean;
}

const SubmitButton = ({ children, isLoading, disabled }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      variant="secondary"
      className={cn("w-full")}
    >
      {isLoading ? "Carregando" : children}
    </Button>
  );
};

export default SubmitButton;
