import type { ContentStatus } from "@/lib/types";

/** Only approved items are ever shown publicly. */
export function published<T extends { status: ContentStatus }>(items: T[]): T[] {
  return items.filter((item) => item.status === "published");
}

export function isPublished(item: { status: ContentStatus }): boolean {
  return item.status === "published";
}
