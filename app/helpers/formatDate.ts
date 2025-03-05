import { formatDistanceStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return `há ${formatDistanceStrict(date, new Date(), {
    locale: ptBR,
    unit: "hour",
    roundingMethod: "floor",
  }).replace(" horas", "h")}`;
};
