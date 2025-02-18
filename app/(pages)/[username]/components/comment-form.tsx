import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

import { SendIcon } from "lucide-react";

const CommentForm = () => {
  return (
    <form className="flex w-full items-center gap-2.5">
      <Textarea placeholder="Deixe um comentário" className={cn("max-h-10")} />

      <Button
        type="submit"
        size="icon"
        variant="secondary"
        className={cn("min-w-10")}
      >
        <SendIcon />
      </Button>
    </form>
  );
};

export default CommentForm;
