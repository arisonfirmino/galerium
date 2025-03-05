"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, SendIcon } from "lucide-react";

import { createComment } from "@/app/actions/comment";

import { toast } from "sonner";

const schema = yup.object({
  comment: yup.string().required().min(3),
});

type FormData = yup.InferType<typeof schema>;

interface CommentFormProps {
  receiverId: string;
  receiverName: string;
}

const CommentForm = ({ receiverId, receiverName }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    await createComment({
      writerId: session.user.id,
      receiverId,
      text: data.comment,
    });

    reset();
    setIsLoading(false);
    toast(`Seu comentário foi enviado para o perfil de ${receiverName}!`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-2.5">
      <Textarea
        placeholder="Deixe um comentário"
        {...register("comment")}
        error={errors.comment}
        className="h-10"
      />

      <Button type="submit" disabled={isLoading} size="icon">
        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <SendIcon />
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
