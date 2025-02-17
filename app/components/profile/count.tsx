import { HeartIcon, ImageIcon, UsersIcon } from "lucide-react";

interface CountProps {
  field: "gallery" | "likes" | "followers";
  count: number;
}

const Count = ({ field, count }: CountProps) => {
  return (
    <div className="flex items-center gap-2">
      {field === "gallery" && <ImageIcon size={16} />}
      {field === "likes" && (
        <HeartIcon size={16} className="fill-pink-400 text-pink-400" />
      )}
      {field === "followers" && <UsersIcon size={16} />}
      <p>{count}</p>
    </div>
  );
};

export default Count;
