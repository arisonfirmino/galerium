import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  const result = formatDistanceToNowStrict(date, { locale: ptBR });

  const timeUnit = result
    .replace("em ", "")
    .replace(" dias", "d")
    .replace(" horas", "h")
    .replace(" segundos", "s");

  return `há ${timeUnit}`;
};
