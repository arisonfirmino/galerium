import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  const result = formatDistanceToNowStrict(date, { locale: ptBR });

  const timeUnit = result.replace(" horas", "h");

  return `há ${timeUnit}`;
};
