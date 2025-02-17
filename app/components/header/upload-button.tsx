import { Button } from "@/app/components/ui/button";

import { PlusIcon } from "lucide-react";

const UploadButton = () => {
  return (
    <Button size="icon" variant="secondary">
      <PlusIcon />
    </Button>
  );
};

export default UploadButton;
