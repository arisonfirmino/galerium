import { UserIcon } from "lucide-react";

const FallbackAvatar = ({ size }: { size?: string }) => {
  return (
    <div
      className={`flex aspect-square items-center justify-center rounded-2xl border bg-card text-muted-foreground ${size ? size : "min-w-10 max-w-10"}`}
    >
      <UserIcon size={16} />
    </div>
  );
};

export default FallbackAvatar;
