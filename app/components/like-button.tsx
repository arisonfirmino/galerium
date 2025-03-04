import { Button } from "@/app/components/ui/button";

import { HeartIcon } from "lucide-react";

const LikeButton = () => {
  return (
    <Button size="action" variant="secondary">
      <HeartIcon />
    </Button>
  );
};

export default LikeButton;
