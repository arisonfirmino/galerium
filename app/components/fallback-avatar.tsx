import { UserIcon } from "lucide-react";

const FallbackAvatar = () => {
  return (
    <div className="flex aspect-square min-w-10 max-w-10 items-center justify-center rounded-2xl border bg-card text-muted-foreground">
      <UserIcon size={16} />
    </div>
  );
};

export default FallbackAvatar;
