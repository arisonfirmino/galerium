import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";

const UserAvatar = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
