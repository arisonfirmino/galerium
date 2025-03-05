import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
};
