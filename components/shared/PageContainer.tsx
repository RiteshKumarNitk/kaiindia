import type { ReactNode } from "react";

/** Width-constrained content area with consistent vertical rhythm. */
export function PageContainer({ children, tone }: { children: ReactNode; tone?: "plain" | "warm" }) {
  return (
    <div className={`page-body${tone === "warm" ? " page-body--warm" : ""}`}>
      <div className="container stack">{children}</div>
    </div>
  );
}
