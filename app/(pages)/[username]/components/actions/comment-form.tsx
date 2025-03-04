import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

import { SendIcon } from "lucide-react";

const CommentForm = () => {
  return (
    <form className="flex w-full gap-2.5">
      <Textarea placeholder="Deixe um comentário" />

      <Button size="icon">
        <SendIcon />
      </Button>
    </form>
  );
};

export default CommentForm;
