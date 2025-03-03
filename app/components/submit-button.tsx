import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full">
      {children}
    </Button>
  );
};

export default SubmitButton;
