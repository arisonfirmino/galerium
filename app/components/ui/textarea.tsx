import * as React from "react";

import { cn } from "@/app/lib/utils";

import { FieldError } from "react-hook-form";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: FieldError | undefined;
}

function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-card flex field-sizing-content min-h-10 w-full resize-none rounded-2xl border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
        error &&
          "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
      )}
      {...props}
    />
  );
}

export { Textarea };
