import { UserIcon } from "lucide-react";

const FallbackAvatar = ({ size }: { size?: string }) => {
  return (
    <div
      className={`bg-card text-muted-foreground flex aspect-square items-center justify-center rounded-2xl border ${size ? size : "max-w-10 min-w-10"}`}
    >
      <UserIcon size={16} />
    </div>
  );
};

export default FallbackAvatar;
