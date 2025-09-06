import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateLessonId(subjectSlug: string, category: string, title: string) {
  const sanitize = (text: string) => 
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special characters
      .trim()
      .replace(/\s+/g, '-'); // replace spaces with hyphens

  return `${sanitize(subjectSlug)}-${sanitize(category)}-${sanitize(title)}`;
}
