import type { DocumentCollection, OfficialDocument } from "@/lib/types";

/* Official documents (PDFs go in /public/documents). Lists start empty until approved. */

export const documents: Record<DocumentCollection, OfficialDocument[]> = {
  "association-rules": [],
  "karate-rules": [],
  governance: [],
};
