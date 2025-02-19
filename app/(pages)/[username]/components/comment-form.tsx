"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

import { SendIcon } from "lucide-react";

import { addComment } from "@/app/actions/comment";

import { toast } from "sonner";

const schema = yup.object({
  text: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

interface CommentFormProps {
  authorId: string;
  recipientId: string;
  recipientUsername: string;
}

const CommentForm = ({
  authorId,
  recipientId,
  recipientUsername,
}: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    await addComment({ authorId, recipientId, text: data.text });

    reset();
    setIsLoading(false);
    toast(`Seu comentário foi adicionado ao perfil de ${recipientUsername}.`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center gap-2.5"
    >
      <Textarea
        placeholder="Deixe um comentário"
        {...register("text")}
        className={cn(
          "max-h-10",
          errors.text && "border-red-600 focus-visible:ring-red-600",
        )}
      />

      <Button
        disabled={isLoading}
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
