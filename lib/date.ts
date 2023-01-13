import { parseISO, format } from "date-fns";

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "yyyy/MM/dd");
}
