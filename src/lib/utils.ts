import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractJsonFromString(input: string): any {
  const match = input.match(/```json\n([\s\S]*?)\n```/);
  if (!match) {
    const fallbackMatch = input.match(/{[\s\S]*}/);
    if (fallbackMatch) {
      return JSON.parse(fallbackMatch[0]);
    }
    throw new Error("No valid JSON found in the string.");
  }
  return JSON.parse(match[1]);
}
