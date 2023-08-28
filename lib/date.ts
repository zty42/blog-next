import { parseISO, format } from "date-fns";
/*
 * Format a date string to a human-readable format
 * @param dateStr - The date string to format
 * @returns The formatted date string
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return format(parseISO(dateStr), "yyyy-MM-dd");
}
