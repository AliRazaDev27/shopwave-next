import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs:string[]): string {
  return twMerge(clsx(inputs))
}
export const createSlug = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters except hyphens
};
