import { MapPinIcon } from "lucide-react";

const Location = ({ location }: { location: string | null }) => {
  return (
    <div className="flex items-center gap-1.5">
      <MapPinIcon size={16} />
      <p className="text-sm">{location ? location : "Sem localização"}</p>
    </div>
  );
};

export default Location;
