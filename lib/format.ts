/** Formats an ISO date (YYYY-MM-DD) as e.g. "15 January 2027". */
const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00`));
